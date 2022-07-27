((app) => {
    const root = () => $("[name='SiteRoot']").val();
    app.urls = {
        Action: (controller, action, queryString) => {
            var url = `${root()}/${controller}`;
            if (action)
                url += `/${action}`;
            if (queryString)
                url +=  `?${queryString}`;
            return url;
        },
        Content: (url) => {
            return `${root()}/${url}`;
        },
        Home: () => {
            return root();
        }
    }
})(window.app);