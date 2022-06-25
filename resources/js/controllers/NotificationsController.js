const Utils = require("../objects/Utils");
const ReloadContentController = require('./ReloadContentController');

const NotificationsController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    cancelFriendRequestEl:{
        selector: ".remove-friend-request-js"
    },
    acceptFriendRequestEl: {
        selector: ".accept-friend-request-js"
    },
    csrfToken: {
        selector: 'meta[name="csrf-token"]'
    },
    init() {
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            this.setListeners();
        }
    },
    setListeners() {
        $(document).on('click', this.cancelFriendRequestEl.selector, (e) => {
            this.cancelFriendHandler(e);
        });

        $(document).on('click', this.acceptFriendRequestEl.selector, (e) => {
            this.acceptFriendHandler(e);
        });
    },
    acceptFriendHandler(e){
        const item = $(e.currentTarget);
        this.sendAjax(item, Utils.getUrl("acceptFriendRequest"));
    },
    cancelFriendHandler(e){
        const item = $(e.currentTarget);
        this.sendAjax(item, Utils.getUrl("removeFriendRequest"));
    },
    sendAjax(item, url){
        const $this = this;
        this.disableButtons();

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $(this.csrfToken.selector).attr("content"),
            },
            url: url,
            method: "POST",
            data: {
                code: item.data('code')
            },
            success:function(data){
                ReloadContentController.reloadFrindList(data);
                ReloadContentController.reloadRequestFriendList(data);
                ReloadContentController.reloadBell(data);
                $this.sendAlertToFriendSocket(data);
            }
        });
    },
    sendAlertToFriendSocket(data){
        if (typeof(data.socketData) != "undefined" && data.socketData !== null){
            socket.emit('notification', data.socketData);
        }
    },
    disableButtons(){
        $(this.cancelFriendRequestEl.selector).attr('disabled', true);
        $(this.acceptFriendRequestEl.selector).attr('disabled', true);
    }
};

module.exports = NotificationsController;