import * as vscode from 'vscode';

/**
 * Enhanced monitoring for GitHub Copilot and AI-related events
 */
export class CopilotIntegration {
    private voiceManager: any;
    private disposables: vscode.Disposable[] = [];

    constructor(voiceManager: any) {
        this.voiceManager = voiceManager;
        this.setupCopilotMonitoring();
    }

    private setupCopilotMonitoring(): void {
        // Monitor inline completion providers (Copilot suggestions)
        this.monitorInlineCompletions();
        // Monitor language model usage (Chat and other AI features)
        this.monitorLanguageModelUsage();
    }

    private monitorInlineCompletions(): void {
        // Listen for text document changes that might indicate Copilot acceptance
        this.disposables.push(
            vscode.workspace.onDidChangeTextDocument(async (event) => {
                // Check if the change looks like a Copilot suggestion acceptance
                if (this.looksLikeCopilotAcceptance(event)) {
                    await this.voiceManager.speak('copilot.accept');
                }
            })
        );
    }

    private monitorLanguageModelUsage(): void {
        // Monitor workspace folder changes
        this.disposables.push(
            vscode.workspace.onDidChangeWorkspaceFolders(() => {
                // This might indicate project changes
                this.voiceManager.speak('workspace.open');
            })
        );
    }


    private looksLikeCopilotAcceptance(event: vscode.TextDocumentChangeEvent): boolean {
        // Heuristics to detect Copilot suggestion acceptance
        for (const change of event.contentChanges) {
            // Large insertions might be Copilot suggestions
            if (change.text.length > 20 && change.text.includes('\\n')) {
                return true;
            }
            // Function/method completions
            if (change.text.includes('function') || change.text.includes('=>') || change.text.includes('def ')) {
                return true;
            }
        }
        return false;
    }

    private mightHaveCopilotSuggestion(editor: vscode.TextEditor): boolean {
        // Check if the current context might have triggered Copilot
        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line);
        
        // Common patterns that trigger Copilot
        const triggerPatterns = [
            /^\\s*\/\//, // Comments
            /^\\s*function/, // Function declarations
            /^\\s*const/, // Variable declarations
            /^\\s*class/, // Class declarations
            /^\\s*if/, // Conditional statements
            /^\\s*for/, // Loops
            /^\\s*import/, // Imports
        ];

        return triggerPatterns.some(pattern => pattern.test(line.text));
    }

    public dispose(): void {
        this.disposables.forEach(d => d.dispose());
    }
}