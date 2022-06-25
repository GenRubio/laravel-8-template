const Utils = require("../objects/Utils");

const SearchChatController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    inputSearchEl: {
        selector: "#searchNewChatInput",
    },
    inputSearchConversationEl:{
        selector: "#searchConversationChat"
    },
    friendListContainerEl: {
        selector: ".friends-list-container-js",
    },
    conversationListContainerEl: {
        selector: ".conversations-list-container-js",
    },
    containers: {
        newChat: "newChat",
        chat: "Chat",
    },
    init() {
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            this.setListeners();
        }
    },
    setListeners() {
        $(document).on("keyup", this.inputSearchEl.selector, (e) => {
            this.searchChatHandler(e, this.containers.newChat);
        });

        $(document).on("keyup", this.inputSearchConversationEl.selector, (e) => {
            this.searchChatHandler(e, this.containers.chat);
        });
    },
    searchChatHandler(e, type) {
        e.preventDefault();
        const $this = this;
        const item = $(e.currentTarget);
        setTimeout(function () {
            $.ajax({
                url: Utils.getUrl("chatSearch"),
                method: "GET",
                data: {
                    value: item.val(),
                    type: type,
                },
                success: function (data) {
                    if (data.container == $this.containers.newChat) {
                        $($this.friendListContainerEl.selector).html(
                            data.content
                        );
                    } else if (data.container == $this.containers.chat) {
                        $($this.conversationListContainerEl.selector).html(
                            data.content
                        );
                    }
                },
            });
        }, 1000);
    },
};

module.exports = SearchChatController;
