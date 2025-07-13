import * as vscode from "vscode";

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  private readonly pathSeparatorRegex = /[\/\\]/g;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10
    );
    this.statusBarItem.tooltip = "Active File Name";
    this.statusBarItem.command = "activefilename.showFileOptions";
  }

  public initialize(): void {
    this.updateStatusBar();
  }

  public getStatusBarText(): string {
    return this.statusBarItem.text;
  }

  private updateStatusBar(editor?: vscode.TextEditor): void {
    const activeEditor = editor || vscode.window.activeTextEditor;
    
    if (activeEditor) {
      const fileName = this.extractFileName(activeEditor.document.fileName);
      const isDirty = activeEditor.document.isDirty ? " *" : "";
      this.statusBarItem.text = fileName + isDirty;
      this.statusBarItem.show();
    } else {
      this.statusBarItem.hide();
    }
  }

  private extractFileName(filePath: string): string {
    return filePath.split(this.pathSeparatorRegex).pop() ?? "";
  }

  public registerEventListeners(context: vscode.ExtensionContext): void {
    // Active editor change listener
    vscode.window.onDidChangeActiveTextEditor(
      (editor) => this.updateStatusBar(editor),
      null,
      context.subscriptions
    );

    // Document change listener
    vscode.workspace.onDidChangeTextDocument(
      (event) => {
        if (
          vscode.window.activeTextEditor &&
          event.document === vscode.window.activeTextEditor.document
        ) {
          this.updateStatusBar();
        }
      },
      null,
      context.subscriptions
    );
  }
}