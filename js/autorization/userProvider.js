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