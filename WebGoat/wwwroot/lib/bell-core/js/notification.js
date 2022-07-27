const notification = (function ($) {
    const kendoNotfication = () => $("#notification").data("kendoNotification");
    const _show = (options) => {
        kendoNotfication().show(options, options.remark ? "complexe" : "simple");
        $('html, body').scrollTop($("#notification").offset().top);
    }
    return {
        kendo: kendoNotfication,
        error: (message, remark) => {
            _show({
                icon: "bi-exclamation-octagon",
                type: "bg-danger text-white bg-opacity-75",
                message,
                remark
            });
        },
        warning: (message, remark) => {
            _show({
                icon: "bi-exclamation-triangle",
                type: "bg-warning text-dark bg-opacity-75",
                message,
                remark
            });
        },
        success: (message, remark) => {
            _show({
                icon: "bi-check-circle",
                type: "bg-success text-white bg-opacity-75",
                message,
                remark
            });
        },
        info: (message, remark) => {
            _show({
                icon: "bi-info-circle",
                type: "bg-info text-dark bg-opacity-25",
                message,
                remark
            });
        }
    }
})(jQuery);