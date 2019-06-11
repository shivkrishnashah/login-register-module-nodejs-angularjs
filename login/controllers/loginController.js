/*
 Author - Shivkrishna Shah
 Date - 11-06-2019
*/
app.controller('loginController', function($scope, $http, $timeout  ){

// Desc- Initializtion
  $scope.init = function(){
    $scope.user = {
      username : "",
      password:'',
      contact:'',
      email:''
    }
  }

// Desc - Common Methods For SHow Errors
  function showSuccessMessage(message){
    $scope.successMesssage =message;
    $timeout(function(){
      $scope.successMesssage = "";
    },5000);
  }
  function showErrorMessage(message){
    $scope.errorMesssage =message;
    $timeout(function(){
      $scope.errorMesssage = "";
    },5000);
  }

// Desc - For Register User
  $scope.register = function(valid){
    if(valid){
      $http.post('http://192.168.43.43:8000/saveData', $scope.user).success(function(res, req) {
        if(res.status == false){
             showErrorMessage(res.message);
        }else{
             showSuccessMessage(res.message);
             $scope.user = {}
             $scope.signupForm.$setPristine();
        }
      });
    }
  }

})
