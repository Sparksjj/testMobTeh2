/*for gets requests*/
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