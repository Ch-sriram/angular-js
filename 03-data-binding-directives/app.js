// MODULE
var angularApp = angular.module('angularApp', []);

// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$filter', function ($scope, $filter) {
  $scope.handle = "";
  $scope.lowercasedHandle = () => $filter('lowercase')($scope.handle);

  /**
   * `$scope.handle` is going to change dynamically as the user types in from the input
   */
}]);
