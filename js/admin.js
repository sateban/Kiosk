$(document).ready(() => {
  const connectedRef = _ref();
  const onValue = _onValue();
  const get = _get();
  const set = _set();
  const child = _child();
  const onChildAdded = _childAdded();
  const update = _update();
  const ref2 = _ref2();

  $(".container-fluid div").on("click", (event) => {
    // console.log($(event.target).attr("value"));

    $("#" + $(event.target).attr("value")).modal("show");

    //// Modify Calendar Events
    $("#" + $(event.target).attr("value")).on("shown.bs.modal", function () {
      if ($(event.target).attr("value") == "calendar-events") {
        // Modify Calendar Events (your code here)
        $("#calendar-events .modal-body").css("height", "90vh");
        const eventResult = _ref("events");
        let events = [];

        get(child(eventResult, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();

            for (let item in data) {
              events.push({
                title: data[item].title,
                start: data[item].start,
              });
            }

            $("#events-count").val(
              events.length +
                " event" +
                (events.length > 1 ? "s" : "") +
                " in list"
            );
            RenderMainCalendar(events, data);
          }
        });
      }
    });
  });

  let allowStudentSearch = false;
  $("#access-select").on("change", (e) => {
    let v = $(e.target).val();

    if (v == "remove") {
      $("#access-checkbox").css("display", "block");
      allowStudentSearch = true;
      Autos();
    } else {
      $("#access-checkbox").css("display", "none");
      allowStudentSearch = false;
      Autos();
    }
  });

  $("#access-checkbox").on("change", (e) => {
    let isChecked = $("#flexCheckIndeterminate").is(":checked");

    if (isChecked) {
      allowStudentSearch = true;
      Autos();
    } else {
      allowStudentSearch = false;
      Autos();
    }
  });

  Autos();
  function Autos() {
    // Input Auto-Suggest
    onValue(connectedRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const result = _ref("user");
        get(child(result, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            // console.log(data);

            let facilitiesArray = [];
            let facilitiesStudentArray = [];
            let modifiableFacultyArray = [];
            let data2 = Object.keys(data);
            let fCounter = 0;

            for (let i = 0; i < data2.length; i++) {
              let fname = data[data2[i]].fname;
              let mname = data[data2[i]].mname.trim()[0];
              mname = mname != undefined ? mname.toUpperCase() : "";
              let lname = data[data2[i]].lname;
              let id = data[data2[i]].id;
              let role = data[data2[i]].role;
              let year = data[data2[i]].year;
              let fullname = `${lname}, ${fname} ${mname}`;
              let fullnameID = `${lname}, ${fname} ${mname} • ${role.toUpperCase()}`;
              let isDeleted = data[data2[i]].isDeleted;

              if(allowStudentSearch && !isDeleted){
                modifiableFacultyArray.push({
                  value: fullname,
                  key: fCounter,
                  id: id,
                  label: fullnameID,
                  year: year,
                  role: role,
                });
              }
              else if (role != "student" && !isDeleted) {
                facilitiesArray.push({
                  value: fullname,
                  key: fCounter,
                  id: id,
                  label: fullnameID,
                  year: year,
                  role: role,
                });
                fCounter++;

                modifiableFacultyArray.push({
                  value: fullname,
                  key: fCounter,
                  id: id,
                  label: fullnameID,
                  year: year,
                  role: role,
                });
              } else if (role == "student" && !isDeleted) {
                facilitiesStudentArray.push({
                  value: fullname,
                  key: fCounter,
                  id: id,
                  label: fullnameID,
                  year: year,
                  role: role,
                });
              }
            }

            console.log(facilitiesArray);

            $("#inputStaff").autocomplete({
              source: facilitiesArray,
              close: function (event, ui) {
                // code below makes the selection to not disapper, good for debugging
                // if (!$("ul.ui-autocomplete").is(":visible")) {
                //   $("ul.ui-autocomplete").show();
                // }
              },
              select: (event, ui) => {
                event.preventDefault();
                const selectedID = ui.item.id;
                const selectedRole = ui.item.role;
                const selectedName = ui.item.value;

                console.log(ui.item);
                $("#inputStaff").val(selectedName);
                $("#inputStaff").attr("role", selectedRole);
                $("#inputStaff").attr("staff-id", selectedID);
              },
              search: function (event, ui) {
                console.log("Test");
              },
            });

            $("#inputStudent").autocomplete({
              source: facilitiesStudentArray,
              select: (event, ui) => {
                event.preventDefault();
                const selectedID = ui.item.id;
                const selectedRole = ui.item.role;
                const selectedName = ui.item.value;

                $("#inputStudent").val(selectedName);
                $("#inputStudent").attr("role", selectedRole);
                $("#inputStudent").attr("student-id", selectedID);
              },
              search: function (event, ui) {
                console.log("Test");
              },
            });

            $("#inputModify").autocomplete({
              source: modifiableFacultyArray,
              select: (event, ui) => {
                event.preventDefault();
                const selectedID = ui.item.id;
                const selectedRole = ui.item.role;
                const selectedName = ui.item.value;

                $("#inputModify").val(selectedName);
                $("#inputModify").attr("role", selectedRole);
                $("#inputModify").attr("staff-id", selectedID);
                $("#access-previous-role-option").text(
                  "Previous (" + selectedRole.toUpperCase() + ")"
                );
              },
              search: function (event, ui) {
                console.log("Test");
              },
            });
          }
        });
      }
    });
  }

  // READ RFID
  let isRFIDDetected = false;
  let id = "";
  let time = 0;

  $(document).on("keyup", (event) => {
    let urlName = window.location.href.split("/")[4];

    id += event.key;
    time = 0; // keep on typing to not trigger id resetter
    console.log(id);

    if (!isNaN(parseInt(id)) && id.length == 10) {
      console.log("RFID Detected with ID number: ", id);

      if ($("#rfid-staff").hasClass("show")) {
        $("#rfid-input").val(id);
        Enter();

        iziToast.success({
          title: "Success",
          message: `RFID Successfully retrieved`,
          icon: "fa fa-check",
        });
      }

      if ($("#rfid-student").hasClass("show")) {
        $("#rfid-student-input").val(id);
        Enter();

        iziToast.success({
          title: "Success",
          message: `RFID Successfully retrieved`,
          icon: "fa fa-check",
        });
      }

      // Chech RFID Status
      if ($("#rfid-status").hasClass("show")) {
        $("#rfid-check-input").val(id);
        Enter();
        let id2 = id;

        iziToast.success({
          title: "Success",
          message: `RFID Successfully retrieved`,
          icon: "fa fa-check",
        });

        $("#rfid-status .modal-body").css("height", "90vh");

        const userResult = _ref("main");

        get(child(userResult, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let usageCounter = 0;
            let rfidUser = "";
            let rfidRole = "";
            let events = [];

            let dataSuccess = data.login.success;
            let dataUser = data.user;

            // Count usage in logindb
            for (let item in dataSuccess) {
              if (dataSuccess[item].id == id2) {
                let fDate = item.split("_")[0];
                usageCounter++;

                // for(let item in events){
                //   console.log(events[item].start);
                //   if(events[item].start != fDate){
                events.push({
                  title: "Login",
                  start: fDate, //"2024-05-01",
                });
                //   }
                // }
              }
            }

            function uniqueByKey(array, key) {
              return [...new Map(array.map((x) => [x[key], x])).values()];
            }

            events = uniqueByKey(events, "start");

            // Check user of RFID
            for (let item in dataUser) {
              if (item == id) {
                rfidUser = dataUser[item].name;
                rfidRole = dataUser[item].role;
                break;
              } else if (dataUser[item].id == id2) {
                rfidUser = dataUser[item].name;
                rfidRole = dataUser[item].role;
                break;
              } else if (dataUser[item].rfid == id2) {
                rfidUser = dataUser[item].name;
                rfidRole = dataUser[item].role;
                break;
              }
            }

            if (rfidUser != "" && rfidUser != undefined) {
              $("#rfid-times-used").val(usageCounter + "x used");
              $("#rfid-user").val(
                rfidUser + " (" + rfidRole.toUpperCase() + ")"
              );
            } else if (rfidUser == "") {
              $("#rfid-times-used").val("~");
              $("#rfid-user").val("Not Found");
            }

            RenderCalendar(events);
            // $(".fc-dayGridMonth-button").click();

            // if (data[id]) {
            //   data[id]["rfid"] = rfidVal;
            //   updates = { [id]: data[id] };
            //   console.log(updates);

            //   update(result, updates);

            //   iziToast.success({
            //     title: "Success",
            //     message: `RFID ${rfidVal} successfully assigned to ${
            //       data[id].name
            //     } (${data[id].role.toUpperCase()})`,
            //     icon: "fa fa-check",
            //   });

            //   Enter();
            // } else {
            //   iziToast.warning({
            //     title: `Unable find ${studentName.val()} in the database`,
            //     message: `Please try again`,
            //     icon: "fa fa-exclamation",
            //   });
            //   Pop();
            // }
          }
        });
      }

      isRFIDDetected = true;
      id = "";
    } else if (event.key == "Enter") {
      id = "";
    } else {
      // console.log(isNaN(parseInt(id)), id.length);
      if (
        isNaN(parseInt(id))
        // && id.length >= 10
      ) {
        console.log("Resetting");
        id = "";
      } else {
        // console.log(id);
        if (id.length >= 10) {
          id = "";
        }
      }
    }
  });

  //// Assign Staff RFID
  $("#btn-assign-rfid").on("click", () => {
    let staffName = $("#inputStaff");
    let staffRFID = $("#rfid-input");

    if (staffName.val() == "") {
      iziToast.warning({
        title: "Incomplete",
        message: `Please enter staff name`,
        icon: "fa fa-exclamation",
      });
    } else if (staffRFID.val() == "") {
      iziToast.warning({
        title: "Incomplete",
        message: `Please tap RFID`,
        icon: "fa fa-exclamation",
      });
    } else if (staffRFID.val() == "" && staffName.val() == "") {
      iziToast.warning({
        title: "Incomplete",
        message: `Please provide details for each input`,
        icon: "fa fa-exclamation",
      });
    } else {
      let updates = {};
      let id = staffName.attr("staff-id");
      let rfidVal = staffRFID.val();

      // updates[`/user/${id}`] = {
      // updates[`/user/t`] = {
      //   test: "rfidVal"
      // };
      const result = _ref("user");

      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let rfidIn = "";

          for (let item in data) {
            if (
              data[item].id == rfidVal &&
              item != id // must not check from the owner itself
            ) {
              rfidIn = data[item].name; // set who's the user of the RFID
            }
          }

          // Show conflict if RFID is already used
          if (rfidIn != "") {
            iziToast.warning({
              title: "Unable to Assign RFID",
              message: `RFID already used for ${rfidIn}`,
              icon: "fa fa-exclamation",
            });

            Pop();
          } else {
            if (data[id]) {
              data[id]["rfid"] = rfidVal;
              updates = { [id]: data[id] };
              console.log(updates);

              update(result, updates);

              iziToast.success({
                title: "Success",
                message: `RFID ${rfidVal} successfully assigned to ${
                  data[id].name
                } (${data[id].role.toUpperCase()})`,
                icon: "fa fa-check",
              });

              Enter();
            } else {
              iziToast.warning({
                title: `Unable find ${staffName.val()} in the database`,
                message: `Please try again`,
                icon: "fa fa-exclamation",
              });
              Pop();
            }
          }
        }
      });
      // updates = {[id]: {
      //   "test": "hello"
      // }};

      // // const result = _ref("user", id);
      // console.log(updates);
      // // set(result, updates);
    }
  });

  //// Assign Student RFID
  $("#btn-assign-std-rfid").on("click", () => {
    let studentName = $("#inputStudent");
    let studentRFID = $("#rfid-student-input");

    if (studentName.val() == "") {
      iziToast.warning({
        title: "Incomplete",
        message: `Please enter student name`,
        icon: "fa fa-exclamation",
      });
    } else if (studentRFID.val() == "") {
      iziToast.warning({
        title: "Incomplete",
        message: `Please tap RFID`,
        icon: "fa fa-exclamation",
      });
    } else if (studentRFID.val() == "" && studentName.val() == "") {
      iziToast.warning({
        title: "Incomplete",
        message: `Please provide details for each input`,
        icon: "fa fa-exclamation",
      });
    } else {
      let updates = {};
      let id = studentName.attr("student-id");
      let rfidVal = studentRFID.val();

      // updates[`/user/${id}`] = {
      // updates[`/user/t`] = {
      //   test: "rfidVal"
      // };
      const result = _ref("user");

      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let rfidIn = "";

          for (let item in data) {
            if (
              data[item].id == rfidVal &&
              item != id // must not check from the owner itself
            ) {
              rfidIn = data[item].name; // set who's the user of the RFID
            }
          }

          // Show conflict if RFID is already used
          if (rfidIn != "") {
            iziToast.warning({
              title: "Unable to Assign RFID",
              message: `RFID already used for ${rfidIn}`,
              icon: "fa fa-exclamation",
            });

            Pop();
          } else {
            if (data[id]) {
              data[id]["rfid"] = rfidVal;
              updates = { [id]: data[id] };
              console.log(updates);

              update(result, updates);

              iziToast.success({
                title: "Success",
                message: `RFID ${rfidVal} successfully assigned to ${
                  data[id].name
                } (${data[id].role.toUpperCase()})`,
                icon: "fa fa-check",
              });

              Enter();
            } else {
              iziToast.warning({
                title: `Unable find ${studentName.val()} in the database`,
                message: `Please try again`,
                icon: "fa fa-exclamation",
              });
              Pop();
            }
          }
        }
      });
      // updates = {[id]: {
      //   "test": "hello"
      // }};

      // // const result = _ref("user", id);
      // console.log(updates);
      // // set(result, updates);
    }
  });

  //// Modify System Access
  $("#btn-modify-access").on("click", () => {
    let roleName = $("#inputModify");
    let id = $("#inputModify").attr("staff-id");
    let staffAccess = $("#access-select");

    if (
      (staffAccess.val() == "" || staffAccess.val() == null) &&
      roleName.val() == ""
    ) {
      iziToast.warning({
        title: "Incomplete",
        message: `Please provide details for each field`,
        icon: "fa fa-exclamation",
      });
    } else if (roleName.val() == "") {
      iziToast.warning({
        title: "Incomplete",
        message: `Please enter staff name`,
        icon: "fa fa-exclamation",
      });
    } else if (staffAccess.val() == "disabled" || staffAccess.val() == null) {
      iziToast.warning({
        title: "Incomplete",
        message: `Please choose from the selection`,
        icon: "fa fa-exclamation",
      });
    } else if (staffAccess.val() == "remove") {
      Swal.fire({
        title: "Are you sure you want to remove access?",
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Yes",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const userResult = _ref2("user");
          const userUpdates = {};
          userUpdates[id + "/" + "isDeleted"] = true;
          update(userResult, userUpdates);

          iziToast.info({
            title: "Access Removed",
            // message: `Please choose from the selection`,
            icon: "fa fa-check",
          });
        }
      });
    } else {
      let updates = {};
      let id = roleName.attr("staff-id");
      let prevRole = roleName.attr("role");

      const result = _ref("user");

      get(child(result, "/")).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          const userResult = _ref("user");
          updates = data;
          console.log(updates[id]);

          updates[id]["role"] = staffAccess.val().toLowerCase();
          update(userResult, data);
          iziToast.success({
            title: "Success",
            message: `Role modification successful from ${prevRole.toUpperCase()} to ${staffAccess
              .val()
              .toUpperCase()}`,
            icon: "fa fa-exclamation",
            onClosed: function (instance, toast, closedBy) {
              window.location.href = "";
            },
          });
        } else {
          iziToast.warning({
            title: "User not existing",
            message: `Please try again`,
            icon: "fa fa-exclamation",
          });
        }
      });
    }
  });

  //// Check RFID Status
  //#region Check RFID Status
  // $("#btn-check-rfid").on("click", () => {
  //   let studentName = $("#inputStudent");
  //   let studentRFID = $("#rfid-student-input");

  //   if (studentName.val() == "") {
  //     iziToast.warning({
  //       title: "Incomplete",
  //       message: `Please enter student name`,
  //       icon: "fa fa-exclamation",
  //     });
  //   } else if (studentRFID.val() == "") {
  //     iziToast.warning({
  //       title: "Incomplete",
  //       message: `Please tap RFID`,
  //       icon: "fa fa-exclamation",
  //     });
  //   } else if (studentRFID.val() == "" && studentName.val() == "") {
  //     iziToast.warning({
  //       title: "Incomplete",
  //       message: `Please provide details for each input`,
  //       icon: "fa fa-exclamation",
  //     });
  //   } else {
  //     let updates = {};
  //     let id = studentName.attr("student-id");
  //     let rfidVal = studentRFID.val();

  //     // updates[`/user/${id}`] = {
  //     // updates[`/user/t`] = {
  //     //   test: "rfidVal"
  //     // };
  //     const result = _ref("user");

  //     get(child(result, "/")).then((snapshot) => {
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         let rfidIn = "";

  //         for (let item in data) {
  //           if (
  //             data[item].id == rfidVal &&
  //             item != id // must not check from the owner itself
  //           ) {
  //             rfidIn = data[item].name; // set who's the user of the RFID
  //           }
  //         }

  //         // Show conflict if RFID is already used
  //         if (rfidIn != "") {
  //           iziToast.warning({
  //             title: "Unable to Assign RFID",
  //             message: `RFID already used for ${rfidIn}`,
  //             icon: "fa fa-exclamation",
  //           });

  //           Pop();
  //         } else {
  //           if (data[id]) {
  //             data[id]["rfid"] = rfidVal;
  //             updates = { [id]: data[id] };
  //             console.log(updates);

  //             update(result, updates);

  //             iziToast.success({
  //               title: "Success",
  //               message: `RFID ${rfidVal} successfully assigned to ${
  //                 data[id].name
  //               } (${data[id].role.toUpperCase()})`,
  //               icon: "fa fa-check",
  //             });

  //             Enter();
  //           } else {
  //             iziToast.warning({
  //               title: `Unable find ${studentName.val()} in the database`,
  //               message: `Please try again`,
  //               icon: "fa fa-exclamation",
  //             });
  //             Pop();
  //           }
  //         }
  //       }
  //     });
  //     // updates = {[id]: {
  //     //   "test": "hello"
  //     // }};

  //     // // const result = _ref("user", id);
  //     // console.log(updates);
  //     // // set(result, updates);
  //   }
  // });
  //#endregion Check RFID Status

  function RenderCalendar(events) {
    // Modal Calendar
    //  $("#modal-calendar").fadeOut();
    let calendarEl = document.getElementById("modal-calendar");
    let today = new Date();

    let calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: "prevYear,prev,next,nextYear today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      },
      // height: "calc(100vh - 80%)",
      height: "500px",
      width: "100%",
      initialDate: today, //'2023-01-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: events,
    });

    calendar.render();
    $("#modal-calendar").fadeIn();
  }

  function RenderMainCalendar(events, data) {
    let calendarEl = document.getElementById("events-calendar");
    let today = new Date();
    let clickCnt = 0;

    let calendar = new FullCalendar.Calendar(calendarEl, {
      selectable: true,
      headerToolbar: {
        left: "prevYear,prev,next,nextYear today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      },
      select: function (startDate, endDate, jsEvent, view) {
        // Prevent default behavior (optional)
        // jsEvent.preventDefault(); // Useful if you have other click handlers
        // Create a new event object based on the selection
        // let newEvent = {
        //   title: 'New Event', // Set a default title
        //   start: startDate,
        //   end: endDate,
        //   allDay: view.type === 'dayGridMonth' // Set allDay based on view
        // };
        // // Add the new event to the calendar
        // calendar.addEvent(newEvent);
        // console.log(startDate.jsEvent.target, "Hello");
        // $(startDate.jsEvent.target).on("dblclick", () => {
        //   console.log("Double Click");
        // });
      },
      dateClick: function (info) {
        handleDoubleClick(info);
      },
      // eventDidMount: (event) => {
      //   event.el.addEventListener('dblclick', () => {
      //     console.log(event);
      // });
      // },
      // Custom double-click handling
      height: "calc(100vh - 200px)",
      // height: "500px",
      width: "100%",
      initialDate: today, //'2023-01-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: events,
      themeSystem: "lumen",
    });

    calendar.render();
    $("#modal-calendar").fadeIn();

    var lastClickTime = 0;
    function handleDoubleClick(info) {
      var now = new Date().getTime();
      var timeSince = now - lastClickTime;

      if (timeSince < 300 && timeSince > 0) {
        // console.log("Day double-clicked: " + info.dateStr);
        AddEvent(info.dateStr);
      } else {
        console.log("Single Click");
      }

      lastClickTime = now;
    }

    function AddEvent(date) {
      let html = `
      <form>
        <div class="form-group row">
          <label for="events-count" class="col-sm-3 col-form-label"
            >Event Name</label>
          <div class="col-sm-9">
            <input
              type="text"
              id="swal-name-input"
              class="form-control"
              placeholder="Enter Event Name"
              autocomplete="off"
            />
          </div>
        </div>
        <!--<div class="form-group row">
          <label for="events-count" class="col-sm-3 col-form-label"
            >Event Date</label>
          <div class="col-sm-9">
            <input
              type="date"
              class="form-control"
              id="swal-date-input"
              placeholder="Select Date"
              autocomplete="off"
            />
          </div>
          </div>
          -->
      <form>
      `;

      Swal.fire({
        title: "Add Event",
        icon: "info",
        html: html,
        confirmButtonText: "Add",
        timerProgressBar: true,
        didOpen: () => {},
        willClose: (e) => {},
        confirmButtonColor: "#5995fd",
        showCancelButton: false,
        width: "60%",
      }).then((result) => {
        if (result.isConfirmed) {
          let selectedDate = date;
          let enteredName = $("#swal-name-input").val();
          let isEventExisting = false;

          for (let item in data) {
            if (data[item].title == enteredName) {
              isEventExisting = true;
              break;
            }
          }

          if (enteredName == "") {
            iziToast.warning({
              title: "Input is empty",
              message: `Please enter event name`,
              icon: "fa fa-exclamation",
            });
          } else if (isEventExisting) {
            iziToast.warning({
              title: "Event already exist",
              message: `Please try other event name`,
              icon: "fa fa-exclamation",
            });
          } else {
            data[`${GetDate(0)}_${GetDate(2)}`] = {
              start: selectedDate,
              title: enteredName,
            };

            calendar.addEvent({
              title: enteredName,
              start: selectedDate,
            });

            const eventsResult = _ref("events");
            update(eventsResult, data);

            iziToast.success({
              title: "Success",
              message: `Event "${enteredName}" successfully added`,
              icon: "fa fa-check",
            });

            calendar.render();

            // RenderMainCalendar(data, data);
          }
        }
      });

      $(".swal2-html-container").css("overflow", "hidden");
    }
    // $(".fc-daygrid-day-frame").dblclick((e) => {
    //   e.preventDefault();
    //   console.log(e);
    // });
  }

  // Clear Inputs
  $(".btn-clear").on("click", (e) => {
    let p = $(e.target).parent().parent().find(".clear");
    let r = $(e.target);
    // Clear input
    p.val("");
    p.attr("role", "");
    p.attr("staff-id", "");

    if (r.attr("rfidStatus") == "YES") {
      $("#rfid-times-used").val("~");
      $("#rfid-user").val("~");
      RenderCalendar([{}]);
    } else if (r.attr("rfidStatus") == "SELECT") {
      $("#access-previous-role-option").text("");
      $("#access-select")[0].value = "disabled";
    }
  });

  //#region GetDate
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
      default:
        ymd = `${year}-${month}-${day}`;
        break;
    }

    return ymd;
  }
  //#endregion

  const enrollResult = _ref("enroll");
  onValue(enrollResult, (snapshot) => {
    if (snapshot.exists()) {
      let data = snapshot.val();
      let json = [];
      let count = 0;

      for(let item in data){
        count++;
        json.push({
          count: count,
          id: data[item].id,
          name: data[item].name,
          grade: data[item].grade,
        });
      }

      $("#tbl-enrollment-list").DataTable({
        data: json,
        columns: [
          { title: "Count", data: "count" },
          { title: "Student ID", data: "id" },
          { title: "Student Name", data: "name" },
          { title: "Student Grade", data: "grade" },
        ],
        searching: true,
        responsive: true,
        columnDefs: [
          { visible: false,
            targets: [0] }
        ],
        ordering: true,
        order: [[0, 'desc']],
        // processing: false,
        serverSide: false,
        destroy: true,
        info: false,
        language: {
          emptyTable: "No Data to Show",
          infoEmpty: "No entries to show",
        },
      });

      $("#tbl-enrollment-list").css("width", "100%");
    }
  });

});
