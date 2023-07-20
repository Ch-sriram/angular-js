# Scope & Dependency Injection

- Contains Code & Concepts w.r.t Scope and Dependency Injection in AngularJS.

## Concept

- In a controller, for eg:

  ```js
  // MODULE
  var myApp = angular.module('myApp', []);
  
  // CONTROLLER
  myApp.controller('mainController', function(
    // Dependencies can be injected here via AngularJS Framework
  ) {
    // Controller Code Here
  });
  ```

  The controller which in this case is `mainController`, is injected with the following dependencies:
  1. `$scope`: Current scope associated with the element
  2. `$element`: Current element
  3. `$attrs`: Current attributes object for the element
  4. `$transclude`: A transclude linking function pre-bound to the correct transclusion scope: `function([scope], cloneLinkingFn, futureParentElement, slotName)`:
     - `scope`: (optional) override the scope.
     - `cloneLinkingFn`: (optional) argument to create clones of the original transcluded content.
     - `futureParentElement` (optional):
       - defines the parent to which the `cloneLinkingFn` will add the cloned elements.
       - default: `$element.parent()` resp. `$element` for `transclude:'element'` resp. `transclude:true`.
       - only needed for transcludes that are allowed to contain non html elements (e.g. SVG elements) and when the `cloneLinkingFn` is passed, as those elements need to created and cloned in a special way when they are defined outside their usual containers (e.g. like `<svg>`).
     - `slotName`: (optional) the name of the slot to transclude. If falsy (e.g. `null`, `undefined` or `''`) then the default transclusion is provided.
     The `$transclude` function also has a method on it, `$transclude.isSlotFilled(slotName)`, which returns `true` if the specified slot contains content (i.e. one or more DOM nodes).

