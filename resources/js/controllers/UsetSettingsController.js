const Utils = require("../objects/Utils");

const UserSettingsController = {
    pageEl: {
        selector: "#chat-page",
    },
    logOutButtonEl: {
        selector: ".user-settings-out-js",
    },
    userProfileEl: {
        selector: ".user-settings-image-js",
        container: ".user-profile-container-js",
        backButton: ".profile-back-button-js"
    },
    userNotificationsEl:{
        selector: ".user-settings-bell-js",
        container: ".user-notifications-container-js",
        backButton: ".notifications-back-button-js"
    },
    userAddFriendEl:{
        selector: ".user-settings-add-user-js",
        container: ".user-add-friend-container-js",
        backButton: ".add-friend-back-button-js",
        searchInput: "#searchFriendInput",
        resultContainer: ".user-add-search-result-container"
    },
    userNewChatEl:{
        selector: ".user-settings-new-chat-js",
        container: ".new-chat-container-js",
        backButton: ".new-chat-back-button-js"
    },
    init() {
        this.setListeners();
    },
    setListeners() {
        $(document).on("click", this.userNewChatEl.selector, () => {
            this.showUserNewChatHandler();
        });

        $(document).on("click", this.userNewChatEl.backButton, () => {
            this.closeUserNewChatHandler();
        });

        $(document).on("click", this.logOutButtonEl.selector, () => {
            this.logOutHandler();
        });

        $(document).on("click", this.userAddFriendEl.selector, () => {
            this.showUserAddFriendHandler();
        });

        $(document).on("click", this.userAddFriendEl.backButton, () => {
            this.closeUserAddFriendHandler();
        });

        $(document).on("click", this.userProfileEl.selector, () => {
            this.showUserProfileHandler();
        });

        $(document).on("click", this.userProfileEl.backButton, () => {
            this.closeUserProfileHandler();
        });

        $(document).on("click", this.userNotificationsEl.selector, () => {
            this.showUserNotificationsHandler();
        });

        $(document).on("click", this.userNotificationsEl.backButton, () => {
            this.closeUserNotificationsHandler();
        });
    },
    closeUserNewChatHandler(){
        const container = $(this.userNewChatEl.container);
        this.moveContainer(container, -100);
    },
    showUserNewChatHandler(){
        const container = $(this.userNewChatEl.container);
        this.moveContainer(container, 0);
    },
    closeUserAddFriendHandler(){
        const container = $(this.userAddFriendEl.container);
        this.moveContainer(container, -100);
    },
    showUserAddFriendHandler(){
        const container = $(this.userAddFriendEl.container);
        this.moveContainer(container, 0);

        $(this.userAddFriendEl.searchInput).val("");
        $(this.userAddFriendEl.resultContainer).empty();
    },
    closeUserNotificationsHandler(){
        const container = $(this.userNotificationsEl.container);
        this.moveContainer(container, -100);
    },
    showUserNotificationsHandler(){
        const container = $(this.userNotificationsEl.container);
        this.moveContainer(container, 0);
    },
    closeUserProfileHandler(){
        const container = $(this.userProfileEl.container);
        this.moveContainer(container, -100);
    },
    showUserProfileHandler() {
        const container = $(this.userProfileEl.container);
        this.moveContainer(container, 0);
    },
    moveContainer(container, position){
        container.css('opacity', '1');
        container.css('transform', 'translate(' + position + '%, 0)') ;
        container.css('transition', ' opacity 0.6s ease-out, transform 0.6s');
    },
    logOutHandler() {
        $.ajax({
            url: Utils.getUrl("logOut"),
            method: "GET",
            success: function () {
                location.href = Utils.getUrl("home");
            },
        });
    },
};

module.exports = UserSettingsController;
