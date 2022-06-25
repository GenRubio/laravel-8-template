const Utils = require("../objects/Utils");

const FormRegisterController = {
    registerFormEl: {
        selector: "#register-form",
    },
    loginFormEl: {
        selector: "#login-form",
    },
    yesAccountButtonEl: {
        selector: ".yes-acount-button-js",
    },
    submitButtonEl: {
        selector: ".submit-register-button-js",
    },
    modalRegsiterEl: {
        selector: "#registerFormModal",
    },
    encryptMessageButtonEl: {
        selector: ".get-encrypt-message-js",
    },
    resultEncriptContainerEl: {
        selector: ".result-encription-container-js",
    },
    publicPGPContainerEl: {
        selector: "#user-public-pgp",
    },
    testPGPContainerEl: {
        selector: "#message-encrypted",
    },
    alertErrorKeyContainerEl:{
        selector: ".alert-error-key-container-js"
    },
    inputMessageDecryptedEl: {
        selector: "#message-decripted-js"
    },
    init() {
        if (!Utils.checkSection(this.registerFormEl.selector)) {
            return false;
        } else {
            this.setListeners();
        }
    },
    setListeners() {
        $(document).on("submit", this.registerFormEl.selector, (e) => {
            this.submitRegisterFormHandler(e);
        });

        $(document).on("click", this.encryptMessageButtonEl.selector, (e) => {
            this.getMessageEncrypted(e);
        });

        $(document).on('input', this.inputMessageDecryptedEl.selector, () => {
            this.enableRegisterButton();
        });
    },
    getMessageEncrypted(e) {
        const $this = this;
        this.removeAlertErrorKey();
        let publicKey = $(this.publicPGPContainerEl.selector).val();
        $.ajax({
            url: Utils.getUrl("homeTestRegister"),
            method: "GET",
            data: {
                publicKey: publicKey,
            },
            success: function (data) {
                if (data.success) {
                    $($this.resultEncriptContainerEl.selector).removeClass(
                        "d-none"
                    );
                    $($this.testPGPContainerEl.selector).text(data.content);
                } else {
                    $this.addAlertErrorKey(data.message);
                }
            },
        });
    },
    submitRegisterFormHandler(e) {
        e.preventDefault();
        const $this = this;
        const item = $(e.currentTarget);
        this.blockSendButton(true);

        $.ajax({
            url: Utils.getUrl("homeRegister"),
            method: "POST",
            data: item.serialize(),
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                    $($this.modalRegsiterEl.selector).modal("hide");
                } else {
                    toastr.error(data.message, {
                        enableHtml: true,
                    });
                }
                $this.blockSendButton(false);
            },
        });
    },
    enableRegisterButton(){
        $(this.submitButtonEl.selector).attr("disabled", false);
    },
    removeAlertErrorKey(){
        $(this.alertErrorKeyContainerEl.selector).empty();
    },
    addAlertErrorKey(html){
        $(this.alertErrorKeyContainerEl.selector).html(html);
    },
    blockSendButton(success) {
        $(this.submitButtonEl.selector).attr("disabled", success);
        if (success) {
            $(this.submitButtonEl.selector).text("Cargando...");
        } else {
            $(this.submitButtonEl.selector).text("SING UP");
        }
    },
};

module.exports = FormRegisterController;
