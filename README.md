# Bloom Terra — ホームページ

合同会社 Bloom Terra（代表 NAOMI ATSUTA / @naoon_20）のホームページ。

- `index.html` — 1ファイル完結。ビルド不要、ブラウザで開けばそのまま表示されます。

## 自分で編集する

claude.ai の Artifact として開くと、フッターの「このページを編集する」から編集モードに入れます。

- 文字は**クリックしてそのまま書き換え**
- 写真は「写真を選ぶ」から差し替え（自動で縮小して埋め込み）
- ロゴはヘッダーの「ロゴを選ぶ」から差し替え（透過を保つため PNG で保存）
- 活動・箇条書き・表の行は **＋追加 / 削除**
- リンク先（Instagram・Threads・ボタン）は編集モード中に出る入力欄で変更
- 「保存して公開」で確定。開いている全員の画面が新しい版に切り替わります
- 「やめる」で編集前に戻ります

`#edit` を付けた URL で開くと、最初から編集モードで開きます。

## Vercel で公開する

ビルドは不要です。リポジトリの直下にある `index.html` をそのまま配信します。

1. [vercel.com](https://vercel.com) に GitHub アカウントでログイン
2. **Add New → Project** → このリポジトリを **Import**
3. Framework Preset は **Other**、Build Command と Output Directory は空のまま
4. **Deploy**

以降はこのブランチに push するたび自動で再デプロイされます
（本番ブランチ = リポジトリの既定ブランチ `claude/affectionate-cori-np4724`）。

独自ドメインは Project → Settings → Domains から追加します。

### 公開サイトと編集の関係

編集は Artifact 版のページ（claude.ai）で行います。公開サイトに反映するには、
編集後の内容をこのリポジトリの `index.html` に反映して push します。

## 仕組み

ページの内容は `<script id="site-data">` の JSON に入っていて、`app-code` がそこから
HTML を組み立てます。保存すると同じ構造の完全な HTML を作り直して自分自身を公開し直します。
JavaScript が動かない環境でも初期表示用のマークアップは `#app` に書き出してあります。

## デザイン

配色と書体は会社のマーク（紺の夜空 × 金の実り）に合わせています。

- 配色: 紺 `#1C2B40` / 生成り `#F7F3EA` / 金銅 `#8E6220` / 金 `#C9A45C`
- 書体: Playfair Display Italic（ロゴタイプ）/ Zen Old Mincho（見出し）/
  Zen Kaku Gothic New（本文）/ Jost（欧文ラベル）
- ライト／ダークの両テーマ対応、スマートフォン幅対応

## まだ空欄の箇所

点線の下線がついている箇所は未確定です。編集モードから記入してください。

- 会社概要：設立／所在地／連絡先
- 事業内容の「活動風景の写真」
- 活動風景の写真
