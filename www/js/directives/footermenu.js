slackclone.directive('footermenu', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/views/footermenu.html',
		controller: function($rootScope, $scope) {

		},
		link: function(scope, elem) {
			$('.footerTabs a').on('click', function () {
				if ($(this).hasClass('tab-item')) {
		            $(this).siblings('.tab-item').removeClass('active');
		            $(this).addClass('active');
		        }
			});
		}
	}
});