// document.querySelector('img[src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"]').style.display = 'none';

$(document).ready(function () {
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
});
