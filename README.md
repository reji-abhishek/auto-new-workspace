# Auto New Workspace — GNOME Shell Extension

Automatically moves each newly opened app to its own workspace, so you can swipe between apps with 3 fingers — just like macOS.

## Requirements
- GNOME Shell 42, 43, 44, 45, 46, 47, 48
- Wayland

## Install
```bash
git clone https://github.com/reji-abhishek/auto-new-workspace ~/.local/share/gnome-shell/extensions/auto-new-workspace@local
gnome-extensions enable auto-new-workspace@local
```
Log out and back in.

## ⚠️ Warning
- This extension moves **every** new window to a fresh workspace. Apps that open multiple windows (like a browser opening a popup or a save dialog) may get split across workspaces. Add such apps to the ignore list if this causes issues.
- Only tested on **Wayland**. X11 is not supported.
- Disabling the extension will not move existing windows back — you'll need to rearrange them manually or log out and back in.

## Ignore List
Edit `extension.js` and add app class names to `IGNORED_APPS`. To find an app's class name, open the app, focus it, then check:
```bash
journalctl /usr/bin/gnome-shell | grep auto-workspace
```

## License
MIT