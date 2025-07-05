import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
		const statusBarItem =	vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
		const fileName = vscode.window.activeTextEditor?.document.fileName.split('/').pop() ?? 'No active file';
		statusBarItem.text = fileName;
		statusBarItem.tooltip = 'Active File Name';
		statusBarItem.command = 'activefilename.helloWorld';
		statusBarItem.show();

		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				const newFileName = editor.document.fileName.split('/').pop() ?? 'No active file';
				statusBarItem.text = newFileName;
			}else {
				statusBarItem.text = 'No active file';
			}
		}, null, context.subscriptions);
		vscode.workspace.onDidChangeTextDocument(event => {
			if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
				const updatedFileName = event.document.fileName.split('/').pop() ?? 'No active file';
				statusBarItem.text = updatedFileName;
			}else {
				statusBarItem.text = 'No active file';
			}
		}, null, context.subscriptions);
	const disposable = vscode.commands.registerCommand('activefilename.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from ActiveFileName!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
    // "onStartupFinished",
