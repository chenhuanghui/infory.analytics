'use strict';

angular.module('Smg')
    .factory('filterHelper',
        function() {
            return {
                buildQuery: function(metas, events, metadata, event, subfilters, type) {

                    var query = null;
                    var elements = null;

                    if (type == 'AND') {
                        query = {
                            and: []
                        };
                        elements = query.and;
                    } else {
                        query = {
                            or: []
                        };
                        elements = query.or;
                    }


                    for (var i = 0; i < subfilters.length; i++) {
                        var pre_query = subfilters[i].getValue();
                        if (pre_query.paremeters.firstInput == '')
                            continue;
                        switch (pre_query.meta) {
                            case 'là':
                                elements.push({
                                    belong: {
                                        property: pre_query.property.name,
                                        value: pre_query.paremeters.firstInput
                                    }
                                })
                                break;
                                ///
                            case 'lớn hơn':
                                elements.push({
                                    larger_than: {
                                        property: pre_query.property.name,
                                        value: parseInt(pre_query.paremeters.firstInput)
                                    }
                                })
                                break;
                            case 'nhỏ hơn':
                                elements.push({
                                    smaller_than: {
                                        property: pre_query.property.name,
                                        value: parseInt(pre_query.paremeters.firstInput)
                                    }
                                })
                                break;
                            case 'trong khoảng':
                                elements.push({
                                    between: {
                                        property: pre_query.property.name,
                                        beg_value: parseInt(pre_query.paremeters.firstInput),
                                        end_value: parseInt(pre_query.paremeters.secondInput),
                                    }
                                })
                                break;
                            case 'lớn hơn hoặc bằng':
                                elements.push({
                                    larger_than_or_equal: {
                                        property: pre_query.property.name,
                                        value: parseInt(pre_query.paremeters.firstInput)
                                    }
                                })
                                break;
                            case 'bé hơn hoặc bằng':
                                elements.push({
                                    smaller_than_or_equal: {
                                        property: pre_query.property.name,
                                        value: parseInt(pre_query.paremeters.firstInput)
                                    }
                                })
                                break;
                            case 'bằng':
                                elements.push({
                                    equal: {
                                        property: pre_query.property.name,
                                        value: parseInt(pre_query.paremeters.firstInput)
                                    }
                                })
                                break;
                                ///
                            case 'cách đây':

                            case 'trước ngày':
                                elements.push({
                                    before_date: {
                                        property: pre_query.property.name,
                                        value: pre_query.paremeters.firstInput
                                    }
                                })
                                break;
                            case 'sau ngày':
                                elements.push({
                                    after_date: {
                                        property: pre_query.property.name,
                                        value: pre_query.paremeters.firstInput
                                    }
                                })
                                break;
                            case 'trong khoảng thời gian':
                                elements.push({
                                    between_dates: {
                                        property: pre_query.property.name,
                                        beg_date: pre_query.paremeters.firstInput,
                                        end_date: pre_query.paremeters.secondInput
                                    }
                                })
                                break;
                        }
                    }

                    return query;
                }
            }
        }
);