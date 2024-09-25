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
  onChildAdded,
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

import {
  uploadBytes,
  getStorage,
  ref as fRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
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
  databaseURL: "https://kiosk-3c1ba-default-rtdb.firebaseio.com",
  projectId: "kiosk-3c1ba",
  storageBucket: "kiosk-3c1ba.appspot.com",
  messagingSenderId: "249524352310",
  appId: "1:249524352310:web:c7250abf070efb00e2ef97",
  measurementId: "G-B8S5W5TP6Y",
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

window.GetListOfFacilities = () => {
  const database = getDatabase(app);
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snapshot) => {
    const data = snapshot.val();
    // console.log("Retrieve Spelling: ", data);

    if (data) {
      const result = ref(database, "mapping/");
      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          ProcessListofFacilities(data);
        } else {
          console.log("No data available");
        }
      });
      // Retrieve Database value when no issue is encountered
      // const result = ref(database, "mapping/facilities/");
      // onValue(result, (snap) => {
      //   // console.log(snap.val());
      //   const v = snap.val().advanced;
      //   var data = "";
      //   console.log(v);

      //   let randomSpelling = "";
      // });
    } else {
      console.log("not connected");
    }
  });
};

// RFID Login
window.RFIDLogin = (id) => {
  var isLoginFound = false;
  var loginData = {};
  const database = getDatabase(app);
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snapshot) => {
    const data = snapshot.val();
    // console.log("Retrieve ID: ", id, data);

    if (data) {
      const result = ref(database, "user/");
      get(child(result, `/${id}/`)).then((snapshot) => {
        // console.log(snapshot.exists());
        if (snapshot.exists()) {
          loginData = snapshot.val();

          // if(!loginData.isDeleted){
          console.log("Login", loginData);
          SetRFIDLogin(loginData, id);
          // } else {
          //   SetRFIDLogin({}, id);  
          // }
          // isLoginFound = true;

          // return loginData;
        } else {
          // console.log("No data available");
          // isLoginFound = false;
          // return {2:2};
          SetRFIDLogin({}, id);
        }
      });
      // Retrieve Database value when no issue is encountered
      // const result = ref(database, "mapping/facilities/");
      // onValue(result, (snap) => {
      //   // console.log(snap.val());
      //   const v = snap.val().advanced;
      //   var data = "";
      //   console.log(v);

      //   let randomSpelling = "";
      // });
    } else {
      console.log("not connected");
      // isLoginFound = false
      // return {1:1};
    }
  });

  // return isLoginFound ? loginData : {};
};

// Callable outside
window._ref = (col, id = "") => {
  let column = ".info/connected";
  
  if (col === "map") {
    column = "mapping/";
  } else if (col === "enroll") {
    column = "enrollment/";
  } else if (col === "doc") {
    column = "document/";
  } else if (col === "user" && id !== "") {
    column = "user/" + id;
  } else if (col === "user") {
    column = "user/";
  } else if (col === "main") {
    column = "/";
  } else if (col === "incident") {
    column = "incident/";
  } else if (col === "events") {
    column = "events/";
  } else if (col === "attendance") {
    column = "attendance/";
  } else if (col === "grade") {
    column = "grade/";
  }

  const database = getDatabase(app);
  return ref(database, column);
};

window._ref2 = (column) => {
  const database = getDatabase(app);
  return ref(database, column);
};

window._onValue = () => {
  return onValue;
};

window._get = () => {
  return get;
};


window._set = () => {
  return set;
};


window._child = () => {
  return child;
};


window._push = () => {
  return push;
};


window._childAdded = () => {
  return onChildAdded;
};

window._update = () => {
  return update;
};


window.GetFacilities = () => {
  const database = getDatabase(app);
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snapshot) => {
    const data = snapshot.val();
    // console.log("Retrieve Spelling: ", data);

    if (data) {
      const result = ref(database, "mapping/");
      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          FacilitiesAutocomplete(data);
        } else {
          console.log("No data available");
        }
      });
      // Retrieve Database value when no issue is encountered
      // const result = ref(database, "mapping/facilities/");
      // onValue(result, (snap) => {
      //   // console.log(snap.val());
      //   const v = snap.val().advanced;
      //   var data = "";
      //   console.log(v);

      //   let randomSpelling = "";
      // });
    } else {
      console.log("not connected");
    }
  });
};

