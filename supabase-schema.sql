-- =============================================
-- bioKids MVP - Supabase Schema
-- Natural GH Optimization for Kids
-- =============================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- =============================================
-- USERS & CHILDREN
-- =============================================

-- Children profiles (linked to Supabase auth)
create table children (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  birth_date date not null,
  gender text check (gender in ('male', 'female', 'other')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for children
alter table children enable row level security;

create policy "Users can view own children" on children
  for select using (auth.uid() = user_id);

create policy "Users can insert own children" on children
  for insert with check (auth.uid() = user_id);

create policy "Users can update own children" on children
  for update using (auth.uid() = user_id);

create policy "Users can delete own children" on children
  for delete using (auth.uid() = user_id);

-- =============================================
-- MEASUREMENTS & TRACKING
-- =============================================

-- Height/weight measurements
create table measurements (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references children(id) on delete cascade not null,
  measured_at date not null,
  height_cm numeric(5,2),
  weight_kg numeric(5,2),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table measurements enable row level security;

create policy "Users can manage own children's measurements" on measurements
  for all using (
    child_id in (select id from children where user_id = auth.uid())
  );

-- =============================================
-- PROTOCOL TRACKING
-- =============================================

-- Daily protocol logs (High-Leverage Decisions)
create table daily_logs (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references children(id) on delete cascade not null,
  log_date date not null,
  early_bedtime boolean default false,
  power_breakfast boolean default false,
  active_play boolean default false,
  screen_free_evening boolean default false,
  milk_protocol boolean default false,
  morning_sunlight boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(child_id, log_date)
);

alter table daily_logs enable row level security;

create policy "Users can manage own children's daily logs" on daily_logs
  for all using (
    child_id in (select id from children where user_id = auth.uid())
  );

-- Weekly protocol tracking (Power Foods + Lifestyle Optimizers)
create table weekly_tracking (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references children(id) on delete cascade not null,
  week_start date not null, -- Monday of the week
  
  -- Power Foods (count per week)
  raw_milk_count int default 0,
  cod_liver_oil_count int default 0,
  eggs_count int default 0,
  beef_liver_count int default 0,
  salmon_count int default 0,
  bone_broth_count int default 0,
  fermented_foods_count int default 0,
  gelatin_count int default 0,
  
  -- Lifestyle Optimizers (count per week)
  sleep_10_plus_count int default 0,
  sprint_intervals_count int default 0,
  hanging_stretching_count int default 0,
  active_play_count int default 0,
  bedtime_milk_count int default 0,
  morning_sunlight_count int default 0,
  no_late_food_count int default 0,
  screen_free_count int default 0,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(child_id, week_start)
);

alter table weekly_tracking enable row level security;

create policy "Users can manage own children's weekly tracking" on weekly_tracking
  for all using (
    child_id in (select id from children where user_id = auth.uid())
  );

-- =============================================
-- KNOWLEDGE BASE (for Jarvis)
-- =============================================

-- Knowledge chunks for RAG
create table knowledge_chunks (
  id uuid default uuid_generate_v4() primary key,
  category text not null, -- 'sleep', 'height', 'circadian', 'nutrition', 'exercise'
  title text not null,
  content text not null,
  citation text, -- e.g., "[Van Cauter E. Sleep. 2000]"
  tags text[], -- for filtering
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Articles / Learn section
create table articles (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  summary text,
  content text not null,
  category text not null, -- 'sleep', 'height', 'circadian', 'nutrition', 'exercise'
  stage text[], -- applicable stages: 'prenatal', 'infant', 'toddler', 'early-childhood', 'pre-puberty', 'puberty', 'late-adolescence'
  citations text[],
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================
-- GROWTH WINDOWS DATA
-- =============================================

-- Growth window status per child
create table growth_windows (
  id uuid default uuid_generate_v4() primary key,
  child_id uuid references children(id) on delete cascade not null,
  
  -- Sleep Window
  sleep_avg_hours numeric(3,1),
  sleep_avg_bedtime time,
  sleep_nights_on_protocol int default 0,
  sleep_status text default 'unknown', -- 'optimal', 'good', 'check'
  
  -- Height Opportunity
  height_percentile int,
  height_previous_percentile int,
  
  -- Circadian Alignment
  circadian_days_aligned int default 0,
  circadian_avg_wake_time time,
  circadian_morning_sunlight_days int default 0,
  circadian_status text default 'unknown',
  
  week_of date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(child_id, week_of)
);

alter table growth_windows enable row level security;

create policy "Users can manage own children's growth windows" on growth_windows
  for all using (
    child_id in (select id from children where user_id = auth.uid())
  );

-- =============================================
-- CHAT HISTORY (for Jarvis)
-- =============================================

create table chat_messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  child_id uuid references children(id) on delete set null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table chat_messages enable row level security;

create policy "Users can view own chat messages" on chat_messages
  for select using (auth.uid() = user_id);

create policy "Users can insert own chat messages" on chat_messages
  for insert with check (auth.uid() = user_id);

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Calculate age from birth date
create or replace function calculate_age(birth_date date)
returns interval as $$
begin
  return age(current_date, birth_date);
end;
$$ language plpgsql;

-- Get current stage based on age
create or replace function get_growth_stage(birth_date date)
returns text as $$
declare
  age_years numeric;
begin
  age_years := extract(year from age(current_date, birth_date)) + 
               extract(month from age(current_date, birth_date)) / 12.0;
  
  if birth_date > current_date then
    return 'prenatal';
  elsif age_years < 2 then
    return 'infant';
  elsif age_years < 5 then
    return 'toddler';
  elsif age_years < 8 then
    return 'early-childhood';
  elsif age_years < 12 then
    return 'pre-puberty';
  elsif age_years < 16 then
    return 'puberty';
  elsif age_years < 25 then
    return 'late-adolescence';
  else
    return 'adult';
  end if;
end;
$$ language plpgsql;

-- =============================================
-- INDEXES
-- =============================================

create index idx_children_user_id on children(user_id);
create index idx_measurements_child_id on measurements(child_id);
create index idx_daily_logs_child_date on daily_logs(child_id, log_date);
create index idx_weekly_tracking_child_week on weekly_tracking(child_id, week_start);
create index idx_knowledge_chunks_category on knowledge_chunks(category);
create index idx_articles_slug on articles(slug);
create index idx_articles_category on articles(category);
create index idx_chat_messages_user_id on chat_messages(user_id);

-- =============================================
-- SESSION MANAGEMENT (Anti-Account-Sharing)
-- =============================================

-- User sessions table for single-session enforcement
create table user_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  session_token text unique not null,
  device_fingerprint text,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_active_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_active boolean default true
);

alter table user_sessions enable row level security;

create policy "Users can view own sessions" on user_sessions
  for select using (auth.uid() = user_id);

create index idx_user_sessions_user_id on user_sessions(user_id);
create index idx_user_sessions_token on user_sessions(session_token);

-- =============================================
-- USER PROFILES
-- =============================================

-- Extended user profile with session tracking
create table user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  active_session_token text,
  last_device_fingerprint text,
  last_login_ip inet,
  last_login_at timestamp with time zone,
  email_frequency text default 'weekly' check (email_frequency in ('daily', '2x_week', 'weekly', 'none')),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'trial' check (subscription_status in ('trial', 'active', 'cancelled', 'past_due')),
  onboarding_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table user_profiles enable row level security;

create policy "Users can view own profile" on user_profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on user_profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on user_profiles
  for insert with check (auth.uid() = id);

-- =============================================
-- SESSION MANAGEMENT FUNCTIONS
-- =============================================

-- Function to invalidate other sessions on new login
create or replace function invalidate_other_sessions(p_user_id uuid, p_new_token text)
returns void as $$
begin
  -- Deactivate all other sessions for this user
  update user_sessions
  set is_active = false
  where user_id = p_user_id
    and session_token != p_new_token
    and is_active = true;

  -- Update user profile with new active session
  update user_profiles
  set active_session_token = p_new_token,
      last_login_at = now(),
      updated_at = now()
  where id = p_user_id;
end;
$$ language plpgsql security definer;
