import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    10
  );
const pathSeparatorRegex = /[\/\\]/g;
  const fileName =
    vscode.window.activeTextEditor?.document.fileName.split(pathSeparatorRegex).pop() ?? "";
  statusBarItem.text = fileName;
  statusBarItem.tooltip = "Active File Name";
  statusBarItem.command = "activefilename.showFileOptions";
  fileName === "" ? statusBarItem.hide() : statusBarItem.show();

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        const newFileName = editor.document.fileName.split(pathSeparatorRegex).pop() ?? "";
        statusBarItem.text = newFileName;
        statusBarItem.show();
      } else {
        statusBarItem.hide();
      }
    },
    null,
    context.subscriptions
  );
  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (
        vscode.window.activeTextEditor &&
        event.document === vscode.window.activeTextEditor.document
      ) {
        const updatedFileName = event.document.fileName.split(pathSeparatorRegex).pop() ?? "";
        statusBarItem.text = updatedFileName;
        statusBarItem.show();
      } else {
        statusBarItem.hide();
      }
    },
    null,
    context.subscriptions
  );

  const showFileOptions = vscode.commands.registerCommand(
    "activefilename.showFileOptions",
    async () => {
      const options = [
        {
          label: "$(file) Show File Name",
          command: "activefilename.showFileName",
        },
        {
          label: "$(folder) Open Containing Folder",
          command: "activefilename.openFolder",
        },
        { label: "$(copy) Copy File Path", command: "activefilename.copyPath" },
        {
          label: "$(terminal) Open in Terminal",
          command: "activefilename.openInTerminal"
        }
      ];
      const selectedOption = await vscode.window.showQuickPick(options, {
        placeHolder: "Select an option for the active file",
      });
      if (selectedOption) {
        vscode.commands.executeCommand(selectedOption.command);
      }
    }
  );
  const showFileName = vscode.commands.registerCommand(
	"activefilename.showFileName", () => {
		vscode.window.showInformationMessage(
		  `Active File Name: ${statusBarItem.text}`,
		  { modal: true }
		);
	});
  const openFolder = vscode.commands.registerCommand(
	"activefilename.openFolder",
	() => {
	  const filePath = vscode.window.activeTextEditor?.document.fileName;
	  if (filePath) {
		const folderPath = filePath.substring(0, filePath.lastIndexOf("/"));
		vscode.commands.executeCommand("revealFileInOS", folderPath);
	  } else {
		vscode.window.showErrorMessage("No active file found.");
	  }
	}
  );

  const copyPath = vscode.commands.registerCommand(
	"activefilename.copyPath",()=>{
	  const filePath = vscode.window.activeTextEditor?.document.fileName;
	  if (filePath) {
		vscode.env.clipboard.writeText(filePath).then(() => {
		  vscode.window.showInformationMessage("File path copied to clipboard.\n" + filePath);
		}, (error) => {
		  vscode.window.showErrorMessage(`Failed to copy file path: ${error}`);
		});
	  } else {
		vscode.window.showErrorMessage("No active file found.");
	  }
	});

  const openInTerminal = vscode.commands.registerCommand(
  "activefilename.openInTerminal", () => {
  const filePath = vscode.window.activeTextEditor?.document.fileName;
  if (filePath) {
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal("Active File Terminal");
    const fileDirectory = filePath.substring(0, filePath.lastIndexOf("/"));
    terminal.sendText(`cd "${fileDirectory}"`);
    terminal.show();
  } else {
    vscode.window.showErrorMessage("No active file found.");
  }
});
  context.subscriptions.push(
	showFileOptions,
	showFileName,
	openFolder,
  copyPath,
  openInTerminal
);

}

// This method is called when your extension is deactivated
export function deactivate() {}
// "onStartupFinished",
