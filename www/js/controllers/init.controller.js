slackclone.controller('InitCtrl', function($rootScope){
    $rootScope.showFooter = true;
    $rootScope.navState = {
        groups : "active",
        lists : null,
        search : null
    };

    $rootScope.changeState = function () {
        var cur = $(event.currentTarget);
        if (cur.hasClass('tab-item')) {
            cur.siblings('.tab-item').removeClass('active');
            cur.addClass('active');
        }
    };
});