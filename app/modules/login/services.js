'use strict';

angular.module('dashboardSmgApp')
    .factory('Auth', function($http, $cookieStore) {

        // Lấy danh sách accessLevels và userRoles ở file js/routingConfig.
        var accessLevels = routingConfig.accessLevels,
            userRoles = routingConfig.userRoles;

        var currentUser = {
            username: '',
            role: userRoles.public
        };

        if ($cookieStore.get('user')) {
            var role = userRoles.public;

            switch ($cookieStore.get('role')) {
                case 'user':
                    role = userRoles.user;
                    break;
                case 'admin':
                    role = userRoles.admin;
                    break;
            }
            currentUser = {
                username: $cookieStore.get('user'),
                role: role
            }
        }

        // Uncomment for testing
        // $cookieStore.remove('user');

        function changeUser(user) {
            _.extend(currentUser, user);
        };

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

                $http.post('http://smartguide.dev/loginapi', user).success(function(res) {

                    $cookieStore.put('user', res.username);
                    $cookieStore.put('role', res.role.title);

                    changeUser(res);
                    success(res);

                }).error(error);
            },

            logout: function(success, error) {
                $http.post('/logout').success(function() {
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