- One can also inject **[Services](https://docs.angularjs.org/api/ng/service)** into the controller. Some popular services are:
  - [`$log`](https://docs.angularjs.org/api/ng/service/$log)
  - [`$http`](https://docs.angularjs.org/api/ng/service/$http)
  - [`$filter`](https://docs.angularjs.org/api/ng/service/$filter)

- Therefore, these services along with `$scope`, `$element`, etc are injected into the controller and they can be used as follows:

  ```js
  // MODULE
  var myApp = angular.module('myApp', []);
  
  // CONTROLLER
  myApp.controller('mainController', function(
    // Dependencies can be injected here via AngularJS Framework
    $scope,
    $filter,
    $log
  ) {
    // Controller Code Here
    // Inside $scope, we can add any kind of data as follows:
    $scope.name = "Ram";
    $scope.uppercasedName = $filter("uppercase")($scope.name);
    $scope.printName = () => $log.log($scope.name);
    console.log($scope);
    $scope.printName();
  });
  ```

- `$scope` becomes the thing that makes the communication between Model and the View, and so, it actually becomes the way to exchange data between Model and the View.

- NOTE: All AngularJS Services having the naming convention as: `$<service-name>`, and therefore, even `$scope` is a service in that regard.

### How does Angular do Dependency Injection?

- In JS, functions can be converted into strings as follows:

  ```js
  const getDetails = function(firstName, lastName, age, occupation, address) {
    return {firstName, lastName, age, occupation, address};
  }

  console.log(getDetails); // note that `getDetails` is not called here, it's just mentioned as a reference.
  // when mentioned as a reference to `console.log()` method, the function internally calls: `getDetails.toString()` which converts the function 
  // to a string.
  ```

- When a function can be converted to a string, AngularJS can easily make use of this advantage, and try and do some fancy parsing to know what kind of parameters have been passed into the controller. If the name of the parameters matches any of the names that are already known by AngularJS, like for example: `$scope` or `$filter`, AngularJS will inject the required data into that pre-existing AngularJS service/object.
  - The method that AngularJS uses to get the parameter list is the following:

    ```js
    angular.injector().annotate(getDetails); // ['firstName', 'lastName', 'age', 'occupation', 'address']
    // This aforementioned function parses the stringified `getDetails` function, and and gets the parameter list as Array<string>.
    ```

### Some More Services

- We've the `$log` service that is injected to the controller and can be used as follows:

  ```js
  // MODULE
  var myApp = angular.module('myApp', []);
  
  // CONTROLLER
  myApp.controller('mainController', function(
    // Dependencies can be injected here via AngularJS Framework
    $scope,
    $log
  ) {
    // Controller Code Here
    console.log($scope);
    $log.log("Hello!"); // same as console.log
    $log.info("This is some informational message"); // same as console.info
    $log.warn("This is a warning message"); // same as console.warn
    $log.debug("This is a debug statement"); // same as console.debug
    $log.error("There's some error in the code!!!"); // same as console.error

  });
  ```

  When everything about `$log` and vanilla JS provided `console` object seems to be the same, then why use `$log` service at all?
  - A really good answer to that is given **[here](https://stackoverflow.com/a/24185961)**.

- We also have the `$filter` service that is injected into the controller and can be used as follows:

  ```js
  // MODULE
  var myApp = angular.module('myApp', []);
  
  // CONTROLLER
  myApp.controller('mainController', function(
    // Dependencies can be injected here via AngularJS Framework
    $log,
    $scope,
    $filter
  ) {
    // Controller Code Here
    $scope.name = "Ram";
    $scope.uppercaseName = $filter('uppercase')($scope.name);
    $scope.lowercaseName = $filter('lowercase')($scope.name);
    $log.info($scope.uppercaseName); // "RAM"
    $log.info($scope.lowercaseName); // "ram"
  });
  ```

  More filters can be found here: <https://docs.angularjs.org/api/ng/filter>

### External Services

- Some services are so big (or maybe optional to use), that their code is separate from core AngularJS' core code.
- Some of those services are: `ngAnimate`, `ngMessages`, `ngAria`, `ngLoader`, `ngMocks`, `ngParseExt`, `ngResource`, `ngRoute`, `ngSanitize` & `ngTouch`.
- To use these services, they've to be imported in the HTML file as follows:

  ```html
  <!DOCTYPE html>
  <html lang="en-us" ng-app="angularApp">
    <head>
      <title>Introduction to AngularJS</title>
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta charset="UTF-8" />

      <!-- load bootstrap and fontawesome via CDN -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.2.0/dist/css/bootstrap.min.css" />

      <!-- style related code -->

      <!-- load angular via CDN -->
      <script src="https://code.angularjs.org/1.8.2/angular.min.js"></script>

      <!-- angular-messages & angular-resource can only be imported after angular -->
      <script src="https://code.angularjs.org/1.8.2/angular-messages.min.js"></script>
      <script src="https://code.angularjs.org/1.8.2/angular-resource.min.js"></script>

      <!-- Script Imports -->
      <script src="./app.js"></script>
    </head>

    <body>
      <!-- header related code -->
      <div class="container">
        <div ng-controller="mainController">
          <form name="myForm">
            <label>
              Enter text:
              <input type="email" ng-model="field" name="myField" required maxlength="15" />
            </label>
            <div ng-messages="myForm.myField.$error" role="alert">
              <div ng-message="required">Please enter a value for this field.</div>
              <div ng-message="email" class="alert alert-danger">This field must be a valid email address.</div>
              <div ng-message="maxlength" class="alert alert-danger">This field can be at most 15 characters long.</div>
            </div>
          </form>
        </div>
      </div>
    </body>
  </html>
  ```

- The linked `app.js` file will look like this:

  ```js
  // MODULE
  // Any external service can be imported from the dependency list provided below where `ngMessages` is provided
  var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource']);

  // CONTROLLERS
  angularApp.controller('mainController', function ($resource, $log) {
    $log.log($resource);
  });
  ```

### Minification & Dependency Injection

- **Problem**: When trying to minify JS, the problem with AngularJS' controller code is the following:

  ```js
  /* full (non-minified) code */
  // MODULE
  var myApp = angular.module('myApp', []);
  
  // CONTROLLER
  myApp.controller('mainController', function(
    // Dependencies can be injected here via AngularJS Framework
    $scope,
    $log
  ) {
    // Controller Code Here
    $log.log($scope);
  });
  ```

  ```js
  /* minified code */
  var myApp=angular.module("myApp",[]);myApp.controller("mainController",function(o,l){l.log(o)}); // $controller:ctrlreg
  ```

  We can see that in the minified code, the variables `$scope` and `$log` have been replaced by variables `o` & `l` respectively. But running the minified code leads to **[`$controller:ctrlreg`](https://code.angularjs.org/1.8.2/docs/error/$controller/ctrlreg?p0=mainController)** error.

  This happens because the minifier doesn't know that the name of the variables determines the way the pre-existing/new services get injected into the controller.

- **Solution**: [Signature of the controller](https://code.angularjs.org/1.8.2/docs/guide/controller#setting-up-the-initial-state-of-a-scope-object) takes second argument as an array, or a function. Till now, we've used just a function, but if we use an array as follows:

  ```js
  /* full (non-minified) code */
  // MODULE
  var myApp = angular.module('myApp', []);
  
  // CONTROLLER
  myApp.controller('mainController', [
    '$scope',
    '$log',

    // The above 2 mentioned services will be injected as dependencies positionally in the function defined below.
    function(
      name_can_be_anything_here_but_this_will_be_$scope,
      name_can_be_anything_here_but_this_will_be_$log
    ) {
      // Controller Code Here
      name_can_be_anything_here_but_this_will_be_$log.log(name_can_be_anything_here_but_this_will_be_$scope);
    }]);
  ```

  ```js
  /* minified code */
  var myApp=angular.module("myApp",[]);myApp.controller("mainController",["$scope","$log",function(o,l){l.log(o)}]); // no error
  ```

  This minified code works because here, the dependencies passed to the controller are passed positionally via use of strings `"$scope"` and `"$log"` respectively, as a minifier never minifies strings, they only minify variable names, spaces, new lines, etc.

  **NOTE**: Since the services are passed positionally based on the mention as strings as shown above, the actual names of the arguments used can be anything, but the naming is supposed to be done with readability of the code in mind, for example:

  ```js
  // MODULE
  var myApp = angular.module('myApp', []);
  
  // CONTROLLER
  myApp.controller('mainController', [
    '$scope',
    '$log',

    // The above 2 mentioned services will be injected as dependencies positionally in the function defined below.
    function(
      $log,
      $scope
    ) {
      // Controller Code Here
      $log.log($scope); // error, $log is actually $scope and $scope is actually $log, since 
                        // the dependency injection now is done w.r.t their positions, as 
                        // mentioned before the function definition itself, and so, the 
                        // naming of the arguments in the function doesn't matter anymore.
    }]);
  ```
