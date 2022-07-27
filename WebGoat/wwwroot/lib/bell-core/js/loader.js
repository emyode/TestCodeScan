jQuery.fn.extend({
    loader: function () {
        const action = arguments[0];
        const panelSelector = '.k-loading-panel';
        const options = {
            ...{ text: null, size: 'large' },
            ...arguments[1]
        };

        const sizeClass = (size) => {
            switch (size) {
                case 'large':
                    return "k-loader-lg";
                case 'small':
                    return "k-loader-sm";
                default:
                    return "k-loader-md";
            }
        }
        const textPanel = (text) => {
            return `<div class="k-loading-panel-text">${text}</div>`;
        }
        const init = (_, elem) => {
            if ($(panelSelector, elem).length) {
                var $text = $(panelSelector, elem).find("");
                if (options.text) {
                    if (!$text.length)
                        $(".k-loading-panel-wrapper").append(textPanel(options.text));
                    else
                        $text.html(text);
                }
                else {
                    $text.remove();
                }
                return;
            }

            const $panel = $(`<div class="k-loading-panel"></div>`);
            const $wrapper = $(`<div class="k-loading-panel-wrapper"></div>`).appendTo($panel);
            const $loader = $(`<div class="k-widget k-loader k-loader-primary k-loader-pulsing-2 ${sizeClass(options.size)}"></div>`).appendTo($wrapper);
            //Canvas
            $loader.append(`<div class="k-loader-canvas"><span class="k-loader-segment"></span><span class="k-loader-segment"></span></div>`);
            if (options.text)
                $wrapper.append(textPanel(options.text));

            $(elem).append($panel);
            $(elem).addClass("position-relative");
        }

        const destroy = (_, elem) => {
            $(panelSelector, elem).remove();
            $(elem).removeClass("position-relative");
        };

        if (action === 'show') {
            this.each(init);
        }
        else if (action === 'hide') {
            this.each(destroy);
        }
    }
});