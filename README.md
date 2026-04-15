Auto New Workspace — GNOME Shell Extension
Automatically moves a maximized app to its own workspace and switches to it — just like macOS Spaces. When you unmaximize, the app returns to its original workspace.
Requirements

GNOME Shell 42, 43, 44, 45, 46, 47, 48
Wayland

Install
bashgit clone https://github.com/reji-abhishek/auto-new-workspace ~/.local/share/gnome-shell/extensions/auto-new-workspace@local
gnome-extensions enable auto-new-workspace@local
Log out and back in.
How it works

Maximize any app (Super+Up or title bar button) → it moves to a fresh workspace and the screen follows
Unmaximize → it returns to the workspace it came from
Swipe between workspaces with 3 fingers

⚠️ Warning

Only tested on Wayland. X11 is not supported.
If you unmaximize an app and its original workspace no longer exists, it will stay on the current workspace.
Disabling the extension will not move existing windows back — rearrange them manually or log out and back in.

License
MIT