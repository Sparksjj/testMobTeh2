app.directive('chekUser', function() { 
  return { 

    restrict: 'E', 
    scope: true, 
    templateUrl: 'js/directives/authorizationDirectives/chekUser.html',
    replace: true,
    link: function($scope, element, attr){

    }

  }; 
});