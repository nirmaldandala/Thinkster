slackclone.controller('ChannelsCtrl', function($state, Auth, Users, FirebaseUrl, profile, channels, $rootScope, $cordovaContacts){
    var channelsCtrl = this;
    var userList = [];
    channelsCtrl.profile = profile;
	channelsCtrl.channels = channels;
	channelsCtrl.getDisplayName = Users.getDisplayName;
	channelsCtrl.contacts = [];

	channelsCtrl.addChanneltoUser = function(channelname) {
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
	};

	channelsCtrl.gotoMsg = function (channelname) {
		$state.go('channels.messages');
	};

	channelsCtrl.getContacts = function() {
		$cordovaContacts.find('').then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      		channelsCtrl.contacts = allContacts;
    	});
	};

	channelsCtrl.logout = function(){
	  Auth.$unauth();
	  $state.go('login');
	};

	channelsCtrl.init = function() {
		channelsCtrl.getContacts();
	};
});
