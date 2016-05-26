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