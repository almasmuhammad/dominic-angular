myApp.controller('ProfileFormController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',

  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
        console.log('in profile controller!');
        profUID = $rootScope.currentUser.uid;
        
        var spinner = startSpinner();
      
        firebase.database().ref('/associates/' + profUID).once('value').then(function (snapshot) {
            console.log('in populate profile form');
            var myProfileActive = snapshot.val().profile;
            populateCheckbox('pf_cbActive', myProfileActive);
            $('#pf_txtFirstName').val(snapshot.val().firstname);
            $('#pf_txtLastName').val(snapshot.val().lastname);
            $('#pf_txtEmail').val(snapshot.val().email);
            $('#pf_txtMobile').val(snapshot.val().mobile);
            var myTitle = snapshot.val().title;
            populateCheckbox('pf_cbMyTitle', myTitle);
            $('#pf_txtareaAbout').val(snapshot.val().about);
            var hairColor = snapshot.val().hairColor;
            populateCheckbox('pf_cbHairColor', hairColor);
            var hairTexturizers = snapshot.val().hairText;
            populateCheckbox('pf_cbHairTexturizers', hairTexturizers);
            var hairCuts = snapshot.val().hairCut;
            populateCheckbox('pf_cbHairCuts', hairCuts);
            var hairAddition = snapshot.val().hairAddition;
            populateCheckbox('pf_cbHairAddition', hairAddition);
            var waxing = snapshot.val().wax;
            populateCheckbox('pf_cbWax', waxing);
            var manicures = snapshot.val().mani;
            populateCheckbox('pf_cbManicures', manicures);
            var pedicures = snapshot.val().pedi;
            populateCheckbox('pf_cbPedicures', pedicures);
            var miscServices = snapshot.val().miscSvcs;
            populateCheckbox('pf_cbMiscServices', miscServices);
            var products = snapshot.val().products;
            populateCheckbox('pf_cbProducts', products);
            var referralOn = snapshot.val().referral;
            if (referralOn == "on") {
                $("input[id='pf_cbReferral']").each(function (index, element) {
                    element.setAttribute("checked", true);
                });
            }
            var newClientOn = snapshot.val().newClient;
            if (newClientOn == "on") {
                $("input[id='pf_cbNcDiscount']").each(function (index, element) {
                    element.setAttribute("checked", true);
                });
            }
            $('#pf_txtRefDiscount').val(snapshot.val().refdiscountPct);
            $('#pf_txtNcDiscount').val(snapshot.val().ncdiscountPct);
            
            // Retrieve profile pic URL from Google Storage
            var storageRef = firebase.storage().ref().child('/images/' + profUID);
            console.log(storageRef);
            storageRef.getDownloadURL().then(function (url) {
                document.getElementById("pf_imgProfilePic").src = url;
                // Delete profile pic handler
                $('.img-wrap .close').on('click', function () {
                    console.log(storageRef);
                    // Confirm delete
                    $('#modalDeleteConfirm').modal('show');
                    $('#pf_modalYes').on('click', function () {
                        // Delete the file
                        storageRef.delete().then(function () {
                            console.log('delete profile pic successful');
                            document.getElementById("pf_imgProfilePic").src = '/images/default_avatar.png';
                            show('#deleteProfilePicSuccess');
                        }).catch(function (error) {
                            console.log('delete profile pic NOT successful');
                        });
                    });
                });
                spinner.stop();
            }).catch(function (error) {
                console.log("error getting user's profile pic!");
                console.log(error);
                spinner.stop();
            });
        }).catch(function (error) {
            // error wil be an Object
            console.log("no associate for this user's UID!");
            firebase.database().ref('/users/' + profUID).once('value').then(function (snapshot) {
                console.log('in firebase database read user')
                firstname = snapshot.val().firstname;
                lastname = snapshot.val().lastname;
                email = snapshot.val().email
                $('#welcome-name').text(firstname + ' ' + lastname);
                $('#pf_txtFirstName').val(firstname);
                $('#pf_txtLastName').val(lastname);
                $('#pf_txtEmail').val(email);
                spinner.stop();
            }).catch(function (e) {
                console.log('in read associate error handler')
                console.log(e.message);
                spinner.stop();
            });
        });
}]); // Controller

function populateCheckbox(checkboxID, myKwArray) {
    if (myKwArray == null) {
        return;
    }
    $("input[id='" + checkboxID + "']").each(function (index, element) {
        myKwArray.forEach(function (entry) {
            if (element.value === entry) {
                element.setAttribute("checked", true);
            }
        });
    });
}
      
