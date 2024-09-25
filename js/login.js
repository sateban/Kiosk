// document.querySelector('img[src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"]').style.display = 'none';

$(document).ready(function () {
  const connectedRef = _ref();
  const onValue = _onValue();
  const get = _get();
  const set = _set();
  const child = _child();
  const onChildAdded = _childAdded();
  const update = _update();

  // $("#btn_login").on("click", function (event) {
  //   login();
  // });

  // $("#uname, #pass").keypress(function (event) {
  //   var keycode = event.keyCode ? event.keyCode : event.which;
  //   if (keycode == "13") {
  //     login();
  //   }
  // });

  // function login() {
  //   let uname = $("#uname").val();
  //   let pass = $("#pass").val();

  //   $.ajax({
  //     url: "login_credentials.php",
  //     type: "POST",
  //     async: false,
  //     data: "uname=" + uname.trim() + "&pass=" + pass.trim(),
  //     success: function (data) {
  //       console.log(data);
  //       if (data == "success") {
  //         // let login = data.length > 0 ? JSON.parse(data) : data;
  //         window.location.href = "index.php";
  //       } else {
  //         Swal.fire({
  //           title: "Incorrect Username or Password!",
  //           icon: "info",
  //           showConfirmButton: true,
  //           showCancelButton: false,
  //         });

  //         $("#pass").val("");
  //         $("#uname").val("");
  //       }
  //     },
  //   });
  // }

  let sfTimer = setTimeout(() => {
    if (window.location.href.split("/")[4] == "student_profile.html") {
      GetStudentGlobal().then((data) => {
        // console.log(data);
        let id = sessionStorage.getItem("id");
        console.log(data);

        for (let d in data) {
          if (d == id) {
            console.log(data[d]);
            $("#name").text(
              `${data[d].lname}, ${data[d].fname}, ${data[d].mname}`
            );
            $("#year").text(`${WhatYear(data[d].year)}`);
            $("#phone").text(`${data[d].contact_number}`);
            $("#guardian").text(`${data[d].guardian}`);
            $("#guardian-contact").text(`${data[d].guardian_number}`);

            const docResult = _ref("incident");
            onValue(docResult, (snapshot) => {
              if (snapshot.exists()) {
                let data2 = snapshot.val();
                let remarks = "";

                for(let item in data2){
                  let d = data2[item];

                  for(let item2 in d){
                    if(d[item2].id == id){
                      remarks = d[item2].remarks
                    }
                  }
                }

                if (remarks == "") {
                  $("#status").text("GOOD");
                  $("#status").css("color", "#00d828");
                } else {
                  $("#status").text(remarks.toUpperCase());
                  $("#status").css("color", "#ff3c3c");
                }
              }
            });

            break;
          }
        }
      });
    }
  }, 1100);

  window.WhatYear = (year) => {
    switch (year) {
      case "G7":
        return "Grade 7";
        break;
      case "G8":
        return "Grade 8";
        break;
      case "G9":
        return "Grade 9";
        break;
      case "G10":
        return "Grade 10";
        break;
      case "G11":
        return "Grade 11";
        break;
      case "G12":
        return "Grade 12";
        break;
    }
  };

  let isRFIDDetected = false;
  let id = "";
  let x = false;
  let time = 0;
  let resetID = setInterval(resetter, 1000);

  // RFID Login
  $(document).on("keyup", (event) => {
    let urlName = window.location.href.split("/")[4];
    let urlNames = ["login.html", "index.html"];

    if (urlNames.includes(urlName)) {
      id += event.key;
      time = 0; // keep on typing to not trigger id resetter
      console.log(id);

      if (!isNaN(parseInt(id)) && id.length == 10) {
        console.log("RFID Detected with ID number: ", id);

        // Show Progress of Validation
        $("#rfid-validate").fadeIn(1000);
        RFIDLogin(id);

        isRFIDDetected = true;
        id = "";
      } else if (event.key == "Enter") {
        id = "";
      } else {
        // console.log(isNaN(parseInt(id)), id.length);
        if (isNaN(parseInt(id)) && id.length >= 10) {
          console.log("Resetting");
          id = "";
        } else {
          // console.log(id);
          if (id.length >= 10) {
            id = "";
          }
        }
      }
    }
  });

  function resetter() {
    time++;

    if (time > 10) {
      id = "";
    }
  }

  window.SetRFIDLogin = (loginData, id) => {
    // function SetRFIDLogin(loginData){
    let rhs = window.location.href.split("/")[3];

    console.log("SetRFIDLogin:", loginData);
    console.log("id:", id);
    sessionStorage.setItem("loggedIn", "");

    // Found User
    if (Object.keys(loginData).length > 0) {
      $("#id-no").text(id);
      $("#rfid-validate").css({ display: "none" });
      $("#rfid-card").fadeIn(1000);

      // Set cookies to Logged in
      // SetCookie("loggedIn", id, 100000);
      sessionStorage.setItem("loggedIn", id);
      LogSuccessLogin(id);
      sessionStorage.setItem("id", id);

      $("#rfid-card")
        .html(
          `ID Card No: ${id}&nbsp;<span id="id-no"></span><br />Logging
      in...`
        )
        .fadeIn(1000);
      // Redirect to student page

      if (rhs == "mgmt" && loginData.role == "student") {
        iziToast.info({
          title: "ROLE CONFLICT",
          message: `Cannot login student account in Management Page`,
        });
        IncorrectRFID();
      } else if(loginData.isDeleted){
        iziToast.info({
          title: "Account Suspended",
          message: `Unable to Login`,
          icon: "fa fa-exclamation",
          onClosed: function (instance, toast, closedBy) {
          },
        });
      } else {
        CorrectRFID();
        // setTimeout(() => {
          console.log(loginData);

        if (loginData.role == "student") {
          let guardianEmail = loginData.guardianEmail;
          let studentName = loginData.name;

          if (guardianEmail == "" || guardianEmail == undefined) {
            iziToast.success({
              title: "Email not Found",
              message: `Unable to notify guardian, redirecting....`,
              icon: "fa fa-exclamation",
              onClosed: function (instance, toast, closedBy) {
                window.location.href = "student_profile.html";
              },
            });
          } else {
            console.log("Else");
            let txt = `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;padding:0;margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#fafafa" width="100%"><tbody><tr><td style="padding:0;margin:0;background:#fff" valign="top"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%" align="center"><tbody><tr><td style="padding:0;margin:0" align="center"></td></tr></tbody></table><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%" align="center"><tbody><tr><td style="padding:0;margin:0" align="center"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;background-color:#e0e0e0;border:solid black 2px;width:95%" align="center" bgcolor="#ffffff"><tbody><tr><td style="margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px" align="left"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0" width="100%"><tbody><tr><td style="padding:0;margin:0;width:560px" align="center" valign="top"></td></tr></tbody></table></td></tr><tr><td style="margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px" align="left"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0" width="100%"><tbody><tr><td style="padding:0;margin:0;width:560px" align="center" valign="top"><table cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;border-radius:5px" width="100%" role="presentation"><tbody><tr><td style="width:100%"><textarea style="width:100%;border:solid 1px #000;height:200px;padding:5px;font-size:20px;font-family:monospace" value="">Good Day [Email],\n\n\tThis is an automated notification to inform you that [Student] has logged in to the campus system [Info].\n\tThank you for your attention.\n\nThis is an automated email notification</textarea></td></tr></tbody></table></td></tr><tr><td style="padding:0;margin:0;width:560px" align="center" valign="top"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%" align="center"><tbody><tr><td style="padding:0;margin:0" align="center"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;background-color:transparent;width:600px" align="center" bgcolor="#FFFFFF"><tbody><tr><td style="padding:20px;margin:0" align="left"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0" width="100%"><tbody><tr><td style="padding:0;margin:0;width:560px" align="center" valign="top"><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0" width="100%"><tbody><tr><td style="padding:0;margin:0;display:none" align="center"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`;
            var formData = new FormData();
            formData.append("email", guardianEmail);
            formData.append("subject", "RHS: Student Login");

            txt = txt.replaceAll("[Email]", guardianEmail);
            txt = txt.replaceAll("[Student]", studentName);
            txt = txt.replaceAll(
              "[Info]",
              ` this ${GetDateGlobal(0)} at ${GetDateGlobal(1)}`
            );

            formData.append("message", txt);
            let isLoading = true;

            $.ajax({
              url: "https://656697eb-cfef-4289-a1dd-7690085a678e-00-sw9o9mqxrpk3.pike.replit.dev/notify_guardian",
              method: "POST",
              data: formData,
              processData: false,
              contentType: false,
              xhrFields: {
                // responseType: "blob",
              },
              success: function (data, textStatus, jqXHR) {
                iziToast.destroy();
                iziToast.success({
                  title: "Success",
                  message: `Email/SMS Notification sent to <br><b>${guardianEmail}</b>`,
                  onClosed: function (instance, toast, closedBy) {
                    window.location.href = "student_profile.html";
                  },
                });

                isLoading = false;
              },
              error: (e) => {
                iziToast.destroy();
                iziToast.warning({
                  title: "Unable to send SMS Notification",
                  message: `Please try again later`,
                  onClosed: function (instance, toast, closedBy) {
                    window.location.href = "student_profile.html";
                  },
                });

                isLoading = false;
              },
              done: () => {},
            });

            // setTimeout(() => {
            //   console.log(isLoading);
            //   if(!isLoading){
            //     window.location.href = "student_profile.html";

            //   }
            // }, 5000);
          }
        } else if (loginData.role == "admin") {
          window.location.href = "admin_profile.html";
        } else if (loginData.role == "guidance") {
          window.location.href = "guidance_profile.html";
        } else if (loginData.role == "registrar") {
          window.location.href = "registrar_profile.html";
        } else if (loginData.role == "teacher") {
          window.location.href = "teacher_profile.html";
        }
        // }, 2500);
      }
    } else {
      id = "";
      IncorrectRFID();
      LogFailedLogin(id);
      $("#rfid-validate").css({ display: "none" });
      $("#rfid-card").text("Unidentified RFID, try again").fadeIn(1000);
      $("#rfid-card").delay(2000).fadeOut(500);
      LogFailedLogin;
    }
  };

  window.CorrectRFID = () => {
    let rfid = new Audio();
    rfid.src = "../assets/sound/correct.mp3";
    rfid.play();
  };

  window.IncorrectRFID = () => {
    let rfid = new Audio();
    rfid.src = "../assets/sound/alarm.mp3";
    rfid.play();
  };

  window.Enter = () => {
    let enter = new Audio();
    enter.src = "../assets/sound/enter.mp3";
    enter.play();
  };

  window.Pop = () => {
    let enter = new Audio();
    enter.src = "../assets/sound/pop.mp3";
    enter.play();
  };
});
