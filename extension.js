import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

let windowCreatedId = null;

const IGNORED_APPS = new Set([
    'org.gnome.Nautilus',
    'com.mitchellh.ghostty',
    'org.gnome.Files',
    'update-manager',
    'Update-manager',
    'org.gnome.Settings',
    'gnome-control-center',
    'ulauncher',
    'albert',
    'rofi',
    'gnome-screenshot',
    'gnome-calculator',
    'org.gnome.Calculator',
    'pavucontrol',
    'copyq',
    'gpaste',
]);

function onWindowCreated(display, window) {
    if (window.get_window_type() !== 0) return;

    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
        const appClass = window.get_wm_class() ?? '';
        const appName = window.get_wm_class_instance() ?? '';

        console.log(`[auto-workspace] new window: class="${appClass}" instance="${appName}"`);

        if (IGNORED_APPS.has(appClass) || IGNORED_APPS.has(appName)) {
            console.log(`[auto-workspace] ignoring: ${appClass}`);
            return GLib.SOURCE_REMOVE;
        }

        const wm = global.workspace_manager;
        const count = wm.get_n_workspaces();
        const lastWs = wm.get_workspace_by_index(count - 1);

        const lastWsWindows = lastWs.list_windows().filter(
            w => w.get_window_type() === 0
        );

        console.log(`[auto-workspace] workspaces=${count}, last ws window count=${lastWsWindows.length}`);

        const lastWsEmpty = lastWsWindows.length === 0;
        const target = lastWsEmpty ? lastWs : null;

        if (target && window.get_workspace()?.index() !== target.index()) {
            console.log(`[auto-workspace] moving to workspace ${target.index()}`);
            window.change_workspace(target);
            target.activate(global.get_current_time());
        } else {
            console.log(`[auto-workspace] no empty workspace found, not moving`);
        }

        return GLib.SOURCE_REMOVE;
    });
}

export default class AutoNewWorkspace {
    enable() {
        windowCreatedId = global.display.connect('window-created', onWindowCreated);
    }

    disable() {
        if (windowCreatedId) {
            global.display.disconnect(windowCreatedId);
            windowCreatedId = null;
        }
    }
}
