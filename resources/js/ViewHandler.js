const FormLoginController = require("./controllers/FormLoginController");
const UserSettingsController = require('./controllers/UsetSettingsController');
const FormRegisterController = require('./controllers/FormRegisterController');
const SearchFriendController = require('./controllers/SearchFriendController');
const MakeFriendController = require('./controllers/MakeFriendController');
const NotificationsController = require('./controllers/NotificationsController');
const ProfileImageController = require('./controllers/ProfileImageController');
const MessagesController = require('./controllers/MessagesController');
const ConversationController = require('./controllers/ConversationController');
const ChatUtilsController = require('./controllers/ChatUtilsController');
const SessionPGPController = require('./controllers/SessionPGPController');
const SearchChatController = require('./controllers/SearchChatController');
const LayoutController = require('./controllers/LayoutController');
const SocketNotificationsController = require('./controllers-sockets/NotificationsController');
const SocketMessagesController = require('./controllers-sockets/MessagesController');
const ElectronController = require('./controllers/electron/ElectronController');

const ViewHandler = {
    init(data) {
        this.outdatedBrowserRework = data.outdatedBrowserRework;

        document.addEventListener("DOMContentLoaded", () => {
            this.onDocumentReady();
        });
    },
    onDocumentReady() {
        FormLoginController.init();
        UserSettingsController.init();
        FormRegisterController.init();
        SearchFriendController.init();
        MakeFriendController.init();
        NotificationsController.init();
        ProfileImageController.init();
        MessagesController.init();
        ConversationController.init();
        ChatUtilsController.init();
        SessionPGPController.init();
        SearchChatController.init();
        LayoutController.init();
        SocketNotificationsController.init();
        SocketMessagesController.init();
        ElectronController.init();
    },
};

module.exports = ViewHandler;
