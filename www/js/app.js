// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var slackclone = angular.module('slackclone', ['ngMaterial', 'ionic', 'firebase', 'ui.router', 'ngCordova', 'ngStorage', 'angular-md5']);

slackclone.constant('FirebaseUrl', 'https://slackclonetest2.firebaseio.com/');

slackclone.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
      url: '/',
      controller: 'AuthCtrl as authCtrl',
      templateUrl: 'views/login.html',
      resolve: {
        requireNoAuth: function($state, Auth, $rootScope){
          return Auth.$requireAuth().then(function(auth){
            localStorage.setItem('userId', auth.uid);
            $state.go('channels');
          }, function(error){
            return;
          });
        }
      }
    })
    $stateProvider.state('register', {
      url: '/register',
      controller: 'AuthCtrl as authCtrl',
      templateUrl: 'views/register.html',
      resolve: {
        requireNoAuth: function($state, Auth){
          return Auth.$requireAuth().then(function(auth){
            $state.go('profile');
          }, function(error){
            return;
          });
        }
      }
    })
    $stateProvider.state('channels.messages', {
      url: '/{channelId}/messages',
      templateUrl: 'views/messages.html',
      controller: 'MessagesCtrl as messagesCtrl',
      resolve: {
        messages: function($stateParams, Messages){
          return Messages.forChannel($stateParams.channelId).$loaded();
        },
        channelName: function($stateParams, channels){
          return '#'+channels.$getRecord($stateParams.channelId).name;
        }
      }
    })
    $stateProvider.state('channels.create', {
      url: '/create',
      templateUrl: 'views/create.html',
      controller: 'ChannelsCtrl as channelsCtrl'
    })
    $stateProvider.state('search', {
      url: '/search',
      controller: 'SearchCtrl as searchCtrl',
      templateUrl: 'views/search.html',
    })
    $stateProvider.state('moviecard', {
      url: '/moviecard',
      controller: 'SearchCtrl as searchCtrl',
      templateUrl: 'views/moviecard.html',
    })
    $stateProvider.state('lists', {
      url: '/lists',
      controller: 'ListCtrl as listCtrl',
      templateUrl: 'views/lists.html',
    })
    $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl as profileCtrl',
      templateUrl: 'views/profile.html',
      resolve: {
        auth: function($state, Users, Auth){
          return Auth.$requireAuth().catch(function(){
            $state.go('profile');
          });
        },
        profile: function(Users, Auth){
          return Auth.$requireAuth().then(function(auth){
            return Users.getProfile(auth.uid).$loaded();
          });
        }
      }
    })
  $stateProvider.state('channels', {
      url: '/channels',
      controller: 'ChannelsCtrl as channelsCtrl',
      templateUrl: 'views/channels.html',
      resolve: {
        channels: function (Channels){
          return Channels.$loaded();
        },
        profile: function ($state, Auth, Users){
          return Auth.$requireAuth().then(function(auth){
            return Users.getProfile(auth.uid).$loaded().then(function (profile){
              if(profile.displayName){
                return profile;
              } else {
                $state.go('profile');
              }
            });
          }, function(error){
            $state.go('channels');
          });
        }
      }
    })
    $urlRouterProvider.otherwise('/');
});
