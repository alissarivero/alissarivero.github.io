import { getSupabase } from "./supabase";

const KEY = "psychstats-progress-v1";

export type ProgressRow = {
  slug: string;
  status: "started" | "checked";
  xp: number;
  badges: string[];
  lastCode?: string;
};

function readLocal(): ProgressRow[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(rows: ProgressRow[]) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}

export async function loadProgress(): Promise<ProgressRow[]> {
  const local = readLocal();
  const sb = getSupabase();
  if (!sb) return local;
  const { data: userData } = await sb.auth.getUser();
  if (!userData.user) return local;
  const { data, error } = await sb.from("progress").select("module_slug,status,xp,badges,last_code");
  if (error || !data) return local;
  return data.map((row) => ({
    slug: row.module_slug as string,
    status: row.status as ProgressRow["status"],
    xp: Number(row.xp) || 0,
    badges: Array.isArray(row.badges) ? (row.badges as string[]) : [],
    lastCode: (row.last_code as string | null) ?? undefined,
  }));
}

export async function saveProgress(row: ProgressRow, replace = false) {
  const next = readLocal().filter((r) => r.slug !== row.slug);
  const previous = readLocal().find((r) => r.slug === row.slug);
  const merged: ProgressRow = replace
    ? { ...previous, ...row, badges: row.badges.length ? row.badges : previous?.badges ?? [] }
    : {
        ...row,
        badges: Array.from(new Set([...(previous?.badges ?? []), ...row.badges])),
        xp: Math.max(previous?.status === "checked" ? previous.xp : 0, row.xp),
        status: previous?.status === "checked" || row.status === "checked" ? "checked" : "started",
      };
  if (merged.status === "checked" && previous?.status === "checked") {
    merged.xp = Math.max(previous.xp, row.xp);
  }
  next.push(merged);
  writeLocal(next);

  const sb = getSupabase();
  if (!sb) return { remote: false as const };
  const { data: userData } = await sb.auth.getUser();
  if (!userData.user) return { remote: false as const };
  const { error } = await sb.from("progress").upsert(
    {
      user_id: userData.user.id,
      module_slug: merged.slug,
      status: merged.status,
      xp: merged.xp,
      badges: merged.badges,
      last_code: merged.lastCode ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_slug" }
  );
  return { remote: !error, error: error?.message };
}