function FacilitiesAutocomplete(facilities) {
  // console.log("FacilitiesAutocomplete:", facilities);
  // var facilitiesArray = $.map(facilities, function (value, key) {
  //   console.log(value);

  //   return { value: "value", data: key };
  // });
  let facilitiesArray = [];
  let _facObject = Object.keys(facilities);
  let fCounter = 0;
  for (let i = 0; i < _facObject.length; i++) {
    // console.log(i, _facObject[i], facilities[_facObject[i]].length);
    for (let j = 0; j < facilities[_facObject[i]].length; j++) {
      let name = facilities[_facObject[i]][j].floor;

      facilitiesArray.push({ value: name, key: fCounter });
      fCounter++;
    }
  }

  console.log(facilitiesArray);

  // Initialize ajax autocomplete:
  $("#search-input").autocomplete({
    // serviceUrl: '/autosuggest/service/url',
    //lookup: countriesString,
    source: facilitiesArray,
    lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
      var re = new RegExp(
        "\\b" + $.Autocomplete.utils.escapeRegExChars(queryLowerCase),
        "gi"
      );
      return re.test(suggestion.value);
    },
    onSelect: function (suggestion) {
      $("#selction-ajax").html(
        "You selected: " + suggestion.value + ", " + suggestion.data
      );
    },
    onHint: function (hint) {
      $("#autocomplete-ajax-x").val(hint);
    },
    onInvalidateSelection: function () {
      $("#selction-ajax").html("You selected: none");
    },
    close: function (event, ui) {
      if (!$("ul.ui-autocomplete").is(":visible")) {
        $("ul.ui-autocomplete").show();
      }
    },
  });
}

// Log RFID Activities
// RFID Login
window.LogSuccessLogin = (id, rhs = "") => {
  const updates = {};
  let time = GetDate(1);

  if(rhs == ""){
    updates[`/login/success/${GetDate(0)}_${GetDate(2)}`] = {
      id: id,
      time: time,
    };
  } else {
    updates[`/login/success/${GetDate(0)}_${GetDate(2)}`] = {
      id: id,
      time: time,
      from: "management"
    };
  }

  LogActivityHelper(updates);
};

window.LogFailedLogin = (id) => {
  const updates = {};
  let time = GetDate(1);

  updates[`/login/fail/${GetDate(0)}_${GetDate(2)}`] = {
    id: id,
    time: time,
  };

  LogActivityHelper(updates);
};

function LogActivityHelper(updates) {
  update(ref(database), updates);
}

window.GetDateGlobal = (choice) => {
  return GetDate(choice);
};

window.isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

function GetDate(choice) {
  let d = new Date();
  let year = d.getFullYear();
  let month = (d.getMonth() + 1).toString().padStart(2, "0");
  let day = d.getDate().toString().padStart(2, "0");
  let hours = d.getHours().toString().padStart(2, "0");
  let minutes = d.getMinutes().toString().padStart(2, "0");
  let seconds = d.getSeconds().toString().padStart(2, "0");
  let milliseconds = d.getMilliseconds().toString().padStart(3, "0");
  var ymd = "";

  switch (choice) {
    case 0:
      ymd = `${year}-${month}-${day}`;
      break;
    case 1:
      ymd = `${hours}:${minutes}:${seconds}:${milliseconds}`;
      break;
    case 2:
      ymd = `${Date.now()}`;
      break;
    case 3:
      ymd = `${month}/${day}/${year}`;
      break;
    case 4:
      ymd = `${year}-${month}-${day}`;
      break;
    default:
      ymd = `${year}-${month}-${day}`;
      break;
  }

  return ymd;
}

window.GetCurrentMilitaryTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};


