import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
  set,
  get,
  onDisconnect,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// Add Firebase products that you want to use
//   import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
// import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

// const firebaseConfig = {
//   apiKey: "AIzaSyCvlr0Et_vfS1dgne5p0kwImln2JZmApJQ",
//   authDomain: "tcu-game.firebaseapp.com",
//   databaseURL: "https://tcu-game-default-rtdb.firebaseio.com",
//   projectId: "tcu-game",
//   storageBucket: "tcu-game.appspot.com",
//   messagingSenderId: "15034051366",
//   appId: "1:15034051366:web:0526952f94ed1776df6fe7",
//   measurementId: "G-558WEMC4E7",
// };

const firebaseConfig = {
  apiKey: "AIzaSyD1Zv4IjmDkSyAevZg0qnpnl_KUHhJ0VQM",
  authDomain: "kiosk-3c1ba.firebaseapp.com",
  projectId: "kiosk-3c1ba",
  storageBucket: "kiosk-3c1ba.appspot.com",
  messagingSenderId: "249524352310",
  appId: "1:249524352310:web:c7250abf070efb00e2ef97",
  measurementId: "G-B8S5W5TP6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// const db = getDatabase(app);
const database = getDatabase(app);

const presenceRef = ref(database, "disconnectmessage");
// Write a string when this client loses connection
onDisconnect(presenceRef).set("I disconnected!");

window.leaderboardMode = (name) => {
  console.log("LeaderboardMode Called");

  if (!window.location.href.includes("index")) {
    // Get a reference to the database service
    // const database = app.database();
    const connectedRef = ref(database, ".info/connected");
    onValue(connectedRef, (snapshot) => {
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      // console.log(data);
      if (data) {
        // Retrieve Database value when no issue is encountered
        if (window.location.href.includes("leaderboard")) {
          const result = ref(database, "leaderboard/");
          onValue(result, (snap) => {
            // console.log(snap.val());
            const v = snap.val();
            var data = "";

            for (let value in v) {
              if (value === name) {
                for (let user in v[value]) {
                  var n = 0;
                  var d = 0;
                  // console.log(v[value][user]);
                  data += `<tr>`;
                  data += `<td>${user}</td>`;

                  for (let score in v[value][user]) {
                    // console.log(v[value][user][score]["score"]);
                    if (v[value][user][score].score > n) {
                      n = v[value][user][score].score;
                      d = +score;
                    }
                  }

                  data += `<td>${n} Points</td>`;

                  // Create a new Date object
                  let date = new Date();

                  // console.log(date);
                  // Extract the components of the date
                  let year = date.getFullYear();
                  let month = String(date.getMonth() + 1).padStart(2, "0");
                  let day = String(date.getDate()).padStart(2, "0");
                  let hours = String(date.getHours()).padStart(2, "0");
                  let minutes = String(date.getMinutes()).padStart(2, "0");
                  let seconds = String(date.getSeconds()).padStart(2, "0");

                  // Form the formal date string
                  let formalDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                  data += `<td>${formalDate}</td>`;

                  // console.log(convertToFormalTime(d));

                  data += `</tr>`;
                  // console.log(n);
                }
              }
            }

            if (data != "") {
              console.log(data);

              $("#tbl-body").html(data);
            }
          });
        }
      } else {
        console.log("not connected");
      }
    });
  }
  // const database = app.database().ref("MCU City Garbage Monitoring");
  // console.log(pages);
  // var connectedRef = app.database().ref(".info/connected");
  // connectedRef.on("value", (snap) => {
  //   console.log();
  //   // console.log(JSON.stringify(firebase.database.ServerValue.TIMESTAMP));
  //   if (snap.val() === true) {
  //     console.log("connected");

  // } else {
  //   console.log("not connected");
  // }
  // });
};

window.login = () => {
  const loginEmail = $("#login-email").val();
  const loginPassword = $("#login-password").val();
  console.log(loginEmail);

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Able to Login", user);
      window.location.href = "dashboard.html";
      // sessionStorage.setItem("username", )
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Message: ", errorMessage, JSON.stringify(error));

      // Swal.fire({
      //   title: "Sorry we could not find your account",
      //   icon: "info",
      //   confirmButtonText: "Okay",
      //   confirmButtonColor: "#5995fd",
      //   //   html: "Please wait...",
      //   // timer: 2000,
      // });
      let errorText = "";

      if (errorCode == "auth/invalid-login-credentials") {
        errorText = "Invalid Login Credentials";
      } else {
        errorText = errorCode;
      }

      Swal.fire({
        title: "Login Error",
        icon: "warning",
        html: `<code>${errorText}</code>`,
        confirmButtonText: "Okay",
        confirmButtonColor: "#5995fd",
        showCancelButton: false,
      }).then((result) => {
        console.log(result);
        if (result.value) {
          console.log("Logged Out");
          logOut();
        }
      });
    });
};

