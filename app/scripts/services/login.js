'use strict';

/**
 * @ngdoc function
 * @name yapp.factory:loginService
 * @description
 * # loginService
 * Service of yapp
 */
angular.module("yapp").
	factory("loginService", ["$http", "$window", function($http, $window){
	
	var responseData = {};

	var authenticateUser = function(email, password, callback){
		$http.get("/api/users")
			.success(function(response){
				if(response.status == 'ok') {
					var users = angular.fromJson(response.data);
					angular.forEach(users, function(user){
						if(user.email === email && user.password === password) {
							rememberCredential(email, password);
							responseData = {success:true, message:"logged in"};
							callback(responseData);
						}
					});
					responseData = {success:false, message:"invalid credentials"};
					callback(responseData);
				}
			})
			.error(function(error){
				responseData = {success:false, message:"prolem connecting server :("};
				callback(responseData);
			});
	};

	var rememberCredential = function(email, password) {
		$credentials = {};
		$credentials.currentuser = { email:email, password: password };
		$window.localStorage.setItem('credentials', $credentials);
	};

	var isAuthenticated = function() {
		if($window.localStorage.getItem('credentials') ===  undefined){
			return false;
		} else {
			return true;
		}
	};

	var logOut = function() {
		$window.localStorage.clear();		
	};

	return {
		"authenticateUser": authenticateUser,
		"logOut": logOut,
		"isAuthenticated": isAuthenticated
	}

}]);