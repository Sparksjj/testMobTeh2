app.controller('loginCtrl', ['$scope', 'authorizationFactory', 'validateSignIn', '$rootScope',
function($scope, authorizationFactory, validateSignIn, $rootScope){
  $scope.formInfo = {
    email: "",
    password: ""
  } 

  if (localStorage.currentUser == "") {
   authorizationFactory.logOut();   
  };


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
  $scope.currentUser = authorizationFactory.currentUser();
  $scope.sayHi = 'Добро пожаловать ' + $scope.currentUser.email;

/*событие при успешной авторизации*/
  $rootScope.$on('rootScope.signInSuccess', function() {
    /*clear error messages and classes*/
      validateSignIn.calearData();

      $scope.formInfo = {
        email: "",
        password: ""
      }
      /*clear modal window and add hi message*/
      $scope.currentUser = authorizationFactory.currentUser();
      $('button.close').trigger('click');
      $scope.sayHi = 'Добро пожаловать ' + $scope.currentUser.email;
  });

}]);