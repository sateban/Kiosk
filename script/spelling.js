// $("#lbl-spelling").on("click", (event) => {
function Speak(s) {
  // event.preventDefault(); // Prevent the default action

  spelling = s == "" ? $("#spell").val() : s; //
  // console.log(spelling);

  // var form = document.getElementById("myForm");
  var formData = new FormData();
  formData.append("spell", spelling);

  $.ajax({
    url: "http://localhost:8000/receive", // Change the URL and port if necessary
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    xhrFields: {
      responseType: "blob",
    },
    success: function (data, textStatus, jqXHR) {
      if (jqXHR.status === 200) {
        var blob = data;
        console.log(blob);
        // var reader = new FileReader();
        // reader.onload = function (event) {
        //   var blobValue = event.target.result;
        //   console.log("Blob value:", blobValue);
        //   // You can use the blobValue in your application as needed
        // };
        // reader.readAsText(blob);
        // var blob = new Blob(["Hello, this is a Blob"], { type: "text/plain" });
        calculateSHA1(blob)
          .then((hash) => {
            console.log("SHA-1 hash:", hash);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        var audio = document.getElementById("speaker");
        audio.setAttribute("controls", "controls");
        audio.setAttribute("hidden", "true");
        audio.src = window.URL.createObjectURL(blob);
        audio.play();
        // event.preventDefault();
        // audio.addEventListener("ended", function() {
        //   // Logic to execute when the audio has finished playing
        //   // console.log("Audio has finished playing");
        //   Speak("I repeat ")
        // });
      } else {
        // Handle the error here
        console.error("Error: " + jqXHR.statusText);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Error: " + textStatus, errorThrown);
    },
  });
  // });
}

function arrayBufferToHex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");
}

function calculateSHA1(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const arrayBuffer = this.result;
      crypto.subtle
        .digest("SHA-1", arrayBuffer)
        .then((hashBuffer) => {
          const hashHex = arrayBufferToHex(hashBuffer);
          resolve(hashHex);
        })
        .catch((error) => {
          reject(error);
        });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}

// $("#btn-ret-spelling").on("click", () => {
//   RetrieveSpelling();
// });

$(document).ready(() => {
  // PrepareTimezone();

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const ctx2 = canvas.getContext("2d");
  document
    .getElementById("canvas")
    .style.setProperty(
      "background",
      "repeating-linear-gradient(45deg, #ffc800, #ffc800 5px, #ffc200 5px, #ffc200 10px)"
    );
  document.getElementById("canvas").style.setProperty("border-radius", "1vw");
  document
    .getElementById("canvas")
    .style.setProperty("animation", "moveBackground 80s linear infinite");
  // document.getElementById("canvas").style.setProperty("width", "100%");
  // document.getElementById("canvas").style.setProperty("height", "100vh");
  document.getElementById("canvas").style.setProperty("position", "relative");
  document
    .getElementById("canvas")
    .style.setProperty("background-size", "200% 100%");

  canvas.width = $("#canvas-row").width();
  canvas.height = 500;

  var fontSize = 16;
  var fontFamily = "Carter One";
  var textColor = "#fff";
  var placeholder = "00:00:00 AM";

  // console.log(ctx.measureText(text).width);
  // ctx.font = fontSize + "px " + fontFamily;

  // var x1 = canvas.width - ctx.measureText(placeholder).width - 10;
  // var y1 = fontSize + 10;

  // // Set the text color
  // ctx.fillStyle = textColor;

  // ctx.fillText(placeholder, x1, y1);

  // ctx.fillStyle = "blue";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.addEventListener("resize", resizeCanvas, false);
  window.addEventListener("load", resizeCanvas, false);

  function resizeCanvas() {
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = $("#canvas-row").width();
    canvas.height = 500;
  }

  function PrepareTimezone() {
    const tz = "Asia/Manila"; // Intl.DateTimeFormat().resolvedOptions().timeZone;

    $.ajax({
      url: `https://worldtimeapi.org/api/timezone/${tz}`,
      method: "GET",
      success: function (data) {
        const currentTime = new Date(data.utc_datetime);
        let date = new Date(currentTime);
        console.log("WorldTimeAPI", date);

        // setInterval(() => {
        RunClock(currentTime);
        // }, 1000);

        // Further processing with the current time
      },
      error: function (error) {
        console.error("Error fetching time:", error);
      },
    });
  }

  function RunClock(currentTime) {
    // console.log(currentTime);
    var customDate = new Date(currentTime); // Set the desired date and time

    Date.now = function () {
      return customDate.getTime();
    };

    let date = new Date();
    // let date = currentTime;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var meridiem = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Add leading zeros to minutes and seconds
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Construct the time string
    var timeString = hours + ":" + minutes + ":" + seconds + " " + meridiem;

    // console.log(timeString);

    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    var text = timeString;

    // console.log(ctx.measureText(text).width);
    // ctx.font = fontSize + "px " + fontFamily;
    // ctx.font = fontSize + "px " + fontFamily;

    // var x = canvas.width - ctx.measureText(text).width - 10;
    // var y = fontSize + 10;

    // Set the font style

    // Set the text color
    // ctx.fillStyle = textColor;

    // ctx.fillText(text, x, y);

    var startTime = new Date().getTime();
    var minutes = 0;
    var seconds = 0;

    function displayTimer() {
      // console.log("disp");

      // var currentTime = new Date().getTime();
      // var elapsed = currentTime - startTime;

      // var seconds = Math.floor(elapsed / 1000);
      // var minutes = Math.floor(seconds / 60);
      // seconds = seconds % 60;
      seconds++;

      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      // return minutes + "m:" + seconds + "s";
      return formattedMinutes + "m:" + formattedSeconds + "s";

      // Draw the timer on the canvas
      // ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      // ctx.fillRect(10, 10, 100, 50); // Clear a specific area for the timer
      // ctx.fillStyle = "black";
      // ctx.fillText(minutes + ":" + seconds, 20, 40);

      // requestAnimationFrame(displayTimer);
    }

    // displayTimer();
    let status = {
      isSubmitDisabled: true,
      isSingleModeDisabled: false,
    };

    let clickedImage = {
      image: "",
      allow: false,
    };
    // Insert Image
    let playBtnMouse = {
      x: 0,
      y: 0,
      newWidth: 0,
      newHeight: 0,
    };

    let singleBtnMouse = {
      x: 0,
      y: 0,
      newWidth: 0,
      newHeight: 0,
    };

    let multiBtnMouse = {
      x: 0,
      y: 0,
      newWidth: 0,
      newHeight: 0,
    };

    let submitBtnMouse = {
      x: 0,
      y: 0,
      newWidth: 0,
      newHeight: 0,
    };

    function DrawSubmit() {
      var submit = new Image();
      // var x, y;
      // var newWidth, newHeight;
      submit.onload = function () {
        // animate();
        submitBtnMouse.newWidth = submit.width / 2;
        submitBtnMouse.newHeight = submit.height / 2;
        submitBtnMouse.x = (canvas.width - submitBtnMouse.newWidth) / 2;
        submitBtnMouse.y = (canvas.height - submitBtnMouse.newHeight) * 0.9;
        console.log("x:", submitBtnMouse.x, "y:", submitBtnMouse.y);

        ctx.drawImage(
          submit,
          submitBtnMouse.x,
          submitBtnMouse.y,
          submitBtnMouse.newWidth,
          submitBtnMouse.newHeight
        );
      };

      submit.src = "assets/submit.png";
    }

    function DrawDisabledSubmit() {
      var submit = new Image();
      // var x, y;
      // var newWidth, newHeight;
      submit.onload = function () {
        // animate();
        submitBtnMouse.newWidth = submit.width / 2;
        submitBtnMouse.newHeight = submit.height / 2;
        submitBtnMouse.x = (canvas.width - submitBtnMouse.newWidth) / 2;
        submitBtnMouse.y = (canvas.height - submitBtnMouse.newHeight) * 0.9;
        console.log("x:", submitBtnMouse.x, "y:", submitBtnMouse.y);

        ctx.drawImage(
          submit,
          submitBtnMouse.x,
          submitBtnMouse.y,
          submitBtnMouse.newWidth,
          submitBtnMouse.newHeight
        );
      };

      submit.src = "assets/disabledsubmit.png";
    }

    function DrawPlay() {
      var play = new Image();
      // var x, y;
      // var newWidth, newHeight;
      play.onload = function () {
        // animate();
        playBtnMouse.newWidth = play.width / 2;
        playBtnMouse.newHeight = play.height / 2;
        playBtnMouse.x = (canvas.width - playBtnMouse.newWidth) / 2;
        playBtnMouse.y = (canvas.height - playBtnMouse.newHeight) * 0.9;
        console.log("x:", playBtnMouse.x, "y:", playBtnMouse.y);
        console.log(
          "newWidth:",
          playBtnMouse.newWidth,
          "newHeight:",
          playBtnMouse.newHeight
        );

        ctx.drawImage(
          play,
          playBtnMouse.x,
          playBtnMouse.y,
          playBtnMouse.newWidth,
          playBtnMouse.newHeight
        );
      };

      play.src = "assets/play.png";
    }

    // Insert Image
    function DrawMode() {
      var single = new Image();
      var multi = new Image();
      single.onload = function () {
        // animate();
        singleBtnMouse.newWidth = single.width / 2;
        singleBtnMouse.newHeight = single.height / 2;
        singleBtnMouse.x = (canvas.width - singleBtnMouse.newWidth) / 2;
        singleBtnMouse.y = (canvas.height - singleBtnMouse.newHeight) * 0.8;

        ctx.drawImage(
          single,
          singleBtnMouse.x,
          singleBtnMouse.y,
          singleBtnMouse.newWidth,
          singleBtnMouse.newHeight
        );
      };

      multi.onload = function () {
        // animate();
        multiBtnMouse.newWidth = multi.width / 2;
        multiBtnMouse.newHeight = multi.height / 2;
        multiBtnMouse.x = (canvas.width - multiBtnMouse.newWidth) / 2;
        multiBtnMouse.y = (canvas.height - multiBtnMouse.newHeight) * 0.95;
        // console.log("single.height", single.height);

        ctx.drawImage(
          multi,
          multiBtnMouse.x,
          multiBtnMouse.y,
          multiBtnMouse.newWidth,
          multiBtnMouse.newHeight
        );
      };

      single.src = "assets/singleplayer.png";
      multi.src = "assets/multiplayer.png";
    }

    function ClearDisplay() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function Selection() {
      // console.log("Selection");
      let changeScreen = new Audio();
      changeScreen.src = "assets/sound/changeScreen.mp3";
      // changeScreen.src = "C://Users//Jake//Documents//Workspace//Projects//Game2//assets//sound//changeScreen.mp3";
      changeScreen.play();
    }

    function GameStarted() {
      // console.log("Selection");
      let gameStarted = new Audio();
      gameStarted.src = "assets/sound/gameStarted.mp3";
      gameStarted.play();
    }

    function StartSingleMode() {
      console.log("StartSingleMode");
      let c = 3;
      let i = setInterval(() => {
        $("#text-spelling").text(`Game will start in ${c}`);

        if (c <= 0) {
          clearInterval(i);
          $("#text-spelling").text("Let's Play!");
          status.isSingleModeDisabled = true;

          setTimeout(() => {
            setInterval(() => {
              $("#text-spelling").text(displayTimer());

              // RetrieveSpelling();
            }, 1000);

            clickedImage.allow = true;
            GameStarted();
            // DrawSubmit();
            RetrieveSpelling();
            DrawDisabledSubmit();
          }, 1500);
        }

        c--;
      }, 1000);
    }

    DrawPlay();
    // RetrieveSpelling();
    // DrawMode();

    let gameData = {
      index: 0,
      spelling: "",
      spelled: "",
    };

    let gameScore = [];
    // {
    //   index: 0,
    //   spelling: "",
    //   isCorrect: false
    // };

    window.StartGame = () => {
      let s = $("#spell").val().split(",");

      if (gameData.index == 0) {
        console.log("Here");
        // First Loop/Start
        gameData.index = 0;
        gameData.spelling = s[0];
      }
      // console.log(gameData);
      if (s[gameData.index] != undefined) {
        console.log(s[gameData.index]);
        Speak(s[gameData.index]);
      } else {
        console.log("Done spelling");
        // setTimeout(() => {
        //   ClearDisplay();
        // }, 2000);
      }

      console.log("gameData.index", gameData.index);

      // if (gameData.index == 5) {

      // }
    };

    function getCursorPosition(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      var xx = event.clientX - rect.left;
      var yy = event.clientY - rect.top;
      // console.log("x: " + xx + " y: " + yy);
      // console.log(x);
      // let x, y, newWidth, newHeight;

      if (clickedImage.image == "") {
        // Means no play button is not yet clicked
        // x = playBtnMouse.x;
        // y = playBtnMouse.y;
        // newWidth = playBtnMouse.newWidth;
        // newHeight = playBtnMouse.newHeight;

        if (
          xx >= playBtnMouse.x &&
          yy >= playBtnMouse.y &&
          playBtnMouse.x + playBtnMouse.newWidth >= xx &&
          playBtnMouse.y + playBtnMouse.newHeight >= yy
        ) {
          console.log("Image Clicked");
          Selection();

          // RetrieveSpelling();

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          DrawMode();
          clickedImage.image = "play";
        }
      } else if (
        clickedImage.image == "play" ||
        clickedImage.image == "single" ||
        clickedImage.image == "submit" ||
        clickedImage.image == "multi"
      ) {
        if (
          xx >= singleBtnMouse.x &&
          yy >= singleBtnMouse.y &&
          singleBtnMouse.x + singleBtnMouse.newWidth >= xx &&
          singleBtnMouse.y + singleBtnMouse.newHeight >= yy &&
          !status.isSingleModeDisabled
        ) {
          console.log("SingleMode Clicked");
          Selection();

          ClearDisplay();
          StartSingleMode();
          // RetrieveSpelling();

          // ctx.clearRect(0, 0, canvas.width, canvas.height);
          // DrawMode();
          clickedImage.image = "single";
        } else if (
          xx >= multiBtnMouse.x &&
          yy >= multiBtnMouse.y &&
          multiBtnMouse.x + multiBtnMouse.newWidth >= xx &&
          multiBtnMouse.y + multiBtnMouse.newHeight >= yy &&
          1 == 0 // Disabled multiplayer
        ) {
          console.log("MultiMode Clicked");
          Selection();

          ClearDisplay();
          clickedImage.image = "multi";
        } else if (
          xx >= submitBtnMouse.x &&
          yy >= submitBtnMouse.y &&
          submitBtnMouse.x + submitBtnMouse.newWidth >= xx &&
          submitBtnMouse.y + submitBtnMouse.newHeight >= yy &&
          !status.isSubmitDisabled
        ) {
          console.log("Submit Clicked");
          Selection();

          // console.log(gameData);
          // console.log(gameData.spelling.toLowerCase());

          let isCorrect = false;

          if (gameData.spelling != undefined) {
            if (
              gameData.spelling.toLowerCase() === gameData.spelled.toLowerCase()
            ) {
              isCorrect = true;
            }
          }

          // index: 0,
          // spelling: "",
          // isCorrect: false
          // gameScore.push({
          //   index: gameData.index,
          //   spelling: gameData.spelling,
          //   isCorrect: isCorrect,
          // });

          gameScore.push({
            index: gameData.index,
            spelling: gameData.spelling,
            isCorrect: isCorrect,
          });

          let s = $("#spell").val().split(",");
          gameData.index += 1;
          gameData.spelling = s[gameData.index];

          StartGame();

          // gameData.index += 1;
          // gameData.spelling = gameData.spelling;

          // clickedImage.allow = true;

          console.log(gameScore);

          // ClearDisplay();
          clickedImage.image = "submit";
        }
      }
    }

    canvas.addEventListener("click", function (e) {
      getCursorPosition(this, e);
      //   var rect = canvas.getBoundingClientRect();
      //   console.log(rect);
      //   var x = e.clientX - rect.left;
      //   var y = e.clientY - rect.top;
      //   console.log(e.clientX);

      //   // Check if the click is within the image bounds
      //   if (x >= 0 && x <= play.width && y >= 0 && y <= play.height) {
      //       // Add your onclick functionality here
      //       console.log('Image clicked!');
      //   }
    });

    const mouse = { x: 0, y: 0 };
    $(document).on("mousemove", (event) => callCheckEvent(event, "hover"));

    const callCheckEvent = (event, message) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      // console.log("Mouse move");
    };
    var currentWord = "";

    $(document).on("keydown", (e) => {
      // console.log(e.which || e.keyCode);

      if (
        (clickedImage.image == "single" ||
          clickedImage.image == "multi" ||
          clickedImage.image == "submit") &&
        clickedImage.allow
      ) {
        let key = e.which || e.keyCode; // Shows only numbers
        let char = String.fromCharCode(e.which);
        // console.log(key);

        if (
          (key > 64 && key < 91) ||
          (key > 96 && key < 123) ||
          key == 8 ||
          key == 32 ||
          key == 27
        ) {
          // 8 is backspace, 32 is space, 27 is escape
          if (key == 8) {
            // console.log("Test".slice(0, -1));
            currentWord = currentWord.slice(0, -1);
          } else if (key == 27) {
            currentWord = "";
          } else {
            currentWord += char;
          }

          if (currentWord.length >= 3) {
            DrawSubmit();
            status.isSubmitDisabled = false;
          } else {
            ClearDisplay();
            DrawDisabledSubmit();
            status.isSubmitDisabled = true;
          }

          gameData.spelled = currentWord;

          // console.log(char);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // var fontSize = getComputedStyle(canvas).fontSize;
          // ctx.font = fontSize + ' Carter One';
          // console.log(fontSize);
          let fontSize = ScreenSize();
          ctx.font = `${fontSize}vw Carter One`;
          ctx.fillStyle = "#fff";
          ctx.textAlign = "center"; // Set the text alignment to center
          var textX = canvas.width / 2;
          var textY = canvas.height / 2;

          // ctx.clearRect(0, 0, canvas.width, canvas.height);
          // DrawPlay();

          // ctx.fillRect(0, 0, canvas.width, canvas.height);
          //   for (var i = 0; i < currentWord.length; i++) {
          //     var c = currentWord.charAt(i);
          //     var charWidth = ctx.measureText(c).width;

          //     // Draw a rectangle around each character
          //     ctx.beginPath();
          //     ctx.rect(x, y - fontSize, charWidth, fontSize);
          //     ctx.stroke();

          //     // Move the position to draw the next character
          //     x += charWidth;
          //     console.log(x);
          // }

          // Measure the text width and height
          // var textWidth = ctx.measureText(currentWord.toUpperCase()).width;
          // var textHeight = fontSize;

          // Draw the background rectangle
          // ctx.fillRect(textX, textY - textHeight, textWidth, textHeight);
          // console.log(textX, textY - textHeight, textWidth, textHeight);

          // Set the text color
          // ctx.fillStyle = "black";

          // ctx.fillRect(textX, textY, 200, 100);
          ctx.fillText(currentWord.toUpperCase(), textX, textY);
        }
        // var regex = new RegExp("^[a-z]");
        // if (!regex.test(char)) {
        //   console.log("Invalid Character");
        // } else {
        //   console.log("Key pressed:", char);
        // }
      }
    });

    // var scale = 1;
    // var growing = true;

    // function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // setInterval(()=>{
    //   var newWidth = play.width / 2;
    //   var newHeight = play.height / 2;
    //   ctx.drawImage(play, 0, 0, newWidth, newHeight);
    // }, 500);

    // var imageSize = 100; // Adjust the size of the image

    // if (growing) {
    //   scale += 0.005; // Adjust the speed of the animation
    //   if (scale >= 1.2) growing = false;
    // } else {
    //   scale -= 0.005; // Adjust the speed of the animation
    //   if (scale <= 0.8) growing = true;
    // }

    // var scaledWidth = play.width * scale;
    // var scaledHeight = play.height * scale;
    // var x = (canvas.width - scaledWidth) / 2;
    // var y = (canvas.height - scaledHeight) / 2;

    // ctx.drawImage(play, x, y, scaledWidth, scaledHeight);
    // requestAnimationFrame(animate);
    // }
  }

  resizeCanvas();
  PrepareTimezone();

  // window.onload = function() {
  //   play.onload();
  // };

  function ScreenSize() {
    let iWidth = window.innerWidth;
    let size;

    if (iWidth <= 768) {
      // Mobile
      size = 1;
    } else {
      // console.log("iWidth", iWidth);
      size = 6;
    }

    return size;
  }

  // ScreenSize();
});
