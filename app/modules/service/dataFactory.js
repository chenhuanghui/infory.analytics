angular.module('smg.services')
    .factory('dataFactory', ['$http', 'remoteFactory', 'brandRemote', 'shopRemote', 'userRemote', 'accountRemote',

        function($http, remoteFactory, brandRemote, shopRemote, userRemote, accountRemote) {

            var updateHomeFunc = null;

            var updateBrandHeaderFunc = null;
            var updateBrandsHeaderFunc = null;
            var updateAccountNameHeaderFunc = null;
            var updateBrandSideBarFunc = null;
            var updateHomeBrandFunc = null;

            var brands = null;
            var tempShop = null;
            var user_pre = {
                username: null,
                avatar: null
            };

            var userProfile = null;
            var currentShop = null;
            var currentBrand = null;
            var currentResultUserFilter = null;
            var usersOfBrand = {
                id: null,
                users: null
            }


            return {
                updateShopInBrand: function(shopId, brandId, shop) {
                    if (currentBrand != null && currentBrand.id == brandId) {
                        for (var i = 0; i < currentBrand.shops.length; i++) {
                            if (currentBrand.shops[i].id == shopId) {
                                currentBrand.shops[i] = shop;
                                return;
                            }
                        }
                    }
                },
                setUpdateHomeBrandFunc: function(func) {
                    updateHomeBrandFunc = func;
                },
                updateHomeBrand: function(brand) {
                    if (updateHomeBrandFunc != null)
                        updateHomeBrandFunc(brand);
                },
                updateBrandSideBar: function(id) {
                    if (updateBrandSideBarFunc != null) {
                        updateBrandSideBarFunc(id);
                    }
                },
                setUpdateBrandSideBarFunc: function(func) {
                    updateBrandSideBarFunc = func;
                },
                updateAccountNameHeader: function(name) {
                    if (updateAccountNameHeaderFunc != null)
                        updateAccountNameHeaderFunc(name);
                },
                updateBrandsHeader: function(brands) {
                    if (updateBrandsHeaderFunc != null)
                        updateBrandsHeaderFunc(brands);
                },
                updateBrandHeader: function(brand) {
                    if (updateBrandHeaderFunc != null)
                        updateBrandHeaderFunc(brand);
                },
                setUpdateBrandHeaderFunc: function(func) {
                    updateBrandHeaderFunc = func;
                },
                setUpdateBrandsHeaderFunc: function(func) {
                    updateBrandsHeaderFunc = func;
                },
                setUpdateAccountNameHeaderFunc: function(func) {
                    updateAccountNameHeaderFunc = func;
                },
                setUpdateHomeFunc: function(func) {
                    updateHomeFunc = func;
                },
                updateHome: function(brandId) {
                    if (updateHomeFunc != null)
                        updateHomeFunc(brandId);
                },
                setCurrentResultUserFilter: function(result) {
                    currentResultUserFilter = result;
                },
                getCurrentResultUserFilter: function() {
                    return currentResultUserFilter;
                },
                setUsersOfBrand: function(brandId, users) {
                    usersOfBrand = {
                        id: brandId,
                        users: users
                    }
                },
                getUsersOfBrand: function(brandId, success, error) {
                    if (usersOfBrand != null && usersOfBrand.id == brandId) {
                        success(usersOfBrand);
                    } else {
                        var fields = {
                            id: brandId,
                            fields: '["users"]'
                        }

                        usersOfBrand.id = brandId;

                        brandRemote.get(fields, function(data) {
                            usersOfBrand.users = data.users;
                            success(data);
                        }, function() {
                            usersOfBrand.id = null;
                            error;
                        });
                    }
                },
                setTempShop: function(shop) {
                    tempShop = shop;
                },
                getTempShop: function() {
                    return tempShop;
                },
                getShop: function(id, fields, success, error) {
                    if (currentShop != null && currentShop.id == id)
                        success(currentShop);
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
                setCurrentShop: function(shop) {
                    currentShop = shop;
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