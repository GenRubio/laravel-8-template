const Utils = require("../objects/Utils");

const ProfileImageController = {
    chatPageEl: {
        selector: "#chat-page",
    },
    imageContainerEl:{
        selector: ".user-profile-photo-js",
        input: "#profile-image-input-js"
    },
    userImgEl: {
        selector: ".user-profile-img-js"
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
    setListeners(){
        $(document).on('click', this.imageContainerEl.selector, () => {
            this.changeImageHandler();
        });

        $(document).on('change', this.imageContainerEl.input, (e) => {
            this.uploadImageHandler(e);
        });
    },
    uploadImageHandler(e){
        const $this = this;
        const item = $(e.currentTarget);
        const props = item.prop('files');
        let formData = new FormData();
        formData.append('image', props[0]);

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $(this.csrfToken.selector).attr("content"),
            },
            url: Utils.getUrl("uploadUserImg"),
            method: "POST",
            processData: false,
            contentType: false, 
            data: formData,
            success:function(data){
                if (data.success){
                    $($this.userImgEl.selector).attr('src', data.image);
                }
                else{
                    toastr.error(data.message);
                }
                item.val(null);
            }
        });
    },
    changeImageHandler(){
        $(this.imageContainerEl.input).click();
    }
};

module.exports = ProfileImageController;