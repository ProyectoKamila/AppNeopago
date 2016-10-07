angular.module('controllers',[ 'ionic', 'services', 'base64', 'ionic.service.push' ])

		.controller(
				'loginCtrl',
				function($rootScope, $scope, $state, $ionicLoading,
						$ionicPopup, $timeout, $http, $ionicHistory,$ionicPlatform,
						$ionicModal, sesion) {
					$scope.formularioRecuperar = true;
					$scope.formulario = false;

					$scope.entrarSalir = function(formData) {

						$scope.formulario = true;
						$scope.formularioRecuperar = false;

					}

					$scope.recuperarSalir = function(formData) {

						$scope.formulario = false;
						$scope.formularioRecuperar = true;

					}
					
					
					
					// kevis.rondon@proyectokamila.com
					$scope.continuar = function() {
						console.log("continuar");
						$scope.modal1.hide();
						$state.go("login");
					}
					$scope.responder = function(formData) {
						// responder
						// console.log($scope.email);
						var data = "email=" + $scope.email + "&respuesta="
								+ formData.responder;
						// console.log(data);
						$http(
								{
									method : 'POST',
									url : 'http://api.neopago.com/password/recover/question',
									data : data,
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								}).success(function(response, status) {
							// console.log(angular.toJson(response));
							// var pregunta = response.response;
							console.log(response.response);
							// $scope.pregunta = pregunta;
							$scope.respuesta = response.response;
							$scope.modal.hide();
							$scope.modal1.show();

						}).error(function(data, status, headers, config) {
							// handle error things
							$ionicLoading.show({
								template : '<ion-spinner "></ion-spinner>'
							});
							$ionicLoading.hide();
							$ionicPopup.alert({
								title : 'Ups :(',
								cssClass : 'jc-popup',
								template : data.error.message,
								scope : $scope,
								buttons : [ {
									text : 'Aceptar',
									type : ' button-mg jc-buttom',
									onTap : function(e) {
										$state.go('login');
									}
								} ]
							});
						})
					}

					$ionicModal.fromTemplateUrl('pregunta-modal.html', {
						scope : $scope,
						animation : 'slide-in-up'
					}).then(function(modal) {
						$scope.modal = modal;
					});

					$ionicModal.fromTemplateUrl('response.html', {
						scope : $scope,
						animation : 'slide-in-up'
					}).then(function(modal) {
						$scope.modal1 = modal;
					});

					$scope.formData = {};
					$scope.consultar = function(formData) { // consultar si la
															// cuanta existe y
															// regresa la
															// pregunta secreta.
					// console.log(formData.respuesta);
						var data = "email=" + formData.respuesta;
						$scope.email = formData.respuesta;
						// console.log(data);
						$http(
								{
									method : 'POST',
									url : 'http://api.neopago.com/password/recover/forgot',
									data : data,
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								}).success(function(response, status) {
							var pregunta = response.response;
							$scope.pregunta = pregunta;
							$scope.modal.show();
						}).error(function(data, status, headers, config) {
							// handle error things
							$ionicLoading.show({
								template : '<ion-spinner "></ion-spinner>'
							});
							$ionicLoading.hide();
							$ionicPopup.alert({
								title : 'Ups :(',
								cssClass : 'jc-popup',
								template : data.error.message,
								scope : $scope,
								buttons : [ {
									text : 'Aceptar',
									type : ' button-mg jc-buttom',
									onTap : function(e) {
										$state.go('login');
									}
								} ]
							});
						})

					}// fin consultar

					$scope.iniciar = function(formData) {
						var username = formData.rif;
						var password = formData.password;
						var access_token = "TWpnPS1lM2E5MTc0ZTdkZTcwMmNiMjEzYjI0ZThiYTkyYmUyZA==";
						var string = username + ":" + password;
						// 401758614
						// Kevis12345
						// var data = "rif=401758614&clave=Kevis12345"
						var data = "rif=" + username + "&clave=" + password;
						var encodedString = btoa(string);
						// console.log(data);
						$http(
								{
									method : 'POST',
									// url:
									// 'https://admin-base-toroalbert.c9users.io/api/login',
									url : 'http://api.neopago.com/login',
									data : data,
									// headers: {'Content-Type':
									// 'application/x-www-form-urlencoded','Authorization':
									// 'Basic ' + encodedString }
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLTNGRzMybkxxUzZKaGdsTjBKOE1DVGhTTHlITDk5YzllT2dtWWx6V1BBVFdXTDVkdmVoM05TQ0loTzZzdmpHR3NNSmhnaFJuMVhRdUdmXC9MeUl6cHROUVJMenlrZWhnPT0iLCJpc3MiOiJuZW9wYWdvLmNvbSIsImV4cCI6MTQ3MDEyOTI3MCwiaWF0IjoxNDcwMDg2MDcwLCJqdGkiOiI0YTIwNjk4ZmE0MDdmODcwYmMyOGI5Yzk0ZDAwOWU4OGE2NGRlNTBlNzhlZDdjMWM1MTNkNzdlN2MwNzRjZWYwZWQ5MWY2YTk5NzViMmUyNDBjYjIzM2Q2OTIzOTllMDA0NmEwMjQxYTAxOWUwZTMzNmM5YWM2YjNkYzFiMTE0MDBmOGI4MDlkY2U4MzM1OTY5YjU0NDNhZGYxODkzZTY0Y2NlZmJmYjc4MDRlNDZmZTA4NTNjODcwMDk1MmFhOWJlMGVkZTU0YjVmNjU3NzhkYzYwMjVhZDc0NGE0NTEwN2MxNDcxNzU1YzkyMWM2NTgwNGU4NWNjZWQxNDYxZjk5In0.ezfeg-8F43VggxFwu7vHBOmA5WJgshjUZK-P2-5qt3s

								})

						.success(function(response, status) {
							// handle success things
							if(response == null){
								sesion.nulo();
							}
							sesion.tokken(response.token);// guardar el token
															// en localstorage

							$state.go("hdas.dashboard"); // Cargar la nueva vista
							// console.log(sesion.showtokken());
							// console.log(">>>"+angular.toJson(response));
							// console.log(response.token);

							// localStorage.setItem('key',
							// response.token);//guardar
							// var value = localStorage.getItem('key');
							// //recuperar
							// console.log(value);
							// alert(localStorage.length);//contar
							// localStorage.removeItem('key');//borrar
							// $state.go("menu.dashboard");
						}).error(function(data, status, headers, config) {
							// handle error things
							$ionicLoading.show({
								template : '<ion-spinner "></ion-spinner>'
							});
							$ionicLoading.hide();
							$ionicPopup.alert({
								title : 'Ups :(',
								cssClass : 'jc-popup',
								template : data.error.message,
								scope : $scope,
								buttons : [ {
									text : 'Aceptar',
									type : ' button-mg jc-buttom',
									onTap : function(e) {
										$state.go('login');
									}
								} ]
							});
						})
					} // fin iniciar

				})
		.controller(
				'dashboardCtrl',
				function($rootScope, $scope, $state, $ionicLoading,
						$ionicPopup, $timeout, $http, $ionicHistory, sesion) {

				})
		.controller(
				'paymetCtrl',
				function($rootScope, $scope, $state, $ionicLoading,
						$ionicPopup, $timeout, $http, $ionicHistory, sesion) {
					console.log("paymetCtrl");

				})
		.controller(
				'carteraCtrl',
				function($rootScope, $scope, $state, $ionicLoading,
						$ionicPopup, $timeout, $http, $ionicHistory, sesion) {
					console.log("carteraCtrl");

				})

		.controller(
				'hdasCtrl',
				function($ionicHistory, $scope, $state, $ionicLoading,
						$timeout, $http, $ionicSideMenuDelegate, $stateParams,
						$rootScope, $cordovaCamera, $base64, $cordovaPush, $ionicPopup,
						sesion) {
					
					
					

					 $scope.menu = [
						 {name: 'Dashboard', click: 'dashboard();',},
						 {name: 'Cartera', click: 'cartera();',},
						 {name: 'Pagos y Cobros', click: 'pagos_cobros();',},
						 
						 {name:'Cerrar Sesión',click:'cerrar();'}
					 ]
					  
					 /*
					 * if given group is the selected group, deselect it
					 * else, select the given group
					 */
					 $scope.myGoBack = function() {
						 console.log("");
						 $ionicHistory.goBack();
					 };
					 
					 $scope.dashboard = function(){
						 $state.go('hdas.dashboard');
					 }
					 
					 $scope.cartera = function(){
						 $state.go('hdas.cartera');
					 }
					 $scope.pagos_cobros = function(){
						 $state.go('hdas.pagos-cobros');
					 }

					 $scope.toggleGroup = function(group) {
						 if ($scope.isGroupShown(group)) {
							 $scope.shownGroup = null;
						 } else {
							 $scope.shownGroup = group;
						 }
					 };
					 
					 $scope.isGroupShown = function(group) {
						 return $scope.shownGroup === group;
					 };

					 
					 
					 $scope.cerrar = function(){
						 Ionic.Auth.logout();
						 localStorage.clear();
						 $state.go('login');
					 }

					$ionicLoading.show({
						template : '<ion-spinner "></ion-spinner>'
					});
					// var push = new Ionic.Push({});

					$scope.closeModal = function() {
						$scope.modal.hide();
					};

					var token = sesion.showtokken();
					$http(
							{
								method : 'GET',
								url : 'http://api.neopago.com/api/v1/usuarios/info',
								headers : {
									'Content-Type' : 'application/x-www-form-urlencoded',
									'X-Auth-Token' : token
								}
							}).success(function(response, status) {
						 console.log("success"+angular.toJson(response));
						// var pregunta = response.response;
						// $scope.pregunta = pregunta;
						//		
						// $scope.modal.show();
//						console.log(response.response.imagen);
						var img = $base64.encode(response.response.imagen);
						var foto = "data:image/jpeg;base64," + img;
						
						 localStorage.setItem('imagen', img);//guardar
						 var value = localStorage.getItem('imagen');
//						$scope.image = value;
						$scope.image = response.response.imagen;
						 console.log(value);

					}).error(function(data, status, headers, config) {
						// handle error things
//						console.log("Error" + angular.toJson(data));
						if(!angular.isUndefined(data.error)){
							if(data.error = "Acceso denegado!"){
								$ionicLoading.hide();
								console.log("desloguear");
								$ionicLoading.hide();
								$ionicPopup.alert({
									title:'Sesion Expirada',
									cssClass: 'jc-popup',
									template: 'Debe iniciar sesion nuevamente',
									scope : $scope,
									buttons: [{
										text: 'Aceptar',
										type: 'button-mg jc-buttom',
										onTap: function(e){
											$state.go("login");
										}
									}]
								});
							}
						}
//						if(data.error)
//						console.log(data.error);
//						console.log(status);
//						console.log(headers);
//						console.log(config);
						// $ionicLoading.show({
						// template: '<ion-spinner "></ion-spinner>'
						// });
						// $ionicLoading.hide();
						// $ionicPopup.alert({
						// title: 'Ups :(',
						// cssClass: 'jc-popup',
						// template: data.error.message,
						// scope: $scope,
						// buttons: [
						// {
						// text: 'Aceptar',
						// type: ' button-mg jc-buttom',
						// onTap: function(e) {
						// $state.go('login');
						// }
						// }
						// ]
						// });
					})
					 $ionicLoading.hide();
				})
				
				.controller(
				'carteraCtrl',
				function($rootScope, $scope, $state, $ionicLoading,
						$ionicPopup, $timeout, $http, $ionicHistory, sesion) {
					console.log("carteraCtrl");

				})

