myApp.controller('StaffDetailController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseObject', '$routeParams', 'FIREBASE_URL',

  function ($scope, $rootScope, $firebaseAuth, $firebaseObject, $routeParams, FIREBASE_URL) {
      
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


        // Retrieve all associates
        /*ref = firebase.database().ref('/associates');
        var staffList = $firebaseArray(ref);
        $scope.staffers = staffList;

        staffList.$loaded()
        .then(function(data){
            angular.forEach(data, function(value, key) {
                console.log('**************************')
                console.log(value.regUID);
                var storageRef = firebase.storage().ref().child('/images/' + value.regUID);
                storageRef.getDownloadURL().then(function (url) {
                    console.log('url=' + url);
                    myID = "SD" + value.regUID;
                    document.getElementById(myID).src = url;
                }).catch(function (error) {
                    console.log("error getting user's profile pic:");
                    console.log(error);
                });                
            })
        });     */         
      
}]); // Controller