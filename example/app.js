var app = angular.module("dualApp", ['dualBox']);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})


app.controller('dualboxcontroller', function($scope) {
  $scope.available_items = [{'name': 'John', 'id':1}, {'name': 'Steven', 'id':2}];
		$scope.selected_items = [];
		$scope.key_select = 'name';
});


/*
app.run(function($rootScope) {
$scope.available_items = [{'name': 'Mat', 'id':1}, {'name': 'Pippo', 'id':2}];
		$scope.selected_items = [];
		$scope.key_select = 'name';


});
*/