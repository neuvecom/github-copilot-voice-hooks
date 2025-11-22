# GitHub Pages 設定手順

このドキュメントでは、GitHub Copilot Voice Hooksの公式ページをGitHub Pagesで公開するための手順を説明します。

## 📋 前提条件

- GitHubアカウントを持っていること
- リポジトリへの書き込み権限があること
- `docs/`フォルダが作成済みであること

## 🚀 GitHub Pages有効化手順

### 1. GitHubリポジトリにアクセス

ブラウザで以下のURLにアクセスします：
```
https://github.com/neuvecom/github-copilot-voice-hooks
```

### 2. Settings（設定）を開く

リポジトリページの上部メニューから「Settings」タブをクリックします。

### 3. Pages設定にアクセス

左側のサイドバーから「Pages」をクリックします。

### 4. ソース設定

**Build and deployment**セクションで以下を設定：

- **Source**: `Deploy from a branch`を選択
- **Branch**:
  - ブランチ: `main`を選択
  - フォルダ: `/docs`を選択
- **Save**ボタンをクリック

### 5. 公開完了を確認

設定後、数分待つとページが公開されます。以下のURLでアクセス可能になります：

```
https://neuvecom.github.io/github-copilot-voice-hooks/
```

ページ上部に緑色のボックスで「Your site is live at...」というメッセージが表示されれば成功です。

## 📂 ディレクトリ構造

公開されるファイル構成：

```
docs/
├── index.html              # メインページ
├── css/
│   └── style.css          # スタイルシート
├── js/
│   └── main.js            # インタラクティブ機能
├── assets/
│   └── images/            # 画像ファイル（将来用）
└── GITHUB_PAGES_SETUP.md  # このドキュメント
```

## 🔧 カスタムドメイン設定（オプション）

独自ドメインを使用する場合：

### 1. ドメインのDNS設定

DNSプロバイダーで以下のレコードを追加：

```
A Record:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

または

CNAME Record:
neuvecom.github.io
```

### 2. GitHub Pages設定

Settings > Pages > Custom domain に独自ドメインを入力してSaveをクリック。

### 3. HTTPS強制

「Enforce HTTPS」にチェックを入れて安全な接続を有効化します。

## 🔄 更新手順

公式ページを更新する場合：

### 1. ローカルで変更

```bash
# ファイルを編集
vim docs/index.html
vim docs/css/style.css
vim docs/js/main.js
```

### 2. 変更をコミット

```bash
git add docs/
git commit -m "[docs] 公式ページを更新"
git push origin main
```

### 3. 自動デプロイ

GitHubが自動的に変更を検出し、数分以内にページが更新されます。

## ✅ 動作確認

以下の項目を確認してページが正常に機能していることを確認します：

- [ ] ページが正しく表示される
- [ ] ナビゲーションリンクが動作する
- [ ] スタイルが適用されている
- [ ] JavaScriptの機能が動作する（スムーススクロール、コピーボタンなど）
- [ ] レスポンシブデザインが機能する（モバイル表示）
- [ ] 外部リンクが正しく開く

## 🐛 トラブルシューティング

### ページが404エラーになる

**原因**: GitHub Pagesの設定が正しくない、またはデプロイ中

**解決策**:
1. Settings > Pages で設定を確認
2. ブランチが`main`、フォルダが`/docs`になっているか確認
3. 数分待ってから再度アクセス

### スタイルが適用されない

**原因**: CSSファイルのパスが間違っている

**解決策**:
1. `index.html`のリンクタグを確認
2. `css/style.css`が正しい場所にあるか確認
3. ブラウザのキャッシュをクリア

### JavaScriptが動作しない

**原因**: JSファイルのパスが間違っている、またはブラウザエラー

**解決策**:
1. `index.html`のスクリプトタグを確認
2. ブラウザの開発者ツールでコンソールエラーを確認
3. `js/main.js`が正しい場所にあるか確認

## 📊 アクセス解析（オプション）

Google Analyticsを追加する場合：

### 1. トラッキングコード取得

Google Analyticsでプロパティを作成し、トラッキングIDを取得します。

### 2. index.htmlに追加

`<head>`タグ内に以下を追加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔐 セキュリティ設定

### HTTPS強制

Settings > Pages > "Enforce HTTPS"を有効化します。

### セキュリティヘッダー

`.github/workflows/`にGitHub Actionsを追加してセキュリティヘッダーを設定することもできます（高度な設定）。

## 📝 メンテナンス

### 定期的な更新

- 拡張機能の新機能追加時にドキュメントを更新
- リンク切れを定期的にチェック
- スクリーンショットを最新版に更新

### バックアップ

`docs/`フォルダの内容は自動的にGitリポジトリに保存されるため、別途バックアップは不要です。

## 🎉 完了

以上でGitHub Pagesの設定は完了です。公式ページが以下のURLで公開されます：

**URL**: https://neuvecom.github.io/github-copilot-voice-hooks/

問題が発生した場合は、GitHubのIssueで報告してください。
