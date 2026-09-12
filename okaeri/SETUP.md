# 予約システムの準備

予約フォームと管理画面は **Supabase**（無料）にデータを保存します。
一度だけ次の準備が必要です。だいたい15分です。

## 1. Supabase でプロジェクトを作る

1. https://supabase.com を開いて **Start your project** → GitHub アカウントでログイン
2. **New project** を押す
   - Name: `okaeri`
   - Database Password: 好きな文字列（メモしておく。後で使わないが必要）
   - Region: **Northeast Asia (Tokyo)**
3. 作成に2分ほどかかります

## 2. 表を作る

左メニューの **SQL Editor** → **New query** に下をそのまま貼り付けて **Run**。

```sql
-- 開催日
create table events (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  start_time time,
  end_time time,
  note text,
  closed boolean not null default false,
  created_at timestamptz not null default now()
);

-- 予約
create table reservations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  phone text not null,
  arrive_time time,
  adults int not null default 1,
  kids int not null default 0,
  source text,
  note text,
  created_at timestamptz not null default now()
);

create index on reservations (event_id);

-- 誰が何をできるか
alter table events enable row level security;
alter table reservations enable row level security;

-- 開催日は誰でも見られる（予約フォームで日にちを選ぶため）
create policy "events readable by anyone"
  on events for select using (true);

-- 開催日を作れるのはログインした人だけ
create policy "events writable by admin"
  on events for all to authenticated
  using (true) with check (true);

-- 予約は誰でも入れられる
create policy "reservations insert by anyone"
  on reservations for insert with check (true);

-- 予約を読めるのはログインした人だけ（名前も電話番号も外からは見えない）
create policy "reservations readable by admin"
  on reservations for select to authenticated using (true);

create policy "reservations editable by admin"
  on reservations for delete to authenticated using (true);
```

## 3. 管理画面に入るユーザーを作る

左メニューの **Authentication** → **Users** → **Add user** → **Create new user**

- Email: 自分のメールアドレス
- Password: 好きなパスワード（管理画面のログインに使う）
- **Auto Confirm User** を **オン** にする

## 4. 2つの値をサイトに入れる

左メニューの **Project Settings** → **API** を開き、次の2つをコピーします。

- **Project URL**（`https://〇〇〇.supabase.co`）
- **anon public** キー（`eyJ...` で始まる長い文字列）

この2つを `okaeri/config.js` に書きます。

> **service_role** キーは絶対に使わないこと。anon public のほうです。
> anon キーはブラウザに公開される前提のもので、上の設定により
> 予約の書き込みだけができ、読み出しはできません。

## 使い方

| ページ | URL | 誰が使うか |
|---|---|---|
| 案内ページ | `/` | だれでも |
| 予約フォーム | `/yoyaku` | だれでも |
| 管理画面 | `/kanri` | 主宰のみ（ログインが必要） |

管理画面の **開催日** タブで日にちを登録すると、予約フォームの選択肢に出ます。
登録していない月は、フォームに「いまは予定が出ていません」と表示されます。

**予約一覧** タブでは、開催日ごとに、何時に誰が来るか、人数、電話番号、
どこで知ったかが見られます。CSV で保存して印刷もできます。
