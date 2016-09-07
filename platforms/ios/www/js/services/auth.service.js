slackclone.factory('Auth', function($firebaseAuth, FirebaseUrl, $rootScope) {
	 var ref = new Firebase(FirebaseUrl);
	 $rootScope.channelList = [];
     var auth = $firebaseAuth(ref);

     return auth;
});