$(document).ready(() => {
  console.log("Document Ready!!!");

  // Idle Timer
  var idleTime = 0;
  var isSwalFired = false;
  var idleInterval = setInterval(timerIncrement, 1000); // 1 second

  $(document).bind("touchstart touchmove click mousemove", function (e) {
    idleTime = 0;
  });

  function timerIncrement() {
    // let idleThresh = 60 * 3; // in seconds
    // Threshold
    let idleThresh = 60 * 3; // in seconds
    idleTime = idleTime + 1;
    if (idleTime > idleThresh) {
      // window.location.reload();
      console.log("Idling for ", idleThresh);
      let path = window.location.pathname.split(".");
      let exclusions = ["/login", "/index"];

      if (!isSwalFired) {
        if (!exclusions.includes(path[0])) {
          Swal.fire({
            title: "Idle",
            icon: "warning",
            // html: `You have idled for ${idleThresh / 60}m, <br>you will now be automatically logged out`,
            html: `You've been inactive for ${
              idleThresh / 60
            } minutes.<br> You'll now be logged out automatically`,
            confirmButtonText: "Stay Logged In",
            timer: 10000,
            timerProgressBar: true,
            didOpen: () => {
              // Swal.showLoading();
              // const timer = Swal.getPopup().querySelector("b");
              // timerInterval = setInterval(() => {
              //   timer.textContent = `${Swal.getTimerLeft()}`;
              // }, 100);
            },
            willClose: (e) => {},
            // cancelButtonText: "",
            confirmButtonColor: "#5995fd",
            showCancelButton: false,
          }).then((result) => {
            console.log(result);
            if (result.dismiss == "timer") {
              window.location.href = "index.html";
            } else if (result.isConfirmed) {
              idleTime = 0;
              isSwalFired = false;
              // clearInterval(timerInterval);
            }
          });
        }

        isSwalFired = true;
      }
    }
  }

  let isSearching = false;
  // // Search
  // $("#search-input").on("focus", () => {
  //   $("#search-input").animate(
  //     {
  //       width: "300px",
  //     },
  //     100
  //   );

  //   // Retrieve List of Details
  //   // GetFacilities();
  //   isSearching = true;
  // });

  // $("#search-input").on("blur", () => {
  //   $("#search-input").animate(
  //     {
  //       width: "200px",
  //     },
  //     100
  //   );
  //   isSearching = false;
  // });

  $("#search-input").on("keypress", () => {
    // if (isSearching) {
    GetFacilities();
    // }
  });

  $("#search-id-input, #search-name-input").on("keypress", (e) => {
    let input = $(e.target).attr("id");
    // if (isSearching) {
    // GetStudent();
    GetStudent()
      .then((data) => {
        // console.log("Promised Student:", data);

        let facilitiesArray = [];
        let data2 = Object.keys(data);
        let fCounter = 0;
        // console.log(data2.length);
        for (let i = 0; i < data2.length; i++) {
          // console.log(i, data[i], facilities[data[i]].length);
          // console.log("Data", data[data2[i]]);
          let fname = data[data2[i]].fname;
          let mname = data[data2[i]].mname.trim()[0];
          mname = mname != undefined ? mname.toUpperCase() + "." : "";
          let lname = data[data2[i]].lname;
          let id = data[data2[i]].id;
          let fullname = `${lname}, ${fname} ${mname}`;
          let fullnameID = `${lname}, ${fname} ${mname} (${id})`;

          // for (let j = 0; j < data[data2[i]].length; j++) {
          //   let name = data[data2[i]][j].floor;
          //   console.log("Name", name);

          facilitiesArray.push({
            value: fullname,
            key: fCounter,
            id: id,
            label: fullnameID,
          });
          fCounter++;
          // }
        }

        // console.log("facilitiesArray", facilitiesArray);

        // Initialize ajax autocomplete:
        $("#search-id-input, #search-name-input").autocomplete({
          // serviceUrl: '/autosuggest/service/url',
          //lookup: countriesString,
          source: facilitiesArray,
          // lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
          //   // var re = new RegExp(
          //   //   "\\b" + $.Autocomplete.utils.escapeRegExChars(queryLowerCase),
          //   //   "gi"
          //   // );
          //   // console.log("suggestion.value");
          //   // return re.test(suggestion.value);
          //   console.log("Test2");
          // },
          // onSelect: function (suggestion) {
          //   $("#selction-ajax").html(
          //     "You selected: " + suggestion.value + ", " + suggestion.data
          //   );
          //   // console.log("You selected: " + suggestion.value + ", " + suggestion.data);
          // },
          // onHint: function (hint) {
          //   $("#autocomplete-ajax-x").val(hint);
          //   console.log("Test");
          // },
          // onInvalidateSelection: function () {
          //   $("#selction-ajax").html("You selected: none");
          // },
          // close: function (event, ui) {
          //   // code below makes the selection to not disapper, good for debugging
          //   // if (!$("ul.ui-autocomplete").is(":visible")) {
          //   //   $("ul.ui-autocomplete").show();
          //   // }
          // },
          select: (event, ui) => {
            event.preventDefault();
            const selectedId = ui.item.id;
            const selectedName = ui.item.value;
            console.log(ui);

            if (input == "search-id-input") {
              let studentName = $(event.target)
                .parent()
                .parent()
                .parent()
                .find("#search-name-input");
              $(event.target).val(selectedId);
              $(studentName).val(selectedName);
            } else if (input == "search-name-input") {
              let studentID = $(event.target)
                .parent()
                .parent()
                .parent()
                .find("#search-id-input");

              $(event.target).val(selectedName);
              $(studentID).val(selectedId);
            }
          },
        });
      })
      .catch((error) => {
        console.log("Promised Student:", error);
      });

    // }
  });

  function GetStudent() {
    return new Promise((resolve, reject) => {
      const database = getDatabase(app);
      const connectedRef = ref(database, ".info/connected");
      onValue(connectedRef, (snapshot) => {
        const data = snapshot.val();
        // console.log("Retrieve Spelling: ", data);

        if (data) {
          const result = ref(database, "user/");
          get(child(result, "/")).then((snapshot) => {
            if (snapshot.exists()) {
              let data = snapshot.val();
              resolve(data);
            } else {
              // console.log("No data available");
              reject("No Data Available");
            }
          });
          // Retrieve Database value when no issue is encountered
          // const result = ref(database, "mapping/facilities/");
          // onValue(result, (snap) => {
          //   // console.log(snap.val());
          //   const v = snap.val().advanced;
          //   var data = "";
          //   console.log(v);

          //   let randomSpelling = "";
          // });
        } else {
          // console.log("not connected");
          reject("Not Connected");
        }
      });
    });
  }

  window.GetStudentGlobal = () => {
    return new Promise((resolve, reject) => {
      GetStudent()
        .then((data) => {
          resolve(data); // Resolve with the data from GetStudent
        })
        .catch((e) => {
          reject(e); // Reject with the error from GetStudent
        });
    });
  };

  // Prepare DateTime
  // const tz = "Asia/Manila"; // Intl.DateTimeFormat().resolvedOptions().timeZone;

  // $.ajax({
  //   url: `https://worldtimeapi.org/api/timezone/${tz}`,
  //   method: "GET",
  //   success: function (data) {
  //     const currentTime = new Date(data.utc_datetime);
  //     let date = new Date(currentTime);
  //     console.log("WorldTimeAPI", date);
  //     // let epoch;

  //     // Date.prototype.getTime = function() { return epoch };
  //   },
  //   error: function (error) {
  //     console.error("Error fetching time:", error);
  //   },
  // });
});

