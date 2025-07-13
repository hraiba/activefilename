import * as vscode from "vscode";
import { StatusBarManager } from "./statusBarManager";

interface QuickPickOption {
  label: string;
  command: string;
}

export class FileCommands {
  constructor(private statusBarManager: StatusBarManager) {}

  public registerCommands(context: vscode.ExtensionContext): void {
    const commands = [
      vscode.commands.registerCommand(
        "activefilename.showFileOptions",
        () => this.showFileOptions()
      ),
      vscode.commands.registerCommand(
        "activefilename.showFileName",
        () => this.showFileName()
      ),
      vscode.commands.registerCommand(
        "activefilename.openFolder",
        () => this.openFolder()
      ),
      vscode.commands.registerCommand(
        "activefilename.copyPath",
        () => this.copyPath()
      ),
      vscode.commands.registerCommand(
        "activefilename.openInTerminal",
        () => this.openInTerminal()
      ),
    ];

    context.subscriptions.push(...commands);
  }

  private async showFileOptions(): Promise<void> {
    const options: QuickPickOption[] = [
      {
        label: "$(file) Show File Name",
        command: "activefilename.showFileName",
      },
      {
        label: "$(folder) Open Containing Folder",
        command: "activefilename.openFolder",
      },
      {
        label: "$(copy) Copy File Path",
        command: "activefilename.copyPath",
      },
      {
        label: "$(terminal) Open in Terminal",
        command: "activefilename.openInTerminal",
      },
    ];

    const selectedOption = await vscode.window.showQuickPick(options, {
      placeHolder: "Select an option for the active file",
    });

    if (selectedOption) {
      vscode.commands.executeCommand(selectedOption.command);
    }
  }

  private showFileName(): void {
    const fileName = this.statusBarManager.getStatusBarText();
    vscode.window.showInformationMessage(
      `Active File Name: ${fileName}`,
      { modal: true }
    );
  }

  private openFolder(): void {
    const filePath = this.getActiveFilePath();
    if (!filePath) {
      return;
    }

    const folderPath = this.getDirectoryPath(filePath);
    vscode.commands.executeCommand("revealFileInOS", folderPath);
  }

  private async copyPath(): Promise<void> {
    const filePath = this.getActiveFilePath();
    if (!filePath) {
      return;
    }

    try {
      await vscode.env.clipboard.writeText(filePath);
      vscode.window.showInformationMessage(
        `File path copied to clipboard.\n${filePath}`
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to copy file path: ${error}`);
    }
  }

  private openInTerminal(): void {
    const filePath = this.getActiveFilePath();
    if (!filePath) {
      return;
    }

    const terminal = vscode.window.activeTerminal || 
                    vscode.window.createTerminal("Active File Terminal");
    const fileDirectory = this.getDirectoryPath(filePath);
    
    terminal.sendText(`cd "${fileDirectory}"`);
    terminal.show();
  }

  private getActiveFilePath(): string | undefined {
    const filePath = vscode.window.activeTextEditor?.document.fileName;
    if (!filePath) {
      vscode.window.showErrorMessage("No active file found.");
      return undefined;
    }
    return filePath;
  }

  private getDirectoryPath(filePath: string): string {
    return filePath.substring(0, filePath.lastIndexOf("/"));
  }
}