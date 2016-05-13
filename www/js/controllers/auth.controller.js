slackclone.controller('AuthCtrl', function(Auth, $state, $rootScope){
    var authCtrl = this;
    $rootScope.channelList = [];
    authCtrl.isRegister = false;
    authCtrl.user = {
      email: '',
      password: ''
    };

    authCtrl.taketoregister = function() {
    	$state.go('register');
    };

    authCtrl.taketologin = function() {
    	$state.go('login');
    };

    authCtrl.login = function (){
	  Auth.$authWithPassword(authCtrl.user).then(function (auth){
	  	// Default state is Login Page. Register is controlled by isRegister flag
	  	authCtrl.isRegister ? $state.go('profile') : $state.go('channels');
	  }, function (error){
	    authCtrl.error = error;
	  });
	};

	authCtrl.register = function (){
	  authCtrl.isRegister = true;
	  Auth.$createUser(authCtrl.user).then(function (user){
	    authCtrl.login();
	  }, function (error){
	    authCtrl.error = error;
	  });
	};
});