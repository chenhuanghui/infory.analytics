'use strict';

angular.module('Smg')
    .factory('Auth', ['$cookieStore', '$document', 'remoteFactory',
        function($cookieStore, $document, remoteFactory) {

            function deleteCookie(name) {
                $document.context.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };

            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                $document.context.cookie = cname + "=" + cvalue + "; " + expires;
            }

            function normalize(str) {
                if (str[0] == '%')
                    return str.substr(3, str.length - 6);
                else
                    return str;
            }

            function getCookie(cname) {
                var name = cname + "=";
                var ca = $document.context.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i].trim();
                    if (c.indexOf(name) == 0) return normalize(c.substring(name.length, c.length));
                }

                return "";
            }

            function changeUser(user) {
                _.extend(currentUser, user);
            };

            // Lấy danh sách accessLevels và userRoles ở file js/routingConfig.
            var accessLevels = routingConfig.accessLevels,
                userRoles = routingConfig.userRoles;

            var currentUser = {
                username: '',
                role: userRoles.public
            };

            if (getCookie('user')) {
                var role = userRoles.public;

                switch (getCookie('role')) {
                    case 'user':
                        role = userRoles.user;
                        break;
                    case 'admin':
                        role = userRoles.admin;
                        break;
                }

                currentUser = {
                    name: getCookie('name'),
                    username: getCookie('user'),
                    role: role,
                    access_token: getCookie('access_token')
                }
            }

            return {
                authorize: function(accessLevel, role) {
                    if (role === undefined)
                        role = currentUser.role;

                    return accessLevel.bitMask & role.bitMask;
                },
                isLoggedIn: function(user) {
                    if (user === undefined)
                        user = currentUser;
                    return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
                },
                login: function(user, success, error) {
                    var rememberme = user.rememberme;

                    remoteFactory.login(user, function(res) {

                        if (res.status) {
                            var user = {
                                name: res.data.name,
                                username: res.data.username,
                                role: res.data.role,
                                access_token: res.data.access_token
                            };

                            deleteCookie('name');
                            deleteCookie('user');
                            deleteCookie('access_token');
                            deleteCookie('role');

                            if (rememberme) {
                                var expires = 7;
                                setCookie('name', user.name, expires);
                                setCookie('user', user.username, expires);
                                setCookie('access_token', user.access_token, expires);
                                setCookie('role', user.role.title, expires);
                            } else {
                                setCookie('name', user.name, expires);
                                $cookieStore.put('user', user.username);
                                $cookieStore.put('access_token', user.access_token);
                                $cookieStore.put('role', user.role.title);
                            }

                            changeUser(user);
                            success(user);
                        } else {
                            error(res.message);
                        }
                    }, error);
                },

                logout: function(success, error) {
                    var user = {
                        username: currentUser.username,
                        dashboard_token: currentUser.access_token
                    };

                    remoteFactory.logout(user, function(res) {
                        if (res.status) {
                            deleteCookie('user');
                            deleteCookie('role');
                            deleteCookie('access_token');
                        }

                        changeUser({
                            username: '',
                            role: userRoles.public
                        });

                        success();
                    }, error);
                },

                accessLevels: accessLevels,
                userRoles: userRoles,
                user: currentUser
            };
        }
    ]);