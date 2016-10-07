// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('neopago',  ['ionic','ionic.service.core','ngCordova' , 'controllers' , 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
//    if(window.Connection) {
//        console.log(window.Connection);
//          if(navigator.connection.type == Connection.NONE) {
//              $ionicPopup.confirm({
//                  title: "Internet Disconnected",
//                  content: "The internet is disconnected on your device."
//              })
//              .then(function(result) {
//                  if(!result) {
//                      ionic.Platform.exitApp();
//                  }
//              });
//          }
//      }
  });
})

.config(function($stateProvider, $urlRouterProvider ) { 
   $stateProvider
  
   .state('login', {
    url: '/login',
    templateUrl: "views/login.html",
    controller: 'loginCtrl'
  })
  .state('hdas', {
		url: '/hdas',
		abstract: false,
		templateUrl: 'views/header-dashboard.html',
		controller: 'hdasCtrl'
	})
  
  .state('hdas.dashboard',{
		url: '/dashboard',
		views:{
			'hdas-dashboard': {
				templateUrl: 'views/dashboard.html',
				controller: 'dashboardCtrl'
			}
		}
	})
	.state('hdas.pagos-cobros',{
		url: '/pagos-cobros',
		views:{
			'hdas-pagos-cobros': {
				templateUrl: 'views/pagos-cobros.html',
				controller: 'paymetCtrl'
			}
		}
	})
	.state('hdas.cartera',{
		url: '/cartera',
		views:{
			'hdas-cartera': {
				templateUrl: 'views/cartera.html',
				controller: 'carteraCtrl'
			}
		}
	})
	
	.state('menu.prueba',{
		url: '/cartera',
		views:{
			'hdas-cartera': {
				templateUrl: 'views/my-modal.html',
				controller: 'pruebaCtrl'
			}
		}
	})
	
	
	

	.state('menu', {
    url: "/menu",
    abstract: false,
    templateUrl: "views/sidemenu.html",
    controller: 'menuCtrl'
  })
   // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
