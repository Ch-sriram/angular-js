// MODULE
// Any external service can be imported from the dependency list provided below where `ngMessages` is provided
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource']);

// CONTROLLERS

/** perfectly valid code when it's not minified */
// angularApp.controller('mainController', function (
//   $log,
//   $resource,
//   // $messages // this is not a pre-defined service
// ) {
//   $log.log($resource);
//   console.log($resource);
// });

/** $controller:ctrlreg error when minifying the code above */
// var myApp=angular.module("myApp",[]);myApp.controller("mainController",function(o,l){l.log(o)});

/** perfectly valid code when it's not modified */
// angularApp.controller('mainController', [
//   '$log',
//   '$scope',
//   function (
//     // the variables can be named anyway we want, as the dependencies are injected positionally
//     // based on the aforementioned order of the dependences mentioned as strings above
//     log,
//     scope
//   ) {
//     log.log(scope);
//   },
// ]);

/** 
 * No error when running the above code as minified code below, since the positional way of injecting
 * dependencies will not care about the name of the variables but only cares about the strings before
 * the function, which make sure to be injected as positional dependencies.
 * 
 * Therefore, in the minified code below, both `o` & `l` are `$log` and `$scope` services respectively.
 */
angularApp.controller("mainController",["$log","$scope",function(o,l){o.log(l)},]);
