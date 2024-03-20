function LoginSwal() {
  // console.log("Hello");
  Swal.fire({
    title: "Logging In",
    html: "Please wait...",
    // timer: 2000,
  });
}

$(document).ready(() => {
  $("#btn-logout").on("click", () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      confirmButtonText: "Yes",
      confirmButtonColor: "#ff4f4c",
      showCancelButton: true,
    }).then((result) => {
      console.log(result);
      if (result.value) {
        console.log("Logged Out");
        logOut();
      }
    });
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  if (sessionStorage.getItem("username") !== "") {
    $("#username").text(sessionStorage.getItem("username"));
  }

  $("#spelling, #speech, #leaderboard").on("click", (res) => {
    // console.log(res.currentTarget.id);
    switch (res.currentTarget.id) {
      case "spelling":
        window.location.href = "spelling.html";
        break;
      case "speech":
        window.location.href = "speech.html";
        break;
      case "leaderboard":
        window.location.href = "leaderboard.html";
        break;
      default:
        window.location.href = "dashboard.html";
        break;
    }
  });

  function requestMicPermission() {
    try {
      // Check if the browser supports the permissions API
      if ("permissions" in navigator) {
        // Check the permission status
        navigator.permissions
          .query({ name: "microphone" })
          .then((permissionStatus) => {
            console.log(permissionStatus);

            if (permissionStatus.state === "granted") {
              console.log("Microphone access has already been granted.");
              // Perform the desired action here
            } else if (permissionStatus.state === "prompt") {
              Swal.fire({
                title: "Microphone Access",
                text: "For seamless gameplay experience, kindly grant permission for microphone access to ensure optimal functioning of the game.",
                icon: "info",
                confirmButtonText: "Okay",
                confirmButtonColor: "#5995fd",
                showCancelButton: true,
                //   html: "Please wait...",
              }).then((result) => {
                if (result.value) {
                  const stream = navigator.mediaDevices.getUserMedia({
                    audio: true,
                  });

                  console.log("Microphone permission granted");
                } else {
                  Swal.fire({
                    title: "Notice",
                    text: "To fully experience all aspects of the game, please consider granting permission for microphone access in your browser settings.",
                    icon: "warning",
                    confirmButtonText: "Not Now",
                    confirmButtonColor: "#5995fd",
                  });
                }
              });
            } else {
              console.log("Microphone access has not been granted.");
              Swal.fire({
                title: "Notice",
                text: "To fully experience all aspects of the game, please consider granting permission for microphone access in your browser settings.",
                icon: "warning",
                confirmButtonText: "Not Now",
                confirmButtonColor: "#5995fd",
                //   html: "Please wait...",
                // timer: 2000,
              });

              // You can prompt the user to allow access or perform another action here
            }
          })
          .catch((error) => {
            console.error(
              "Error occurred while checking microphone permission:",
              error
            );
          });
      } else {
        console.error("Permissions API not supported by the browser.");
        // Perform a fallback action if the API is not supported
      }

      // var isMicGranted = sessionStorage.getItem("isMicGranted");

      // if (isMicGranted == null || isMicGranted == "false") {
      //   sessionStorage.setItem("isGranted", "false");
      //   // First Request
      //   // let isGranted = false;

      //   let s = await Swal.fire({
      //     title: "Notice",
      //     text: "For seamless gameplay experience, kindly grant permission for microphone access to ensure optimal functioning of the game.",
      //     icon: "info",
      //     confirmButtonText: "Okay",
      //     confirmButtonColor: "#5995fd",
      //     //   html: "Please wait...",
      //     // timer: 2000,
      //   }).then((result) => {
      //     if (result.value) {
      //       sessionStorage.setItem("isGranted", "true");
      //     }
      //   });

      //   // if (sessionStorage.getItem("isGranted") == "true") {
      //   const stream = await navigator.mediaDevices.getUserMedia({
      //     audio: true,
      //   });

      //   console.log("Microphone permission granted");
      //   sessionStorage.setItem("isMicGranted", "true");
      //   // }
      // }
      // handlePermissionGranted(stream);
    } catch (error) {
      console.error("Error accessing the microphone:", error);
      // Handle the error as needed
    }
  }

  // function handlePermissionGranted(stream) {
  //   // Handle the microphone permission here, for example, you can start recording
  //   const audioContext = new AudioContext();
  //   const microphone = audioContext.createMediaStreamSource(stream);
  //   // Do something with the microphone stream
  // }

  requestMicPermission();

  // function getLocalStream() {
  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //     .then(function(stream) {
  //       console.log('You let me use your mic!')
  //     })
  //     .catch(function(err) {
  //       console.log('No mic for you!')
  //     });
  // }

  // getLocalStream();
});
