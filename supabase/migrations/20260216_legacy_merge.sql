-- Create Documents Table
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  category text not null,
  file_url text not null,
  uploader_id uuid references auth.users(id)
);

-- Storage Bucket (If not exists via UI)
insert into storage.buckets (id, name, public) 
values ('governance_docs', 'governance_docs', true)
on conflict (id) do nothing;

-- Policies (Simplified for Dev)
create policy "Public Access" on storage.objects for select using ( bucket_id = 'governance_docs' );
create policy "Auth Upload" on storage.objects for insert with check ( bucket_id = 'governance_docs' );
create policy "Public Read Docs" on documents for select using (true);
create policy "Auth Insert Docs" on documents for insert with check (auth.uid() = uploader_id);
