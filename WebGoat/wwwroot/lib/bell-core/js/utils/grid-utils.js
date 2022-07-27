(($, app, kendo) => {
    const _doDelete = (data, target) => {
        var url = `${app.Links.Delete}/${data.Id}`

        $.post(url, (resp) => _handleDeleteResponse(resp, target));
    };

    const _getButton = (evt) => {
        return $(evt.target).hasClass("k-button") ? $(evt.target) : $(evt.target).closest(".k-button");
    }

    const _getKendoGrid = function (target) {
        var $grid = $(target).closest(".k-grid");
        if (!$grid.length)
            return;
        return $grid.getKendoGrid();
    };

    const _getDataItem = (target) => {
        var kendoGrid = _getKendoGrid(target);
        if (!kendoGrid)
            return null;
        var tr = target.closest("tr");
        return kendoGrid.dataItem(tr);
    };

    const _getPageSize = (pageSizes) => {
        if (!pageSizes || !pageSizes.length)
            return null;
        if (pageSizes.length >= 2)
            return pageSizes[1];
        return pageSizes[0];
    }

    const _isDisabled = (element) => {
        var $elem = $(element);
        if (!$elem.hasClass("k-button"))
            $elem = $elem.closest(".k-button");
        return $elem.prop("disabled") || $elem.hasClass(".k-disabled");
    };

    const _handleDeleteResponse = (resp, target) => {
        if (resp.error)
            notification.error(resp.error);
        _refreshGrid(target);
    }

    const _refreshGrid = (target) => {
        var kendoGrid = _getKendoGrid(target);
        if (!kendoGrid)
            return;
        kendoGrid.dataSource.read();
    };

    const AddNew = (evt) => {
        evt.preventDefault();

        if (_isDisabled(evt.target))
            return false;

        window.location = app.Links.Create;
    };

    const Delete = (evt) => {
        evt = evt || window.event;
        evt.preventDefault();
        evt.stopImmediatePropagation();

        if (_isDisabled(evt.target))
            return false;

        var data = _getDataItem(evt.target);
        if (!data)
            return;
        window.location = `${app.Links.Delete}/${data.Id}`;
    };

    const DeleteConfirm = (evt) => {
        evt = evt || window.event;
        evt.preventDefault();
        evt.stopImmediatePropagation();

        if (_isDisabled(evt.target))
            return false;
        var data = _getDataItem(evt.target);
        if (!data)
            return;

        var $confirm = $("#confirm").length ? $("#confirm") : $("<div id='confirm'></div>").appendTo("body");
        var message = app.GridResources.DeleteMessage;
        var title = document.title;

        $confirm.kendoConfirm({
            title,
            content: `<p class="p-1">${message}</p>`
        }).getKendoConfirm().result.done(() => {
            _doDelete(data, evt.target);
        });
    };

    const Edit = (evt) => {
        evt = evt || window.event;
        evt.preventDefault();
        evt.stopImmediatePropagation();

        if (_isDisabled(evt.target))
            return false;

        var data = _getDataItem(evt.target);
        if (!data)
            return;
        window.location = `${app.Links.Edit}/${data.Id}`;
    };

    const Refresh = (evt) => {
        evt.preventDefault();
        _refreshGrid(_getButton(evt));
    };

    const _toggleActive = () => {
        var $active = $(".k-grid-active");
        $("input", $active).prop("checked", true);
    }

    const _cleanSearchBox = () => {
        $(".k-grid-search input").val("");
    }

    const Reset = (evt) => {
        evt.preventDefault();
        var $button = _getButton(evt);
        var kendoGrid = _getKendoGrid($button);
        if (!kendoGrid)
            return;
        _toggleActive();
        _cleanSearchBox();
        const { _sort, _group, _filter, _aggregate } = kendoGrid.dataSource;

        var pageSize = _getPageSize(kendoGrid.options.pageable.pageSizes);
        var options = {
            aggregate: _aggregate,
            filter: (kendoGrid.options.filterable ? [] : _filter),
            group: kendoGrid.options.groupable.enabled ? [] : _group,
            sort: kendoGrid.options.sortable ? [] : _sort,
        };

        if (pageSize)
            options = { ...options, ...{ page: 1, pageSize } };

        kendoGrid.dataSource.query(options);
    };

    const Templates = {
        MultiCheckItem: (e) =>
            ["<li class='k-item'>",
                "<label class='k-label'>",
                `<input type='checkbox' name='${e.field}' value='#:data.Value#'/> `,
                "<span>#= data.Text || data.all #</span>",
                "</label>",
                "</li>"].join("")
    };

    const AdditionalData = (e, gridId) => {
        var $button = $(gridId).find(".k-grid-active");
        if (!$button.length)
            return {};
        var checked = $('[name=ActiveOnly]', $button).is(":checked");
        return {
            activeOnly: checked
        };
    };

    const ToggleActive = (evt) => {
        var kendoGrid = _getKendoGrid(_getButton(evt));
        var dataSource = kendoGrid.dataSource;
        if(kendoGrid.pager != null && kendoGrid.pager.page() > 1)
            kendoGrid.pager.page(1);
        else
            dataSource.read();
    };

    const View = (evt) => {
        evt = evt || window.event;
        evt.preventDefault();
        evt.stopImmediatePropagation();

        if (_isDisabled(evt.target))
            return false;

        var data = _getDataItem(evt.target);
        if (!data)
            return false;
        window.location = `${app.Links.View}/${data.Id}`;
    };

    app.GridUtils = {
        AddNew,
        Delete,
        DeleteConfirm,
        Edit,
        Refresh,
        Reset,
        View,
        Templates,
        ToggleActive,
        AdditionalData,
    };

    $(() => {
        kendo.init($(".db-grid"));

        $(document).ajaxError((evt, jqXHR, ajaxSettings, thrownError) => {
            if (thrownError)
                notification.error(thrownError);
            else
                notification.error(jqXHR.responseText);
        });
    });

})(jQuery, window.app, window.kendo);
