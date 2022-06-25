const { app, globalShortcut, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width: 1300,
        height: 800,
        //titleBarStyle: "hidden",
        title: "Laravel Template",
        webPreferences: {},
        resizable: true,
    });
    mainWindow.loadURL("http://127.0.0.1:8000/");
    mainWindow.setMenu(null);

    globalShortcut.register("f5", function () {
        mainWindow.reload();
    });

    globalShortcut.register("f1", function () {
        mainWindow.toggleDevTools();
    });
}
app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
