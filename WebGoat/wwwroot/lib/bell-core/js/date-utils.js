((app) => {
    const _parse = (dateStr, format) => {
        return kendo.toString(kendo.parseDate(dateStr, 'yyyy-MM-dd HH:mm:sszzz'), format);
    };

    const utcToLocal = {
        datetime: (dateStr) => {
            var dateTimeformat = kendo.culture().name == "en-CA" ? 'yyyy-MM-dd hh:mm tt' : 'yyyy-MM-dd HH:mm';
            return _parse(dateStr, dateTimeformat);
        },
        date: (dateStr) => {
            return _parse(dateStr, 'yyyy-MM-dd');
        },
    }
    app.DateUtils = {
        utcToLocal,
        formats: {
            utcDateTime: "yyyy-MM-ddTHH:mm:ss.fffffffzzz",
            DateTime: "yyyy-MM-dd",
        }
    };
})(window.app);

jQuery.fn.extend({
    utcDate: function () {
        const init = function (i, elem) {
            const $self = $(elem);
            let dateStr = $self.data('utc');
            if (!dateStr) {
                $self.text($self.data("none"));
                return;
            }
            var format = $self.data("format") || "date";
            $self.text(app.DateUtils.utcToLocal[format](dateStr));
        }
        this.each(init);
    }
});

$(() => {
    $("[data-utc]").utcDate();
});