// Function to retrieve a cookie by name
window.GetCookie = (name) => {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
};

window.SetCookie = (name, value, seconds) => {
  var expires;
  if (seconds) {
    var date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

window.DeleteCookie = () => {
  document.cookie =
    "loggedIn" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

function TestAsync() {
  return new Promise((resolve, reject) => {
    const database = getDatabase(app);
    const connectedRef = ref(database, ".info/connected");
    onValue(connectedRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("Retrieve Spelling: ", data);

      if (data) {
        const result = ref(database, "mapping/");
        get(child(result, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            // console.log("Test", data);
            resolve(data);
          } else {
            // console.log("No data available");
            reject("No Data Available");
          }
        });
        // Retrieve Database value when no issue is encountered
        // const result = ref(database, "mapping/facilities/");
        // onValue(result, (snap) => {
        //   // console.log(snap.val());
        //   const v = snap.val().advanced;
        //   var data = "";
        //   console.log(v);

        //   let randomSpelling = "";
        // });
      } else {
        // console.log("not connected");
        reject("Not Connected");
      }
    });
  });
}

function TestAsyncUploadBytes() {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    // const storageRef = ref(storage, "some-child");

    // // 'file' comes from the Blob or File API
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });

    const pathReference = fRef(storage, "ICpEP Logo.png");
    // Create a reference from a Google Cloud Storage URI
    const gsReference = fRef(storage, pathReference);
    getDownloadURL(fRef(storage, "ICpEP Logo.png"))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url);
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          // console.log(xhr);
          url = window.URL.createObjectURL(blob);
          // const contentDisposition = xhr.getResponseHeader('Content-Disposition');

          // storage2.reference(forURL: url);
          firebase.storage().ref();

          // const storageRef = fRef.refFromURL(url); //fRef(storage, url);
          // console.log(storageRef.name);

          // Create a temporary <a> element
          const a = document.createElement("a");
          a.href = url;
          a.download = "filename"; // Set the desired file name here
          document.body.appendChild(a);

          // Click the link to trigger the download
          a.click();

          // Cleanup
          window.URL.revokeObjectURL(url);
          a.remove();
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        // Handle any errors
        console.log(console.log(error));
      });

    // console.log(gsReference);
    // const gsReference = fRef(storage, 'gs://bucket/logo.png');

    // // Create a reference from an HTTPS URL
    // // Note that in the URL, characters are URL escaped!
    // const httpsReference = fRef(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/logo.jpg');

    /**
    const database = getDatabase(app);
    const connectedRef = ref(database, ".info/connected");
    onValue(connectedRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("Retrieve Spelling: ", data);

      if (data) {
        const result = ref(database, "mapping/");
        get(child(result, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            // console.log("Test", data);
            resolve(data);
          } else {
            // console.log("No data available");
            reject("No Data Available");
          }
        });
        // Retrieve Database value when no issue is encountered
        // const result = ref(database, "mapping/facilities/");
        // onValue(result, (snap) => {
        //   // console.log(snap.val());
        //   const v = snap.val().advanced;
        //   var data = "";
        //   console.log(v);

        //   let randomSpelling = "";
        // });
      } else {
        // console.log("not connected");
        reject("Not Connected");
      }
    });
    **/
  });
}

