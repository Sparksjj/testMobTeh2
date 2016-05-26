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
        //удобно, чтобы не инжектить $location в дочерних контроллерах 
        //однако, плохо для тестирования
        $scope.goTo = function(path) {
            $location.path(path);
        }
        //расширяем самый верхний $scope методами провайдера пользователя
        //после этого удобно использовать эти методы сразу в представлениях (см. books.html)
        angular.extend($scope, $userProvider, true);
    }]);



 
app.controller('loginCtrl', ['$scope', 'authorizationFactory',  
function($scope, authorizationFactory){

  $scope.loginClick = function($event) {
    authorizationFactory.login($scope.userEmail, $scope.userPassword)
  }

  $scope.logOutClick = function($event){
    console.log("logOutClick");
    authorizationFactory.logOut();    
  }
  $scope.isAdmin = authorizationFactory.isAdmin;
  $scope.isSignedIn = authorizationFactory.isSignedIn;
  $scope.currentUser = authorizationFactory.currentUser;

}]);
 

app.factory('authorizationFactory',['$userProvider', '$http',
  function($userProvider, $http){
 
    var login = function(login, pass){

      $http.get('easy-serv.php?email='+login+'&password='+pass).success(function(data, status, headers, config){

        if (data != '') {
          data = JSON.parse(JSON.parse(data));
          if (data.admin) {
            $userProvider.setUser({login: data.name, email: data.email, roles: $userProvider.rolesEnum.admin});
          }else{
            $userProvider.setUser({login: data.name, email: data.email, roles: $userProvider.rolesEnum.user});
          };

        }else{

        }
        
      })
 
 
    }
    
    var logOut = function(){
      $userProvider.setUser({});
    }

    var isAdmin = function(){
      var user = $userProvider.getUser()

      if(user){
        if ( user.roles == 0) {
          return true;
        };
      }

      return false;
    }

    var isSignedIn = function(){
   
      if(!$.isEmptyObject($userProvider.getUser())){
        return true;
      }
      return false;
    }
    var currentUser = $userProvider.getUser();

    return {
      login:        login,
      logOut:       logOut,
      isAdmin:      isAdmin,
      isSignedIn:   isSignedIn,
      currentUser:  currentUser
    }

}]);
 
//провайдер информации о пользователе (роли, логин и тд)
app.factory('$userProvider', function(){
  
  var rolesEnum = {
    admin: 0,
    user: 1,
  };

  var setUser = function(u){
    localStorage.currentUser = angular.toJson(u);
  }

  var getUser = function(){
    return JSON.parse(localStorage.currentUser)
  }
 
  return {
    getUser: getUser,
    setUser: setUser,
    rolesEnum: rolesEnum
  }
});