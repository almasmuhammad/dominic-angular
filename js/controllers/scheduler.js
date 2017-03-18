myApp.controller('SchedulerController', ['$scope', '$rootScope', '$firebaseObject', '$routeParams',

  function ($scope, $rootScope, $firebaseObject, $routeParams) {
      
    ref = firebase.database().ref("/days");
    console.log('ref next');
    console.log(ref);
    
//    var syncObject = $firebaseObject(ref);
//    syncObject.$bindTo($scope, 'days');
      
     day1 = {'monday' : {
                'name' : 'Monday', 
                'slots': {
                    '8:00am': {
                        'booked': false, 
                        'time': '8:00am'
                        },
                    '8:15am': {
                        'booked': false, 
                        'time': '8:15am'
                        }
                    }
                },
              'tuesday' : {
                'name' : 'Tuesday', 
                'slots': {
                    '8:00am': {
                        'booked': false, 
                        'time': '8:00am'
                        },
                    '8:15am': {
                        'booked': false, 
                        'time': '8:15am'
                        }
                    }
                }
            };

//            day3 = {'wednesday' : {
//                'name' : 'wednesday', 
//                'slots': {
//                    '8:00am': {
//                        'booked': false, 
//                        'time': '10:00am'
//                        },
//                    '8:15am': {
//                        'booked': false, 
//                        'time': '10:15am'
//                        }
//                    }
//                }
//            };
      
//      dayarray = [];
//      dayarray.push(day1);
//      dayarray.push(day2);
//      dayarray.push(day3);
//      console.log(dayarray[0]);

      $scope.days = day1;

      

      
//      var dayCount = 1;
//      
//    for (i = 1; i < dayCount + 1; i++) { 
//        var newDate = new Date(Date.now() + i*24*60*60*1000);
//        console.log('newDate=' + newDate);
//        day = {newdate : {
//                'name' : 'Monday', 
//                'slots': {
//                    '8:00am': {
//                        'booked': 'false', 
//                        'time': '8:00am'
//                        }
//                    }
//                }
//            };
//        days.push(day);
//                                         
//    }

      
}]); // Controller
