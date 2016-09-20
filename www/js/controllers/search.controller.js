slackclone.controller('SearchCtrl', function ($rootScope, $mdDialog, $mdToast, $ionicHistory, omdbget, $http, StorageService){
  var searchCtrl = this;

  var curPage = 0;
  searchCtrl.canShowMore = false;
  searchCtrl.noResults = false;
  searchCtrl.certified = false;
  searchCtrl.rotten = false;

  searchCtrl.search = function() {
    var searchKey = searchCtrl.searchKey;
    omdbget.getMovieInfo(searchCtrl.searchKey).then(function(response) {
      if(searchKey.length > 2 && response.data.Response === "True") {
        searchCtrl.noResults = false;
        searchCtrl.movieList = response.data.Search;
      }
      else if(searchKey.length <= 2 && response.data.Response === "True") {
        searchCtrl.noResults = true;
        searchCtrl.movieList = [];
      }
      else{
        searchCtrl.noResults = false;
        searchCtrl.movieList = [];
      }
      
    });
  };

  searchCtrl.shareMovie = function(movie) {
    var confirm = $mdDialog.prompt()
          .placeholder('Say Something...')
          .ariaLabel('Say Something...')
          .ok('Send!');

    $mdDialog.show(confirm).then(function(result) {
        var favList = StorageService.getAll(), imdbIds = [];
        movie.addedComment = result;
        if(favList) {
          for (var i = 0; i < favList.length; i++) {
            imdbIds.push(favList[i].imdbID);
          };
          if(imdbIds.indexOf(movie.imdbID) == -1) {
            StorageService.add(movie);
            searchCtrl.showToast();
          }
        }
        else{
          StorageService.add(movie);
        }
    });
  };

  searchCtrl.showToast = function () {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Awesome! You shared a movie!!')
          .position('top')
          .hideDelay(3000)
      );
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