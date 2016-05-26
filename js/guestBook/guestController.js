app.controller('GuestbookController', ['$scope', 'authorizationFactory', '$http',"getRequests", "postRequests","validateForm",
	function($scope, authorizationFactory, $http, getRequests, postRequests, validateForm) { 
  
  getRequests.getUsers.success(function(data){
    $scope.users = data;
  })

  getRequests.getMessages.success(function(data){
  	$scope.messages = data;
  })

  getRequests.getAnswers.success(function(data){
    $scope.answers = data;
  })

	
  $scope.sendNewMessage = function($event , type){

    var chek = validateForm.validateMessAnsw($event) //return false if invalid or mess/answ obj data

  	if (!chek){
      return
    };

    if (type == "new-mess") {
    	var messagesId= ($scope.messages[$scope.messages.length-1].id +1);

  		postRequests.post({"id": messagesId, "userId": 0, "title": chek.titleText, "mess": chek.messageText})
  			.success(function(data, status, headers, config){

  			$scope.messages = data;

    		chek.titleForm.find("input").val('')
    		chek.messageForm.find("textarea").val('');
    		chek.form.slideToggle(200);

  		})

    }else if(type == "new-answer"){
    	var answerId = $scope.answers[$scope.answers.length-1].id +1;
    	var messId   = chek.form.parent().prev(".message").attr("data-message-id");

  		postRequests.post({"id": answerId, "messId": messId, "userId": 0, "title": chek.titleText, "mess": chek.messageText})
  			.success(function(data, status, headers, config){

        $scope.answers = data; 

    		chek.titleForm.find("input").val('')
    		chek.messageForm.find("textarea").val('');
    		chek.form.slideToggle(200);
  		})

    };

  }


  $scope.answer =   function(mess){
    var answer;
    $scope.answers.forEach(function(item){
      if (item.messId == mess.id && !answer){
        answer = item;
      } 
    })
    return answer;
  };


  $scope.showForm = function($event){
  	var button = $event.target;
  	$(button).prev().slideToggle(200);
  };

  $scope.isAdmin = authorizationFactory.isAdmin;
  $scope.isSignedIn = authorizationFactory.isSignedIn;
}]);