app.factory('authorizationFactory',['$userProvider', '$http', 'validateSignIn', '$rootScope',
  function($userProvider, $http, validateSignIn, $rootScope){
   
    var login = function(login, pass, $event){

      $http.get('easy-serv.php?email='+login+'&password='+pass).success(function(data, status, headers, config){
        
        if (data != '') {
          data = JSON.parse("{"+data+"}");
          if (data.admin) {
            $userProvider.setUser({id: data.id, login: data.name, email: data.email, roles: $userProvider.rolesEnum.admin});
          }else{
            $userProvider.setUser({id: data.id, login: data.name, email: data.email, roles: $userProvider.rolesEnum.user});
          };
          $rootScope.$emit('rootScope.signInSuccess');
          
        }else{

          validateSignIn.chekUserInput($event, '', '', "Неверный логин или пароль")
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
    var currentUser = function(){
      return $userProvider.getUser();
    }

    return {
      login:        login,
      logOut:       logOut,
      isAdmin:      isAdmin,
      isSignedIn:   isSignedIn,
      currentUser:  currentUser
    }

}]);