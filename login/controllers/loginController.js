app.controller('loginController', function($scope, $http  ){

  $scope.init = function(){
    $scope.user = {
      username : "",
      password:'',
      contact:'',
      email:''
    }
  }


  $scope.login = function(){

  }

  $scope.register = function(){
    $scope.signupForm.$setPristine();
    // $http.post('http://192.168.43.43:3000/saveData', $scope.user).success(function(res, req) {
    //     console.log('res',res );
    // });
  }

})
