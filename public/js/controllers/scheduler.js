myApp.controller('SchedulerController', ['$scope', '$rootScope', '$firebaseObject', '$routeParams', '$firebaseArray',

  function ($scope, $rootScope, $firebaseObject, $routeParams, $firebaseArray) {
        window.scrollTo(0, 0);

        // Incoming user id
        var uid = $routeParams.uID;
      
        var days = [];
        var dayCount = 7;           // default number of future days to display
        var segments = 8;           // default to 8 1-hour segments
        var segmentMinutes = 60;    // default segments are 60 minutes
        
        $scope.items = [];
        firebase.database().ref('/associates/' + uid + '/hairCut').once('value').then(function (snapshot) {
            haircuts = snapshot.val();
            if(haircuts) {
                haircuts.forEach(function(cut){
                    $scope.items.push({value: cut.replace(/\ /gi,"_"), text: cut}); 
                });
            }
        });
        firebase.database().ref('/associates/' + uid + '/hairColor').once('value').then(function (snapshot) {
            hairColor = snapshot.val();
            if(hairColor) {
                hairColor.forEach(function(color){
                    $scope.items.push({value: color.replace(/\ /gi,"_"), text: color}); 
                });
            };

        });
        firebase.database().ref('/associates/' + uid + '/hairText').once('value').then(function (snapshot) {
            hairText = snapshot.val();
            if(hairText) {
                hairText.forEach(function(texture){
                    $scope.items.push({value: texture.replace(/\ /gi,"_"), text: texture}); 
                });
            };
        });
        firebase.database().ref('/associates/' + uid + '/wax').once('value').then(function (snapshot) {
            wax = snapshot.val();
            if(wax) {
                wax.forEach(function(wak){
                    $scope.items.push({value: wak.replace(/\ /gi,"_"), text: wak}); 
                });
            };
        });
        firebase.database().ref('/associates/' + uid + '/brow').once('value').then(function (snapshot) {
            brow = snapshot.val();
            if(brow) {
                wax.forEach(function(bro){
                    $scope.items.push({value: bro.replace(/\ /gi,"_"), text: bro}); 
                });
            };
        });
        firebase.database().ref('/associates/' + uid + '/facial').once('value').then(function (snapshot) {
            facial = snapshot.val();
            if(facial) {
                facial.forEach(function(face){
                    $scope.items.push({value: face.replace(/\ /gi,"_"), text: face}); 
                });
            };
        });
        firebase.database().ref('/associates/' + uid + '/makeup').once('value').then(function (snapshot) {
            makeup = snapshot.val();
            if(makeup) {
                makeup.forEach(function(make){
                    $scope.items.push({value: make.replace(/\ /gi,"_"), text: make}); 
                });
            };
        });
        firebase.database().ref('/associates/' + uid + '/mani').once('value').then(function (snapshot) {
            mani = snapshot.val();
            if(mani) {
                mani.forEach(function(man){
                    $scope.items.push({value: man.replace(/\ /gi,"_"), text: man}); 
                });
            };
        });
        firebase.database().ref('/associates/' + uid + '/pedi').once('value').then(function (snapshot) {
            pedi = snapshot.val();
            if(pedi) {
                pedi.forEach(function(ped){
                    $scope.items.push({value: ped.replace(/\ /gi,"_"), text: ped}); 
                });
            };
        }); 
        firebase.database().ref('/associates/' + uid + '/massage').once('value').then(function (snapshot) {
            massage = snapshot.val();
            if(massage) {
                massage.forEach(function(mas){
                    $scope.items.push({value: mas.replace(/\ /gi,"_"), text: mas}); 
                });
            };
        });
      
      
      
      
        // Load up the dayCount and segment minutes (segmentTime) from staff member's profile
        firebase.database().ref('/associates/' + uid + '/bookingConfiguration').once('value').then(function (snapshot) {
            if( snapshot.val().dayCount ) {
                dayCount = snapshot.val().dayCount; 
            }
            if( snapshot.val().segmentTime ) {
                segmentMinutes = snapshot.val().segmentTime; 
            }
        });
      
        firebase.database().ref('/associates/' + uid + '/hours').once('value').then(function (snapshot) {
            
            // Work schedule reference
            obj = snapshot.val();
            var myWorkSchedule = new Object();
            myWorkSchedule["Monday"] = {'work': obj.Monday.work, 'start': obj.Monday.start, 'end': obj.Monday.end};
            myWorkSchedule["Tuesday"] = {'work': obj.Tuesday.work, 'start': obj.Tuesday.start, 'end': obj.Tuesday.end};
            myWorkSchedule["Wednesday"] = {'work': obj.Wednesday.work, 'start': obj.Wednesday.start, 'end': obj.Wednesday.end};
            myWorkSchedule["Thursday"] = {'work': obj.Thursday.work, 'start': obj.Thursday.start, 'end': obj.Thursday.end};
            myWorkSchedule["Friday"] = {'work': obj.Friday.work, 'start': obj.Friday.start, 'end': obj.Friday.end};
            myWorkSchedule["Saturday"] = {'work': obj.Saturday.work, 'start': obj.Saturday.start, 'end': obj.Saturday.end};
            myWorkSchedule["Sunday"] = {'work': obj.Sunday.work, 'start': obj.Sunday.start, 'end': obj.Sunday.end};

            var d1 = Date.today();
            for (i = 0; i < dayCount; i++) {
                var todaysDate = d1.toString("d-MMM-yyyy");
                var dayofWeek = d1.getDayName(); 
                var starttime = myWorkSchedule[dayofWeek].start;
                var endtime = myWorkSchedule[dayofWeek].end;
                var dow = d1.getDay();
                
                d1 = Date.parse(todaysDate + ',' + starttime);
                d2 = Date.parse(todaysDate + ',' + endtime);
                
                // Calculate segments based on duration between starttime and endtime, divided by segment minutes
                workMinutes = getMinutesBetweenDates(d1, d2);
                segments = workMinutes / segmentMinutes;
                
                slots = [];
                for (j = 0; j < segments; j++) {
                    slot = d1.clone();
                    
                    // if this is a staffer's workday, then set 'booked' to false so clients can book appointments
                    isWorkday = myWorkSchedule[dayofWeek].work == 'on' ? false : true;
                    slots.push({
                        'booked': isWorkday
                        , 'start': slot.toString("HH:mm tt")
                        , 'timestamp': slot
                    });
                    d1.addMinutes(segmentMinutes);
                };
                day = {
                    'todaysDate': todaysDate
                    , 'dayofWeek': dayofWeek
                    , 'dow': dow
                    , 'timeslots': slots
                };
                days.push(day);
                // Next day.
                d1.addDays(1);
            };
            $scope.days = days;
        });
      
        // Once page loads, read this associate's booking data and update view
        $(document).ready(function() {
            console.log('in doc ready!');
            
            firebase.database().ref('/bookings/' + uid).once('value').then(function (snapshot) {
                console.log('in snapshot');
                snapshot.forEach(function(childSnapshot) {
                    var bookingDate = childSnapshot.key;
                    var bookingDetails = childSnapshot.val();
                    d1 = new Date(bookingDate);
                    
                    // Loop thru bookings to block out time slots on view 
                    days.forEach(function(day) {
                        day.timeslots.forEach(function(slot) {
                            if( slot.timestamp == d1.toString() ) {
                                slot.booked = true;
                            };
                        });
                    });
       
                });
                
                // Update the view
                $rootScope.$apply();
            });  
            
        });
      
      
      
      function getMinutesBetweenDates(startDate, endDate) {
        var diff = endDate.getTime() - startDate.getTime();
        return (diff / 60000);
      }
}]); // Controller
