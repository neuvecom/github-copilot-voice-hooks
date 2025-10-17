import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { CopilotIntegration } from './copilotIntegration';

const execAsync = promisify(exec);

// Japanese event descriptions
const JAPANESE_EVENT_DESCRIPTIONS: { [key: string]: string } = {
    // System events
    'file.save': 'ファイルを保存しました',
    'file.create': 'ファイルを作成しました',
    'file.delete': 'ファイルを削除しました',
    'copilot.suggestion': 'Copilotが提案を生成しました',
    'copilot.accept': 'Copilotの提案を受け入れました',
    'copilot.reject': 'Copilotの提案を拒否しました',
    'extension.enable': 'Voice Hooksが有効になりました',
    'extension.disable': 'Voice Hooksが無効になりました',
    'test.voice': 'テスト音声です',
    'workspace.open': 'ワークスペースを開きました',
    'editor.change': 'エディターでテキストが変更されました',
    'terminal.execute': 'ターミナルでコマンドを実行しています',
    'search.start': 'ファイル検索を開始しました',
    'debug.start': 'デバッグを開始しました',
    'debug.stop': 'デバッグを停止しました',
    'git.commit': 'Gitコミットを作成しました',
    'git.push': '変更をプッシュしました',
    'git.pull': '変更をプルしました'
};

interface VoiceConfig {
    enabled: boolean;
    voiceName: string;
    volume: number;
    rate: number;
}

class VoiceManager {
    private config: VoiceConfig;
    private isPlaying: boolean = false;
    private lastEventTime: Map<string, number> = new Map();
    private readonly DEBOUNCE_TIME = 1000; // 1秒のデバウンス
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.config = this.loadConfig();
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.statusBarItem.command = 'github-copilot-voice-hooks.toggleVoiceHooks';
        this.updateStatusBar();
        this.statusBarItem.show();
    }

    private loadConfig(): VoiceConfig {
        const config = vscode.workspace.getConfiguration('copilotVoiceHooks');
        return {
            enabled: config.get('enabled', true),
            voiceName: config.get('voiceName', 'Kyoko'),
            volume: config.get('volume', 1.0),
            rate: config.get('rate', 200)
        };
    }

    public updateConfig(): void {
        this.config = this.loadConfig();
        this.updateStatusBar();
    }

    private updateStatusBar(): void {
        if (this.config.enabled) {
            this.statusBarItem.text = '$(unmute) Voice';
            this.statusBarItem.tooltip = 'Voice Hooks有効 - クリックで無効化';
            this.statusBarItem.backgroundColor = undefined;
        } else {
            this.statusBarItem.text = '$(mute) Voice';
            this.statusBarItem.tooltip = 'Voice Hooks無効 - クリックで有効化';
            this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        }
    }

    public toggleEnabled(): void {
        const newState = !this.config.enabled;
        vscode.workspace.getConfiguration('copilotVoiceHooks').update('enabled', newState, true);
        this.config.enabled = newState;
        this.updateStatusBar();
        
        if (newState) {
            vscode.window.showInformationMessage('Voice Hooks有効');
            this.speak('extension.enable');
        } else {
            vscode.window.showInformationMessage('Voice Hooks無効');
        }
    }

    public isEnabled(): boolean {
        return this.config.enabled;
    }

    public async speak(eventKey: string): Promise<void> {
        if (!this.config.enabled || this.isPlaying) {
            return;
        }

        // デバウンス: 同じイベントが短時間に複数回発生することを防ぐ
        const now = Date.now();
        const lastTime = this.lastEventTime.get(eventKey) || 0;
        if (now - lastTime < this.DEBOUNCE_TIME) {
            return;
        }
        this.lastEventTime.set(eventKey, now);

        const text = JAPANESE_EVENT_DESCRIPTIONS[eventKey] || eventKey;
        await this.speakText(text);
    }

    private async speakText(text: string): Promise<void> {
        if (this.isPlaying) {
            return;
        }

        this.isPlaying = true;
        try {
            // macOS: Use `say` command with Japanese voice
            if (process.platform === 'darwin') {
                const command = `say -v "${this.config.voiceName}" -r ${this.config.rate} "${text}"`;
                await execAsync(command);
            } else if (process.platform === 'linux') {
                // Linux: Use espeak if available
                const command = `espeak -v ja -s ${this.config.rate} "${text}"`;
                await execAsync(command);
            } else if (process.platform === 'win32') {
                // Windows: Use PowerShell for speech synthesis
                const command = `powershell -command "Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${text}')"`;
                await execAsync(command);
            }
        } catch (error) {
            console.error('Voice synthesis failed:', error);
        } finally {
            this.isPlaying = false;
        }
    }

    public async testVoice(): Promise<void> {
        // テスト音声はデバウンスを無視する
        if (this.isPlaying) {
            return;
        }
        const text = JAPANESE_EVENT_DESCRIPTIONS['test.voice'];
        await this.speakText(text);
    }

    public dispose(): void {
        this.statusBarItem.dispose();
    }
}

