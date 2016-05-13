slackclone.controller('SearchCtrl', function ($rootScope, $ionicHistory, omdbget, $http, StorageService){
  var searchCtrl = this;

  var curPage = 0;
  searchCtrl.canShowMore = false;
  searchCtrl.noResults = false;
  searchCtrl.certified = false;
  searchCtrl.rotten = false;

  searchCtrl.search = function() {
    var searchKey = searchCtrl.searchKey;
    omdbget.getMovieInfo(searchCtrl.searchKey).then(function(response) {
      if(response.data.Response === "True") {
        searchCtrl.noResults = false;
        searchCtrl.movieList = response.data.Search;
      }
      else{
        searchCtrl.noResults = true;
      }
      
    });
  };

  searchCtrl.shareMovie = function(movie) {
    StorageService.add(movie);
  };

  searchCtrl.taptest = function(movie) {
    $rootScope.movieCardInfo = {};
    searchCtrl.getAllInfo(movie.imdbID);
  };

  searchCtrl.getAllInfo = function(id) {
    omdbget.getAllInfo(id).then(function(response, data) {
       $rootScope.movieCardInfo = response.data;
    });
  };

  searchCtrl.myGoBack = function() {
     $ionicHistory.goBack();
  };
});