## Angular Module Duplicator

Angular Module Duplicator is a VS Code extension designed to simplify the process of duplicating Angular modules. It allows you to quickly clone an existing Angular module, rename files, update component names, selectors, and routes, all with just a few clicks.

## Features
* Right-Click Duplication: Right-click on an Angular module folder in the file explorer and duplicate it instantly.
* Rename Automation: Automatically renames files and updates module, component, and route names.
* Streamlined Workflow: Saves time and reduces errors when creating new Angular modules from existing ones.

## How to Use
1. Install the Extension:

   * Download the .vsix file from your local build or shared location.
   * Open VS Code.
   * Go to the Extensions View (Ctrl+Shift+X or Cmd+Shift+X on Mac).
   * Click on the Ellipsis Menu (•••) in the top-right corner.
   * Select Install from VSIX... and choose the .vsix file.

2. Duplicate a Module:

   * Right-click on the folder of an existing Angular module in the file explorer.
   * Select "Duplicate Angular Module" from the context menu.
   * Enter a new name for the duplicated module when prompted.

3. Review the New Module:

   * The extension will create a new folder with all files renamed and updated to reflect the new module name.
   * Verify the new module structure and make any additional edits as needed.

## Example

**Before:**

```
messaging/
├── messaging.component.html
├── messaging.component.ts
├── messaging.module.ts
├── messaging.routing.ts
├── messaging.state.service.ts
```

**After:**

Right-click the messaging folder, select Duplicate Angular Module, and provide notifications as the new name.

```
notifications/
├── notifications.component.html
├── notifications.component.ts
├── notifications.module.ts
├── notifications.routing.ts
├── notifications.state.service.ts
```

## Requirements

* Visual Studio Code version 1.78.0 or higher.
* An existing Angular module to duplicate.

## Configuration

No additional configuration is required. The extension works out of the box.