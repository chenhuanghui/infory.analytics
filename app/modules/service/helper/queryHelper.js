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
                    var id = 1;
                    var subFilters = [];

                    for (var o in filter) {
                        if (o == 'and')
                            operator = 'AND';
                        else
                            operator = 'OR';

                        for (var i = 0; i < filter[o].length; i++) {
                            for (var t in filter[o][i]) {

                                var subFilter = {
                                    id: id++,
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

                                switch (t) {
                                    case 'belong':
                                        subFilter.meta = 'là';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'larger_than':
                                        subFilter.meta = 'lớn hơn';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'smaller_than':
                                        subFilter.meta = 'nhỏ hơn';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'between':
                                        subFilter.meta = 'trong khoảng';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].beg_value;
                                        subFilter.paremeters.secondInput = filter[o][i][t].end_value;
                                        break;

                                    case 'larger_than_or_equal':
                                        subFilter.meta = 'lớn hơn hoặc bằng';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'smaller_than_or_equal':
                                        subFilter.meta = 'bé hơn hoặc bằng';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'equal':
                                        subFilter.meta = 'bằng';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'before_date':
                                        subFilter.meta = 'trước ngày';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'after_date':
                                        subFilter.meta = 'sau ngày';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].value;
                                        break;

                                    case 'between_dates':
                                        subFilter.meta = 'trong khoảng thời gian';
                                        subFilter.property.name = filter[o][i][t].property;
                                        subFilter.paremeters.firstInput = filter[o][i][t].beg_value;
                                        subFilter.paremeters.secondInput = filter[o][i][t].beg_value;
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