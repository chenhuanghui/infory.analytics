/**
 * Remote Module
 *
 * Description
 */
angular.module('smg.services')
    .factory('remoteFactory', function($http) {
        //var base_url = "http://dev2.smartguide.vn/dashboard/api/v1/";
        var base_url = "http://smartguide.dev/dashboard/api/v1/";
        return {
            getBaseUrl: function() {
                return base_url;
            },
            api: function(path, method, data, success, error) {
                var url = base_url + path;
                request = $http({
                    url: url,
                    method: method
                }).success(success).error(error);
                return request;
            },

            meta_property_types: {
                number: {
                    operators: [
                        "larger_than",
                        "smaller_than",
                        "between",
                        "larger_than_or_equal",
                        "smaller_than_or_equal",
                        "equal"
                    ],
                    operators_display: [
                        "lớn hơn",
                        "nhỏ hơn",
                        "trong khoảng",
                        "lớn hơn hoặc bằng",
                        "bé hơn hoặc bằng",
                        "bằng"
                    ],
                    operators_ui_controller: [
                        "number input",
                        "number input",
                        "two number input",
                        "number input",
                        "number input",
                        "number input"
                    ]
                },
                group: {
                    operators: [
                        "belong"
                    ],
                    operators_display: [
                        "là"
                    ],
                    operators_ui_controller: [
                        "dropdown"
                    ]
                },
                text: {
                    operators: [
                        "contain"
                    ],
                    operators_display: [
                        "chứa từ"
                    ],
                    operators_ui_controller: [
                        "text input"
                    ]
                },
                time: {
                    operators: [
                        "before",
                        "before_date",
                        "after_date",
                        "between_dates"
                    ],
                    operators_display: [
                        "cách đây",
                        "trước ngày",
                        "sau ngày",
                        "trong khoảng thời gian"
                    ],
                    operators_ui_controller: [
                        "time dropdown",
                        "date picker",
                        "date picker",
                        "two date picker"
                    ]
                },
            },

            meta_lists: {
                shops: [
                    "Cửa hàng 1",
                    "Cửa hàng 2",
                    "Cửa hàng 3",
                    "Cửa hàng 4"
                ],
                cities: [
                    "An Giang",
                    "Bà Rịa - Vũng Tàu",
                    "Bắc Giang",
                    "Bắc Kạn",
                    "Bạc Liêu",
                    "Bắc Ninh",
                    "Bến Tre",
                    "Bình Định",
                    "Bình Dương",
                    "Bình Phước",
                    "Bình Thuận",
                    "Cà Mau",
                    "Cao Bằng",
                    "Đắk Lắk",
                    "Đắk Nông",
                    "Điện Biên",
                    "Đồng Nai",
                    "Đồng Tháp",
                    "Gia Lai",
                    "Hà Giang",
                    "Hà Nam",
                    "Hà Tĩnh",
                    "Hải Dương",
                    "Hậu Giang",
                    "Hòa Bình",
                    "Hưng Yên",
                    "Khánh Hòa",
                    "Kiên Giang",
                    "Kon Tum",
                    "Lai Châu",
                    "Lâm Đồng",
                    "Lạng Sơn",
                    "Lào Cai",
                    "Long An",
                    "Nam Định",
                    "Nghệ An",
                    "Ninh Bình",
                    "Ninh Thuận",
                    "Phú Thọ",
                    "Quảng Bình",
                    "Quảng Nam",
                    "Quảng Ngãi",
                    "Quảng Ninh",
                    "Quảng Trị",
                    "Sóc Trăng",
                    "Sơn La",
                    "Tây Ninh",
                    "Thái Bình",
                    "Thái Nguyên",
                    "Thanh Hóa",
                    "Thừa Thiên Huế",
                    "Tiền Giang",
                    "Trà Vinh",
                    "Tuyên Quang",
                    "Vĩnh Long",
                    "Vĩnh Phúc",
                    "Yên Bái",
                    "Phú Yên",
                    "Cần Thơ",
                    "Đà Nẵng",
                    "Hải Phòng",
                    "Hà Nội",
                    "Hồ Chí Minh"
                ],
                platforms: [
                    "iOS",
                    "Android",
                    "Web"
                ],
                genders: ["Nam", "Nữ"],
                careers: [
                    "học sinh",
                    "sinh viên",
                    "giáo viên",
                    "công nhân",
                    "lập trình viên",
                    "nhà khoa học"
                ]
            },

            meta_events: [{
                name: "view",
                name_display: "view",
                properties: [{
                    name: "shop",
                    name_display: "shop",
                    type: "group",
                    available_values: "shops"
                }, {
                    name: "time",
                    name_display: "time",
                    type: "time"
                }, {
                    name: "platform",
                    name_display: "user platform",
                    type: "group",
                    available_values: "platforms"
                }, {
                    name: "user_city",
                    name_display: "user city",
                    type: "group",
                    available_values: "cities"
                }, {
                    name: "user_age",
                    name_display: "user age",
                    type: "number"
                }, {
                    name: "user_gender",
                    name_display: "user gender",
                    type: "group",
                    available_values: "genders"
                }, {
                    name: "user_career",
                    name_display: "user career",
                    type: "group",
                    available_values: "careers"
                }, {
                    name: "user_total_charge",
                    name_display: "user total charge",
                    type: "number"
                }, {
                    name: "user_view_count",
                    name_display: "user view count",
                    type: "number"
                }, {
                    name: "user_checkin_count",
                    name_display: "user checkin count",
                    type: "number"
                }, {
                    name: "user_checkout_count",
                    name_display: "user checkout count",
                    type: "number"
                }, {
                    name: "user_comment_count",
                    name_display: "user comment count",
                    type: "number"
                }]
            }, {
                name: "checkin",
                name_display: "checkin",
                properties: [{
                    name: "shop",
                    name_display: "shop",
                    type: "group",
                    available_values: "shops"
                }, {
                    name: "time",
                    name_display: "time",
                    type: "time"
                }, {
                    name: "platform",
                    name_display: "user platform",
                    type: "group",
                    available_values: "platforms"
                }, {
                    name: "friend_count",
                    name_display: "friend count",
                    type: "number"
                }, {
                    name: "user_city",
                    name_display: "user city",
                    type: "group",
                    available_values: "cities"
                }, {
                    name: "user_age",
                    name_display: "user age",
                    type: "number"
                }, {
                    name: "user_gender",
                    name_display: "user gender",
                    type: "group",
                    available_values: "gender"
                }, {
                    name: "user_career",
                    name_display: "user career",
                    type: "group",
                    available_values: "careers"
                }, {
                    name: "user_total_charge",
                    name_display: "user total charge",
                    type: "number"
                }, {
                    name: "user_view_count",
                    name_display: "user view count",
                    type: "number"
                }, {
                    name: "user_checkin_count",
                    name_display: "user checkin count",
                    type: "number"
                }, {
                    name: "user_checkout_count",
                    name_display: "user checkout count",
                    type: "number"
                }, {
                    name: "user_comment_count",
                    name_display: "user comment count",
                    type: "number"
                }]
            }, {
                name: "checkout",
                name_display: "checkout",
                properties: [{
                    name: "shop",
                    name_display: "shop",
                    type: "group",
                    available_values: "shops"
                }, {
                    name: "time",
                    name_display: "time",
                    type: "time"
                }, {
                    name: "platform",
                    name_display: "user platform",
                    type: "group",
                    available_values: "platforms"
                }, {
                    name: "charge",
                    name_display: "user expense",
                    type: "number"
                }, {
                    name: "user_city",
                    name_display: "user city",
                    type: "group",
                    available_values: "cities"
                }, {
                    name: "user_age",
                    name_display: "user age",
                    type: "number"
                }, {
                    name: "user_gender",
                    name_display: "user gender",
                    type: "group",
                    available_values: "gender"
                }, {
                    name: "user_career",
                    name_display: "user career",
                    type: "group",
                    available_values: "careers"
                }, {
                    name: "user_total_charge",
                    name_display: "user total charge",
                    type: "number"
                }, {
                    name: "user_view_count",
                    name_display: "user view count",
                    type: "number"
                }, {
                    name: "user_checkin_count",
                    name_display: "user checkin count",
                    type: "number"
                }, {
                    name: "user_checkout_count",
                    name_display: "user checkout count",
                    type: "number"
                }, {
                    name: "user_comment_count",
                    name_display: "user comment count",
                    type: "number"
                }]
            }, {
                name: "comment",
                name_display: "comment",
                properties: [{
                    name: "shop",
                    name_display: "shop",
                    type: "group",
                    available_values: "shops"
                }, {
                    name: "created_time",
                    name_display: "date create",
                    type: "time"
                }, {
                    name: "updated_time",
                    name_display: "date update",
                    type: "time"
                }, {
                    name: "platform",
                    name_display: "user platform",
                    type: "group",
                    available_values: "platforms"
                }, {
                    name: "content",
                    name_display: "comment content",
                    type: "text"
                }, {
                    name: "user_city",
                    name_display: "user city",
                    type: "group",
                    available_values: "cities"
                }, {
                    name: "user_age",
                    name_display: "user age",
                    type: "number"
                }, {
                    name: "user_gender",
                    name_display: "user gender",
                    type: "group",
                    available_values: "gender"
                }, {
                    name: "user_career",
                    name_display: "user career",
                    type: "group",
                    available_values: "careers"
                }, {
                    name: "user_total_charge",
                    name_display: "user total charge",
                    type: "number"
                }, {
                    name: "user_view_count",
                    name_display: "user view count",
                    type: "number"
                }, {
                    name: "user_checkin_count",
                    name_display: "user checkin count",
                    type: "number"
                }, {
                    name: "user_checkout_count",
                    name_display: "user checkout count",
                    type: "number"
                }, {
                    name: "user_comment_count",
                    name_display: "user comment count",
                    type: "number"
                }]
            }]
        };
    });