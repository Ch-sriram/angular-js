// MODULE
var angularApp = angular.module('angularApp', []);

// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.name = "Ram"; //  Data inside `$scope` can be interpolated inside the region of HTML where this controller - `mainController` is bound.
                       //+ In HTML, `$scope.name` can be accessed using interpolation symbols - {{ <scope-data-variable> }}.
                       //+ Eg: { { name } } --No need to mentioned`$scope` in HTML
  
  $timeout(() => $scope.name = "Everybody", 3000);
}]);
