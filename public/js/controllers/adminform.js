myApp.controller('AdminController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',            
  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
      
      /* Get Associates */
      console.log('in admin controller!');
      
      ref = firebase.database().ref('/associates');
      var staffList = $firebaseArray(ref);
      $scope.staffers = staffList;

      /* staffList.$loaded()
          .then(function(data){
          angular.forEach(data, function(value, key) {
              console.log('**************************')
                console.log(value.regUID);
                console.log(value.firstname + ' ' + value.lastname);
                console.log(value.createdate);
                console.log(value.email);
                console.log(value.title);
                console.log(value.mobile);
            })
        }); */
      
      uref = firebase.database().ref('/users');
      var userList = $firebaseArray(uref);
      $scope.users = userList;
      
      /* userList.$loaded()
          .then(function(data){
          angular.forEach(data, function(value, key) {
              console.log('********** Users *************')
                console.log(value.regUser);
                console.log(value.firstname + ' ' + value.lastname);
                console.log(value.createdate);
                console.log(value.associate);
            })
        }); */
      
  $scope.deleteThis = function(id, name, message){
      console.log('deleteThis!!');
    //$scope.list.$remove(id);
  }      
      
}]); // Controller