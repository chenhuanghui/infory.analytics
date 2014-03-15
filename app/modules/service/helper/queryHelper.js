'use strict';

angular.module('Smg')
    .factory('queryHelper', ['serviceHelper',
        function(serviceHelper) {
            var intervalDate = serviceHelper.getIntervalDate();
            return {
                decode: function(query) {
                    var event = query.event;
                    var operator = '';
                    var filter = JSON.parse(query.filter);
                    var id = 0;
                    var subFilters = [];

                    var sampleSubfilter = {
                        id: id,
                        property: {
                            name: ' '
                        },
                        meta: null,
                        paremeters: {
                            firstInput: '',
                            secondInput: ''
                        },
                        data: [{
                            dateDropDownInput: intervalDate.date_beg,
                            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
                        }, {
                            dateDropDownInput: intervalDate.date_end,
                            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
                        }],
                        operator: operator,
                        event: event
                    }

                    for (var o in filter) {
                        if (o == 'and')
                            operator = 'AND';
                        else
                            operator = 'OR';

                        for (var i = 0; i < filter[o].length; i++) {
                            for (var t in filter[o][i]) {

                                var subFilter = sampleSubfilter;
                                switch (t) {
                                    case 'belong':
                                        subFilter.meta = 'là';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;
                                }

                                subFilters.push(subFilter);
                            }
                        }
                    }

                    return subFilters;
                }
            }
        }
    ]);