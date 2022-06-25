const Utils = require("../objects/Utils");

const MakeFriendController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    addFriendButtonEl: {
        selector: ".add-new-friend-button-js",
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
        $(document).on("click", this.addFriendButtonEl.selector, (e) => {
            this.addFriendHandler(e);
        });
    },
    addFriendHandler(e) {
        const $this = this;
        const item = $(e.currentTarget);
        this.disableSendButton();

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $(this.csrfToken.selector).attr("content"),
            },
            url: Utils.getUrl("friendSendRequest"),
            method: "POST",
            data: {
                friendCode: item.data("code"),
            },
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                    $($this.addFriendButtonEl.selector).html("Pending");
                    $this.sendFriendRequestSocket(data);
                } else {
                    toastr.error(data.message);
                }
            },
        });
    },
    sendFriendRequestSocket(data) {
        if (typeof data.socketData != "undefined" && data.socketData !== null) {
            socket.emit("notification", data.socketData);
        }
    },
    disableSendButton() {
        $(this.addFriendButtonEl.selector).attr("disabled", true);
    },
};

module.exports = MakeFriendController;
