/**
* Remote Module
*
* Description
*/
angular.module('smg.services', [])
	.factory('remoteFactory', [function () {
		return {
			getInfo: function(callback) {
				$.ajax({
		                url: 'http://d2.smartguide.dev',
		                type: 'GET',
		                success: function(data, textStatus, jqXHR) {
		                    return data;
		                }
		            });
				}
		};
	}]);