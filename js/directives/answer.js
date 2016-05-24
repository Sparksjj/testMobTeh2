app.directive('answer', function() { 
  return { 

    restrict: 'E', 
    scope: { 
      message: '=',
      users: '=',
    }, 
    templateUrl: 'js/directives/answer.html',

    link: function($scope, element, attr){
    	$scope.user = findUser();
    
    	function findUser(){
    		var user;
    		$scope.users.forEach(function(item){
    			if (item.id == $scope.message.userId && !user){
    				user = item;
    			} 
    		})
    		return user;
    	};

  	}

  }; 
});