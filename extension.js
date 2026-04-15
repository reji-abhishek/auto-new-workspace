
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

let windowCreatedId = null;
const managedWindows = new Map();

function isMaximized(window) {
    return window.get_maximized() === 3; // 3 = both horizontal and vertical
}

function onWindowCreated(display, window) {
    if (window.get_window_type() !== 0) return;

    window.connect('notify::maximized-vertically', () => {
        if (isMaximized(window)) {
            onMaximize(window);
        } else {
            onUnmaximize(window);
        }
    });
}

function onMaximize(window) {
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
        const wm = global.workspace_manager;
        const currentWs = window.get_workspace();
        const count = wm.get_n_workspaces();
        const lastWs = wm.get_workspace_by_index(count - 1);

        const lastWsWindows = lastWs.list_windows().filter(
            w => w.get_window_type() === 0
        );
        const lastWsEmpty = lastWsWindows.length === 0;
        const target = lastWsEmpty ? lastWs : null;

        if (target && currentWs?.index() !== target.index()) {
            managedWindows.set(window, currentWs.index());
            window.change_workspace(target);
            target.activate(global.get_current_time());
        }

        return GLib.SOURCE_REMOVE;
    });
}

function onUnmaximize(window) {
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
        if (!managedWindows.has(window)) return GLib.SOURCE_REMOVE;

        const wm = global.workspace_manager;
        const originalIndex = managedWindows.get(window);
        const originalWs = wm.get_workspace_by_index(originalIndex);

        if (originalWs) {
            window.change_workspace(originalWs);
            originalWs.activate(global.get_current_time());
        }

        managedWindows.delete(window);
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
        managedWindows.clear();
    }
}
