/**
* Remote Module
*
* Description
*/
angular.module('smg.services')
	.factory('remoteFactory',function ($http) {
		var base_url = "http://dev2.smartguide.vn";
		return {
	        api: function (path, method, data, success, error) {
	            // if (arguments.length == 1) {
	            //     method = 'GET';
	            //     data = {};
	            //     callback = function(data, textStatus, jqXHR) {

	            //     };
	            // }
	            // else if (arguments.length == 2) {
	            //     if (Object.prototype.toString.call(method) == "[object Function]") {
	            //         callback = method;
	            //         method = 'GET';
	            //         data = {};
	            //     }
	            // }
	            // else if (arguments.length == 3) {
	            //     if(typeof method === 'string') {
	            //         callback = data;
	            //         data = {};
	            //     }
	            //     else if (Object.prototype.toString.call(data) == "[object Function]") {
	            //         callback = data;
	            //         data = method;
	            //         method = 'GET';
	            //     }
	            // }

	            var url = base_url + path;
	            

	            request = $http({
	            	url: url,
	            	method: method
	            }).success(success).error(error);
	            return request;
	        },

	        meta_events: [
							{
								name: "view",
								name_display: "xem thông tin cửa hàng",
								properties: [
									{
										name: "shop",
										name_display: "cửa hàng",
										type: "group"
									},
									{
										name: "time",
										name_display: "thời gian",
										type: "time"
									},
									{
										name: "platform",
										name_display: "nền tảng",
										type: "group"
									},
									{
										name: "shop_promotion_status",
										name_display: "trạng thái khuyến mãi của cửa hàng",
										type: "group"
									},
									{
										name: "user_city",
										name_display: "tỉnh/thành phố của khách hàng",
										type: "group"
									},
									{
										name: "user_age",
										name_display: "tuổi khách hàng",
										type: "number"
									},
									{
										name: "user_gender",
										name_display: "giới tính của khách hàng",
										type: "group"
									},
									{
										name: "user_career",
										name_display: "nghề nghiệp của khách hàng",
										type: "group"
									},
									{
										name: "user_total_charge",
										name_display: "tổng chi của khách hàng",
										type: "number"
									},
									{
										name: "user_view_count",
										name_display: "số lần truy cập của khách hàng",
										type: "number"
									},
									{
										name: "user_checkin_count",
										name_display: "số lần checkin của khách hàng",
										type: "number"
									},
									{
										name: "user_checkout_count",
										name_display: "số lần checkout của khách hàng",
										type: "number"
									},
									{
										name: "user_comment_count",
										name_display: "số lần bình luận của khách hàng",
										type: "number"
									}
								]
							},
							{
								name: "checkin",
								name_display: "đến cửa hàng",
								properties: [
									{
										name: "shop",
										name_display: "cửa hàng",
										type: "group"
									},
									{
										name: "time",
										name_display: "thời gian",
										type: "time"
									},
									{
										name: "fiend_count",
										name_display: "số bạn đi cùng",
										type: "number"
									},
									{
										name: "platform",
										name_display: "nền tảng",
										type: "group"
									},
									{
										name: "shop_promotion_status",
										name_display: "trạng thái khuyến mãi của cửa hàng",
										type: "group"
									},
									{
										name: "user_city",
										name_display: "tỉnh/thành phố của khách hàng",
										type: "group"
									},
									{
										name: "user_age",
										name_display: "tuổi khách hàng",
										type: "number"
									},
									{
										name: "user_gender",
										name_display: "giới tính của khách hàng",
										type: "group"
									},
									{
										name: "user_career",
										name_display: "nghề nghiệp của khách hàng",
										type: "group"
									},
									{
										name: "user_total_charge",
										name_display: "tổng chi của khách hàng",
										type: "number"
									},
									{
										name: "user_view_count",
										name_display: "số lần truy cập của khách hàng",
										type: "number"
									},
									{
										name: "user_checkin_count",
										name_display: "số lần checkin của khách hàng",
										type: "number"
									},
									{
										name: "user_checkout_count",
										name_display: "số lần checkout của khách hàng",
										type: "number"
									},
									{
										name: "user_comment_count",
										name_display: "số lần bình luận của khách hàng",
										type: "number"
									}
								]
							},
							{
								name: "checkout",
								name_display: "thanh toán",
								properties: [
									{
										name: "shop",
										name_display: "cửa hàng",
										type: "group"
									},
									{
										name: "time",
										name_display: "thời gian",
										type: "time"
									},
									{
										name: "charge",
										name_display: "giá trị hóa đơn",
										type: "number"
									},
									{
										name: "platform",
										name_display: "nền tảng",
										type: "group"
									},
									{
										name: "shop_promotion_status",
										name_display: "trạng thái khuyến mãi của cửa hàng",
										type: "group"
									},
									{
										name: "user_city",
										name_display: "tỉnh/thành phố của khách hàng",
										type: "group"
									},
									{
										name: "user_age",
										name_display: "tuổi khách hàng",
										type: "number"
									},
									{
										name: "user_gender",
										name_display: "giới tính của khách hàng",
										type: "group"
									},
									{
										name: "user_career",
										name_display: "nghề nghiệp của khách hàng",
										type: "group"
									},
									{
										name: "user_total_charge",
										name_display: "tổng chi của khách hàng",
										type: "number"
									},
									{
										name: "user_view_count",
										name_display: "số lần truy cập của khách hàng",
										type: "number"
									},
									{
										name: "user_checkin_count",
										name_display: "số lần checkin của khách hàng",
										type: "number"
									},
									{
										name: "user_checkout_count",
										name_display: "số lần checkout của khách hàng",
										type: "number"
									},
									{
										name: "user_comment_count",
										name_display: "số lần bình luận của khách hàng",
										type: "number"
									}
								]
							},
							{
								name: "comment",
								name_display: "bình luận về cửa hàng",
								properties: [
									{
										name: "shop",
										name_display: "cửa hàng",
										type: "group"
									},
									{
										name: "created_time",
										name_display: "ngày tạo",
										type: "time"
									},
									{
										name: "updated_time",
										name_display: "lần sửa gần nhất",
										type: "time"
									},
									{
										name: "platform",
										name_display: "nền tảng",
										type: "group"
									},
									{
										name: "user_city",
										name_display: "tỉnh/thành phố của khách hàng",
										type: "group"
									},
									{
										name: "user_age",
										name_display: "tuổi khách hàng",
										type: "number"
									},
									{
										name: "user_gender",
										name_display: "giới tính của khách hàng",
										type: "group"
									},
									{
										name: "user_career",
										name_display: "nghề nghiệp của khách hàng",
										type: "group"
									},
									{
										name: "user_total_charge",
										name_display: "tổng chi của khách hàng",
										type: "number"
									},
									{
										name: "user_view_count",
										name_display: "số lần truy cập của khách hàng",
										type: "number"
									},
									{
										name: "user_checkin_count",
										name_display: "số lần checkin của khách hàng",
										type: "number"
									},
									{
										name: "user_checkout_count",
										name_display: "số lần checkout của khách hàng",
										type: "number"
									},
									{
										name: "user_comment_count",
										name_display: "số lần bình luận của khách hàng",
										type: "number"
									}
								]
							},
						],
			meta_property_types : {
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
					]
				},
				group: {
					operators: [
						"belong"
					],
					operators_display: [
						"là"
					]
				},
				text: {
					operators: [
						"contain"
					],
					operators_display: [
						"chứa từ"
					]
				},
				time: {
					operators: [
						"before",
						"before_date",
						"after",
						"after_date",
						"between_dates"
					],
					operators_display: [
						"cách đây",
						"trước ngày",
						"sau hôm nay",
						"sau ngày",
						"trong khoảng thời gian"
					]
				},
			}			

		};
	});