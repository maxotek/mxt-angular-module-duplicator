// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

let kebabCase: (input: string) => string;
import('change-case').then(module => {
	kebabCase = module.kebabCase;
});

let pascalCase: (input: string) => string;
import('change-case').then(module => {
	pascalCase = module.pascalCase;
});

let camelCase: (input: string) => string;
import('change-case').then(module => {
	camelCase = module.camelCase;
});

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'mxt-angular-module-duplicator.duplicateModule',
		async (uri: vscode.Uri) => {
			// check if a folder is selected
			if (!uri || !fs.lstatSync(uri.fsPath).isDirectory()) {
				vscode.window.showErrorMessage('Please select a folder to duplicate.');
				return;
			}

			const sourceDir = uri.fsPath;
			const newModuleName = await vscode.window.showInputBox({
				prompt: 'Enter the new module name',
			});

			// check if new module name is provided
			if (!newModuleName) {
				vscode.window.showErrorMessage('New module name is required!');
				return;
			}

			// ensure that the input only contains letters, numbers, and hyphens
			if (!/^[a-z0-9-]+$/i.test(newModuleName)) {
				vscode.window.showErrorMessage(
					'New module name can only contain letters, numbers, and hyphens.'
				);
				return;
			}

			// check if new module name is different from the original module name
			if (path.basename(sourceDir).toLowerCase() === newModuleName.toLowerCase()) {
				vscode.window.showErrorMessage(
					'New module name must be different from the original module name.'
				);
				return;
			}

			const sourceKebab = path.basename(sourceDir);
			const sourcePascal = pascalCase(sourceKebab);

			const targetKebab = kebabCase(newModuleName);
			const targetPascal = pascalCase(newModuleName);

			const sourceCamel = camelCase(sourceKebab);
			const targetCamel = camelCase(targetKebab);

			// check if the new module name already exists
			const targetDir = path.join(path.dirname(sourceDir), targetKebab);
			if (fs.existsSync(targetDir)) {
				vscode.window.showErrorMessage(
					`Directory "${targetDir}" already exists.`
				);
				return;
			}

			const copyAndRenameFiles = (src: string, dest: string) => {
				if (!fs.existsSync(dest)) {
					fs.mkdirSync(dest, { recursive: true });
				}

				const files = fs.readdirSync(src);

				files.forEach((file) => {
					const srcPath = path.join(src, file);
					const destPath = path.join(
						dest,
						file.replace(`${sourceKebab}.`, `${targetKebab}.`)
					);

					if (fs.lstatSync(srcPath).isDirectory()) {
						copyAndRenameFiles(srcPath, destPath);
					} else {
						let content = fs.readFileSync(srcPath, 'utf8');

						const kebabSuffixes = [
							'.module',
							'.component',
							'.resolver',
							'.routing',
							'.state.service',
						];

						const pascalSuffixes = [
							'Module',
							'Component',
							'Resolver',
							'StateService',
						];

						const camelSuffixes = [
							'Routes'
						];

						kebabSuffixes.forEach((suffix, index) => {
							content = content
								.replaceAll(`${sourceKebab}${suffix}`, `${targetKebab}${suffix}`);
						});

						pascalSuffixes.forEach((suffix, index) => {
							content = content
								.replaceAll(`${sourcePascal}${suffix}`, `${targetPascal}${suffix}`);
						});

						camelSuffixes.forEach((suffix, index) => {
							content = content
								.replaceAll(`${camelCase(sourceCamel)}${suffix}`, `${camelCase(targetCamel)}${suffix}`);
						});

						fs.writeFileSync(destPath, content);
					}
				});
			};

			try {
				copyAndRenameFiles(sourceDir, targetDir);
				vscode.window.showInformationMessage(`Module duplicated successfully to "${newModuleName}".`);
			} catch (error) {
				vscode.window.showErrorMessage(`Error duplicating module: ${error}`);
			}
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
