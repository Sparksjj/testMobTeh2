var app = angular.module("myApp", ['ngRoute', 'angularUtils.directives.dirPagination']);

  app.config(function($routeProvider) {
      $routeProvider
          .when('/', {
              templateUrl: 'views/guestbook.html',
              controller: 'GuestbookController'
          })
          .otherwise({ 
            redirectTo: '/'
          });
  });

app.controller('appCtrl', ['$scope', '$location', '$userProvider',
    function($scope, $location, $userProvider) {
/*
        $scope.goTo = function(path) {
            $location.path(path);
        }
        
        angular.extend($scope, $userProvider, true);*/
    }]);