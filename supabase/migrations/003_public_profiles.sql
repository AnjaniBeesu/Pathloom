create table if not exists public.public_profiles (
  username text primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  goal_id text not null references public.goals(id),
  display_name text not null default '',
  deadline date,
  completed_node_ids text[] not null default '{}',
  is_public boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.public_profiles enable row level security;
create policy "users manage their public profile" on public.public_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "public profiles are readable when enabled" on public.public_profiles for select using (is_public = true);
