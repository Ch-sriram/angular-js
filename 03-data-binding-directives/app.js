// MODULE
var angularApp = angular.module('angularApp', []);

// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$filter', function ($scope, $filter) {
  $scope.handle = "";
  $scope.lowercasedHandle = () => $filter('lowercase')($scope.handle);

  /**
   * AngularJS Context (look into the image): https://cfdeepak.wordpress.com/2014/09/29/how-two-way-data-binding-works-in-angular-js/
   * 
   * AngularJS Context has 2 important components:
   * 1. Watch List, which are all the `$scope` data (that has been 2-way binded) that it watches to know whether its old-value and its new value
   *    changed or not. If the old-value changed, then until both the old and the new values are same, it's going to run a loop, which is:
   * 2. Digest Loop, which again buys into the watch list, which keeps on running until all the watched data has its old and new value which is same.
   * 
   * The trigger for the Digest Loop is going to be the native DOM event loop, which gets triggered on any event being listened to, and obviously, 
   * user actions, that actually trigger the events in the event loop.
   * 
   * We can use `$watch`, from inside the `$scope` variable to tell AngularJS to force do something based on the watch list data changing, as follows:
   */

  // `$scope.$watch(string, fn)`: 
  //        - string => what's binded data to watch for?
  //        - fn => Gets 2 params: oldValue, newValue -- which can be used to control the watching process.
  $scope.$watch('handle', (oldValue, newValue) => {
    console.info("Changed!");
    console.log(`Old: ${oldValue}`);
    console.log(`New: ${newValue}`);
  });

  // We can also make a change to the data in `$scope` using a native DOM timer API like setTimeout as follows:
  setTimeout(() => {
    console.info("Scope Changed!"); // this will print in the console
    $scope.handle = "this-change-is-not-reflected-on-the-UI";
  }, 3000); // This change won't be affecting the DOM, as it's out of the AngularJS context. Reason below.

  /**
   * The problem with using a native setTimeout API is that it's an asynchronous event that happens outside of the AngularJS context, 
   * is not triggered, especially the native JS timer APIs. Further reasoning can be read here: 
   *      - https://stackoverflow.com/questions/19609796/what-advantage-is-there-in-using-the-timeout-in-angularjs-instead-of-window-set
   * 
   * Therefore, there are 2 solutions:
   * 1. Use the `$timeout` service as follows:
   *  
   *  $timeout(() => {
   *    console.info("Scope Changed!"); // this will print in the console
   *    $scope.handle = "this-change-is-not-reflected-on-the-UI";
   *  }, 3000);
   * 
   * 2. Use `$scope.$apply()` method to the part of code inside `setTimeout` which we want to make sure that the AngularJS context is triggered
   *    forcefully, and performs it's actions respectively, by running the Digest Cycle. And hence, it'll check that the watch list's old value
   *    doesn't match with new value.
   *    Example below:
   */

  setTimeout(() => {
    $scope.$apply(() => {
      console.info("Scope Changed!"); // this will print in the console
      $scope.handle = "this-change-is-reflected-on-the-UI";
    });
  }, 6000); // This change affects the DOM, as it triggers the routine inside AngularJS Context via `$scope.$apply()`
}]);
