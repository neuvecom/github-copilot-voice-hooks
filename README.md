# github-copilot-voice-hooks README

This is the README for your extension "github-copilot-voice-hooks". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

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

### 開発版

1. このリポジトリをクローン
```bash
git clone https://github.com/your-username/github-copilot-voice-hooks.git
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

### コマンド

コマンドパレット（`Cmd+Shift+P` / `Ctrl+Shift+P`）から以下のコマンドを実行できます：

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

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 参考

このプロジェクトは [TechNavii/claude_hook_voice](https://github.com/TechNavii/claude_hook_voice) からインスパイアされました。

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
