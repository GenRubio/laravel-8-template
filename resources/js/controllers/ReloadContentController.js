const ReloadContentController = {
    bellEl:{
        selector: ".bell-messages-count-js"
    },
    requestsFriendListEl: {
        selector: ".notification-list-js"
    },
    userFriendListEl: {
        selector: ".friends-list-container-js"
    },
    reloadRequestFriendList(data){
        $(this.requestsFriendListEl.selector).html(data.content);
    },
    reloadBell(data){
        $(this.bellEl.selector).html(data.bell);
    },
    reloadFrindList(data){
        $(this.userFriendListEl.selector).html(data.friendList);
    }
};

module.exports = ReloadContentController;