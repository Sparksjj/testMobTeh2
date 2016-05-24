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
  	var button = $event.target;
    var form = $(button).parent();
    var titleForm = form.find("div").eq(0);
    var messageForm = form.find("div").eq(1);

  	if ($scope.newMessageForm.title.length < 3) {
  		titleForm.addClass("has-error");
  	}else{
      titleForm.removeClass("has-error");
  	};

  	if ($scope.newMessageForm.message.length < 10) {
  		messageForm.addClass("has-error");
  	}else{
      messageForm.removeClass("has-error");
  	};
    if (titleForm.hasClass("has-error") || messageForm.hasClass("has-error")) {
      return;
    }

  	$http.post('easy-serv.php', {"id": $scope.messagesLength, "userId": 0, "title": $scope.newMessageForm.title, "mess": $scope.newMessageForm.message}).success(function(data, status, headers, config){
  		$scope.messages = data;
      $scope.newMessageForm.title = "";
      $scope.newMessageForm.message = "";
      form.slideToggle(200);
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