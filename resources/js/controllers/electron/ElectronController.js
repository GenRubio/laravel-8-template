const Utils = require("../../objects/Utils");

const ElectronController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    init() {
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            let userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf(' electron/') > -1) {
                this.setListeners();
            }
        }
    },
    setListeners(){
        electronApp = true;
        console.log("App run on Electron: " + electronApp);
    },
    setTitleBar(){
   
    }
};

module.exports = ElectronController;