window.StudentIDURL = (id) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    // const pathReference = fRef(storage, "ICpEP Logdo.png");

    // console.log(pathReference);
    // Create a reference from a Google Cloud Storage URI
    // const gsReference = fRef(storage, pathReference);
    getDownloadURL(fRef(storage, `/images/user/${id}.jpg`))
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

$("#btn-report").on("click", (e) => {
  let id = $("#search-id-input");
  let name = $("#search-name-input");
  let incident = $(".cause-of-incident").find(":selected").text();
  let remarks = $("#input-remarks");
  let reportedBy = $("#reported-by");

  if (id.val() == "" && name.val() != "") {
    // id.css("border-bottom", "solid 2px red");
    id.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student ID",
    });
  } else if (id.val() != "" && name.val() == "") {
    // name.css("border-bottom", "solid 2px red");
    name.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student Name",
    });
  } else if (id.val() == "" && name.val() == "") {
    // id.css("border-bottom", "solid 2px red");
    id.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student Name & ID",
    });
  } else if (incident.toUpperCase() == "SELECTION") {
    iziToast.warning({
      title: "Caution",
      message: "Select cause of incident",
    });
  } else {
    let id = $("#search-id-input");
    let incident = $(".cause-of-incident").find(":selected").text();
    let remarks = $("#input-remarks");
    let reportedBy = $("#reported-by");

    let update = {
      id: id.val(),
      incident: incident,
      remarks: remarks.val(),
      reportedBy: reportedBy.val(),
    };

    iziToast.info({
      title: "Submitting Report",
      message: "Please wait...",
      // timeout: false
    });

    var toast2 = document.querySelector(".iziToast"); // Selector of your toast

    SubmitIncidentReport(update)
      .then((a) => {
        iziToast.hide({}, toast2);

        Swal.fire({
          title: "THANK YOU!",
          icon: "info",
          // html: `You have idled for ${idleThresh / 60}m, <br>you will now be automatically logged out`,
          html: `YOU REPORTED <span class="swal-input">${name.val()} </span>
        <br>CAUSE OF INCIDENT <span class="swal-input">${incident}</span> <br><br>
        THE REPORT INCIDENT WAS REPORTED TO THE GUIDANCE OFFICE`,
          confirmButtonText: "DONE",
          timer: 10000,
          timerProgressBar: true,
          willClose: (e) => {},
          confirmButtonColor: "#00bf63",
          showCancelButton: false,
        }).then((result) => {
          window.location.href = "";
        });
      })
      .catch((e) => {
        iziToast.hide({}, toast2);

        Swal.fire({
          title: "ERROR",
          icon: "warning",
          // html: `You have idled for ${idleThresh / 60}m, <br>you will now be automatically logged out`,
          html: `An error was found while processing, please try again <code>${e}</code>`,
          confirmButtonText: "Okay",
          timer: 10000,
          timerProgressBar: true,
          willClose: (e) => {},
          confirmButtonColor: "#00bf63",
          showCancelButton: false,
        }).then((result) => {
          Swal.close();
        });
      });
  }
});