class CopilotEventMonitor {
    private voiceManager: VoiceManager;
    private disposables: vscode.Disposable[] = [];

    constructor(voiceManager: VoiceManager) {
        this.voiceManager = voiceManager;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // File system events
        this.disposables.push(
            vscode.workspace.onDidSaveTextDocument(() => {
                this.voiceManager.speak('file.save');
            })
        );

        this.disposables.push(
            vscode.workspace.onDidCreateFiles(() => {
                this.voiceManager.speak('file.create');
            })
        );

        this.disposables.push(
            vscode.workspace.onDidDeleteFiles(() => {
                this.voiceManager.speak('file.delete');
            })
        );

        // Editor events
        this.disposables.push(
            vscode.workspace.onDidChangeTextDocument((event) => {
                // Only announce significant changes (not just cursor movement)
                if (event.contentChanges.length > 0 && event.contentChanges[0].text.length > 5) {
                    this.voiceManager.speak('editor.change');
                }
            })
        );

        // Terminal events
        this.disposables.push(
            vscode.window.onDidOpenTerminal(() => {
                this.voiceManager.speak('terminal.execute');
            })
        );

        // Debug events
        this.disposables.push(
            vscode.debug.onDidStartDebugSession(() => {
                this.voiceManager.speak('debug.start');
            })
        );

        this.disposables.push(
            vscode.debug.onDidTerminateDebugSession(() => {
                this.voiceManager.speak('debug.stop');
            })
        );

        // Configuration changes
        this.disposables.push(
            vscode.workspace.onDidChangeConfiguration((event) => {
                if (event.affectsConfiguration('copilotVoiceHooks')) {
                    this.voiceManager.updateConfig();
                }
            })
        );
    }

    public dispose(): void {
        this.disposables.forEach(d => d.dispose());
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('GitHub Copilot Voice Hooks extension is now active!');

    const voiceManager = new VoiceManager();
    const eventMonitor = new CopilotEventMonitor(voiceManager);
    const copilotIntegration = new CopilotIntegration(voiceManager);

    // Announce activation with delay to prevent multiple announcements
    setTimeout(() => {
        voiceManager.speak('extension.enable');
    }, 1000);

    // Register commands
    const toggleCommand = vscode.commands.registerCommand('github-copilot-voice-hooks.toggleVoiceHooks', () => {
        voiceManager.toggleEnabled();
    });

    const enableCommand = vscode.commands.registerCommand('github-copilot-voice-hooks.enableVoiceHooks', () => {
        vscode.workspace.getConfiguration('copilotVoiceHooks').update('enabled', true, true);
        vscode.window.showInformationMessage('Voice Hooks enabled');
        voiceManager.speak('extension.enable');
    });

    const disableCommand = vscode.commands.registerCommand('github-copilot-voice-hooks.disableVoiceHooks', () => {
        vscode.workspace.getConfiguration('copilotVoiceHooks').update('enabled', false, true);
        vscode.window.showInformationMessage('Voice Hooks disabled');
    });

    const testVoiceCommand = vscode.commands.registerCommand('github-copilot-voice-hooks.testVoice', async () => {
        await voiceManager.testVoice();
        vscode.window.showInformationMessage('Voice test completed');
    });

    context.subscriptions.push(toggleCommand, enableCommand, disableCommand, testVoiceCommand, eventMonitor, copilotIntegration, voiceManager);
}

export function deactivate() {
    console.log('GitHub Copilot Voice Hooks extension is now deactivated!');
}
