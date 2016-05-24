app.directive('message', function() { 
  return { 

    restrict: 'E', 
    scope: true, 
    templateUrl: 'js/directives/message.html',

    link: function($scope, element, attr){
    	$scope.user = findUser();
      $scope.answer = findAnswer();

      function findUser(){
        var user;
        $scope.users.forEach(function(item){
          if (item.id == $scope.mess.userId && !user){
            user = item;
          } 
        })
        return user;
      };  
          
    	function findAnswer(){
    		var answer;
    		$scope.answers.forEach(function(item){
    			if (item.messId == $scope.mess.id && !answer){
    				answer = item;
    			} 
    		})
    		return answer;
    	};

  	}

  }; 
});