$("#btn-enroll").on("click", (e) => {
  let id = $("#search-id-input");
  let name = $("#search-name-input");
  let email = $("#email-input");
  let contact = $("#contact-input");
  let request = $("#request");
  let use = $("#use");
  let grade = $("#grade-selection");
  let strand = $("#grade-strand");

  if (id.val() == "" && name.val() != "") {
    // id.css("border-bottom", "solid 2px red");
    id.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student ID",
    });
  } else if (id.val() != "" && name.val() == "") {
    // name.css("border-bottom", "solid 2px red");
    name.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student Name",
    });
  } else if (id.val() == "" && name.val() == "") {
    // id.css("border-bottom", "solid 2px red");
    id.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student Name & ID",
    });
  } else if (request.val() == "") {
    iziToast.warning({
      title: "Caution",
      message: "Please type your request",
    });
  } else if (email.val() == "") {
    iziToast.warning({
      title: "Caution",
      message: "Please enter Email",
    });
  } else if (contact.val() == "") {
    iziToast.warning({
      title: "Caution",
      message: "Please enter contact number",
    });
  } else if (grade.find(":selected").text() == "SELECTION") {
    iziToast.warning({
      title: "Caution",
      message: "Please select Grade to enroll",
    });
  } else if (
    strand.find(":selected").val() == "sel" &&
    (grade.find(":selected").val() == "G11" ||
      grade.find(":selected").val() == "G12")
  ) {
    iziToast.warning({
      title: "Caution",
      message: "Please select strand",
    });
  } else if (use.val() == "") {
    iziToast.warning({
      title: "Caution",
      message: "Please type for what use",
    });
  } else {
    //   let id = $("#search-id-input");
    // let name = $("#search-name-input");
    // let email = $("#email-input");
    // let contact = $("#contact-input");
    // let request = $("#request");
    // let use = $("#use");
    // let grade = $("#grade-selection");
    // let strand = $("#grade-strand");

    let data = {};
    data[`/enrollment/${GetDate(0)}_${GetDate(2)}`] = {
      // data[`/enrollment/${GetDate(0)}/${GetDate(2)}/${grade.find(":selected").val()}`] = {
      id: id.val(),
      name: name.val(),
      email: email.val(),
      contact: contact.val(),
      grade: grade.find(":selected").val(),
      strand: strand.find(":selected").val(),
      requirements: $("#requirements").val().replaceAll("\n", "<br>"),
      isPassed: "W",
      form137Stat: "P",
      form138Stat: "P",
      goodMoralStat: "P",
    };

    const zeroPad = (num, places) => String(num).padStart(places, "0");

    EnrollData(data)
      .then((a) => {
        Swal.fire({
          title: "CONGRATS!",
          icon: "info",
          // html: `You have idled for ${idleThresh / 60}m, <br>you will now be automatically logged out`,
          html: `PLEASE PROCEED TO THE<br>REGISTRAR TO GET YOUR <br>REQUEST <br> <br> 
        <span>YOUR WAITING NUMBER<br><b id="waiting-number">${zeroPad(
          a + 1,
          2
        )}</b><br>Please take a picture <i class="fa fa-camera"></i></span>`,
          confirmButtonText: "DONE",
          timer: 60000,
          timerProgressBar: true,
          willClose: (e) => {},
          confirmButtonColor: "#fed400",
          showCancelButton: false,
        }).then((result) => {
          window.location.href = "index.html";
        });
      })
      .catch((e) => {
        Swal.fire({
          title: "ENROLLMENT FAILED",
          icon: "warning",
          // html: `You have idled for ${idleThresh / 60}m, <br>you will now be automatically logged out`,
          html: `${e}<br>Please try again`,
          confirmButtonText: "OKAY",
          confirmButtonColor: "#fed400",
          showCancelButton: false,
        });
      });
  }
});

