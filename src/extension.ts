import * as vscode from 'vscode';
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('test-workspace-edit.helloWorld', () => {
			const workspaceFolder = vscode.workspace.workspaceFolders![0];
			const newFileUri = vscode.Uri.file(path.join(workspaceFolder.uri.fsPath, "NewFile"));
			const workspaceEdit = new vscode.WorkspaceEdit();
			workspaceEdit.createFile(newFileUri);
			workspaceEdit.insert(newFileUri, new vscode.Position(0, 0), "Created from workspace edit");
			vscode.workspace.applyEdit(workspaceEdit);
		}),
		vscode.workspace.onDidCreateFiles(async (e: vscode.FileCreateEvent) => {
			const snippet = new vscode.SnippetString("Created from onDidCreateFiles()");
			const textDocument = await vscode.workspace.openTextDocument(e.files[0]);
			const textEditor = await vscode.window.showTextDocument(textDocument);
			textEditor.insertSnippet(snippet);
		})
	);
}

export function deactivate() {}
