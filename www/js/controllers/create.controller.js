slackclone.controller('CreateCtrl', function($state, Auth, Users, FirebaseUrl, $rootScope, $cordovaContacts){
    var createCtrl = this;
    var userList = [];
	createCtrl.getDisplayName = Users.getDisplayName;
	createCtrl.contacts = [];

	createCtrl.addChanneltoUser = function(channelname) {
		var uid = localStorage.getItem('userId');
		var ref = new Firebase(FirebaseUrl);
		var userRef  = ref.child("users");
		var channelRef = ref.child("channels");
		var channelNameID = userRef.child(uid+'/channels/').push();
		var channelNameIDKey = channelNameID.key();
		$rootScope.channelList.push(channelNameIDKey);
		var channelObj = {};
		channelObj[channelNameIDKey] = true;
		userRef.child(uid+"/channels/").update(channelObj);
		var users = {};
		users[uid] = true;
		channelRef.child(channelNameIDKey).update({
						channelAdmin : uid,
						channelName  : channelname,
						channelMessages: true,
						users
		});
		userRef.child(uid+'/channels/'+channelNameIDKey).update({
			            channelAdmin : uid,
			            channelName  : channelname
		});
		$state.go('channels');
	};
});
