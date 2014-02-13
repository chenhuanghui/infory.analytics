/**
* Remote Module
*
* Description
*/
angular.module('smg.services', [])
	.factory('remoteFactory', [function ($http) {
		return {
			getInfo: function() {
				return "aaa";
			}
		};
	}]);