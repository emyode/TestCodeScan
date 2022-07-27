(($, app, kendo) => {
    const ToggleDrawer = (drawer) => {
        if (drawer.visible) {
            drawer.hide();
            $("#drawer li .k-blank").animate({ width: 24, 'margin-left': 8, 'margin-right': 8 }, 100);
        }
        else {
            drawer.show();
            $("#drawer li .k-blank").animate({ width: 0, 'margin-left': 0, 'margin-right': 0 }, 100);
        }
    }
    let loading = false;
    const arrows = {
        selector: "[class*=k-i-arrow-chevron]",
        open: "k-i-arrow-chevron-down",
        close: "k-i-arrow-chevron-right"
    }

    const onItemClick = (e) => {
        if (loading) {
            e.preventDefault();
            return false;
        }

        if (e.item.hasClass("collapser")) {
            ToggleDrawer(e.sender);
            e.item.find("[class*='chevron']").toggleClass("bi-chevron-double-left").toggleClass("bi-chevron-double-right");
        }
        else if (e.item.hasClass("logo")) {
            loading = true;
            setTimeout(() => { $("body").loader('show'); }, 5000);
            window.location = app.urls.Action("Home");
        }
        else if (e.item.data("action")) {
            loading = true;
            setTimeout(() => { $("body").loader('show'); }, 5000);
            window.location = e.item.data("action");
        }
        else if (e.item.data("id")) {
            toggleGroup(e.item);
        }
    };

    const toggleGroup = ($li) => {
        var group = $li.data("id");
        var $items = $li.closest("ul").find(`li[data-group='${group}']`);
        var $icon = $li.find(arrows.selector);
        if ($li.data("open")) {
            $icon.removeClass(arrows.open);
            $icon.addClass(arrows.close);
            $items.addClass("k-hidden");
            $li.data("open", false);
        }
        else {
            $icon.removeClass(arrows.close);
            $icon.addClass(arrows.open);
            $items.removeClass("k-hidden");
            $li.data("open", true);
        }
    }

    app.Menu = {
        onItemClick,
    }
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    $(() => {
        kendo.init("#switch-language");
        $(".k-button-page-top").on('click', topFunction);
    });
})(jQuery, window.app, window.kendo);


function DrawerMenuItems() {
    var self = this;

    const items = localStorage.getItem("DrawerMenuItems") ? JSON.parse(localStorage.getItem("DrawerMenuItems")) : {};
    console.log(items);
    self.isOpen = (id) => {
        return items[id];
    }
    self.setState = (id, opened) => {
        items[id] = opened;
        localStorage.setItem("DrawerMenuItems", JSON.stringify(items));
    }
    self.getItems = () => {
        return items;
    }
    return self;
}


$.fn.scrollEnd = function(callback, timeout) {          
  $(this).on('scroll', function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};