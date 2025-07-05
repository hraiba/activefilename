import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
		const statusBarItem =	vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
		const fileName = vscode.window.activeTextEditor?.document.fileName.split('/').pop() ?? '';
		statusBarItem.text = fileName;
		statusBarItem.tooltip = 'Active File Name';
		fileName === '' ? statusBarItem.hide() : statusBarItem.show();

		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				const newFileName = editor.document.fileName.split('/').pop() ?? '';
				statusBarItem.text = newFileName;
				statusBarItem.show();
			}else {
				statusBarItem.hide();
			}
		}, null, context.subscriptions);
		vscode.workspace.onDidChangeTextDocument(event => {
			if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
				const updatedFileName = event.document.fileName.split('/').pop() ?? '';
				statusBarItem.text = updatedFileName;
				statusBarItem.show();
			}else {
				statusBarItem.hide();
			}
		}, null, context.subscriptions);

	context.subscriptions.push();
}

// This method is called when your extension is deactivated
export function deactivate() {}
    // "onStartupFinished",
