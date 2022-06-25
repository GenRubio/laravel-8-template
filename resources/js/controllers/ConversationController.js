const Utils = require("../objects/Utils");

const ConversationController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    conversationItemEl: {
        selector: ".conversation-item-js",
    },
    conversationContainerEl: {
        selector: ".chat-messages-container-js",
    },
    messagesContainerEl: {
        selector: ".chat-friend-messages-js",
    },
    pendingMessagesEl: {
        selector: ".chat-item-unread-js",
    },
    itemChatEl: {
        selector: ".chat-item-container-js",
    },
    csrfToken: {
        selector: 'meta[name="csrf-token"]',
    },
    inputMessageEl:{
        selector: "#input-message"
    },
    init() {
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            this.setListeners();
        }
    },
    setListeners() {
        $(document).on("click", this.conversationItemEl.selector, (e) => {
            this.openConversation(e);
        });

        $(document).on("click", this.itemChatEl.selector, (e) => {
            this.openNewConversation(e);
        });
    },
    openConversation(e) {
        let item = $(e.currentTarget);
        this.open(item);
    },
    openNewConversation(e) {
        let item = $(e.currentTarget);
        this.open(item);
    },
    open(item) {
        if (!item.hasClass("selected") && !item.hasClass("item-blocked")) {
            this.blockConversationButtons(true);
            this.removeActiveFromConversationItems();
            this.openConversationHandler(item);
            this.setConversationItemActive(item);
        }
    },
    openConversationHandler(item) {
        const $this = this;
        this.addLoadSpinner();

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $(this.csrfToken.selector).attr("content"),
            },
            url: Utils.getUrl("openConversation"),
            method: "POST",
            data: {
                friendCode: item.data("friend-code"),
            },
            success: function (data) {
                if (data.success) {
                    $($this.conversationContainerEl.selector).html(
                        data.content
                    );
                    $this.blockConversationButtons(false);
                    $this.scrollToEnd();
                    $this.focusMessageInputHandler();
                    $this.removePendingMessages(item);
                }
            },
        });
    },
    focusMessageInputHandler(){
        $(this.inputMessageEl.selector).trigger('focus');
    },
    addLoadSpinner() {
        $(this.conversationContainerEl.selector).html(views.spinner);
    },
    removePendingMessages(item) {
        let pendingMessagesContainer = item.find(
            this.pendingMessagesEl.selector
        );
        if (pendingMessagesContainer) {
            $(pendingMessagesContainer).remove();
        }
    },
    scrollToEnd() {
        $(this.messagesContainerEl.selector).scrollTop(
            $(this.messagesContainerEl.selector)[0].scrollHeight
        );
    },
    setConversationItemActive(item) {
        const friendCode = item.data("friend-code");
        let itemChat = $(
            this.conversationItemEl.selector +
                '[data-friend-code="' +
                friendCode +
                '"]'
        );
        if (itemChat.length) {
            itemChat.addClass("selected");
        }
        let itemNewChat = $(
            this.itemChatEl.selector + '[data-friend-code="' + friendCode + '"]'
        );
        if (itemNewChat.length) {
            itemNewChat.addClass("selected");
        }
    },
    blockConversationButtons(yes) {
        if (yes) {
            $(this.conversationItemEl.selector).addClass("item-blocked");
            $(this.itemChatEl.selector).addClass("item-blocked");
        } else {
            $(this.conversationItemEl.selector).removeClass("item-blocked");
            $(this.itemChatEl.selector).removeClass("item-blocked");
        }
    },
    removeActiveFromConversationItems() {
        $(this.conversationItemEl.selector).removeClass("selected");
        $(this.itemChatEl.selector).removeClass("selected");
    },
};

module.exports = ConversationController;
