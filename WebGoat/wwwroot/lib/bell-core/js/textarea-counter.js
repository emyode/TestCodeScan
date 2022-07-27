jQuery.fn.extend({
    charCount: function (maxLength = 1000) {
        const _textLength = (text) => {
            return text.length + (text.match(/\n/g)?.length || 0);
        }
        const _counterText = (max, text) => {
            return `${_textLength(text)}/${max}`;
        }
        const _counter = (max, text) => {
            return `<div class="fs-sm text-end text-info">${_counterText(max, text)}</div>`;
        }

        const _init = function (i, elem) {
            const $self = $(elem);
            let max = Number($self.data('val-maxlength-max'));
            if (isNaN(max))
                max = maxLength;

            if (!$self.attr("maxlength"))
                $self.attr("maxlength", max);
            var value = elem.innerHTML ?? '';
            var $counter = $(_counter(max, value)).insertAfter($self.parent(".k-textarea").length ? $self.parent(".k-textarea") : $self);
            $self.on('keyup', (e) => {
                var textLength = _textLength(e.target.value);
                if (textLength > max) {
                    var diff = textLength - max;
                    e.target.value = e.target.value.substr(0, e.target.value.length - diff);
                }
                $counter.text(_counterText(max, e.target.value));
            });
        }
        this.each(_init);
    }
});

