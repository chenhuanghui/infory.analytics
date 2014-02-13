Smg = (function () {
    var baseURL = "http://api.smartguide.vn";
    return {
        api: function (path, method, data, callback) {
            if (arguments.length == 1) {
                method = 'GET';
                data = {};
                callback = function(data, textStatus, jqXHR) {

                };
            }
            else if (arguments.length == 2) {
                if (Object.prototype.toString.call(method) == "[object Function]") {
                    callback = method;
                    method = 'GET';
                    data = {};
                }
            }
            else if (arguments.length == 3) {
                if(typeof method === 'string') {
                    callback = data;
                    data = {};
                }
                else if (Object.prototype.toString.call(data) == "[object Function]") {
                    callback = data;
                    data = method;
                    method = 'GET';
                }
            }
            var url = [baseURL, path].join('/').replace(/\/\//g, '\/');
            url = [(this.base_url ? this.base_url : null), url].join('/');
            url = "http://dashboard.smartguide.vn";
            request = $.ajax({
                url: url,
                type: method,
                data: data,
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                    callback(data, textStatus, jqXHR);
                }
            });

            return request;
        }

    };
}());
