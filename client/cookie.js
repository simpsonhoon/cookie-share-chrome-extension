var getAllCookies = function(page_url, success_handler) {
    return chrome.cookies.getAll({
        url: page_url
    }, function(cookie_array) {
        var cookie_data = { url: page_url, cookies: cookie_array };
        success_handler(cookie_data);
    });
};



var loadCookies = function(data) {
    
    for (var i in data.cookies) {
        
        var cookie = _.pick(
            data.cookies[i],
            [
                'name', 'domain', 'value', 'path', 'secure', 'httpOnly',
                'expirationDate'
            ]
        );

        cookie.url = data.url;
        chrome.cookies.set(cookie);
    }
    return data.url;
};



