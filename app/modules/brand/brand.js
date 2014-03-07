angular.module('brand')

.controller('BrandCtrl', ['$scope', '$http', '$location', '$routeParams', 'brandRemote', 'commentRemote', 'dataFactory', 'productRemote',
    function($scope, $http, $location, $routeParams, brandRemote, commentRemote, dataFactory, productRemote) {

        var brandId = $routeParams.brandId;
        dataFactory.updateBrandSideBar(brandId);
        $scope.gallery = null;
        $scope.usersGallery = null;
        $scope.products = null;

        $scope.brand = null;
        $scope.brands = null;
        $scope.commentInput = '';
        $scope.editName = false;

        $scope.bundle = {
            brandName: '',
            brandDescription: '',
            brandWebsite: '',
            brandFanpage: '',
            brandContact: '',
            editName: false,
            editDescription: false,
            editWebsite: false,
            editFanpage: false
        };

        $scope.oderComments = [{
            field: 'like_count',
            display: 'Lượt thích'
        }, {
            field: 'updated_time',
            display: 'Thời gian'
        }];

        function saveBundle(data) {
            $scope.bundle.brandLogo = data.logo;
            $scope.bundle.brandName = data.name;
            $scope.bundle.brandCover = data.cover;
            $scope.bundle.brandDescription = data.description;
            $scope.bundle.brandWebsite = data.website;
            $scope.bundle.brandFanpage = data.fanpage;
            $scope.bundle.brandContact = data.owner_phone;
        }

        dataFactory.getBrands(function(brands) {
            $scope.brands = brands;
            if (brands.length != 0) {
                if (brandId == null) {
                    dataFactory.getBrand(brands[0].id, function(data) {
                        $scope.brand = data;
                        $scope.shop = $scope.brand.shops[0];
                        saveBundle($scope.brand);
                        refactorDateTimeMessage($scope.brand);
                        dataFactory.updateHome($scope.brand.id);
                    }, function() {})
                } else {
                    for (var i = 0; i < brands.length; i++) {
                        if (brands[i].id == brandId) {
                            dataFactory.getBrand(brands[i].id, function(data) {
                                $scope.brand = data;
                                $scope.shop = $scope.brand.shops[0];
                                saveBundle($scope.brand);
                                refactorDateTimeMessage($scope.brand);
                                dataFactory.updateHome($scope.brand.id);
                            }, function() {})
                            break;
                        }
                    }
                }
            }
        }, function() {});

        function refactorDateTimeMessage(brand) {
            for (var i = 0; i < brand.shops.length; i++) {
                for (var j = 0; j < brand.shops[i].comments.length; j++) {
                    var newDate = new Date(brand.shops[i].comments[j].updated_time);
                    var d = newDate.getDate();
                    var m = newDate.getMonth() + 1;
                    var y = newDate.getFullYear();
                    var h = newDate.getHours();
                    var min = newDate.getMinutes();

                    brand.shops[i].comments[j].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                    brand.shops[i].comments[j].timeDisplay = (h <= 9 ? '0' + h : h) + ' : ' + (min <= 9 ? '0' + min : min);
                }
            }
        }

        $scope.setCurrentBrand = function(brand) {
            $scope.brand = brand;
            dataFactory.setCurrentBrand(brand);
        }

        $scope.showUserProfile = function(brandId, userId, username, avatar) {
            dataFactory.setUsernameAvatar(username, avatar);

            //FOR TESTING REASON
            userId = 411;
            $location.path('/user/' + brandId + '/' + userId);
        }

        $scope.goToShopInfo = function(shop) {
            dataFactory.setTempShop(shop);
            $location.path('/shop/' + $scope.brand.id + '/' + shop.id);
        }

        $scope.changeName = function() {
            if ($scope.bundle.brandName.length <= 0) {
                $scope.bundle.brandName = $scope.brand.name;
            } else {
                brandRemote.update({
                    name: $scope.bundle.brandName,
                    brand_id: brandId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.brand.name = $scope.bundle.brandName;
                        $scope.bundle.editName = !$scope.bundle.editName;
                        dataFactory.setCurrentBrand($scope.brand);
                    } else {
                        $scope.bundle.editName = !$scope.bundle.editName;
                        $scope.bundle.brandName = $scope.brand.name;
                    }
                }, function() {

                });
            }
        }

        $scope.changeDescription = function() {
            if ($scope.bundle.brandDescription.length <= 0) {
                $scope.bundle.brandDescription = $scope.brand.description;
            } else {
                brandRemote.update({
                    description: $scope.bundle.brandDescription,
                    brand_id: brandId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.brand.description = $scope.bundle.brandDescription;
                        $scope.bundle.editDescription = !$scope.bundle.editDescription;
                        dataFactory.setCurrentBrand($scope.brand);
                    } else {
                        $scope.bundle.editDescription = !$scope.bundle.editDescription;
                        $scope.bundle.brandDescription = $scope.brand.description;
                    }
                }, function() {

                });
            }
        }

        $scope.changeWebsite = function() {
            if ($scope.bundle.brandWebsite.length <= 0) {
                $scope.bundle.brandWebsite = $scope.brand.website;
            } else {
                brandRemote.update({
                    website: $scope.bundle.brandWebsite,
                    brand_id: brandId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.brand.website = $scope.bundle.brandWebsite;
                        $scope.bundle.editWebsite = !$scope.bundle.editWebsite;
                        dataFactory.setCurrentBrand($scope.brand);
                    } else {
                        $scope.bundle.editWebsite = !$scope.bundle.editWebsite;
                        $scope.bundle.brandWebsite = $scope.brand.website;
                    }
                }, function() {

                });
            }
        }

        $scope.changeFanpage = function() {
            if ($scope.bundle.brandFanpage.length <= 0) {
                $scope.bundle.brandFanpage = $scope.brand.fanpage;
            } else {
                brandRemote.update({
                    fanpage: $scope.bundle.brandFanpage,
                    brand_id: brandId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.brand.fanpage = $scope.bundle.brandFanpage;
                        $scope.bundle.editFanpage = !$scope.bundle.editFanpage;
                        dataFactory.setCurrentBrand($scope.brand);
                    } else {
                        $scope.bundle.editFanpage = !$scope.bundle.editFanpage;
                        $scope.bundle.brandFanpage = $scope.brand.fanpage;
                    }
                }, function() {

                });
            }
        }

        $scope.delComment = function(id) {
            commentRemote.delete({
                comment_id: id
            }, function(data) {
                if (data.error == undefined) {
                    for (var i = $scope.shop.comments.length - 1; i >= 0; i--) {
                        if ($scope.shop.comments[i].id == id) {
                            $scope.shop.comments.splice(i, 1);
                            return;
                        }
                    }
                }
            }, function() {})
        };

        $scope.addComment = function() {
            commentRemote.create({
                shop_id: $scope.shop.id,
                content: $scope.commentInput
            }, function(data) {
                if (data.error == undefined) {
                    commentRemote.get({
                        comment_id: data.comment_id
                    }, function(data) {
                        var newDate = new Date(data.updated_time);
                        var d = newDate.getDate();
                        var m = newDate.getMonth() + 1;
                        var y = newDate.getFullYear();
                        var h = newDate.getHours();
                        var min = newDate.getMinutes();

                        data.dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                        data.timeDisplay = (h <= 9 ? '0' + h : h) + ' : ' + (min <= 9 ? '0' + min : min);
                        $scope.shop.comments.unshift(data);
                        $scope.commentInput = '';
                    });
                }
            });
        };

        $scope.changeCover = function(id) {};

        $scope.showGallery = function() {

            if ($scope.gallery == null) {
                var fields = {
                    id: brandId,
                    fields: '["gallery"]'
                };

                brandRemote.get(fields, function(data) {
                    if (data.gallery == null)
                        $scope.gallery = [];
                    else
                        $scope.gallery = JSON.parseJSON(data.gallery);
                }, function() {});
            }
        }

        $scope.showProducts = function() {
            if ($scope.products == null) {
                var fields = {
                    id: brandId,
                    fields: '["menu"]'
                };

                brandRemote.get(fields, function(data) {
                    if (data.undefined == null) {
                        $scope.brand.categories = data.menu;
                        $scope.category = $scope.brand.categories[0];
                    }
                }, function() {});
            }
        }

        $scope.productTemp = {
            name: '',
            description: ''
        };

        $scope.changeProductName = function(categoryId, productId, name) {
            var fields = {
                product_id: productId,
                category_id: categoryId,
                name: name
            };

            productRemote.update(fields, function(data) {
                if (data.error == undefined) {
                    for (var i = 0; i < $scope.brand.categories.length; i++) {
                        if ($scope.brand.categories[i].id == categoryId) {
                            for (var j = 0; j < $scope.brand.categories[i].products.length; j++) {
                                if ($scope.brand.categories[i].products[i].id == productId) {
                                    $scope.brand.categories[i].products[i].name = name;
                                    return;
                                }
                            }
                        }
                    }
                }
            }, function() {});
        }

        $scope.changeProductDescription = function(categoryId, productId, description) {
            var fields = {
                product_id: productId,
                category_id: categoryId,
                description: description
            };

            productRemote.update(fields, function(data) {
                if (data.error == undefined) {
                    for (var i = 0; i < $scope.brand.categories.length; i++) {
                        if ($scope.brand.categories[i].id == categoryId) {
                            for (var j = 0; j < $scope.brand.categories[i].products.length; j++) {
                                if ($scope.brand.categories[i].products[i].id == productId) {
                                    $scope.brand.categories[i].products[i].full_description = description;
                                    return;
                                }
                            }
                        }
                    }
                }
            }, function() {});
        }

        $scope.addProduct = function(categoryId) {

            if ($scope.productTemp.name == '' || $scope.productTemp.description == '')
                return;

            var fields = {
                category_id: categoryId,
                name: $scope.productTemp.name,
                full_description: $scope.productTemp.description,
                price: 0

            };

            productRemote.create(fields, function(data) {
                if (data.error == undefined) {
                    for (var i = 0; i < $scope.brand.categories.length; i++) {
                        if ($scope.brand.categories[i].id == categoryId) {
                            $scope.brand.categories[i].products.unshift({
                                name: $scope.productTemp.name,
                                id: data.product_id,
                                category_id: $scope.category.id,
                                full_description: $scope.productTemp.description,
                                images: ['']
                            });
                            return;
                        }
                    }


                    dataFactory.setCurrentBrand($scope.brand);
                }

                $scope.productTemp = {
                    name: '',
                    description: ''
                };
            }, function() {});
        };

        $scope.$watch('brand', function() {
            if ($scope.brand != null) {
                dataFactory.updateBrandHeader($scope.brand);
                dataFactory.updateBrandSideBar($scope.brand.id);
                dataFactory.updateHomeBrand($scope.brand.id);
            }
        });

        $scope.$watch('brands', function() {
            if ($scope.brands != null)
                dataFactory.updateBrandsHeader($scope.brands);
        });
    }
])

.controller('createPromotionCtrl', ['$scope', '$routeParams', 'remoteFactory',
    function($scope, $routeParams, remoteFactory) {
        var brandId = $routeParams.brandId;


        $scope.data = {
            dateDropDownInput: moment("2013-01-22T00:00:00.000").toDate(),
            dateDisplay: "22-01-2013"
        };

        $scope.onTimeSet = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data.dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
        }
    }


])
    .config(function($routeProvider) {
        var access = routingConfig.accessLevels;

        $routeProvider
            .when('/brand/infor/:brandId', {
                templateUrl: 'modules/brand/brand/brand.html',
                controller: 'BrandCtrl',
                access: access.user
            })
            .when('/brand/new', {
                templateUrl: 'modules/brand/brand_new.html',
                controller: 'brandCreateCtrl',
                access: access.user
            })
            .when('/brand/comment/:brandId', {
                templateUrl: 'modules/brand/comment/comment.html',
                controller: 'BrandCtrl',
                access: access.user

            })
            .when('/brand/new', {
                templateUrl: 'modules/brand/brand_new.html',
                controller: 'BrandCtrl',
                access: access.user
            })
    });