var app = angular.module('Login', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/login');
$stateProvider
            .state('login', {
                url: '/login',
                templateUrl: './template/login/login.html',
                controller : 'loginController'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: './template/login/signup.html',
                controller : 'loginController'
            })
});
