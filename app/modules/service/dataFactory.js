angular.module('smg.services')
    .factory('dataFactory', ['$http', 'remoteFactory', 'brandRemote', 'shopRemote', 'userRemote', 'accountRemote',

        function($http, remoteFactory, brandRemote, shopRemote, userRemote, accountRemote) {

            var brands = null;
            var tempShop = null;
            var user_pre = {
                username: null,
                avatar: null
            };

            var userProfile = null;
            var currentShop = null;
            var currentBrand = null;

            return {
                setTempShop: function(shop) {
                    tempShop = shop;
                },
                getTempShop: function() {
                    return tempShop;
                },
                getShop: function(id, fields, success, error) {
                    if (currentShop != null && currentShop.id == id)
                        return currentShop;
                    else {
                        shopRemote.get({
                            fields: fields,
                            shop_id: id,
                        }, function(data) {
                            currentShop = data;
                            success(data);
                        }, error);
                    }

                },
                setUsernameAvatar: function(username, avatar) {
                    user_pre.username = username;
                    user_pre.avatar = avatar;
                },
                getUsernameAvatar: function() {
                    return user_pre;
                },
                setCurrentBrand: function(brand) {
                    currentBrand = brand;
                },
                getCurrentBrand: function() {
                    return currentBrand;
                },
                getBrands: function(success, error) {
                    if (brands != null)
                        success(brands);
                    else {
                        var fields = '["name", "id", "cover", "type_business", "website", "fanpage", "description", "id", "owner_phone", "owner_address", "logo"]';
                        brandRemote.getList({
                            fields: fields
                        }, function(data) {
                            brands = data;
                            success(brands);
                        }, error);
                    }
                },
                getBrand: function(id, success, error) {
                    if (currentBrand != null && currentBrand.id == id) {
                        success(currentBrand);
                    } else {
                        var fields = '["name", "id", "cover", "type_business", "website", "fanpage", "description", "shops", "id", "owner_phone", "owner_address", "logo"]';
                        brandRemote.get({
                            fields: fields,
                            id: id,
                        }, function(data) {
                            currentBrand = data;
                            success(currentBrand);
                        }, error);
                    }
                },
                getUserProfile: function(brandId, userId, success, error) {
                    if (userProfile != null) {
                        success(userProfile);
                    } else {
                        var fields = '["dob", "name", "id", "avatar", "phone", "address", "email", "last_visit", "timeline", "city", "gender", "facebook"]';
                        userRemote.get({
                            fields: fields,
                            brand_id: brandId,
                            user_id: userId
                        }, function(data) {
                            userProfile = data;
                            success(userProfile);
                        }, error);
                    }
                }
            }

        }
    ])