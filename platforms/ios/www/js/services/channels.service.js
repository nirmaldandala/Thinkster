slackclone.factory('Channels', function($firebaseArray, FirebaseUrl, $rootScope){
    var ref = new Firebase(FirebaseUrl+'/'+$rootScope.userId+'/channels');
    var channels = $firebaseArray(ref);

    return channels;
 });