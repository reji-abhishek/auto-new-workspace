# Auto New Workspace — GNOME Shell Extension

Automatically moves a maximized app to its own workspace and switches to it — just like macOS Spaces. Unmaximize to return it to its original workspace.

## Requirements
- GNOME Shell 42, 43, 44, 45, 46, 47, 48
- Wayland

## Install
```bash
git clone https://github.com/reji-abhishek/auto-new-workspace ~/.local/share/gnome-shell/extensions/auto-new-workspace@local
gnome-extensions enable auto-new-workspace@local
```
Log out and back in.

## How it works
| Action | Result |
|---|---|
| Maximize app (Super+Up or title bar) | Moves to a fresh workspace, screen follows |
| Unmaximize | Returns to original workspace |
| 3 finger swipe | Navigate between workspaces |

## ⚠️ Warning
- Only tested on **Wayland**. X11 is not supported.
- If the original workspace no longer exists when you unmaximize, the app stays on the current workspace.
- Disabling the extension will not move existing windows back — rearrange manually or log out and back in.

## License
MIT