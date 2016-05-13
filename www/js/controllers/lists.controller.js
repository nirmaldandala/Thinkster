slackclone.controller('ListCtrl', function(StorageService) {
	var listCtrl = this;
	listCtrl.favoriteList = [];
	listCtrl.pageTitle = "Favorites";
	listCtrl.favoriteList = StorageService.getAll();

	listCtrl.deleteMovie = function(movieid) {
	    angular.forEach(listCtrl.favoriteList, function(value, key){
	      if(value.imdbID === movieid) {
	        listCtrl.favoriteList.splice(key, 1);
	      }
	    });
	};
});