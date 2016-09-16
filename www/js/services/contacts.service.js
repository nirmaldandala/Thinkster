slackclone.factory('ContactsService', function($q){
    var contactArr = [];
	var formatContact = function(contact) {

            var contact =  {
                "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
                "emails"        : contact.emails || [],
                "phones"        : contact.phoneNumbers || [],
                "photos"        : contact.photos || []
            };

            contactList(contact);
            return contact;

        };

        var contactList = function(c) {
            contactArr.push(c);
            return contactArr;
        };

        var pickContact = function() {
            var deferred = $q.defer();
            if(navigator && navigator.contacts) {
                navigator.contacts.pickContact(function(contact){
                    deferred.resolve( formatContact(contact) );
                });
            } else {
                var mycontacts = [{
                    "name" : "Nirmal",
                    "emails" : "nir.dan@gmail.com",
                    "phones" : "8888888",
                    "photos" : []
                },
                {
                    "name" : "Nirmal",
                    "emails" : "nir.dan@gmail.com",
                    "phones" : "8888888",
                    "photos" : []
                }];

                mycontacts.pickContact(function(contact){
                    deferred.resolve( formatContact(contact) );
                });
            }
            return deferred.promise;
        };

        return {
            pickContact : pickContact,
            contactArr : contactArr
        };
});
