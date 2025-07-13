import * as vscode from "vscode";
import { StatusBarManager } from "./statusBarManager";
import { FileCommands } from "./fileCommands";

export function activate(context: vscode.ExtensionContext) {
  const statusBarManager = new StatusBarManager();
  const fileCommands = new FileCommands(statusBarManager);

  // Initialize status bar
  statusBarManager.initialize();

  // Register event listeners
  statusBarManager.registerEventListeners(context);

  // Register commands
  fileCommands.registerCommands(context);
}

export function deactivate() {}
