const Utils = require("../objects/Utils");
const ChatController = require('./ChatController');

const ChatUtilsController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    init() {
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            ChatController.reorderChatsByLastMessageDate();
        }
    },
};

module.exports = ChatUtilsController;