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


/*for get requests*/
app.factory("getRequests", function($http){

  var getRequests = {

    getUsers: $http.get('data/users.json').success(function(data, status, headers, config){
      return data;
      }),

    getAnswers: $http.get('data/answers.json').success(function(data, status, headers, config){
      return data;
      }),

    getMessages: $http.get('data/messages.json').success(function(data, status, headers, config){
      return data;
      })

  }

  return getRequests;

})

/*for post requests*/
app.factory("postRequests", function($http){

  var postRequests = {
    post: function(data){
      return $http.post('easy-serv.php', data).success(function(data, status, headers, config){
                data;
              })
    }
  }

  return postRequests;

})


/*for validation mess/answ forms*/
app.factory("validateForm", function(){

  var validateMessAnsw = function($event){

    var button      = $event.target;
    var form      = $(button).parent();

    var titleForm     = form.find("div.form-group").eq(0);
    var titleText     = titleForm.find("input").val();

    var messageForm   = form.find("div.form-group").eq(1);
    var messageText   = messageForm.find("textarea").val();

    var titleError    = form.find('div.title-error');
    var messageError  = form.find('div.message-error');

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
      return false;
    }

      return {
        "form": form,
        "titleForm": titleForm,
        "titleText": titleText,
        "messageForm": messageForm,
        "messageText": messageText,
      }

  }

  return {
    validateMessAnsw: validateMessAnsw,
  };

})