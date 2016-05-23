app.controller('MainController', ('$scope', function($scope, $http) { 
  $scope.title = 'Гостевая книга'; 

/*  $scope.users = [

  	{
  		id: 0,
  		name: "Петр",
  		password: "12345",
  		email: "Petr@mail.ru",
  		avatar: "img/avatar.jpg",
  	},
  	{
  		id: 1,
  		name: "Катя",
  		password: "12345",
  		email: "Kate@mail.ru",
  		avatar: "img/avatar.jpg",
  	},
  	{
  		id: 2,
  		name: "Валера",
  		password: "12345",
  		email: "Valera@mail.ru",
  		avatar: "img/avatar.jpg",
  		admin: 1,
  	},

  ];*/

  $http.get('data/users.json').success(function(data, status, headers, config){
  	$scope.users = data;
  })
  $http.get('data/messages.json').success(function(data, status, headers, config){
  	$scope.messages = data;
  })

  $scope.answer = [
  	{
  		name: "Петр",
  		password: "12345",
  		email: "Petr@mail.ru",
  	},
  	{
  		name: "Петр",
  		password: "12345",
  		email: "Petr@mail.ru",
  	},
  	{
  		name: "Петр",
  		password: "12345",
  		email: "Petr@mail.ru",
  	},
  ];

}));