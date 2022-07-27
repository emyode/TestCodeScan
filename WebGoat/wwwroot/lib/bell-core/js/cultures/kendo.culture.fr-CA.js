((kendo) => {

    const cultureName = "fr-CA";
    kendo.culture(cultureName);
    const culture = kendo.cultures[cultureName];

    if (culture) {
        culture.calendars.standard.AM[0] = 'AM';
        culture.calendars.standard.PM[0] = 'PM';
    }

    if (kendo.ui.Grid) {
        kendo.ui.Grid.prototype.options.messages.editable.confirmation = "Êtes-vous sûr de vouloir supprimer cet élément?";
        kendo.ui.Grid.prototype.options.messages.noRecords = "Aucun élément disponible.";
    }

    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.messages.clear = "Effacer";
        kendo.ui.FilterMenu.prototype.options.messages.info = "Filtres";
        kendo.ui.FilterMenu.prototype.options.messages.title = "Filtres";
        kendo.ui.FilterMenu.prototype.options.messages.selectValue = "Sélectionnez...";
    }

    if (kendo.ui.FilterMultiCheck) {
        kendo.ui.FilterMultiCheck.prototype.options.messages =
            $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
                "checkAll": "Tout",
                "clear": "Effacer",
                "selectedItemsFormat": "{0} élément(s) sélectionné(s)"
            });
    }
    if (kendo.ui.DateInput) {
        kendo.ui.DateInput.prototype.options.messages = {
            year: "année",
            month: "mois",
            day: "jour",
            weekday: "jour de la semaine",
            hour: "heures",
            minute: "minutes",
            second: "secondes",
            dayperiod: "AM/PM",
        };
    }
})(window.kendo);
