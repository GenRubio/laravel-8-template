const Utils = require("../objects/Utils");
const ChatController = require("../controllers/ChatController");

const MessagesController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    conversationEl: {
        selector: ".conversation-friend-js",
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
        socket.on("receive-friend-message-" + userChannel, (data) => {
            this.addMessageToConversation(data);
        });
    },
    addMessageToConversation(data) {
        let conversation = $(
            this.conversationEl.selector +
                '[data-friend-code="' +
                data.friendCode +
                '"]'
        ).length;
        if (conversation) {
            const $this = this;
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $(this.csrfToken.selector).attr("content"),
                },
                url: Utils.getUrl("receiveMessage"),
                method: "POST",
                data: {
                    friendCode: data.friendCode,
                    message: data.message,
                },
                success: function (data) {
                    $.playSound(window.sounds.openChat);
                    $($this.messagesContainerEl.selector).append(data.content);
                    $this.scrollToEnd();
                },
            });
        } else {
            $.playSound(window.sounds.newChat);
        }
        ChatController.makeNewOrUpdateChatItem(data.friendCode);
        setTimeout(function () {
            ChatController.reorderChatsByLastMessageDate();
        }, 800);
    },
    scrollToEnd() {
        $(this.messagesContainerEl.selector).scrollTop($(this.messagesContainerEl.selector)[0].scrollHeight);
    },
};

module.exports = MessagesController;