function startSpinner() {
    // Create the Spinner with options
    var spinner = new Spinner({
        lines: 13, 
        length: 28, 
        width: 14,
        radius: 42, 
        scale: 1, 
        corners: 1, 
        color: '#d56e2f', 
        opacity: 0.25, 
        rotate: 0, 
        direction: 1, 
        speed: 1, 
        trail: 60, 
        fps: 20, 
        zIndex: 2e9, 
        className: 'spinner', 
        top: '50%', 
        left: '50%', 
        shadow: true, 
        hwaccel: false, 
        position: 'absolute'
     }).spin(document.getElementById("spinMe"));
    
    return spinner;
}
      
      
          /* auth.onAuthStateChanged(function (authUser) {
        if( authUser ) {
            console.log("pfscript - in onAuthStateChanged");
    
            // Create the Spinner with options
            var spinner = new Spinner({
                lines: 8 // The number of lines to draw
                , length: 0 // The length of each line
                , width: 30 // The line thickness
                , radius: 82 // The radius of the inner circle
                , scale: 2 // Scales overall size of the spinner
                , corners: 1 // Corner roundness (0..1)
                , color: '#d56e2f' // #rgb or #rrggbb or array of colors
                , opacity: 0.25 // Opacity of the lines
                , rotate: 0 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 1 // Rounds per second
                , trail: 60 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '50%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: true // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            }).spin(document.getElementById("spinMe"));         
            
            console.log('firebaseuser user lives:');
            console.log(authUser);
            myCurrentUid = authUser.uid;
            
            // populate Profile Form with current info
            firebase.database().ref('/associates/' + myCurrentUid).once('value').then(function(snapshot) {
                console.log('in populate profile form')
                
                var myProfileActive = snapshot.val().profile;
                populateCheckbox('pf_cbActive', myProfileActive);
                
                var name = snapshot.val().firstname + ' ' + snapshot.val().lastname;
                $('#welcome-name').text(name);
                $('#pf_txtFirstName').val(snapshot.val().firstname);
                $('#pf_txtLastName').val(snapshot.val().lastname);
                $('#pf_txtEmail').val(snapshot.val().email);
                $('#pf_txtMobile').val(snapshot.val().mobile);
                
                var myTitle = snapshot.val().title;
                populateCheckbox('pf_cbMyTitle', myTitle);
                
                $('#pf_txtareaAbout').val(snapshot.val().about);
                
                var hairColor = snapshot.val().hairColor;
                populateCheckbox('pf_cbHairColor', hairColor);
                
                var hairTexturizers = snapshot.val().hairText;
                populateCheckbox('pf_cbHairTexturizers', hairTexturizers);
                
                var hairCuts = snapshot.val().hairCut;
                populateCheckbox('pf_cbHairCuts', hairCuts); 
                
                var hairAddition = snapshot.val().hairAddition;
                populateCheckbox('pf_cbHairAddition', hairAddition);                 
                
                var waxing = snapshot.val().wax;
                populateCheckbox('pf_cbWax', waxing);
                
                var manicures = snapshot.val().mani;
                populateCheckbox('pf_cbManicures', manicures);
                
                var pedicures = snapshot.val().pedi;
                populateCheckbox('pf_cbPedicures', pedicures);
               
                var miscServices = snapshot.val().miscSvcs;
                populateCheckbox('pf_cbMiscServices', miscServices);          
                
                var products = snapshot.val().products;
                populateCheckbox('pf_cbProducts', products); 
                
                var referralOn = snapshot.val().referral;
                if( referralOn == "on" ) {
                    $("input[id='pf_cbReferral']").each(function(index, element) {
                        element.setAttribute("checked", true);
                    });
                }
                
                var newClientOn = snapshot.val().newClient;
                if( newClientOn == "on" ) {
                    $("input[id='pf_cbNcDiscount']").each(function(index, element) {
                        element.setAttribute("checked", true);
                    });
                }
                
                $('#pf_txtRefDiscount').val(snapshot.val().refdiscountPct);
                $('#pf_txtNcDiscount').val(snapshot.val().ncdiscountPct);
                
                // Retrieve profile pic URL from Google Storage
                var storageRef = firebase.storage().ref().child('/images/' + myCurrentUid);
                console.log(storageRef);
                storageRef.getDownloadURL().then(function(url) {
                    console.log(url);
                    document.getElementById("pf_imgProfilePic").src = url;
                    
                    // Delete profile pic handler
                    $('.img-wrap .close').on('click', function() {
                        console.log(storageRef);
                        // Confirm delete
                        $('#modalDeleteConfirm').modal('show');
                        $('#pf_modalYes').on('click', function() {
                            // Delete the file
                            storageRef.delete().then(function() {
                                console.log('delete profile pic successful');
                                document.getElementById("pf_imgProfilePic").src = '/images/default_avatar.png';
                                show('#deleteProfilePicSuccess');
                            }).catch(function(error) {
                                console.log('delete profile pic NOT successful');
                            });                             
                        });
                    });                      
                    
                    spinner.stop();
                }).catch(function(error){
                    spinner.stop();
                });
            
            }).catch(function(error) {
                // error wil be an Object
                console.log('no profile for this user!');
                
                firebase.database().ref('/users/' + myCurrentUid).once('value').then(function(snapshot) {
                    console.log('in firebase database read user')
                    firstname   = snapshot.val().firstname;
                    lastname    = snapshot.val().lastname;
                    email       = snapshot.val().email
                    $('#welcome-name').text(firstname + ' ' + lastname);
                    $('#pf_txtFirstName').val(firstname);
                    $('#pf_txtLastName').val(lastname);
                    $('#pf_txtEmail').val(email);
                    //spinner.stop();
                }).catch(function(e) {
                    console.log('in read associate error handler')
                    console.log(e.message);
                    //spinner.stop();
                });            
            });
            
        } else {
            console.log('no   user');
        }            
    });
      */