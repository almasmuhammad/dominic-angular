//myApp.controller('BookingController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL'
//    , function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
//        console.log('in booking controller!');
//        $(document).ready(function () {
//            var appointments = [];
//            $scope.appointments = appointments;
//            //bookUID = $rootScope.currentUser.uid;
//            bookUID = "0yMxewmgTYU8dxG6mq4fLbQxeU02";
//            firebase.database().ref('/bookings/' + bookUID).once('value').then(function (snapshot) {
//                snapshot.forEach(function (childSnapshot) {
//                    var bookingDate = childSnapshot.key;
//                    var bookingDetails = childSnapshot.val();
//                    console.log(bookingDetails.client);
//                    // Get firstname and lastname
//                    //userIUD = bookingDetails.client;
//                    //firebase.database().ref('/users/' + userIUD).once('value').then(function (snapshot) {
//                    //firstname = snapshot.val().firstname;
//                    //lastname = snapshot.val().lastname;
//                    //name = firstname + ' ' + lastname;
//                    //email = snapshot.val().email;
//                    name = "Joe Smith";
//                    email = "test@test.com";
//                    d1 = new Date(bookingDate).toString("MM-dd-yyyy h:mm tt");
//                    d2 = new Date(bookingDate).toString("dddd, MMMM dd yyyy - h:mm tt");
//                    d3 = new Date(bookingDetails.dateBooked).toString("dddd, MMMM dd yyyy - h:mm tt");
//                    day = new Date(bookingDate).toString("dddd");
//                    appointments.push({
//                        bookingDate: d1
//                        , name: name
//                        , email: email
//                        , day: d2
//                        , service: bookingDetails.service
//                        , minutesToComplete: bookingDetails.minutesToComplete
//                        , dateBooked: d3
//                    });
//                    //});
//                });
//            });
//        });
//}]); // Controller



myApp.controller('BookingController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',            
  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
      
      console.log('in bookings controller!');
      bookUID = $rootScope.currentUser.uid;
      
      /* Get staff */
      ref = firebase.database().ref('/bookings/' + bookUID);
      var apptList = $firebaseArray(ref);
      console.log(apptList);

      $scope.appointments = apptList;
      
      /* Delete staff member handler */
      //$scope.deleteStaffmember = function(item){
    //      console.log('delete staff member!!');
          
          // Confirm staffer delete
      //    $('#fullName').text(item.firstname + " " + item.lastname);
    //      $('#modalDeleteConfirm').modal('show');
    //      $('#pf_modalYes').on('click', function () {
    //          $scope.staffers.$remove(item);
    //      });
    //  }   
   
      
}]); // Controller



