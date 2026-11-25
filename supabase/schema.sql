-- Psych stats portal. Run this in the Supabase SQL editor after creating a project.
-- Auth uses email magic links. Enable them under Authentication > Providers > Email.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'student' check (role in ('student', 'instructor')),
  created_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  instructor_id uuid not null references public.profiles (id) on delete cascade,
  join_code text not null unique,
  title text not null default 'Psych stats',
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  module_slug text not null,
  created_at timestamptz not null default now(),
  unique (class_id, module_slug)
);

create table if not exists public.progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  module_slug text not null,
  status text not null check (status in ('started', 'checked')),
  xp integer not null default 0,
  badges text[] not null default '{}',
  last_code text,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.enrollments enable row level security;
alter table public.assignments enable row level security;
alter table public.progress enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_instructor_of(student uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.classes c
    join public.enrollments e on e.class_id = c.id
    where c.instructor_id = auth.uid()
      and e.student_id = student
  );
$$;

create or replace function public.join_class(code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  cid uuid;
begin
  if auth.uid() is null then
    raise exception 'Sign in first';
  end if;
  select id into cid from public.classes where join_code = upper(trim(code));
  if cid is null then
    raise exception 'No class uses that code';
  end if;
  insert into public.enrollments (class_id, student_id)
  values (cid, auth.uid())
  on conflict do nothing;
  return cid;
end;
$$;

grant execute on function public.join_class(text) to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.classes to authenticated;
grant select, insert, update, delete on public.enrollments to authenticated;
grant select, insert, update, delete on public.assignments to authenticated;
grant select, insert, update, delete on public.progress to authenticated;

create policy "read own profile" on public.profiles
  for select using (id = auth.uid() or public.is_instructor_of(id));

create policy "insert own profile" on public.profiles
  for insert with check (id = auth.uid());

create policy "update own profile" on public.profiles
  for update using (id = auth.uid());

create policy "instructor reads own classes" on public.classes
  for select using (
    instructor_id = auth.uid()
    or exists (
      select 1 from public.enrollments e
      where e.class_id = classes.id and e.student_id = auth.uid()
    )
  );

create policy "instructor creates a class" on public.classes
  for insert with check (instructor_id = auth.uid());

create policy "students read own enrollment" on public.enrollments
  for select using (
    student_id = auth.uid()
    or exists (
      select 1 from public.classes c
      where c.id = enrollments.class_id and c.instructor_id = auth.uid()
    )
  );

create policy "read assignments for my class" on public.assignments
  for select using (
    exists (
      select 1 from public.classes c
      where c.id = assignments.class_id
        and (
          c.instructor_id = auth.uid()
          or exists (
            select 1 from public.enrollments e
            where e.class_id = c.id and e.student_id = auth.uid()
          )
        )
    )
  );

create policy "instructor assigns modules" on public.assignments
  for insert with check (
    exists (
      select 1 from public.classes c
      where c.id = assignments.class_id and c.instructor_id = auth.uid()
    )
  );

create policy "instructor removes assignments" on public.assignments
  for delete using (
    exists (
      select 1 from public.classes c
      where c.id = assignments.class_id and c.instructor_id = auth.uid()
    )
  );

create policy "read own progress or my students" on public.progress
  for select using (user_id = auth.uid() or public.is_instructor_of(user_id));

create policy "write own progress" on public.progress
  for insert with check (user_id = auth.uid());

create policy "update own progress" on public.progress
  for update using (user_id = auth.uid());
