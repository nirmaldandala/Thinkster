slackclone.controller('ChannelsCtrl', function($state, Auth, Users, FirebaseUrl, profile, channels, $rootScope, $cordovaContacts){
    var channelsCtrl = this;
    var userList = [];
    channelsCtrl.profile = profile;
	channelsCtrl.channels = channels;
	channelsCtrl.getDisplayName = Users.getDisplayName;
	channelsCtrl.contacts = [];
	channelsCtrl.newChannel = {
	  name: '',
	  admin: '',
	  users: userList
	};
	channelsCtrl.createChannel = function(){
	  channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(ref){
	    $state.go('channels.messages', {channelId: ref.key()});  
	  });
	  channelsCtrl.addChanneltoUser();
	};

	channelsCtrl.addChanneltoUser = function() {
		var uid = $rootScope.userId;
		var ref = new Firebase(FirebaseUrl);
		var userRef  = ref.child("users");
		var channelRef = ref.child("channels");
		var channelNameID = userRef.child(uid+'/channels/').push();
		var channelNameIDKey = channelNameID.key();
		var channelObj = {};
		channelObj[channelNameIDKey] = true;
		userRef.child(uid+"/channels/").update(channelObj);
		var users = {};
		users[uid] = true;
		channelRef.child(channelNameIDKey).update({
						channel_admin : uid, 
						channel_name  : '100days',
						users
		});
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