$("#btn-request").on("click", (e) => {
  let id = $("#search-id-input");
  let name = $("#search-name-input");
  let request = $("#request");
  let use = $("#use");

  if (id.val() == "" && name.val() != "") {
    // id.css("border-bottom", "solid 2px red");
    id.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student ID",
    });
  } else if (id.val() != "" && name.val() == "") {
    // name.css("border-bottom", "solid 2px red");
    name.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student Name",
    });
  } else if (id.val() == "" && name.val() == "") {
    // id.css("border-bottom", "solid 2px red");
    id.focus();
    iziToast.warning({
      title: "Caution",
      message: "Please enter Student Name & ID",
    });
  } else if (request.val() == "") {
    iziToast.warning({
      title: "Caution",
      message: "Please type your request",
    });
  } else if (use.val() == "") {
    iziToast.warning({
      title: "Caution",
      message: "Please enter for what use",
    });
  } else {
    let data = {};
    data[`/document/${GetDate(0)}_${GetDate(2)}`] = {
      // data[`/enrollment/${GetDate(0)}/${GetDate(2)}/${grade.find(":selected").val()}`] = {
      id: id.val(),
      name: name.val(),
      request: request.val(),
      use: $("#use").val().replaceAll("\n", "<br>"),
      isStillProcessing: true,
    };

    const zeroPad = (num, places) => String(num).padStart(places, "0");

    RequestData(data)
      .then((a) => {
        console.log("Successfully Requested Data!", a);
        Swal.fire({
          title: "CONGRATS!",
          icon: "info",
          // html: `You have idled for ${idleThresh / 60}m, <br>you will now be automatically logged out`,
          html: `PLEASE PROCEED TO THE<br>REGISTRAR TO GET YOUR <br>REQUEST <br> <br> 
        <span>YOUR WAITING NUMBER<br><b id="waiting-number">${zeroPad(
          a + 1,
          2
        )}</b><br>Please take a picture <i class="fa fa-camera"></i></span>`,
          confirmButtonText: "DONE",
          timer: 60000,
          timerProgressBar: true,
          willClose: (e) => {},
          confirmButtonColor: "#fed400",
          showCancelButton: false,
        }).then((result) => {
          window.location.href = "index.html";
        });
      })
      .catch((e) => {
        Swal.fire({
          title: "REQUEST FAILED",
          icon: "warning",
          // html: `You have idled for ${idleThresh / 60}m, <br>you will now be automatically logged out`,
          html: `${e}<br>Please try again`,
          confirmButtonText: "OKAY",
          confirmButtonColor: "#fed400",
          showCancelButton: false,
        });
      });
  }
});

