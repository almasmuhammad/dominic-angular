myApp.controller('AdminController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',            
  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
      
      console.log('in admin controller!');
      
      /* Get staff */
      ref = firebase.database().ref('/associates');
      var staffList = $firebaseArray(ref);
      $scope.staffers = staffList;
      
      /* Get registered users (staff and customers) */
      uref = firebase.database().ref('/users');
      var userList = $firebaseArray(uref);
      $scope.users = userList;
      
      /* Delete staff member handler */
      $scope.deleteStaffmember = function(item){
          console.log('delete staff member!!');
          console.log(item);
          
          // Confirm staffer delete
          $('#fullName').text(item.firstname + " " + item.lastname);
          $('#modalDeleteConfirm').modal('show');
          $('#pf_modalYes').on('click', function () {
              $scope.staffers.$remove(item);
          });
      }   
  
      /* Delete user handler */
      $scope.deleteUser = function(item){
          console.log('delete user!!');
          console.log(item);
          
          // Confirm user delete
          $('#fullName').text(item.firstname + " " + item.lastname);
          $('#modalDeleteConfirm').modal('show');
          $('#pf_modalYes').on('click', function () {
              $scope.users.$remove(item);
          });
      } 

}]); // Controller