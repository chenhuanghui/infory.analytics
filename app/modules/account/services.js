'use strict';

angular.module('dashboardSmgApp')
    .factory('Auth', function($http, $cookieStore, $document) {

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
            register: function(user, success, error) {
                $http.post('/register', user).success(function(res) {
                    changeUser(res);
                    success();
                }).error(error);
            },
            login: function(user, success, error) {
                var rememberme = user.rememberme;

                $http.post('http://dev2.smartguide.vn/dashboard/auth', user).success(function(res) {

                    if (res.status) {
                        var user = {
                            username: res.data.username,
                            role: res.data.role,
                            access_token: res.data.access_token
                        };

                        var user_test = {
                            username: 'duong.truong@redbase.vn',
                            role: {
                                bitMask: 4,
                                title: 'admin'
                            },
                            access_token: user.access_token
                        };


                        //FOR TESTING REASON    
                        user = user_test;

                        deleteCookie('user');
                        deleteCookie('access_token');
                        deleteCookie('role');

                        if (rememberme) {
                            var expires = 7;
                            setCookie('user', user.username, expires);
                            setCookie('access_token', user.access_token, expires);
                            setCookie('role', user.role.title, expires);
                        } else {
                            $cookieStore.put('user', user.username);
                            $cookieStore.put('access_token', user.access_token);
                            $cookieStore.put('role', user.role.title);
                        }

                        changeUser(user);
                        success(user);
                    }
                }).error(error);
            },

            logout: function(success, error) {
                var user = {
                    username: currentUser.username,
                    dashboard_token: currentUser.access_token
                };

                $http.post('http://dev2.smartguide.vn/dashboard/api/v1/logout', user).success(function(res) {

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
                }).error(error);
            },

            accessLevels: accessLevels,
            userRoles: userRoles,
            user: currentUser
        };
    });