window.StaffLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      let updates = { isSuccess: false, role: "" };

      const result = ref(database, "user/");
      get(child(result, "/" + username)).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          if (data.password == password) {
            updates.isSuccess = true;
            updates.role = data.role;
            updates.isDeleted = data.isDeleted;
            sessionStorage.setItem("loggedIn", username);
          }

          resolve(updates);
        } else {
          resolve(updates);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

function SubmitIncidentReport(dataUpdate) {
  return new Promise((resolve, reject) => {
    try {
      const updates = {};

      const result = ref(database, "incident/");
      get(child(result, "/")).then((snapshot) => {
        // if (snapshot.exists()) {
        let data = snapshot.val();
        console.log("Incident", data);

        let c = 0;
        for (let d in data) {
          for (let i in data[d]) {
            c++;
          }
        }

        updates[`/incident/${GetDate(0)}/${c}`] = {
          ...dataUpdate,
        };

        update(ref(database), updates);
        resolve(c);
        // }
      });
    } catch (e) {
      reject(e);
    }
  });
}

function EnrollData(updates) {
  let isAlreadyEnrolled = false;
  return new Promise((resolve, reject) => {
    try {
      const result = ref(database, "enrollment/");
      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let details = updates[Object.keys(updates)[0]];

          for (let date in data) {
            if (
              data[date].id == details.id &&
              data[date].grade == details.grade
            ) {
              isAlreadyEnrolled = true;
              break;
            }
          }

          // If not yet enrolled, the allow to be enrolled
          if (!isAlreadyEnrolled) {
            update(ref(database), updates);
            resolve(Object.keys(data).length);
          } else {
            reject(
              `${details.name} (${details.id}) is already enrolled to ${details.grade}`
            );
          }
        } else {
          console.log("No data available");
          reject("No data available");
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

function RequestData(updates) {
  let isAlreadyEnrolled = false;
  return new Promise((resolve, reject) => {
    try {
      const result = ref(database, "document/");
      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          console.log(data);

          // If not yet enrolled, the allow to be enrolled
          update(ref(database), updates);
          resolve(Object.keys(data).length);
        } else {
          console.log("No data available");
          reject("No data available");
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

window.GetEnrollment = () => {
  return new Promise((resolve, reject) => {
    try {
      const result = ref(database, "enrollment/");
      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          resolve(data);
          // If not yet enrolled, the allow to be enrolled
        } else {
          reject("No data available");
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

window.GetDocumentRequest = () => {
  return new Promise((resolve, reject) => {
    try {
      const result = ref(database, "document/");
      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          resolve(data);
          // If not yet enrolled, the allow to be enrolled
        } else {
          reject("No data available");
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

$(".year-to-enroll").on("click", (e) => {
  // .find(":selected").text();
  let grade = $(e.target).find(":selected").val();

  let gradeSel = $("#grade-selection");
  let requirements = $("#requirements");
  let gradeListForm17 = ["G7", "G8", "G9"];

  // For Requirements Field
  if (gradeListForm17.includes(gradeSel.find(":selected").val())) {
    requirements.val(`To be submitted:\n- Form 137 of last school year
      `);

    // requirements.css("height", `${+requirements.css("height").split("px")[0] + 100}px`)
    requirements.css("height", `${100}px`);
    // console.log("Here", requirements.css("height").split("px")[0]);
  } else {
    requirements.val(``);
    requirements.css("height", `${50}px`);
  }

  if (grade == "G11" || grade == "G12") {
    $(".year-to-enroll-strand").fadeIn();
  } else {
    $(".year-to-enroll-strand").fadeOut();
  }
  // console.log();
});

window.Upload = () => {
  TestAsyncUploadBytes()
    .then((data) => {
      console.log("Promised Data:", data);
    })
    .catch((error) => {
      console.log("Promised Error:", error);
    });
};

window.Test = () => {
  // const database = getDatabase(app);
  // const connectedRef = ref(database, ".info/connected");
  // onValue(connectedRef, (snapshot) => {
  //   const data = snapshot.val();
  //   // console.log("Retrieve Spelling: ", data);

  //   if (data) {
  //     const result = ref(database, "mapping/");
  //     get(child(result, "/")).then((snapshot) => {
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         console.log("Test", data);
  //       } else {
  //         console.log("No data available");
  //       }
  //     });
  //     // Retrieve Database value when no issue is encountered
  //     // const result = ref(database, "mapping/facilities/");
  //     // onValue(result, (snap) => {
  //     //   // console.log(snap.val());
  //     //   const v = snap.val().advanced;
  //     //   var data = "";
  //     //   console.log(v);

  //     //   let randomSpelling = "";
  //     // });
  //   } else {
  //     console.log("not connected");
  //   }
  // });

  TestAsync()
    .then((data) => {
      console.log("Promised Data:", data);
    })
    .catch((error) => {
      console.log("Promised Error:", error);
    });

  console.log("Tests");
};

window.isValidDate = (dateString) => {
  // Regular expression to match YYYY-MM-DD format
  var dateFormat = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the date string matches the format
  if (!dateFormat.test(dateString)) {
    // throw new Error("Invalid date format. Date must be in YYYY-MM-DD format.");
    return false;
  }

  // Split the date string into year, month, and day
  var parts = dateString.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[2], 10);

  // Create a new Date object and check if it's a valid date
  var date = new Date(year, month - 1, day); // Note: month is 0-indexed in Date object

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    // throw new Error("Invalid date.");
    return false;
  }

  return true;
};
