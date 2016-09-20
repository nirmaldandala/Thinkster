slackclone.controller('ProfileCtrl', function($state, auth, md5, profile){
    var profileCtrl = this;
    profileCtrl.profile = profile;

    profileCtrl.updateProfile = function(){
	  profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
	  profileCtrl.profile.$save();
	  $state.go('channels');
	};
});