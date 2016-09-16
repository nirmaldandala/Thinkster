slackclone.controller('ContactsCtrl', function(ContactsService, $state, Auth, Users, FirebaseUrl, $rootScope, $cordovaContacts){
    var contactsCtrl = this;
    contactsCtrl.contactstitle = "Contacts";	
    contactsCtrl.data = {
        selectedContacts : []
    };

    contactsCtrl.pickContact = function() {

        ContactsService.pickContact().then(
            function(contact) {
                $scope.data.selectedContacts.push(contact);
                console.log("Selected contacts=");
                console.log($scope.data.selectedContacts);

            },
            function(failure) {
                console.log("Bummer.  Failed to pick a contact");
            }
        );

    }

});
