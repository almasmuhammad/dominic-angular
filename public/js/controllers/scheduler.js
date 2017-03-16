myApp.controller('SchedulerController', ['$scope', '$rootScope', '$firebaseObject', '$routeParams',

  function ($scope, $rootScope, $firebaseObject, $routeParams) {
      
        ref = firebase.database().ref("/days");
        console.log('ref next');
        console.log(ref);
      
        // function to set the default data
//firebase.database().ref('/associates/' + profUID).set({      
      
        $scope.reset = function () {
            ref.set({
                monday: {
                    name: 'Monday'
                    , slots: {
                        0900: {
                            time: '9:00am'
                            , booked: false
                        }
                        , 0110: {
                            time: '11:00am'
                            , booked: false
                        }
                    }
                }
                , tuesday: {
                    name: 'Tuesday'
                    , slots: {
                        0900: {
                            time: '9:00am'
                            , booked: false
                        }
                        , 0110: {
                            time: '11:00am'
                            , booked: false
                        }
                    }
                }
            });
        };
}]); // Controller
