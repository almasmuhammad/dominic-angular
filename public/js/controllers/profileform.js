myApp.controller('ProfileFormController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',

  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
      
        /* ------------------- Load profile data --------------------- */
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
            var massage = snapshot.val().massage;
            populateCheckbox('pf_cbMassage', massage);          
            
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
                // profile pic handler for deleting
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
      
      
        /* ------------------- Save profile data --------------------- */
        btnSaveProfile.addEventListener('click', function (e) {
            const pf_profileActive = getCheckedCheckboxesFor('pf_cbActive');
            const pf_firstName = pf_txtFirstName.value;
            const pf_lastName = pf_txtLastName.value;
            const pf_email = pf_txtEmail.value;
            const pf_mobile = pf_txtMobile.value;
            const pf_myTitle = getCheckedCheckboxesFor('pf_cbMyTitle');
            const pf_profilePic = pf_txtProfilePic;
            const pf_about = pf_txtareaAbout.value;
            const pf_hairColor = getCheckedCheckboxesFor('pf_cbHairColor');
            const pf_hairTexturizer = getCheckedCheckboxesFor('pf_cbHairTexturizers');
            const pf_hairCuts = getCheckedCheckboxesFor('pf_cbHairCuts');
            const pf_hairAddition = getCheckedCheckboxesFor('pf_cbHairAddition');
            const pf_wax = getCheckedCheckboxesFor('pf_cbWax');
            const pf_massage = getCheckedCheckboxesFor('pf_cbMassage');           
            const pf_manicures = getCheckedCheckboxesFor('pf_cbManicures');
            const pf_pedicures = getCheckedCheckboxesFor('pf_cbPedicures');
            const pf_miscSvcs = getCheckedCheckboxesFor('pf_cbMiscServices');
            const pf_products = getCheckedCheckboxesFor('pf_cbProducts');
            const pf_referral = getCheckedCheckboxesFor('pf_cbReferral');
            const pf_newClient = getCheckedCheckboxesFor('pf_cbNcDiscount');
            const pf_refDiscount = pf_txtRefDiscount.value;
            const pf_ncDiscount = pf_txtNcDiscount.value;
            
            // upload profile pic to Google Storage
            var fileToUpload = document.getElementById("pf_txtProfilePic").files[0];
            if (fileToUpload != null) {
                var metadata = {
                    contentType: 'image/*'
                };
                var storageRef = firebase.storage().ref().child('/images/' + profUID);
                var uploadTask = storageRef.put(fileToUpload, metadata).then(function (snapshot) {
                    console.log('Uploaded a blob or file!');
                    console.log(snapshot);
                }).catch(function (error) {
                    console.log('no file to upload');
                    console.log(error);
                });
            }
            var d = new Date();
            var now = d.toDateString();
            firebase.database().ref('/associates/' + profUID).set({
                profile: pf_profileActive
                , firstname: pf_firstName
                , lastname: pf_lastName
                , email: pf_email
                , mobile: pf_mobile
                , title: pf_myTitle
                , createdate: now
                , about: pf_about
                , hairColor: pf_hairColor
                , hairText: pf_hairTexturizer
                , hairCut: pf_hairCuts
                , hairAddition: pf_hairAddition
                , wax: pf_wax
                , massage: pf_massage
                , mani: pf_manicures
                , pedi: pf_pedicures
                , miscSvcs: pf_miscSvcs
                , products: pf_products
                , referral: pf_referral
                , newClient: pf_newClient
                , refdiscountPct: pf_refDiscount
                , ncdiscountPct: pf_ncDiscount
                , regUID: profUID
            });
            $('#modalProfileSave-body').text('Your profile has been saved!');
            $('#modalProfileSave').modal('show');
            
            
            // return checkbox values
            function getCheckedCheckboxesFor(checkboxName) {
                var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]:checked'), values = [];
                Array.prototype.forEach.call(checkboxes, function(el) {
                    values.push(el.value);
                });
                return values;
            }
        });  // Save profile data
      
      
}]); // Controller


function uploadProfilePicToGS(input) {
    var fileToUpload = document.getElementById("pf_txtProfilePic").files[0];
    console.log(fileToUpload);
    
    if( fileToUpload != null ) {
        var metadata = {
            contentType: 'image/*'
        };
        var storageRef = firebase.storage().ref().child('/images/temp-ok-to-delete');
        var uploadTask = storageRef.put(fileToUpload, metadata).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            storageRef.getDownloadURL().then(function(url) {
                console.log(url);
                document.getElementById("pf_imgProfilePic").src = url;
            });
        }).catch(function(error) {
            console.log('no file to upload');
            console.log(error);
        });
    }    
    
}



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
      