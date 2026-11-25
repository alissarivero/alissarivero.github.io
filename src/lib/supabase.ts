/**
 * Small Supabase client for the psych stats portal.
 * Set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY (Astro exposes PUBLIC_ vars
 * to the browser). The anon key is meant to be public. Access rules live in
 * supabase/schema.sql. Returns null when either variable is missing so lessons
 * still build. This speaks to the Auth and REST APIs directly so the static
 * site does not need another package.
 */

type Result<T> = { data: T; error: { message: string } | null };

const SESSION_KEY = "psychstats-supabase-session";

type Session = { access_token: string; refresh_token?: string; expires_at?: number };

function readSession(): Session | null {
  if (typeof localStorage === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

function writeSession(session: Session | null) {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function captureHashSession() {
  if (typeof location === "undefined" || !location.hash.includes("access_token")) return;
  const params = new URLSearchParams(location.hash.slice(1));
  const access_token = params.get("access_token");
  if (!access_token) return;
  const expires_in = Number(params.get("expires_in") || 3600);
  writeSession({
    access_token,
    refresh_token: params.get("refresh_token") || undefined,
    expires_at: Date.now() + expires_in * 1000,
  });
  history.replaceState(null, "", location.pathname + location.search);
}

class Query implements PromiseLike<Result<any>> {
  private method = "GET";
  private body: unknown;
  private selectCols = "*";
  private filters: string[] = [];
  private limitN: number | null = null;
  private single = false;
  private merge = false;

  constructor(
    private url: string,
    private key: string,
    private table: string,
    private token: () => Promise<string | null>
  ) {}

  select(cols = "*") {
    this.selectCols = cols;
    return this;
  }

  eq(column: string, value: string) {
    this.filters.push(`${column}=eq.${encodeURIComponent(value)}`);
    return this;
  }

  in(column: string, values: string[]) {
    this.filters.push(`${column}=in.(${values.map(encodeURIComponent).join(",")})`);
    return this;
  }

  limit(n: number) {
    this.limitN = n;
    return this;
  }

  maybeSingle() {
    this.single = true;
    return this;
  }

  insert(body: unknown) {
    this.method = "POST";
    this.body = body;
    return this;
  }

  upsert(body: unknown, _options?: { onConflict?: string }) {
    this.method = "POST";
    this.body = body;
    this.merge = true;
    return this;
  }

  delete() {
    this.method = "DELETE";
    return this;
  }

  then<TResult1 = Result<any>, TResult2 = never>(
    onfulfilled?: ((value: Result<any>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ) {
    return this.run().then(onfulfilled, onrejected);
  }

  private async run(): Promise<Result<any>> {
    const token = (await this.token()) || this.key;
    const params = new URLSearchParams();
    if (this.method === "GET") params.set("select", this.selectCols);
    for (const filter of this.filters) {
      const [k, ...rest] = filter.split("=");
      params.append(k, rest.join("="));
    }
    if (this.limitN) params.set("limit", String(this.limitN));
    const headers: Record<string, string> = {
      apikey: this.key,
      Authorization: `Bearer ${token}`,
    };
    if (this.method !== "GET" && this.method !== "DELETE") {
      headers["Content-Type"] = "application/json";
      headers.Prefer = this.merge ? "resolution=merge-duplicates,return=minimal" : "return=minimal";
    }
    const response = await fetch(`${this.url}/rest/v1/${this.table}?${params}`, {
      method: this.method,
      headers,
      body: this.body === undefined ? undefined : JSON.stringify(this.body),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({ message: response.statusText }));
      return { data: null, error: { message: payload.message || payload.msg || response.statusText } };
    }
    if (this.method !== "GET") return { data: null, error: null };
    const data = await response.json();
    if (this.single) {
      if (Array.isArray(data) && data.length === 1) return { data: data[0], error: null };
      if (Array.isArray(data) && data.length === 0) return { data: null, error: null };
      return { data: null, error: { message: "Expected one class." } };
    }
    return { data, error: null };
  }
}

export type SupabaseClient = {
  auth: {
    getUser: () => Promise<{ data: { user: { id: string; email?: string } | null } }>;
    signInWithOtp: (args: { email: string; options?: { emailRedirectTo?: string } }) => Promise<{ error: { message: string } | null }>;
    signOut: () => Promise<void>;
  };
  from: (table: string) => Query;
  rpc: (fn: string, args: Record<string, string>) => Promise<{ error: { message: string } | null }>;
};

export function getSupabase(): SupabaseClient | null {
  const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !key) return null;
  captureHashSession();

  async function token() {
    const session = readSession();
    if (!session) return null;
    if (session.expires_at && session.expires_at < Date.now() + 30_000 && session.refresh_token) {
      const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
        method: "POST",
        headers: { apikey: key!, "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
      });
      if (response.ok) {
        const next = await response.json();
        writeSession({
          access_token: next.access_token,
          refresh_token: next.refresh_token,
          expires_at: Date.now() + Number(next.expires_in || 3600) * 1000,
        });
        return next.access_token as string;
      }
      writeSession(null);
      return null;
    }
    return session.access_token;
  }

  return {
    auth: {
      async getUser() {
        const access = await token();
        if (!access) return { data: { user: null } };
        const response = await fetch(`${url}/auth/v1/user`, {
          headers: { apikey: key, Authorization: `Bearer ${access}` },
        });
        if (!response.ok) return { data: { user: null } };
        const user = await response.json();
        return { data: { user: { id: user.id, email: user.email } } };
      },
      async signInWithOtp({ email, options }) {
        const response = await fetch(`${url}/auth/v1/otp`, {
          method: "POST",
          headers: { apikey: key, "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            create_user: true,
            options: { email_redirect_to: options?.emailRedirectTo },
          }),
        });
        if (response.ok) return { error: null };
        const payload = await response.json().catch(() => ({ message: response.statusText }));
        return { error: { message: payload.message || payload.msg || "Could not send the link." } };
      },
      async signOut() {
        writeSession(null);
      },
    },
    from(table: string) {
      return new Query(url, key, table, token);
    },
    async rpc(fn, args) {
      const access = (await token()) || key;
      const response = await fetch(`${url}/rest/v1/rpc/${fn}`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      if (response.ok) return { error: null };
      const payload = await response.json().catch(() => ({ message: response.statusText }));
      return { error: { message: payload.message || payload.msg || "Request failed." } };
    },
  };
}

export function supabaseConfigured() {
  return Boolean(import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
}
