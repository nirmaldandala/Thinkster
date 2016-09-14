slackclone.factory('Channels', function($firebaseArray, FirebaseUrl, $rootScope){
	var userId = localStorage.getItem('userId');
	//var channelLength = $rootScope.channelList.length;
    var ref = new Firebase(FirebaseUrl+'/users/'+userId+'/channels');
    var channels = $firebaseArray(ref);

    return channels;
 });
