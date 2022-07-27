((app, $) => {

    let _hasChanges = () => {
        return !!$(".dirty").length;
    };
    let Model = {};
    let Action = null;
    const _onChange = (evt) => {
        const { field, value } = evt;
        var original = Model[field];
        if (value !== original) {
            $(`[name='${field}']`).addClass("dirty");
        } else {
            $(`[name='${field}']`).removeClass("dirty");
        }
    }

    const _checkModelModified = (evt) => {
        return (_hasChanges()) ? true: null;
    };

    const _clearEdit = (evt) => {
        evt.preventDefault();
        window.onbeforeunload = null;
        window.location.reload(true);
    };

    const _initChangeDetection = ($form) => {
        $form.on("submit", function () {
            window.onbeforeunload = null;
        });
        window.onbeforeunload = _checkModelModified;
    }

    const _appendTimestamp = ($form) => {
        if (Model.Timestamp)
            $form.append(`<input type="hidden" name="Timestamp" value='${Model.Timestamp}'/>`);
    };

    const _editMode = ($form) => {
        $form.append(`<input type='hidden' name='Id' value='${Model.Id}' />`);
        $(".k-form-clear", $form).off().on("click", _clearEdit);
        _initChangeDetection($form);
        _appendTimestamp($form);
    };

    const _viewMode = ($form) => {
        $(".k-form-buttons", $form).hide();
    };

    const _createMode = ($form) => {
        $(".k-form-clear", $form).on("click", _selectFirstInput);
        _initChangeDetection($form);
    };

    const _deleteMode = ($form) => {
        $form.append(`<input type='hidden' name='Id' value='${Model.Id}' />`)
        $(".k-form-clear", $form).off().on("click", _clearEdit);
        _initChangeDetection($form);
        _appendTimestamp($form);
    };

    const _selectFirstInput = () => {
        $(".k-form input:not([type=hidden])").first().prop("autofocus", true).select();
    };

    const _init = ($form, model, action) => {
        Model = model;
        Action = action;
        $(".back-to-list").on("click", _checkModelModified);
        $form.getKendoForm().bind("change", _onChange);
        for (const input of $("[data-val-required]", $form)) {
            $(input).closest(".k-form-field-wrap").addClass("mandatory");
        }
        $(".k-form-submit", $form).prepend("<i class='k-icon k-i-save'></i>");
        $(".k-form-clear", $form).prepend("<i class='k-icon k-i-reset'></i>");

        $("#hidden-fields").appendTo($form);

        switch (action) {
            case "Edit":
                _editMode($form);
                break;
            case "Delete":
                _deleteMode($form);
                break;
            case "Create":
                _createMode($form);
                break;
            default:
                _viewMode($form);
                break;
        }

        _selectFirstInput();
    }

    app.DetailUtils = {
        init: _init,
        model: () => Model,
        action: () => Action
    };
})(window.app, jQuery);