$(document).ready(function () { // Read role of the logged in user
  // document.querySelector('img[src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"]').style.display = 'none';
  
  let loc = window.location.pathname.split("/")[2];

  $("#navigation").html('<div class="logo" style="text-align: center"> \
  <img style="width: 40%" src="assets/img/favicon.ico" > \
  <a href="#" class="simple-text"> \
  Theresian School of Cavite </a> </div> <ul class="nav users"> \
  <li id="nav_dashboard"> <a href="dashboard.php"> <i class="pe-7s-graph"></i> <p>Dashboard</p> </a> </li> \
  <li id="nav_user" style="display: none"> <a href="user.php"> <i class="pe-7s-user"></i> <p>User Registration</p> </a> </li> \
  <li id="nav_table style="display: none"" style="display: none"> <a href="table.php"> <i class="pe-7s-search"></i> <p>Search Student</p> </a> </li> \
  <li id="nav_delete" style="display: none"> <a href="delete.php"> <i class="pe-7s-delete-user"></i> <p>Delete Members</p> </a> </li> \
  <li id="nav_balance" style="display: none"> <a href="balance.php"> <i class="pe-7s-cash"></i> <p>Balance</p> </a> </li> \
  <li id="nav_subject" style="display: none"> <a href="subjects.php"> <i class="pe-7s-notebook"></i> <p>Subjects</p> </a> </li> \
  <li id="nav_schedule" style="display: none"> <a href="schedule.php"> <i class="pe-7s-date"></i> <p>Schedule</p> </a> </li> \
  <li id="nav_enrollment" style="display: none"> <a href="online_enrollmentKG10.php"> <i class="pe-7s-note"></i> <p>Enrollment</p> </a> </li>\
  <li id="nav_information" style="display: none"> <a href="information.php"> <i class="pe-7s-folder"></i> <p>Enrollment Info</p> </a> </li>\
  <li class="active-pro" id="btn_signout" style="cursor: pointer;"> <a> <i class="pe-7s-power"></i> <p>SIGN-OUT ACCOUNT</p></a></li> \
  <li class="active-pro" id="loginPage" style="cursor: pointer; display: none"> <a href="index.php"> <i class="pe-7s-link"></i> <p>LOGIN</p></a></li> \
  </ul></div>');

  if (loc== "dashboard.php") {
    $("#nav_dashboard").attr("class", "active")
  } else if (loc == "user.php") {
    $("#nav_user").attr("class", "active")
  } else if (loc == "table.php") {
    $("#nav_table").attr("class", "active")
  } else if (loc == "delete.php") {
    $("#nav_delete").attr("class", "active")
  } else if (loc == "subjects.php") {
    $("#nav_subject").attr("class", "active")
  } else if (loc == "schedule.php") {
    $("#nav_schedule").attr("class", "active")
  } else if (loc == "online_enrollmentKG10.php") {
    $("#nav_enrollment").attr("class", "active")
  } else if (loc == "information.php") {
    $("#nav_information").attr("class", "active")
  } else if (loc == "balance.php") {
    $("#nav_balance").attr("class", "active")
  }

  $.ajax({
    url: "role.php",
    type: "POST",
    data: "email=" + localStorage.getItem("email"),
    success: function (data) {
      console.log(data);
      let role;

      if (data != "null") {
        let parsedRole = JSON.parse(data);
        role = parsedRole.role;
        let studentEmail = parsedRole.email;
        localStorage.setItem("studentEmail", studentEmail);

        console.log("Email: " + studentEmail);
        console.log(parsedRole);
      } else {
        role = "";
      }

      console.log(role);
      sessionStorage.setItem("role", role);
      
      if (role == "S") {
        $("#nav_dashboard").css("display", "none");
        $("#nav_table").css("display", "none");
        $("#nav_delete").css("display", "none");
        $("#nav_subject").css("display", "block");
        $("#nav_user").css("display", "none");
        $("#nav_enrollment").css("display", "none");
        $("#nav_information").css("display", "none");
        $("#nav_schedule").css("display", "none");
        $("#nav_balance").css("display", "block");
      } else if (role == "A" || role == "R") {
        $("#nav_table").css("display", "block");
        $("#nav_delete").css("display", "block");
        $("#nav_user").css("display", "block");
        $("#nav_dashboard").css("display", "block");
        $("#nav_subject").css("display", "block");
        $("#nav_enrollment").css("display", "none");

        if(role == "A"){
          $("#nav_schedule").css("display", "block");
        } else {
          $("#nav_schedule").css("display", "none");
        }

        $("#nav_information").css("display", "block");
      } 
      // else if (role == "R") {
      //   $("#nav_table").css("display", "block");
      //   $("#nav_delete").css("display", "block");
      //   $("#nav_user").css("display", "block");
      //   $("#nav_dashboard").css("display", "block");
      //   $("#nav_subject").css("display", "block");
      //   $("#nav_enrollment").css("display", "none");
      //   $("#nav_schedule").css("display", "block");
      // } 
      else if (role == "DG" || role == "DJS" ) {
        $("#nav_table").css("display", "block");
        $("#nav_delete").css("display", "none");
        $("#nav_user").css("display", "block");
        $("#nav_dashboard").css("display", "block");
        $("#nav_subject").css("display", "block");
        $("#nav_enrollment").css("display", "none");
        $("#nav_information").css("display", "none");
        $("#nav_schedule").css("display", "block");
      } else {
        $("#nav_dashboard").css("display", "none");
        $("#nav_user").css("display", "none");
        $("#nav_table").css("display", "none");
        $("#nav_delete").css("display", "none");
        $("#nav_subject").css("display", "none");
        $("#nav_schedule").css("display", "none");
        $("#nav_enrollment").css("display", "block");
        $("#nav_information").css("display", "none");
        $("#btn_signout").css("display", "none");
        $("#loginPage").css("display", "block");
        localStorage.setItem("isLoginValid", "false");
      }

      // if(role == "S"){
      //   window.location.href = "balance.php"; // or Schedule Page
      // }
    }
  });

  

  $('#btn_signout, #nav_logout').on("click", function () {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, signout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'You have been signed out',
          confirmButtonText: 'Okay'
        }).then((result) => {
          localStorage.setItem("isLoginValid", "false");
          localStorage.setItem("email", "");
          window.location = "index.php";
        });
      }
    });
  });


  // Check for Login Session Validity
  let session = setInterval(function () {
    let winLoc = window.location.pathname.split("/")[2];

    if (localStorage.getItem("tempUser") == "true" 
      && (winLoc == "online_enrollmentKG10.php"
        || winLoc == "online_enrollmentG11.php"
        || winLoc == "old_student_enrollment.php"
        || winLoc == "online_enrollmentk10.php")) {
      console.log("sameSite");
    } else {
      if (localStorage.getItem("isLoginValid") != "true") {
        clearInterval(session);
        Swal.fire({
          title: 'Session Expire',
          icon: 'info',
          text: 'Please Login again',
          showConfirmButton: true,
          showCancelButton: false
        }).then((result) => {
          window.location = "index.php";
        });
      }
    }
  }, 1000);

});