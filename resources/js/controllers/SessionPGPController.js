const Utils = require("../objects/Utils");

const SessionPGPController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    keysModalEl: {
        selector: "#userPrivateKeys",
    },
    saveKeysFormEl: {
        selector: "#save-session-private-keys",
    },
    alertErrorKeyContainerEl:{
        selector: ".alert-error-key-container-js"
    },
    savePrivateButtonEl:{
        selector: ".save-private-key-button-js"
    },
    init() {
        if (!Utils.checkSection(this.chatPageEl.selector)) {
            return false;
        } else {
            this.setListeners();
            this.launchModal();
        }
    },
    setListeners() {
        $(document).on("submit", this.saveKeysFormEl.selector, (e) => {
            this.savePrivateKeysHandler(e);
        });
    },
    savePrivateKeysHandler(e) {
        e.preventDefault();
        this.removeAlertErrorKey();
        this.blockSendButton(true);
        const $this = this;
        const item = $(e.currentTarget);

        $.ajax({
            url: Utils.getUrl("savePrivateKeys"),
            method: "POST",
            data: item.serialize(),
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                    $($this.keysModalEl.selector).modal("hide");
                    location.reload();
                } else {
                    $this.addAlertErrorKey(data.message);
                }
                $this.blockSendButton(false);
            },
        });
    },
    removeAlertErrorKey(){
        $(this.alertErrorKeyContainerEl.selector).empty();
    },
    addAlertErrorKey(html){
        $(this.alertErrorKeyContainerEl.selector).html(html);
    },
    blockSendButton(success) {
        $(this.savePrivateButtonEl.selector).attr("disabled", success);
        if (success) {
            $(this.savePrivateButtonEl.selector).text("Cargando...");
        } else {
            $(this.savePrivateButtonEl.selector).text("Save changes");
        }
    },
    launchModal() {
        let modal = $(this.keysModalEl.selector).length;
        if (modal) {
            $(this.keysModalEl.selector).modal("show");
        }
    },
};

module.exports = SessionPGPController;
