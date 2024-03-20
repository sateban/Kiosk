$(document).ready(function () {

    $('#btn_signup').click(function () {

        var email = $('#email').val();
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var adds = $('#address').val();
        var studno = $('#studno').val();
        var studnoValue = $('#dropdownMenuButton').val();

        if (email == "") {
            sw("Please Enter Email");
            $('#email').focus();

        } else if (fname == "") {
            sw("Please Enter First Name");
            $('#fname').focus();
        } else if (lname == "") {
            sw("Please Enter Last Name");
            $('#lname').focus();
        } else if (adds == "") {
            sw("Please Enter Address");
            $('#adds').focus();
        } else if (studno == "" && studnoValue == $("#oldStud").text()) {
            sw("Please Student Number");
            $('#studno').focus();
        } else if (studnoValue == "Student Status") {
            sw("Please Select Student Status");
            $('#studno').focus();
        } else {

            $.ajax({
                url: "signedup.php",
                method: "POST",
                data: "&email=" + email + "&fname=" + fname + "&lname=" + lname + "&adds=" + adds + "&studno=" + studno + "&btn_signup=signup",
                success: function (data) {
                    console.log(data);
                    if (data == 'success') {
                        Swal.fire({
                            title: 'Successful',
                            text: 'You have Applied successfully, click Okay to send OTP',
                            icon: 'success',
                            confirmButtonText: 'Send OTP',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonColor: "#75d53e",
                        }).then((result) => { // Redirect to OTP Verification of Email
                            if (result.value) {
                                signUpVerification();
                            }
                        });
                        // window.location = "signup.php";
                    } else if (data == "duplicate") {
                        Swal.fire(
                            'Duplicate Email',
                            'Email already exist, please try another email',
                            'warning'
                        );
                    } else {
                        console.log(data);
                        Swal.fire({
                            title: 'Error',
                            html: `A server issue has been encountered <br><code>${data}</code>`,
                            icon: 'error'
                        });
                    }
                }
            });
        }
    });

    function sw(text) {
        Swal.fire(
            'Verify your input',
            text,
            'info'
        );
    }

    // Signup email verification
    //  $("#signupbtn").click(function () {
    function signUpVerification() {
        if ($("#email").val() != '') { // Add || condition for additional fields of input
            let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            let email = $("#email").val();

            if (regex.test(email)) {
                Swal.fire({
                    title: 'Sending Verification',
                    text: 'Please Wait...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                });

                $.ajax({
                    url: "signupmail.php",
                    type: "POST",
                    data: "email=" + $("#email").val(),
                    success: function (data) {
                        Swal.close();
                        if (data == "success") {
                            nextStepOTP();
                        }
                    },
                    error: function (data) {
                        Swal.close()
                        Swal.fire(
                            'Error',
                            'Please try again later',
                            'warning'
                        );
                    }
                });
            } else {
                Swal.fire(
                    'Error',
                    'Invalid email format',
                    'warning'
                );
            }
        } else {
            Swal.fire(
                'Empty input field',
                'Enter input for the following empty input fields',
                'warning'
            );
        }
    }

    function nextStepOTP() {
        Swal.fire({
            title: "YOU'RE ONE STEP AHEAD TO CREATE YOUR ACCOUNT!",
            icon: 'success',
            html: `<div>Please enter the 6 digit OTP sent in your email.</div> \
            <input type="text" id="verificationinput" \ 
            style="margin-top: 15px; letter-spacing: 5px; padding: 5px 20px 5px 20px; background: #75d53e; color: white; border-radius: 50px; font-weight: bold; font-size: 20px; width: 35%; text-align: center" maxlength="6" fdprocessedid="zfwdke">`,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonColor: "#858585",
            confirmButtonText: "Verify OTP"
        }).then((result) => {
            // window.open("verification.php");
            if (result.value) {
                verifyOTP();
            }
        });

        $(".swal2-html-container input").on("keyup", function (e) {
            if ($(".swal2-html-container input").val().length + 1 >= 6) {
                $(".swal2-actions button")[0].style.display = "inline-block";
                $(".swal2-actions button")[1].style.display = "none";
                $(".swal2-actions button")[2].style.display = "none";
                $(".swal2-actions").fadeIn();
            } else {
                $(".swal2-actions").fadeOut();
            }
        });
    }

    function verifyOTP() {
        $.ajax({
            url: "verify_otp.php",
            type: "POST",
            data: "otp=" + $("#verificationinput").val(),
            success: function (data) {
                console.log(data);
                if (data == "success") {
                    Swal.fire({
                        title: 'OTP Verified',
                        icon: 'success',
                        html: `<select id="gradeselection" class="form-select" style="padding: 10px; border: 2px solid #a9a9a9; border-radius: 5px; color; #545454;">
                                <option id="kto10" selected>Kinder to Grade 10</option>
                                <option id="g11to12">Grade 11 & 12</option>
                            </select>`,
                        type: 'success',
                        confirmButtonColor: "#75d53e",
                        confirmButtonText: "Proceed to Enrolment Form",
                        showConfirmButton: true,
                        allowEscapeKey: false,
                        allowOutsideClick: false

                    }).then((result) => {

                        if($("#kto10").is(":selected")){
                            localStorage.setItem("tempUser", "true");
                            window.location = "online_enrollmentKG10.php";
                          } else if($("#g11to12").is(":selected")){
                              localStorage.setItem("tempUser", "true");
                             window.location = "online_enrollmentG11.php";
                          }

                    }).then((result) => {

                        if($("#dropdownMenuButton").val() == "Old Student"){
                            localStorage.setItem("tempUser", "true");
                            window.location = "old_student_enrollment.php";
                        } else {
                            // localStorage.setItem("tempUser", "true");
                            // window.location = "online_enrollmentKG1010.php";
                        }
                        // if($("#kto10").is(":selected")){
                        //    localStorage.setItem("tempUser", "true");
                        //    window.location = "online_enrollmentKG10.php";
                        //  } else if($("#g11to12").is(":selected")){
                        //      localStorage.setItem("tempUser", "true");
                        //     window.location = "online_enrollmentG11.php";
                        //  }
                        //  Redirect to enrolment apge
                        //  if 
                    });
                } else {
                    Swal.fire({
                        title: 'Invalid OTP',
                        text: 'Please try again',
                        icon: 'warning'
                    }).then((result) => {
                        nextStepOTP();
                    });
                }
            },
            error: function (data) {
                Swal.close()
                Swal.fire(
                    'Error',
                    'Please try again later',
                    'warning'
                );
            }
        });
    }

});