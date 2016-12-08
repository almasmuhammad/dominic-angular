myApp.controller('StaffDetailController', ['$scope', '$rootScope', '$firebaseObject', '$routeParams',

  function ($scope, $rootScope, $firebaseObject, $routeParams) {
      
        /* ------------------- Load profile data --------------------- */
        console.log('in staff detail controller!');
        
        // retrieve the requested staff member's info
        ref = firebase.database().ref('/associates/' + $routeParams.uID);
        var staffmember = $firebaseObject(ref);
        console.log(staffmember);
      
        staffmember.$loaded().then(function() {
            console.log("loaded record:", staffmember.$id, staffmember.firstname);
            $scope.staffmember = staffmember;
        });
      
        var storageRef = firebase.storage().ref().child('/images/' + $routeParams.uID);
        storageRef.getDownloadURL().then(function (url) {
            console.log('url=' + url);
            myID = $routeParams.uID;
            document.getElementById(myID).src = url;
        }).catch(function (error) {
            console.log("error getting user's profile pic:");
            console.log(error);
        });        
      
}]); // Controller