myApp.controller('SpecialistsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',

  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
      
        /* ------------------- Load profile data --------------------- */
        console.log('in specialists controller!');
        
        // Retrieve all associates
        ref = firebase.database().ref('/associates');
        var staffList = $firebaseArray(ref);
        $scope.staffers = staffList;

        staffList.$loaded()
        .then(function(data){
            angular.forEach(data, function(value, key) {
                console.log('**************************')
                console.log(value.regUID);
                var storageRef = firebase.storage().ref().child('/images/' + value.regUID);
                storageRef.getDownloadURL().then(function (url) {
                    console.log('url='+url);
                    document.getElementById(value.regUID).src = url;
                }).catch(function (error) {
                    console.log("error getting user's profile pic:");
                    console.log(error);
                });                
            })
        });              
      
}]); // Controller