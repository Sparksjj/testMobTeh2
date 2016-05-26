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