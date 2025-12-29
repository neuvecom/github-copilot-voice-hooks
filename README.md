# GitHub Copilot Voice Hooks

**日本語音声でGitHub Copilotのイベントを通知するVS Code拡張機能**

## 概要

この拡張機能は、GitHub Copilotやその他のVS Codeイベントに対して日本語音声による通知を提供します。Claude voice hooksプロジェクトにインスパイアされ、VS Code環境専用に開発されました。

## 機能

- 📝 **ファイル操作の音声通知**: ファイルの保存、作成、削除時に日本語で通知
- 🤖 **Copilot統合**: GitHub Copilotの提案やアクションを音声で通知
- 🔧 **Git操作**: コミット、プッシュ、プルなどのGit操作を音声で確認
- 🎌 **日本語音声**: macOSの高品質な日本語音声合成を使用
- ⚙️ **設定可能**: 音声、音量、読み上げ速度をカスタマイズ可能

## インストール

### VSIXファイルから直接インストール（推奨）

1. [GitHub Releases](https://github.com/neuvecom/github-copilot-voice-hooks/releases/latest)から最新のvsixファイルをダウンロード
2. VS Codeを開く
3. コマンドパレット（`Cmd+Shift+P` / `Ctrl+Shift+P`）を開く
4. `Extensions: Install from VSIX...`を選択
5. ダウンロードしたvsixファイルを選択
6. インストール完了後、`Test Japanese Voice`コマンドでテスト

### 開発版

1. このリポジトリをクローン
```bash
git clone https://github.com/neuvecom/github-copilot-voice-hooks.git
cd github-copilot-voice-hooks
```

2. 依存関係をインストール
```bash
npm install
```

3. 拡張機能をビルド
```bash
npm run compile
```

4. VS Codeで開発モードで実行
- `F5`キーを押すか、コマンドパレットから `Debug: Start Debugging` を実行

## 使用方法

### 基本的な使用

拡張機能をインストールして有効にすると、以下のイベントで自動的に日本語音声が再生されます：

- ファイルの保存: 「ファイルを保存しました」
- Copilotの提案: 「Copilotが提案を生成しました」
- Gitコミット: 「Gitコミットを作成しました」
- デバッグ開始: 「デバッグを開始しました」

### ステータスバーでの操作

ウィンドウ右下のステータスバーにアイコンが表示されます：
- `🔊 Voice`: 音声通知が有効（クリックで無効化）
- `🔇 Voice`: 音声通知が無効（クリックで有効化）

アイコンをクリックするだけで音声のオン/オフを切り替えられます。

### コマンド

コマンドパレット（`Cmd+Shift+P` / `Ctrl+Shift+P`）から以下のコマンドを実行できます：

- `Toggle Voice Hooks`: 音声通知のオン/オフを切り替え
- `Enable Voice Hooks`: 音声通知を有効にする
- `Disable Voice Hooks`: 音声通知を無効にする
- `Test Japanese Voice`: 音声テストを実行

### 設定

VS Codeの設定（`settings.json`）で以下の項目をカスタマイズできます：

```json
{
  "copilotVoiceHooks.enabled": true,
  "copilotVoiceHooks.voiceName": "Kyoko",
  "copilotVoiceHooks.volume": 1.0,
  "copilotVoiceHooks.rate": 200
}
```

#### 利用可能な音声

macOSでは以下の日本語音声が利用できます：
- `Kyoko` (デフォルト)
- `Sandy`
- `Eddy`
- `Flo`
- `Grandma`
- `Grandpa`
- `Reed`
- `Rocko`
- `Shelley`

## 対応プラットフォーム

- **macOS**: `say`コマンドを使用（推奨）
- **Linux**: `espeak`を使用
- **Windows**: PowerShellの音声合成を使用

## 技術仕様

- **言語**: TypeScript
- **フレームワーク**: VS Code Extension API
- **音声合成**: プラットフォーム固有のTTSシステム
- **ビルドツール**: Webpack

## イベント監視

以下のイベントを監視して音声通知を提供します：

### ファイルシステム
- `onDidSaveTextDocument`: ファイル保存
- `onDidCreateFiles`: ファイル作成
- `onDidDeleteFiles`: ファイル削除

### エディター
- `onDidChangeTextDocument`: テキスト変更
- `onDidChangeActiveTextEditor`: アクティブエディター変更

### デバッグ
- `onDidStartDebugSession`: デバッグ開始
- `onDidTerminateDebugSession`: デバッグ終了

### Git操作
- Git関連コマンドの監視

## トラブルシューティング

### 音声が聞こえない場合

1. **音量を確認**: システムの音量設定を確認
2. **音声テスト**: コマンドパレットから「Test Japanese Voice」を実行
3. **音声設定**: `copilotVoiceHooks.voiceName`の設定を確認

### macOSでの音声確認

ターミナルで以下のコマンドで音声をテスト：
```bash
say -v Kyoko "テストです"
```

利用可能な日本語音声を確認：
```bash
say -v "?" | grep ja_JP
```

## 開発

### ビルド

```bash
npm run compile    # 一回だけビルド
npm run watch      # ファイル変更を監視してビルド
```

### テスト

```bash
npm run test       # テスト実行
npm run lint       # ESLintでコードチェック
```

### パッケージング

```bash
npm run package    # プロダクション用にパッケージ
```

## 公式サイト

https://neuvecom.github.io/github-copilot-voice-hooks/

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 参考

このプロジェクトは [TechNavii/claude_hook_voice](https://github.com/TechNavii/claude_hook_voice) からインスパイアされました。
