app.controller('MainController', ('$scope', function($scope, $http) { 
  $scope.title = 'Гостевая книга'; 
  $scope.newMessageForm = {
  	title: "",
  	message: ""
  };

  $http.get('data/users.json').success(function(data, status, headers, config){
  	$scope.users = data;
  })
  $http.get('data/answers.json').success(function(data, status, headers, config){
  	$scope.answers = data;
  })

  $http.get('data/messages.json').success(function(data, status, headers, config){
  	$scope.messages = data;
  	$scope.messagesLength= ($scope.messages[$scope.messages.length-1].id +1);
  	console.log($scope.messagesLength);
  })


    $scope.$watch($scope.users, function(value){
     
    })



  $scope.sendNewMessage = function($event){
  	console.log($scope.newMessageForm.message.length);
  	if ($scope.newMessageForm.title.length < 3) {
  		return;
  	}else{

  	};

  	if ($scope.newMessageForm.message < 10) {
  		return;
  	}else{

  	};
  	  $http.post('easy-serv.php', {"id": $scope.messagesLength, "userId": 0, "title": $scope.newMessageForm.title, "mess": $scope.newMessageForm.message}).success(function(data, status, headers, config){
  		$scope.messages = data;
  	})
  }

  $scope.showForm = function($event){
  	var button = $event.target;
  	$(button).prev().slideToggle(200);
  };

  $scope.isAdmin = function(){
  	return true;
  };
  
}));