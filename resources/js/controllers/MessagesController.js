const Utils = require("../objects/Utils");
const ChatController = require('./ChatController');

const MessagesController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    inputMessageEl: {
        selector: "#input-message",
    },
    messagesContainerEl: {
        selector: ".chat-friend-messages-js",
    },
    csrfToken: {
        selector: 'meta[name="csrf-token"]',
    },
    init() {
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            this.setListeners();
        }
    },
    setListeners() {
        $(document).on("keyup", this.inputMessageEl.selector, (e) => {
            const item = $(e.currentTarget);
            if (e.keyCode == 13) {
                this.sendMessageHandler(item);
            }
        });
    },
    sendMessageHandler(item) {
        const $this = this;
        const friendCode = item.data("friend-code");
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $(this.csrfToken.selector).attr("content"),
            },
            url: Utils.getUrl("sendMessage"),
            method: "POST",
            data: {
                friendCode: friendCode,
                message: item.val(),
            },
            success: function (data) {
                if (data.success) {
                    $this.sendMessageToFriendSocket(data);
                    $this.addMessageToConversation(data.content);
                    $this.scrollToEnd();
                    ChatController.makeNewOrUpdateChatItem(friendCode);
                }
                $this.clearInputMessage();
            },
        });
    },
    scrollToEnd(){
        $(this.messagesContainerEl.selector).scrollTop($(this.messagesContainerEl.selector)[0].scrollHeight);
    },
    sendMessageToFriendSocket(data) {
        if (typeof data.socketData != "undefined" && data.socketData !== null) {
            socket.emit("messages", data.socketData);
        }
    },
    addMessageToConversation(content) {
        $(this.messagesContainerEl.selector).append(content);
    },
    clearInputMessage() {
        $(this.inputMessageEl.selector).val("");
    },
};

module.exports = MessagesController;