window.signUp = () => {
  const signupEmail = document.getElementById("signup-email").value;
  const signupPassword = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("Email has been registered successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Signup Error Message: ", errorCode);
      let errorText = "";

      if (errorCode == "auth/email-already-in-use") {
        errorText = "Email Already In Use";
      } else {
        errorText = errorCode;
      }

      Swal.fire({
        title: "Signup Error",
        icon: "warning",
        html: `<code>${errorText}</code>`,
        confirmButtonText: "Okay",
        confirmButtonColor: "#5995fd",
        showCancelButton: false,
      }).then((result) => {
        console.log(result);
        if (result.value) {
          console.log("Logged Out");
          logOut();
        }
      });
    });
};

window.logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      sessionStorage.setItem("isLoggedOut", "false");
      window.location.href = "index.html";
    })
    .catch((error) => {
      Swal.fire({
        title: "Error has been encountered",
        html: `<code>${error.message}</code>`,
        icon: "error",
        confirmButtonText: "Okay",
        confirmButtonColor: "#ff4f4c",
        // showCancelButton: true
      });
    });
};

window.LoginGoogle = () => {
  // signInWithRedirect(auth, provider);
  console.log("Google Login");

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const userName = user.displayName;
      // IdP data available using getAdditionalUserInfo(result)
      console.log("Google Login ", userName);
      sessionStorage.setItem("username", userName);
      window.location.href = "dashboard.html";
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      // ...
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("UID: ", uid);
    const timestamp = Date.now();
    console.log(timestamp);

    const statusRef = ref(database, "status");

    // push("Testing");
    // console.log(new Date());

    // push(child(ref(database), "df")).key;
    // const newPostKey = push(child(ref(database), "df")).key;
    let loginDetails = {
      timestamp: timestamp,
      // "timestamp": serverTimestamp(),
      online: true,
      mode: "single", //multiplayer
    };

    // const dbRef = ref(getDatabase(app));
    // let k = push(ref(database), loginDetails);
    // Retrieve details
    // get(child(dbRef, `status/${uid}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    // set(child(database, `status/${uid}`), loginDetails);
    // set(dbRef, `status/${uid}`, loginDetails);
    // set(ref(database, `status/${uid}/`), loginDetails);

    // const hopperRef = child(dbRef, `status/${uid}`);
    // update(ref(database), loginDetails); //

    // const postListRef = ref(database, "status");
    // const newPostRef = push(postListRef);
    // set(newPostRef, loginDetails);

    // set(child(database, `status/${uid}`), loginDetails);
    // set(child(ref(database), `status/`), loginDetails);

    // ENABLE to work
    // push(child(ref(database), `status/${uid}`), loginDetails); // WORKS

    // const userLastOnlineRef = ref(database, `status/${uid}`);
    // set(userLastOnlineRef, loginDetails);
    // const result = ref(database, "status/");
    // onValue(result, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    // });
    // set(ref(database), loginDetails);
    // console.log(c);

    // const updates = {};
    // updates[`status/${uid}`] = loginDetails;

    // update(ref(database), updates);
    // set(ref(database, `status/${uid}`), loginDetails);

    if ($("body").attr("name") == "login") {
      window.location.href = "dashboard.html";
    }

    // ...
  } else {
    // User is signed out
    // ...
    if ($("body").attr("name") != "login") {
      window.location.href = "index.html";
      console.log("Signed Out");
      sessionStorage.setItem("isLoggedOut", "true");
    }
  }
});

