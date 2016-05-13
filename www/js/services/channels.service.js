slackclone.factory('Channels', function($firebaseArray, FirebaseUrl, $rootScope){
	var channelLength = $rootScope.channelList.length;
    var ref = new Firebase(FirebaseUrl+'/users/'+$rootScope.userId+'/channels');
    var channels = $firebaseArray(ref);

    return channels;
 });