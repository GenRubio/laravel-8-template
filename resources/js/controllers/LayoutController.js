const LayoutController = {
    init(){
        this.enableTooltipsHandler();
    },
    enableTooltipsHandler(){
        $('i').tooltip();
    }
};

module.exports = LayoutController;