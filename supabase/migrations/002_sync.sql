create table if not exists public.sync_targets (
  task_uid text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  goal_id text not null references public.goals(id),
  accounts_json jsonb not null default '{}'::jsonb,
  progress_json jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sync_runs (
  id uuid primary key default uuid_generate_v4(),
  task_uid text not null references public.sync_targets(task_uid) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('success', 'partial', 'error')),
  started_at timestamptz not null,
  finished_at timestamptz not null,
  snapshots_json jsonb not null default '[]'::jsonb,
  evidence_json jsonb not null default '[]'::jsonb,
  warnings_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.sync_targets enable row level security;
alter table public.sync_runs enable row level security;
create policy "users manage sync targets" on public.sync_targets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users read sync runs" on public.sync_runs for select using (auth.uid() = user_id);
