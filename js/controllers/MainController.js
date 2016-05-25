app.controller('GuestbookController', ('$scope', function($scope, $http) { 
  
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
messages();
  function messages(){

  	$http.get('data/messages.json').success(function(data, status, headers, config){
  		$scope.messages = data;
  	})
}



	
  $scope.sendNewMessage = function($event , type){
  	var button 			= $event.target;
    var form 			= $(button).parent();

    var titleForm 		= form.find("div.form-group").eq(0);
    var titleText 		= titleForm.find("input").val();

    var messageForm 	= form.find("div.form-group").eq(1);
    var messageText 	= messageForm.find("textarea").val();

    var titleError 		= form.find('div.title-error');
    var messageError 	= form.find('div.message-error');

  	if (titleText.length < 3) {
  		titleForm.addClass("has-error");

  		if (titleError.length == 0) {
  			$("<div class='error title-error'>Заголовок должен быть больше 3 символов</div>").prependTo(form);
  		};

  	}else{
    	titleForm.removeClass("has-error");
   		titleError.remove();
  	};

  	if (messageText.length  < 10) {
  		messageForm.addClass("has-error");

  		if (messageError.length == 0) {
  			$("<div class='error message-error'>Сообщение должно быть больше 10 символов</div>").prependTo(form);
  		};

  	}else{
      messageForm.removeClass("has-error");
      messageError.remove();
  	};

    if (titleForm.hasClass("has-error") || messageForm.hasClass("has-error")) {
      return;
    }

    if (type == "new-mess") {
    	var messagesId= ($scope.messages[$scope.messages.length-1].id +1);

  		$http.post('easy-serv.php', {"id": messagesId, "userId": 0, "title": titleText, "mess": messageText})
  			.success(function(data, status, headers, config){

  			$scope.messages = data;
    		titleForm.find("input").val('')
    		messageForm.find("textarea").val('');
    		form.slideToggle(200);

  		})

    }else if(type == "new-answer"){
    	var answerId = $scope.answers[$scope.answers.length-1].id +1;
    	var messId   = form.parent().prev(".message").attr("data-message-id");

  		$http.post('easy-serv.php', {"id": answerId, "messId": messId, "userId": 0, "title": titleText, "mess": messageText})
  			.success(function(data, status, headers, config){

  			$scope.answers = data;
    		titleForm.find("input").val('')
    		messageForm.find("textarea").val('');
    		form.slideToggle(200);
    		messages();
  		})
    };

  }

  $scope.showForm = function($event){
  	var button = $event.target;
  	$(button).prev().slideToggle(200);
  };

  $scope.isAdmin = function(){
  	return true;
  };
  
}));