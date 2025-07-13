# ActiveFileName

A lightweight VS Code extension that displays the active file name in the status bar with quick access to essential file operations.

## Overview

ActiveFileName enhances your VS Code workflow by providing instant visibility of the currently active file and quick access to common file operations directly from the status bar.

## Features

- 📁 **Active File Display**: Shows the current file name in the VS Code status bar
- 🔄 **Real-time Updates**: Automatically updates when switching between files or editors
- 🖱️ **Interactive Status Bar**: Click to access file operations via quick pick menu
- ⚡ **Quick File Actions**: Perform common file operations without navigating away
- 🎨 **Clean Interface**: Seamlessly integrates with VS Code's native status bar design
- 💡 **Smart Visibility**: Status bar item appears only when a file is active

## Quick Start

1. Install the extension
2. Open any file in VS Code
3. Look for the filename in the status bar (left side)
4. Click the filename to access file operations

## Available Actions

Click the active filename in the status bar to access:

| Action | Description |
|--------|-------------|
| 📝 **Show File Name** | Display the current filename in an information popup |
| 📂 **Open Containing Folder** | Reveal the file's directory in your system's file explorer |
| 📋 **Copy File Path** | Copy the complete file path to your clipboard |
| 💻 **Open in Terminal** | Open a terminal session in the file's directory |

## Commands

The extension provides these commands (accessible via Command Palette):

```
activefilename.showFileOptions    - Show file options menu
activefilename.showFileName       - Display current filename
activefilename.openFolder         - Open containing folder
activefilename.copyPath          - Copy file path to clipboard
activefilename.openInTerminal     - Open terminal in file's directory
```

## Requirements

- **VS Code**: Version 1.101.0 or higher
- **Operating System**: Windows, macOS, or Linux

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "ActiveFileName"
4. Click Install

## How It Works

The extension operates automatically:

1. **Activation**: Starts when VS Code opens
2. **Detection**: Monitors active editor changes
3. **Display**: Updates status bar with current filename
4. **Interaction**: Responds to clicks with action menu
5. **Updates**: Refreshes display when switching files

## Configuration

This extension works out of the box with **zero configuration required**. No settings to manage - just install and use!

## Troubleshooting

**Status bar item not visible?**
- Ensure a file is currently open and active
- Check if the status bar is visible (View → Appearance → Status Bar)

**Commands not working?**
- Try reloading VS Code (Developer → Reload Window)
- Ensure you have the required VS Code version

**Terminal not opening in correct directory?**
- Ensure the file is saved and has a valid path
- Check that VS Code has proper terminal permissions

## Contributing

Found a bug or have a feature request? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Release Notes

### 0.0.2 - Initial Release

✨ **New Features:**
- Active file name display in status bar
- Real-time file switching detection
- Interactive status bar with quick pick menu
- Hover tooltips for better UX

🛠️ **Available Commands:**
- Show current file name
- Open containing folder in file explorer
- Copy full file path to clipboard
- Open terminal in file's directory

### Future Enhancements

- 🎯 Customizable status bar position
- 🎨 Configurable display format
- 📊 File statistics display
- 🔧 Additional file operations

---

## License

This extension follows VS Code extension guidelines and best practices.

**Made with ❤️ for the VS Code community**

---

*For more information, visit the [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)*
