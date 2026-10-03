create extension if not exists "uuid-ossp";

create table if not exists public.goals (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  goal_id text references public.goals(id),
  deadline date,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nodes (
  id text primary key,
  goal_id text not null references public.goals(id) on delete cascade,
  parent_ids text[] not null default '{}',
  title text not null,
  description text not null default '',
  rule_json jsonb not null default '{}'::jsonb,
  weight integer not null default 1,
  resources_json jsonb not null default '[]'::jsonb
);

create table if not exists public.user_nodes (
  user_id uuid not null references auth.users(id) on delete cascade,
  node_id text not null references public.nodes(id) on delete cascade,
  status text not null default 'locked' check (status in ('locked', 'available', 'complete')),
  source text not null default 'manual',
  proof_url text,
  completed_at timestamptz,
  primary key (user_id, node_id)
);

create table if not exists public.connected_accounts (
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  handle text not null default '',
  last_synced_at timestamptz,
  primary key (user_id, provider)
);

create table if not exists public.activity_snapshots (
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  stats_json jsonb not null default '{}'::jsonb,
  primary key (user_id, date)
);

create table if not exists public.weekly_plans (
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  plan_json jsonb not null default '{}'::jsonb,
  primary key (user_id, week_start)
);

alter table public.goals enable row level security;
alter table public.profiles enable row level security;
alter table public.nodes enable row level security;
alter table public.user_nodes enable row level security;
alter table public.connected_accounts enable row level security;
alter table public.activity_snapshots enable row level security;
alter table public.weekly_plans enable row level security;

create policy "goals are readable" on public.goals for select using (true);
create policy "nodes are readable" on public.nodes for select using (true);
create policy "users manage their profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "users manage their nodes" on public.user_nodes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage connected accounts" on public.connected_accounts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage snapshots" on public.activity_snapshots for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage weekly plans" on public.weekly_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into public.goals (id, slug, title, description) values
  ('swe-intern', 'software-engineer-intern', 'Software engineer intern', 'Build the foundations, proof, and interview rhythm for a strong SWE internship application.'),
  ('apm-intern', 'apm', 'APM / PM intern', 'Practice product thinking, analytics, communication, and shipped decision-making.')
on conflict (id) do nothing;
