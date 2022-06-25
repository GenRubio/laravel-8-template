const Utils = require("../objects/Utils");

const SearchFriendController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    inputSearchEl: {
        selector: "#searchFriendInput",
    },
    resultContainerEl: {
        selector: ".user-add-search-result-container",
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
            this.searchFriendHandler(e);
        });
    },
    searchFriendHandler(e) {
        const $this = this;
        const item = $(e.currentTarget);

        $.ajax({
            url: Utils.getUrl("searchFriend"),
            method: "GET",
            data: {
                value: item.val(),
            },
            success: function (data) {
                $($this.resultContainerEl.selector).html(
                    data.content
                );
            },
        });
    },
};

module.exports = SearchFriendController;
