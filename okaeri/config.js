// Supabase の接続先。管理画面の「設定」からコピーした2つの値を入れる。
// anon key はブラウザに公開される前提のキーなので、ここに書いて問題ない。
// service_role キーは絶対にここに書かないこと。
window.OKAERI_CONFIG = {
  url: "",      // 例: https://abcdefghijklm.supabase.co
  anonKey: ""   // 例: eyJhbGciOi... で始まる長い文字列
};
