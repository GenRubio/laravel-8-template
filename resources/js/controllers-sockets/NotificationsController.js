const Utils = require("../objects/Utils");
const ReloadContentController = require('../controllers/ReloadContentController');

const NotificationsController = {
    chatPageEl:{
        selector: "#chat-page"
    },
    bellEl:{
        selector: ".bell-messages-count-js"
    },
    requestsFriendListEl: {
        selector: ".notification-list-js"
    },
    userFriendListEl: {
        selector: ".friends-list-container-js"
    },
    init(){
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            this.setListeners();
        }
    },
    setListeners(){
        socket.on('friend-accept-request-' + userChannel,  (data) => {
            this.friendAcceptRequestHandler(data);
        });

        socket.on('friend-send-request-' + userChannel, (data) => {
            this.friendSendRequestHandler(data);
        });
    },
    friendSendRequestHandler(data){
        toastr.info(data.name + " te envio una solicitud de amistad.");
        this.reloadUserPanels();
    },
    friendAcceptRequestHandler(data){
        toastr.info(data.name + " acepto la solicitud de amistad.");
        this.reloadUserPanels();
    },
    reloadUserPanels(){
        $.ajax({
            url:  Utils.getUrl("notificationsReload"),
            method: "GET",
            success:function(data){
                ReloadContentController.reloadRequestFriendList(data);
                ReloadContentController.reloadBell(data);
                ReloadContentController.reloadFrindList(data);
            }
        });
    },
};

module.exports = NotificationsController;