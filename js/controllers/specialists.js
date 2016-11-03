myApp.controller('SpecialistsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',

  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
      
        /* ------------------- Load profile data --------------------- */
        console.log('in specialists controller!');
        
        ref = firebase.database().ref('/associates');
        console.log(ref);
      
        var staffList = $firebaseArray(ref);
        console.log(staffList);
      
        $scope.staffers = staffList;
      
}]); // Controller