// document.querySelector('img[src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"]').style.display = 'none';

$(document).ready(function () {
  // if (localStorage.getItem("isLoginValid") == "true") {
  // 	window.location.href = "dashboard.php";
  // } else {
  // 	$('#btn_login').on("click", function (event) {
  // 		login();
  // 	});

  // 	$('#uname, #pass').keypress(function (event) {
  // 		var keycode = (event.keyCode ? event.keyCode : event.which);
  // 		if (keycode == '13') {
  // 			login();
  // 		}
  // 	});

  // 	function login() {
  // 		var uname = $('#uname').val();
  // 		var pass = $('#pass').val();

  // 		if (uname == "" || pass == "") {
  // 			Swal.fire({
  // 				title: 'Empty Field',
  // 				icon: 'info',
  // 				text: 'Please Enter Username or Password',
  // 				showConfirmButton: true,
  // 				showCancelButton: false
  // 			});
  // 		} else {
  // 			$.ajax({
  // 				url: "loginaccount.php",
  // 				type: "POST",
  // 				async: false,
  // 				data: "uname=" + uname.trim() + "&pass=" + pass.trim(),
  // 				success: function (data) {
  // 					console.log(data.length);

  // 					if (data.trim().length > 0) {
  // 						let login = data.length > 0 ? JSON.parse(data) : data;

  // 						localStorage.setItem("isLoginValid", "true");
  // 						localStorage.setItem("loggedInUser", login[0].LastName);
  // 						localStorage.setItem("email", login[0].email);
  // 						// console.log("Okay");
  // 						window.location.href = "dashboard.php";
  // 					} else {
  // 						//   alert(data);
  // 						// alert("Incorrect Username or Password!");
  // 						Swal.fire({
  // 							title: 'Incorrect Username or Password!',
  // 							icon: 'info',
  // 							// text: 'Please Enter Username or Password',
  // 							showConfirmButton: true,
  // 							showCancelButton: false
  // 						});
  // 						$('#pass').val("");
  // 						$('#uname').val("");
  // 					}
  // 				}
  // 			});
  // 		}
  // 	}
  // }

  // Show Login Form
  // $("#showLogin").on("click", function () {
  // 	if ($("#loginForm").css("display") == "block") {
  // 		$("#loginForm").fadeOut();
  // 		$("#applyForm").fadeOut();
  // 	} else {
  // 		$("#loginForm").fadeIn();
  // 		$("#applyForm").fadeOut();
  // 	}
  // });

  $("#btn_login").on("click", function (event) {
    login();
  });

  $("#uname, #pass").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      login();
    }
  });

  function login() {
    let uname = $("#uname").val();
    let pass = $("#pass").val();

    $.ajax({
      url: "login_credentials.php",
      type: "POST",
      async: false,
      data: "uname=" + uname.trim() + "&pass=" + pass.trim(),
      success: function (data) {
        console.log(data);
        if (data == "success") {
          // let login = data.length > 0 ? JSON.parse(data) : data;
          window.location.href = "index.php";
        } else {
          Swal.fire({
            title: "Incorrect Username or Password!",
            icon: "info",
            showConfirmButton: true,
            showCancelButton: false,
          });

          $("#pass").val("");
          $("#uname").val("");
        }
      },
    });
  }

  //   $("#forgotPassBtn").click(function () {
  //     console.log("Test");
  //     Swal.fire({
  //       title: "Please enter your email",
  //       icon: "info",
  //       html: `<div>Email: </div> \
  //             <input type="text" id="emailForgot" \
  //             style="margin-top: 15px; padding: 5px 20px 5px 20px; background: #a5a5a5; color: white; border-radius: 50px; font-size: 20px; width: 100%; text-align: center" >`,
  //       showConfirmButton: true,
  //       // allowEscapeKey: false,
  //       // allowOutsideClick: false,
  //       confirmButtonColor: "#858585",
  //       confirmButtonText: "Reset Password",
  //     }).then((result) => {
  //       // window.open("verification.php");
  //       if (result.value) {
  //         sessionStorage.setItem("forgotEmailPass", $("#emailForgot").val());

  //         if ($("#emailForgot").val().length > 0) {
  //           console.log($("#emailForgot").val().length);
  //           // console.log(sessionStorage.getItem("forgotEmailPass"));

  //           // Swal.fire({
  //           // 	title: 'Sending Verification',
  //           // 	text: 'Please Wait...',
  //           // 	allowEscapeKey: false,
  //           // 	allowOutsideClick: false,
  //           // 	showConfirmButton: false
  //           // 	// didOpen: () => {
  //           // 	// 	Swal.showLoading()
  //           // 	// }
  //           // });

  //           $.ajax({
  //             url: "reset_password.php",
  //             type: "POST",
  //             async: false,
  //             data: "email=" + sessionStorage.getItem("forgotEmailPass"),
  //             success: function (data) {
  //               console.log(data);
  //               if (data == "exists") {
  //                 Swal.fire({
  //                   title: "YOU'RE ONE STEP AHEAD TO RESET YOUR ACCOUNT!",
  //                   icon: "success",
  //                   html: `<div>Please enter the 6 digit OTP sent in your email.</div> \
  // 											<input type="text" id="resetpassinput" \
  // 											style="margin-top: 15px; letter-spacing: 5px; padding: 5px 20px 5px 20px; background: #75d53e; color: white; border-radius: 50px; font-weight: bold; font-size: 20px; width: 35%; text-align: center" maxlength="6" fdprocessedid="zfwdke">`,
  //                   showConfirmButton: false,
  //                   allowEscapeKey: false,
  //                   allowOutsideClick: false,
  //                   confirmButtonColor: "#858585",
  //                   confirmButtonText: "Verify OTP",
  //                 }).then((result) => {
  //                   if (result.value) {
  //                     $.ajax({
  //                       url: "verify_reset_otp.php",
  //                       type: "POST",
  //                       async: false,
  //                       data:
  //                         "email=" +
  //                         sessionStorage.getItem("forgotEmailPass") +
  //                         "&otp=" +
  //                         $("#resetpassinput").val(),
  //                       success: function (data) {
  //                         console.log($("#resetpassinput").val());
  //                         if (data == "success") {
  //                           Swal.fire({
  //                             title: "OTP Verified!",
  //                             icon: "success",
  //                             html: `<div>Please enter your password (minimum of 8 characters)</div> \
  // 																<input type="text" id="passwordinput" \
  // 																style="margin-top: 15px; letter-spacing: 5px; padding: 5px 20px 5px 20px; background: #75d53e; color: white; border-radius: 50px; font-weight: bold; font-size: 20px; width: 45%; text-align: center" minlength="8">`,
  //                             showConfirmButton: false,
  //                             allowEscapeKey: false,
  //                             allowOutsideClick: false,
  //                             confirmButtonColor: "#858585",
  //                             confirmButtonText: "Verify OTP",
  //                           }).then((result) => {
  //                             $.ajax({
  //                               url: "reset_password_now.php",
  //                               type: "POST",
  //                               async: false,
  //                               data:
  //                                 "email=" +
  //                                 sessionStorage.getItem("forgotEmailPass") +
  //                                 "&pass=" +
  //                                 $("#passwordinput").val().trim(),
  //                               success: function (data) {
  //                                 if (data == "success") {
  //                                   Swal.fire({
  //                                     title: "Successful",
  //                                     text: "Password successfully changed",
  //                                     icon: "success",
  //                                     confirmButtonColor: "#858585",
  //                                     confirmButtonText: "Okay",
  //                                   });
  //                                 }
  //                               },
  //                             });
  //                           });

  //                           $(".swal2-html-container input").on(
  //                             "keyup",
  //                             function (e) {
  //                               if (
  //                                 $(".swal2-html-container input").val().length +
  //                                   1 >=
  //                                 8
  //                               ) {
  //                                 $(".swal2-actions button")[0].style.display =
  //                                   "inline-block";
  //                                 $(".swal2-actions button")[1].style.display =
  //                                   "none";
  //                                 $(".swal2-actions button")[2].style.display =
  //                                   "none";
  //                                 $(".swal2-actions").fadeIn();
  //                               } else {
  //                                 $(".swal2-actions").fadeOut();
  //                               }
  //                             }
  //                           );
  //                         }
  //                       },
  //                     });
  //                   }
  //                 });

  //                 $(".swal2-html-container input").on("keyup", function (e) {
  //                   if ($(".swal2-html-container input").val().length + 1 >= 6) {
  //                     $(".swal2-actions button")[0].style.display =
  //                       "inline-block";
  //                     $(".swal2-actions button")[1].style.display = "none";
  //                     $(".swal2-actions button")[2].style.display = "none";
  //                     $(".swal2-actions").fadeIn();
  //                   } else {
  //                     $(".swal2-actions").fadeOut();
  //                   }
  //                 });
  //               } else if (data == "notfound") {
  //                 Swal.fire({
  //                   title: "Email not registered",
  //                   text: "Please try again",
  //                   icon: "info",
  //                   showConfirmButton: true,
  //                   confirmButtonColor: "#858585",
  //                 });
  //               } else if (data == "error") {
  //                 Swal.fire({
  //                   title: "Error",
  //                   text: "An error occured while trying to send the email",
  //                   icon: "info",
  //                   showConfirmButton: true,
  //                   confirmButtonColor: "#858585",
  //                 });
  //               }
  //             },
  //           });
  //         } else {
  //           Swal.fire({
  //             title: "Please enter your email",
  //             icon: "info",
  //           }).then((result) => {});
  //         }
  //       }
  //     });
  //   });
});
