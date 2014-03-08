/**
 * Remote Module
 *
 * Description
 */
angular.module('smg.services')
    .factory('remoteFactory', ['$http', 'cookie',
        function($http, cookie) {
            var base_url = "http://dev2.smartguide.vn/dashboard/api/v1/";
            var tail_url = '?access_token=' + cookie.getCookie('access_token');

            return {
                getTailUrl: function() {
                    return tail_url;
                },
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
                        "ios",
                        "android",
                        "web"
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
                meta_profile: {
                    name: "profile",
                    name_display: "profile",
                    properties: [{
                        name: "city",
                        name_display: "thành phố",
                        type: "group",
                        available_values: "cities"
                    }, {
                        name: "dob",
                        name_display: "ngày sinh",
                        type: "time"
                    }, {
                        name: "age",
                        name_display: "tuổi",
                        type: "number"
                    }, {
                        name: "gender",
                        name_display: "giới tính",
                        type: "group",
                        available_values: "genders"
                    }, {
                        name: "career",
                        name_display: "nghề nghiệp",
                        type: "group",
                        available_values: "careers"
                    }, {
                        name: "charge",
                        name_display: "tổng chi tiêu",
                        type: "number"
                    }, {
                        name: "view_count",
                        name_display: "số lần xem",
                        type: "number"
                    }, {
                        name: "checkin_count",
                        name_display: "số lần đến cửa hàng",
                        type: "number"
                    }, {
                        name: "checkout_count",
                        name_display: "số lần mua hàng",
                        type: "number"
                    }, {
                        name: "last_visit",
                        name_display: "lần gần nhất đến cửa hàng",
                        type: "time"
                    }, {
                        name: "first_visit",
                        name_display: "lần đầu đến cửa hàng",
                        type: "time"
                    }]
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
                        available_values: "gender"
                    }, {
                        name: "user_career",
                        name_display: "user career",
                        type: "group",
                        availables_values: "careers"
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
                    }],
                    compare_properties: [{
                        name_display: "Chọn thuộc tính"
                    }, {
                        name: "shop",
                        name_display: "shop",
                        type: "group"
                    }, {
                        name: "time",
                        unit: "hour",
                        name_display: "hour in day",
                        type: "time"
                    }, {
                        name: "time",
                        unit: "weekday",
                        name_display: "weekday",
                        type: "time"
                    }, {
                        name: "time",
                        unit: "month",
                        name_display: "month in year",
                        type: "time"
                    }, {
                        name: "platform",
                        name_display: "user platform",
                        type: "group"
                    }, {
                        name: "user_city",
                        name_display: "user city",
                        type: "group"
                    }, {
                        name: "user_age",
                        min_diff: 5,
                        name_display: "user age",
                        type: "number"
                    }, {
                        name: "user_gender",
                        name_display: "user gender",
                        type: "group"
                    }, {
                        name: "user_career",
                        name_display: "user career",
                        type: "group"
                    }, {
                        name: "user_total_charge",
                        min_diff: 5,
                        name_display: "user total charge",
                        type: "number"
                    }, {
                        name: "user_view_count",
                        min_diff: 5,
                        name_display: "user view count",
                        type: "number"
                    }, {
                        name: "user_checkin_count",
                        min_diff: 5,
                        name_display: "user checkin count",
                        type: "number"
                    }, {
                        name: "user_checkout_count",
                        min_diff: 5,
                        name_display: "user checkout count",
                        type: "number"
                    }, {
                        name: "user_comment_count",
                        min_diff: 5,
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
                        availables_values: "careers"
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
                    }],
                    compare_properties: [{
                        name_display: "Chọn thuộc tính"
                    }, {
                        name: "shop",
                        name_display: "shop",
                        type: "group"
                    }, {
                        name: "time",
                        unit: "hour",
                        name_display: "hour in day",
                        type: "time"
                    }, {
                        name: "time",
                        unit: "weekday",
                        name_display: "weekday",
                        type: "time"
                    }, {
                        name: "time",
                        unit: "month",
                        name_display: "month in year",
                        type: "time"
                    }, {
                        name: "platform",
                        name_display: "user platform",
                        type: "group"
                    }, {
                        name: "friend_count",
                        min_diff: 5,
                        name_display: "friend count",
                        type: "number"
                    }, {
                        name: "user_city",
                        name_display: "user city",
                        type: "group"
                    }, {
                        name: "user_age",
                        min_diff: 5,
                        name_display: "user age",
                        type: "number"
                    }, {
                        name: "user_gender",
                        name_display: "user gender",
                        type: "group"
                    }, {
                        name: "user_career",
                        name_display: "user career",
                        type: "group"
                    }, {
                        name: "user_total_charge",
                        min_diff: 5,
                        name_display: "user total charge",
                        type: "number"
                    }, {
                        name: "user_view_count",
                        min_diff: 5,
                        name_display: "user view count",
                        type: "number"
                    }, {
                        name: "user_checkin_count",
                        min_diff: 5,
                        name_display: "user checkin count",
                        type: "number"
                    }, {
                        name: "user_checkout_count",
                        min_diff: 5,
                        name_display: "user checkout count",
                        type: "number"
                    }, {
                        name: "user_comment_count",
                        min_diff: 5,
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
                        availables_values: "careers"
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
                    }],
                    compare_properties: [{
                        name_display: "Chọn thuộc tính"
                    }, {
                        name: "shop",
                        name_display: "shop",
                        type: "group"
                    }, {
                        name: "time",
                        unit: "hour",
                        name_display: "hour in day",
                        type: "time"
                    }, {
                        name: "time",
                        unit: "weekday",
                        name_display: "weekday",
                        type: "time"
                    }, {
                        name: "time",
                        unit: "month",
                        name_display: "month in year",
                        type: "time"
                    }, {
                        name: "platform",
                        name_display: "user platform",
                        type: "group"
                    }, {
                        name: "charge",
                        min_diff: 5,
                        name_display: "user expense",
                        type: "number"
                    }, {
                        name: "user_city",
                        name_display: "user city",
                        type: "group"
                    }, {
                        name: "user_age",
                        min_diff: 5,
                        name_display: "user age",
                        type: "number"
                    }, {
                        name: "user_gender",
                        name_display: "user gender",
                        type: "group"
                    }, {
                        name: "user_career",
                        name_display: "user career",
                        type: "group"
                    }, {
                        name: "user_total_charge",
                        min_diff: 5,
                        name_display: "user total charge",
                        type: "number"
                    }, {
                        name: "user_view_count",
                        min_diff: 5,
                        name_display: "user view count",
                        type: "number"
                    }, {
                        name: "user_checkin_count",
                        min_diff: 5,
                        name_display: "user checkin count",
                        type: "number"
                    }, {
                        name: "user_checkout_count",
                        min_diff: 5,
                        name_display: "user checkout count",
                        type: "number"
                    }, {
                        name: "user_comment_count",
                        min_diff: 5,
                        name_display: "user comment count",
                        type: "number"
                    }]
                }, {
                    name: "comment",
                    name_display: "comment",
                    properties: [{
                        name_display: "Chọn thuộc tính"
                    }, {
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
                        availables_values: "careers"
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
                    }],
                    compare_properties: [{
                        name_display: "Chọn thuộc tính"
                    }, {
                        name: "shop",
                        name_display: "shop",
                        type: "group"
                    }, {
                        name: "created_time",
                        unit: "hour",
                        name_display: "time comment by hour",
                        type: "time"
                    }, {
                        name: "created_time",
                        unit: "weekday",
                        name_display: "time comment by weekday",
                        type: "time"
                    }, {
                        name: "created_time",
                        unit: "month",
                        name_display: "time comment by month",
                        type: "time"
                    }, {
                        name: "platform",
                        name_display: "user platform",
                        type: "group"
                    }, {
                        name: "user_city",
                        name_display: "user city",
                        type: "group"
                    }, {
                        name: "user_age",
                        min_diff: 5,
                        name_display: "user age",
                        type: "number"
                    }, {
                        name: "user_gender",
                        name_display: "user gender",
                        type: "group"
                    }, {
                        name: "user_career",
                        name_display: "user career",
                        type: "group"
                    }, {
                        name: "user_total_charge",
                        min_diff: 5,
                        name_display: "user total charge",
                        type: "number"
                    }, {
                        name: "user_view_count",
                        min_diff: 5,
                        name_display: "user view count",
                        type: "number"
                    }, {
                        name: "user_checkin_count",
                        min_diff: 5,
                        name_display: "user checkin count",
                        type: "number"
                    }, {
                        name: "user_checkout_count",
                        min_diff: 5,
                        name_display: "user checkout count",
                        type: "number"
                    }, {
                        name: "user_comment_count",
                        min_diff: 5,
                        name_display: "user comment count",
                        type: "number"
                    }]
                }]
            };
        }
    ]);