window.RetrieveSpelling = () => {
  // console.log("Retrieve Spelling");

  const database = getDatabase(app);
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snapshot) => {
    const data = snapshot.val();
    // console.log("Retrieve Spelling: ", data);

    if (data) {
      // Retrieve Database value when no issue is encountered
      const result = ref(database, "spelling/");
      onValue(result, (snap) => {
        // console.log(snap.val());
        const v = snap.val().advanced;
        var data = "";
        console.log(v);

        let randomSpelling = "";

        // for(let x = 0; x < 5; x++){
        //   randomSpelling += Math.floor(Math.random() * (v.length + 1)) + ",";
        // }
        function generateRandomNumbers() {
          var arr = [];
          while (arr.length < 5) {
            var r = Math.floor(Math.random() * (v.length + 1)); // Generates random numbers between 1 and 100
            if (arr.indexOf(r) === -1) {
              arr.push(r);
            }
          }
          return arr;
        }

        // Example usage
        var randomNumbers = generateRandomNumbers();
        // console.log(randomNumbers[0]);
        // console.log(randomNumbers[1]);
        // console.log(randomNumbers[2]);
        // console.log(randomNumbers[3]);
        // console.log(randomNumbers[4]);

        // let randomSpelling = Math.floor(Math.random() * (v.length + 1));
        // // console.log(v[randomNumbers[0]]);
        // console.log(v[randomNumbers[1]]);
        // console.log(v[randomNumbers[2]]);
        // console.log(v[randomNumbers[3]]);
        // console.log(v[randomNumbers[4]]);

        // $("#spell").val(v[randomNumbers]);
        randomSpelling =
          v[randomNumbers[0]] +
          "," +
          v[randomNumbers[1]] +
          "," +
          v[randomNumbers[2]] +
          "," +
          v[randomNumbers[3]] + 
          "," +
          v[randomNumbers[4]];

        $("#spell").val(randomSpelling);
        StartGame();

        // Speak("");
      });
    } else {
      console.log("not connected");
    }
  });
};

// LOGIN
$("#login-btn").on("click", () => {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  if (email == "" && password == "") {
    Swal.fire({
      title: "Email and Password cannot be empty",
      icon: "info",
      confirmButtonText: "Okay",
      confirmButtonColor: "#5995fd",
      //   html: "Please wait...",
      // timer: 2000,
    }).then((result) => {
      // setTimeout(()=>{
      // 	$("#div-email").css("border", "none");
      // }, 2500);
    });

    // $("#div-email").css("border", "3px solid #ff8787");
  } else if (email == "" && password != "") {
    Swal.fire({
      title: "Email cannot be empty",
      icon: "info",
      confirmButtonText: "Okay",
      confirmButtonColor: "#5995fd",
    }).then((result) => {});
  } else if (email != "" && password == "") {
    Swal.fire({
      title: "Password cannot be empty",
      icon: "info",
      confirmButtonText: "Okay",
      confirmButtonColor: "#5995fd",
    }).then((result) => {});
  } else {
    // LoginSwal();
    login();
  }
});

// GOOGLE LOGIN
$("#login-google").on("click", (e) => {
  e.preventDefault();
  LoginGoogle();
});

// document
//   .getElementById("form-signin")
$("#form-signin").on("submit", function (event) {
  event.preventDefault(); // This will prevent the default behavior of form submission
  // console.log($(event.target));
  // console.log($(this));

  // if ($(event.originalEvent.explicitOriginalTarget).is('input[type="submit"]')) {
  //   console.log('Submit button clicked!');
  //   // Your code for handling the submit button click goes here
  // }

  // LoginGoogle();
});

// $("#signup-google").on("click", (e) => {
//   e.preventDefault();
//   LoginGoogle();
// });

$("#form-signup").on("submit", function (event) {
  event.preventDefault(); // This will prevent the default behavior of form submission
  signUp();
});

if (sessionStorage.getItem("isLoggedOut") == "true") {
  sessionStorage.setItem("isLoggedOut", "false");

  Swal.fire({
    title: "You have been automatically logged out",
    html: "Please Login again, thank you!",
    icon: "info",
    confirmButtonText: "Okay",
    confirmButtonColor: "#5995fd",
    //   html: "Please wait...",
    // timer: 2000,
  });
}

$(document).ready(() => {
  // Prepare DateTime
  const tz = "Asia/Manila"; // Intl.DateTimeFormat().resolvedOptions().timeZone;

  $.ajax({
    url: `https://worldtimeapi.org/api/timezone/${tz}`,
    method: "GET",
    success: function (data) {
      const currentTime = new Date(data.utc_datetime);
      let date = new Date(currentTime);
      console.log("WorldTimeAPI", date);
      // let epoch;

      // Date.prototype.getTime = function() { return epoch };
    },
    error: function (error) {
      console.error("Error fetching time:", error);
    },
  });

  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  $("#sign-up-btn").on("click", () => {
    container.classList.add("sign-up-mode");
  });

  $("#sign-in-btn").on("click", () => {
    container.classList.remove("sign-up-mode");
  });

  // $("#btn-logout").on("click", () => {
  //   console.log("Test");
  //   Swal.fire({
  //     title: "Are you sure you want to logout?",
  //     icon: "question",
  //     confirmButtonText: "Yes",
  //     confirmButtonColor: "#ff4f4c",
  //     showCancelButton: true,
  //   }).then((result) => {
  //     console.log(result);
  //     if (result.value) {
  //       console.log("Logged Out");
  //       logOut();
  //     }
  //   });
  // });
});
