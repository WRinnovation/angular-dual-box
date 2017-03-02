/**
 * Created by msenardi on 01/02/2017.
 */
angular.module('dualBox', [])

.directive('dualBox', function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            //ngModel: '=',     // Bind the ngModel to the object given
            //onSend: '&',      // Pass a reference to the method
            //fromName: '@',     // Store the string associated by fromName
            available_items: '=availableItems',
            selected_items: '=selectedItems',
            key_select: '=?keySelect',
            select_function: '&?selectFunction', // function to represent options
            feature_name: '=?featureName', // key to represent option
            // refresh_data: '&?refreshData', // not used
            // refresh_trigger: '=?refreshTrigger' // not used
        },
        template: '<div class="bootstrap-duallistbox-container">'
        + '<div class="box1 col col-md-6 filtered"><label for="bootstrap-duallistbox-nonselected-list_duallistbox_demo2">Available [[feature_name]]</label>'
        + '<span class="label label-warning" ng-show="available_filtered.length != available_items.length">Filtered</span> <span class="info-container">{{available_filtered.length}} from {{available_items.length}} of [[feature_name]]</span>'
        + '<input class="filter search form-control" type="text" ng-model="available_search" placeholder="Filter">'
        + '<div class="btn-group buttons">'
        + '<button type="button" class="btn moveall btn-default" title="Move all" ng-click="available_items=moveAll(available_items,selected_items, available_filtered)"><i class="glyphicon glyphicon-arrow-right"></i> <i class="glyphicon glyphicon-arrow-right"></i></button>'
        + '<button type="button" class="btn move btn-default" title="Move selected" ng-click="moveItem(available, available_items,selected_items)"><i class="glyphicon glyphicon-arrow-right"></i></button>'
        // + '<button ng-show="show_refresh_btn" type="button" class="btn move btn-default pull-right" title="Refresh data" ng-click="$window.location.reload();"><i class="glyphicon glyphicon-refresh"></i></button>'
        + '</div>'

        + '<select multiple ng-model="available" ng-options="define_key_view(items, key_select, select_function()) for items in available_filtered = (available_items | filter: available_search)" class="form-control"></select>'
        + '</div>'
        + '<div class="box2 col col-md-6"><label for="bootstrap-duallistbox-selected-list_duallistbox_demo2">Selected [[feature_name]]</label>'
        + '<span class="label label-warning" ng-show="selected_filtered.length != selected_items.length">Filtered</span> <span class="info-container">{{selected_filtered.length}} from {{selected_items.length}} of [[feature_name]]</span>'
        + '<input class="filter search form-control" type="text" ng-model="selected_search" placeholder="Filter">'
        + '<div class="btn-group buttons">'
        + '<button type="button" class="btn remove btn-default" title="Remove selected" ng-click="moveItem(selected, selected_items,available_items)"><i class="glyphicon glyphicon-arrow-left"></i></button>'
        + '<button type="button" class="btn removeall btn-default" title="Remove all" ng-click="selected_items=moveAll(selected_items, available_items, selected_filtered)"><i class="glyphicon glyphicon-arrow-left"></i> <i class="glyphicon glyphicon-arrow-left"></i></button>'
        // + '<button ng-show="show_refresh_btn" type="button" class="btn move btn-default pull-right" title="Refresh data" ng-click="$window.location.reload();"><i class="glyphicon glyphicon-refresh"></i></button>'
        + '</div>'

        + '<select multiple ng-model="selected" ng-options="define_key_view(items, key_select, select_function()) for items in selected_filtered = (selected_items | filter: selected_search)" class="form-control"></select>'
        + '</div>'
        + '</div>',
        controller: ['$scope', function ($scope) {
            // check if feature_name was defined - if not set default
            // if (angular.isDefined($scope.refresh_trigger)){
            //     $scope.$watch('refresh_trigger', function () {
            //         if (angular.isDefined($scope.refresh_data)){
            //             $scope.refresh_data();
            //         }
            //         else{
            //             console.error('Impossible to refresh\nrefreshData function should be passed with refreshTrigger variable');
            //         }
            //     });
            // }

            $scope.feature_name = angular.isDefined($scope.feature_name) ? $scope.feature_name : 'Items';
            $scope.show_refresh_btn = angular.isDefined($scope.refresh_data);
            $scope.moveItem = function (items, from, to) {
                console.info('Move items: ' + items + ' From: ' + from + ' To: ' + to);
                angular.forEach(items, function (item) {
                    var idx = from.indexOf(item);
                    if (idx != -1) {
                        from.splice(idx, 1);
                        to.push(item);
                    }
                });
            };
            $scope.moveAll = function (from, to, filtered) {

                console.info('Move all  From:: ' + from + ' To:: ' + to);
                angular.forEach(filtered, function (item) {
                    to.push(item);
                });
                return _.difference(from, filtered);
            };

            $scope.define_key_view = function(item, key_select, select_function){
                if(angular.isDefined(key_select)){
                    return item[key_select];
                }
                else if (angular.isDefined(select_function)){
                    return select_function(item);
                }
            }
        }],
        link: function (scope, elem, attrs) {
        }

    }
});