// .controller('menuCtrl', function($ionicHistory,$scope, $state, $ionicLoading,
// $timeout, $http,$ionicSideMenuDelegate, $stateParams,$rootScope ){
//
// $scope.menu = [
// {
// name: 'Dashboard',
// click: 'dashboard();',
// },
// {
// name : 'Póliza',
// click: 'poliza();',
// },
// {
// name:'Reportar Siniestro',
// click:'reportar();'
// },
// {
// name:'Talleres y Clínicas',
// click:'talleres();'
// },
// {
// name:'Mi Carnet',
// click:'carnet();'
// },
// {
// name:'Datos Clínicos',
// click:'datos();'
// },
// {
// name:'Solicitar Grúa',
// click:'solicitar();'
// },
// {
// name:'Nosotros',
// click:'aser();'
// },
// {
// name:'Faqs',
// click:'faqs();'
// },
// {
// name:'Números de Emergencia',
// click:'numeros();'
// },
// {
// name:'Cerrar Sesión',
// click:'cerrar();'
// }
// ]
//  
// /*
// * if given group is the selected group, deselect it
// * else, select the given group
// */
// $scope.toggleGroup = function(group) {
// if ($scope.isGroupShown(group)) {
// $scope.shownGroup = null;
// } else {
// $scope.shownGroup = group;
// }
// };
// $scope.isGroupShown = function(group) {
// return $scope.shownGroup === group;
// };
//
// $scope.myGoBack = function() {
// console.log("atras");
// $ionicHistory.goBack();
// };
// $scope.poliza = function (){
// $state.go('menu.poliza');
// }
// $scope.dashboard = function(){
// $state.go('menu.dashboard');
// }
// $scope.carnet = function(){
// $state.go('menu.carnet');
// }
// $scope.numeros = function(){
// $state.go('menu.numeros');
// }
// $scope.aser = function(){
// $state.go('menu.aser');
// }
// $scope.faqs = function(){
// $state.go('menu.faqs');
// }
// $scope.datos = function(){
// $state.go('menu.datos');
// }
// $scope.talleres = function(){
// $state.go('menu.talleres');
// }
// $scope.reportar = function(){
// $state.go('menu.reportar');
// }
// $scope.solicitar = function(){
// $state.go('menu.solicitar');
// }
// $scope.cerrar = function(){
// Ionic.Auth.logout();
// localStorage.clear();
// $state.go('login');
// }
// })
// ;
