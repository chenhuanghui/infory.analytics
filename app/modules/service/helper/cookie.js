'use strict';

angular.module('Smg')
    .factory('cookie', ['$document',
        function($document) {

            function normalize(str) {
                if (str[0] == '%')
                    return str.substr(3, str.length - 6);
                else
                    return str;
            }

            return {
                deleteCookie: function(name) {
                    $document.context.cookie = encodeURI(name) + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.infory.vn;path=/';
                },

                setCookie: function(cname, cvalue, exdays) {
                    var expires = "";
                    if(exdays !== 0)
                    {
                        var d = new Date();
                        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                        expires = ";expires=" + d.toGMTString();
                    }

                    $document.context.cookie = encodeURI(cname) + "=" + encodeURI(cvalue) + expires + ";domain=.infory.vn;path=/";
                },

                getCookie: function(cname) {
                    var name = encodeURI(cname) + "=";
                    var ca = $document.context.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i].trim();
                        if (c.indexOf(name) == 0) return normalize(decodeURI(c.substring(name.length, c.length)));
                    }

                    return "";
                }
            }
        }
    ]);