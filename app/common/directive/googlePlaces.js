'use strict';

angular.module('Smg')
    .directive('googlePlaces', function($location) {
        return {
            restrict: 'EA',
            replace: true,
            // transclude:true,
            scope: {
                location: '=',
                changedLocation: '&'

            },
            template: '<div><input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/> <input type="submit" ng-click="doSearch()"></input></div>',
            link: function(scope, elm, attrs) {
                var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});

                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    var place = autocomplete.getPlace();
                    if (place != undefined && place != null) {
                        scope.changedLocation({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        });
                    }
                });
            }
        }
    })