slackclone.controller('ChannelsViewCtrl', function(ChannelView, $state, Auth, Users, FirebaseUrl, $rootScope, $cordovaContacts){
    var channelsviewCtrl = this;
    channelsviewCtrl.movieData = ChannelView.movieData();
});
