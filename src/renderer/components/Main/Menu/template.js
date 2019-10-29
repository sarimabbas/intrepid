const { remote } = require("electron");
const { shell } = remote;
const isMac = process.platform === "darwin";
const currentWindow = remote.getCurrentWindow();

const template = [
    // { role: 'appMenu' }
    ...(isMac
        ? [
              {
                  label: app.name,
                  submenu: [
                      { role: "about" },
                      { type: "separator" },
                      { role: "services" },
                      { type: "separator" },
                      { role: "hide" },
                      { role: "hideothers" },
                      { role: "unhide" },
                      { type: "separator" },
                      { role: "quit" }
                  ]
              }
          ]
        : []),
    // { role: 'fileMenu' }
    {
        label: "File",
        submenu: [
            {
                label: "Open...",
                accelerator:
                    process.platform === "darwin" ? "Cmd+O" : "Ctrl+Shift+O",
                click() {
                    currentWindow.webContents.send("file-open");
                }
            },
            isMac ? { role: "close" } : { role: "quit" }
        ]
    },
    // { role: 'editMenu' }
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            ...(isMac
                ? [
                      { role: "pasteAndMatchStyle" },
                      { role: "delete" },
                      { role: "selectAll" },
                      { type: "separator" },
                      {
                          label: "Speech",
                          submenu: [
                              { role: "startspeaking" },
                              { role: "stopspeaking" }
                          ]
                      }
                  ]
                : [
                      { role: "delete" },
                      { type: "separator" },
                      { role: "selectAll" }
                  ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { role: "toggledevtools" },
            { type: "separator" },
            { role: "resetzoom" },
            { role: "zoomin" },
            { role: "zoomout" },
            { type: "separator" },
            { role: "togglefullscreen" }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: "Window",
        submenu: [
            { role: "minimize" },
            { role: "zoom" },
            ...(isMac
                ? [
                      { type: "separator" },
                      { role: "front" },
                      { type: "separator" },
                      { role: "window" }
                  ]
                : [{ role: "close" }])
        ]
    },
    {
        role: "help",
        submenu: [
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal("https://electronjs.org");
                }
            }
        ]
    }
];

export default template;