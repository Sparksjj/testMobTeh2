app.controller('loginCtrl', ['$scope', 'authorizationFactory', 'validateSignIn', '$rootScope',
function($scope, authorizationFactory, validateSignIn, $rootScope){
  $scope.formInfo = {
    email: "",
    password: ""
  } 

  $rootScope.$on('rootScope.signInSuccess', function() {
      validateSignIn.calearData();

      $scope.formInfo = {
        email: "",
        password: ""
      }
      
      $('button.close').trigger('click');
  });

  $scope.loginClick = function($event) {

    if(!validateSignIn.chekUserInput($event, $scope.formInfo.email, $scope.formInfo.password, "заполните пустые поля")){
      return;
    };

    authorizationFactory.login($scope.formInfo.email, $scope.formInfo.password)
  }

  $scope.logOutClick = function($event){
    authorizationFactory.logOut();    
  }

  $scope.isAdmin = authorizationFactory.isAdmin;
  $scope.isSignedIn = authorizationFactory.isSignedIn;
  $scope.currentUser = authorizationFactory.currentUser;

}]);