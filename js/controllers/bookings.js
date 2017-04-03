myApp.controller('BookingController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL'
  
    , function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
        console.log('in booking controller!');
        var appointments = [];
        bookUID = $rootScope.currentUser.uid;
        firebase.database().ref('/bookings/' + bookUID).once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var bookingDate = childSnapshot.key;
                var bookingDetails = childSnapshot.val();
                console.log(bookingDetails.client);
                // Get firstname and lastname
                userIUD = bookingDetails.client;
                firebase.database().ref('/users/' + userIUD).once('value').then(function (snapshot) {
                    firstname = snapshot.val().firstname;
                    lastname = snapshot.val().lastname;
                    name = firstname + ' ' + lastname;
                    email = snapshot.val().email;
                    d1 = new Date(bookingDate).toString("MM-dd-yyyy h:mm tt");
                    d2 = new Date(bookingDate).toString("dddd, MMMM dd yyyy - h:mm tt");
                    d3 = new Date(bookingDetails.dateBooked).toString("dddd, MMMM dd yyyy - h:mm tt");
                    day = new Date(bookingDate).toString("dddd");
                    appointments.push({
                        bookingDate: d1
                        , name: name
                        , email: email
                        , day: d2
                        , service: bookingDetails.service
                        , minutesToComplete: bookingDetails.minutesToComplete
                        , dateBooked: d3
                    });
                });
            });
        });
        $scope.appointments = appointments;
}]); // Controller