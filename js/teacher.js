$(document).ready(() => {
  const connectedRef = _ref();
  const onValue = _onValue();
  const get = _get();
  const set = _set();
  const child = _child();
  const onChildAdded = _childAdded();
  const update = _update();

  const result = _ref("incident");
  onValue(result, (snapshot) => {
    const data = snapshot.val();

    console.log("Data");
  });

  $(".admin-accordion").on("click", (event) => {
    event.preventDefault();
    // console.log($(event.target).attr("value"));
    // console.log();
    $("#" + $(event.target).attr("value")).modal("show");
    $("#" + $(event.target).attr("value"))
      .find(".modal-title")
      .text("Student " + $(event.target).text().trim());

    if ($(event.target).attr("value") == "violation-list") {
      // $("#tbl-violation-list").DataTable({
      //   searching: true,
      //   responsive: true,
      //   // columnDefs: [
      //   //   { visible: false,
      //   //     targets: [0] }
      //   // ],
      //   ordering: true,
      //   // processing: false,
      //   serverSide: false,
      //   destroy: true,
      //   info: false,
      //   language: {
      //     emptyTable: "Loading Entries",
      //     infoEmpty: "No entries to show",
      //   },
      // });
    }
  });

  const incidentResult = _ref("incident");
  let isFirstLoad = true;
  let onLoadCount = 0;

  onValue(incidentResult, (snapshot) => {
    if (snapshot.exists()) {
      let data = snapshot.val();
      let json = [];
      let newReport = [];
      let currentLoadCount = 0;

      const result = _ref("user");
      get(child(result, "/")).then((snapshot2) => {
        let userData = snapshot2.val();
        let counter = 0;
        // console.log(data);

        for (let item in data) {
          let item2 = data[item];
          for (let d in item2) {
            if (userData[item2[d].id] != undefined) {
              let isCleared =
                item2[d].isCleared != undefined ? item2[d].isCleared : "No";
              let path = `${item}/${d}/`;
              // console.log(`${item}/${d}/${item2[d].id}`);

              json.push({
                id: counter,
                name:
                  userData[item2[d].id].name + ` (${userData[item2[d].id].id})`,
                rfid: item2[d].id,
                violations: item2[d].incident,
                dateReported: item,
                reportedBy: item2[d].reportedBy,
                isCleared: isCleared,
                path: path,
              });
              counter++;

              // Read count on first load only
              if (isFirstLoad) {
                onLoadCount++;
              } else {
                currentLoadCount++;
              }
            }
          }
        }

        // A new data has been added
        if (!isFirstLoad && currentLoadCount != onLoadCount) {
          let lastDataAdded = Object.values(json)[json.length - 1];

          // console.log(isFirstLoad);
          iziToast.success({
            title: "New Incident Recorded",
            message: `Violator: <b>${lastDataAdded.name}</b><br>Violation: <b>${lastDataAdded.violations}</b><br>ReportedBy: <b>${lastDataAdded.reportedBy}</b>`,
            icon: "fa fa-check",
            timeout: 10000,
            onOpening: function (instance, toast) {
              toast.addEventListener("click", function () {
                $("#violation-list").modal("show");
                TableSearch(lastDataAdded.name);
              });
            },
          });
        }

        $("#tbl-violation-list").DataTable({
          data: json,
          columns: [
            { data: "id" },
            { data: "name" },
            { data: "violations" },
            { data: "dateReported" },
            { data: "reportedBy" },
            // { data: "isCleared" },
            {
              data: "isCleared",
              render: function (data, type, row) {
                // Render a checkbox based on the value of 'isCleared'
                if (type === "display") {
                  return (
                    '<input type="checkbox" class="custom-checkbox ' +
                    (data != "No"
                      ? "custom-checkbox-clear"
                      : "custom-checkbox-unclear") +
                    '" ' +
                    (data != "No" ? "checked" : "") +
                    `>`
                    // + "<div style='display: block'>" + (data != "No" ? 'Cleared' : 'Uncleared') + "</div>"
                  );
                }
                return data;
              },
            },
          ],

          searching: true,
          responsive: true,
          // columnDefs: [
          //   { visible: false,
          //     targets: [0] }
          // ],
          ordering: true,
          order: [[0, "desc"]],
          // processing: false,
          serverSide: false,
          destroy: true,
          info: false,
          language: {
            emptyTable: "No Violations to Show",
            infoEmpty: "No entries to show",
          },
          createdRow: function (row, data, dataIndex) {
            // Apply background color to specific cell based on a condition
            if (data.isCleared != "No") {
              // $('td', row).eq(5).css('background-color', '#d2ffd2');
              $("td", row).css("background-color", "#d2ffd2");
            } else {
              $("td", row).css("background-color", "#ffa3a5");
              $("td", row).css("color", "white");
            }

            $("td", row).eq(5).find("input").attr("path", data.path);
          },
        });
        isFirstLoad = false;
      });
    }
  });

  $("#tbl-violation-list tbody").on("dblclick", "tr", function (e) {
    // let table =  $("#tbl-violation-list").DataTable();
    let name = $(e.target).parent().find("td").eq(1).text();
    TableSearch(name);
    // table.search(name).draw();
  });

  $("#tbl-violation-list tbody").on("click", ".custom-checkbox", function (e) {
    console.log($(e.target).prop("checked"));
    let isChecked = $(e.target).prop("checked");
    let path = $(e.target).attr("path");

    Swal.fire({
      title: "Modify Violation Status",
      html: "Are you sure you want to change status?",
      icon: "info",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // const userResult = _ref2("user");
        const userUpdates = {};
        userUpdates[path + "isCleared"] = isChecked ? "Yes" : "No";
        console.log(userUpdates);

        update(incidentResult, userUpdates);

        iziToast.success({
          title: "Successfully Modified",
          // message: `Please choose from the selection`,
          icon: "fa fa-check",
        });
      } else {
        $(e.target).prop("checked", !isChecked);
      }
    });
  });

  function TableSearch(name) {
    let table = $("#tbl-violation-list").DataTable();
    table.search(name).draw();
  }

  // Input Auto-Suggest
  const userResult = _ref("user");
  onValue(userResult, (snapshot) => {
    // const data = snapshot.val();
    // console.log(snapshot.val());

    // if (data) {
    // const result = _ref("user");
    // get(child(result, "/")).then((snapshot) => {
    // if (snapshot.exists()) {
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
      mname = mname != undefined ? mname.toUpperCase() + "." : "";
      let lname = data[data2[i]].lname;
      let id = data[data2[i]].id;
      let role = data[data2[i]].role;
      let year = data[data2[i]].year;
      let fullname = `${lname}, ${fname} ${mname}`;
      let fullnameID = `${lname}, ${fname} ${mname} • ${role.toUpperCase()}`;

      if (role != "student") {
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
      } else if (role == "student") {
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

    $("#inputModify").autocomplete({
      source: facilitiesStudentArray,
      select: (event, ui) => {
        event.preventDefault();
        const selectedID = ui.item.id;
        const selectedRole = ui.item.role;
        const selectedName = ui.item.value;

        $("#inputModify").val(selectedName);
        $("#inputModify").attr("role", selectedRole);
        $("#inputModify").attr("student-id", selectedID);

        const result = _ref("incident");
        get(child(result, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let s = "";
            let json = [];

            for (let item in data) {
              let item2 = data[item];
              for (let d in item2) {
                if (item2[d].id == selectedID) {
                  console.log(item2[d], selectedID);
                  json.push({
                    name: selectedName,
                    violations: item2[d].incident,
                    dateReported: item,
                    reportedBy: item2[d].reportedBy,
                  });

                  // s += `<tr>`;
                  // s += `<th>${selectedName}</th>`;
                  // s += `<th>${item2[d].incident}</th>`;
                  // s += `<th>${item}</th>`;
                  // s += `<th>${item2[d].reportedBy}</th>`;
                  // s += `</tr>`;
                }
              }
            }
            // console.log(s);
            // $("#document-tbody").html(s);

            // if ($.fn.DataTable.isDataTable("#tbl-student-violation")) {
            //   $('#tbl-student-violation').DataTable().clear().destroy();
            // }

            $("#tbl-student-violation").DataTable({
              data: json,
              columns: [
                { data: "name" },
                { data: "violations" },
                { data: "dateReported" },
                { data: "reportedBy" },
              ],
              searching: true,
              responsive: true,
              // columnDefs: [
              //   { visible: false,
              //     targets: [0] }
              // ],
              ordering: true,
              // processing: false,
              serverSide: false,
              destroy: true,
              info: false,
              language: {
                emptyTable: "No Violations to Show",
                infoEmpty: "No entries to show",
              },
            });
          }
        });
      },
      search: function (event, ui) {
        console.log("Test");
      },
    });

    $("#inputAttendance").autocomplete({
      source: facilitiesStudentArray,
      select: (event, ui) => {
        event.preventDefault();
        const selectedID = ui.item.id;
        const selectedRole = ui.item.role;
        const selectedName = ui.item.value;
        let json = [];

        $("#inputAttendance").val(selectedName);
        $("#inputAttendance").attr("role", selectedRole);
        $("#inputAttendance").attr("student-id", selectedID);

        json.push({
          // name: selectedName,
          status: "Add new attendance",
          date: "~",
          remarks: "~",
          // reportedBy: item2[d].reportedBy,
        });

        // const result = _ref("incident");
        const result = _ref("attendance");

        get(child(result, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let s = "";
            // console.log(data);

            for (let item in data) {
              let item2 = data[item];
              for (let d in item2) {
                console.log(item2[d].id, selectedID);
                if (item2[d].id == selectedID) {
                  // console.log(item2[d], selectedID);
                  json.push({
                    // name: selectedName,
                    status: item2[d].status,
                    date: `${item2[d].date} ${item2[d].time}`,
                    remarks: item2[d].remarks,
                    // reportedBy: item2[d].reportedBy,
                  });

                  // s += `<tr>`;
                  // s += `<th>${selectedName}</th>`;
                  // s += `<th>${item2[d].incident}</th>`;
                  // s += `<th>${item}</th>`;
                  // s += `<th>${item2[d].reportedBy}</th>`;
                  // s += `</tr>`;
                }
              }
            }

            console.log(json);

            $("#tbl-student-attendance").DataTable({
              data: json,
              columns: [
                { data: "status" },
                { data: "date" },
                { data: "remarks" },
              ],
              searching: true,
              responsive: true,
              // columnDefs: [
              //   { visible: false,
              //     targets: [0] }
              // ],
              ordering: true,
              order: [[1, "desc"]],
              // processing: false,
              serverSide: false,
              destroy: true,
              info: false,
              language: {
                emptyTable: "No Entries to Show",
                infoEmpty: "No Entries to show",
              },
              createdRow: function (row, data, dataIndex) {
                // Combine columns into one with colspan
                // var combinedData = data.status + " on " + data.date + " with remarks: " + data.remarks;
                if (data.status == "Add new attendance") {
                  $("td", row).css("background-color", "#d8d8d8");
                  $("td", row).css("cursor", "pointer");
                  $("td", row).attr(
                    "title",
                    "Double click to add new Attendance"
                  );
                  // $('td', row).css('background-color', '#d2ffd2');
                  // console.log(row);
                  // $('td:eq(0)', row).attr('colspan', 3).html(combinedData);
                  // Remove extra cells
                  // $('td:gt(0)', row).remove();
                } else if (data.status == "Excused") {
                  $("td", row).css("background-color", "#fffabe");
                } else if (data.status == "Present") {
                  $("td", row).css("background-color", "#beffd2");
                } else if (data.status == "Absent") {
                  $("td", row).css("background-color", "#ffbebe");
                }
              },
            });
          } else {
            console.log("NO Snap");
            $("#tbl-student-attendance").DataTable({
              data: json,
              columns: [
                { data: "status" },
                { data: "date" },
                { data: "remarks" },
              ],
              searching: true,
              responsive: true,
              // columnDefs: [
              //   { visible: false,
              //     targets: [0] }
              // ],
              ordering: true,
              order: [[1, "desc"]],
              // processing: false,
              serverSide: false,
              destroy: true,
              info: false,
              language: {
                emptyTable: "No Entries to Show",
                infoEmpty: "No Entries to show",
              },
              createdRow: function (row, data, dataIndex) {
                // Combine columns into one with colspan
                // var combinedData = data.status + " on " + data.date + " with remarks: " + data.remarks;
                if (data.status == "Add new attendance") {
                  $("td", row).css("background-color", "#d8d8d8");
                  $("td", row).css("cursor", "pointer");
                  $("td", row).attr(
                    "title",
                    "Double click to add new Attendance"
                  );
                  // $('td', row).css('background-color', '#d2ffd2');
                  // console.log(row);
                  // $('td:eq(0)', row).attr('colspan', 3).html(combinedData);
                  // Remove extra cells
                  // $('td:gt(0)', row).remove();
                } else if (data.status == "Excused") {
                  $("td", row).css("background-color", "#fffabe");
                } else if (data.status == "Present") {
                  $("td", row).css("background-color", "#beffd2");
                } else if (data.status == "Absent") {
                  $("td", row).css("background-color", "#ffbebe");
                }
              },
            });
          }
        });
      },
      search: function (event, ui) {
        // console.log("Test");
      },
    });

    $("#inputGrade").autocomplete({
      source: facilitiesStudentArray,
      select: (event, ui) => {
        event.preventDefault();
        const selectedID = ui.item.id;
        const selectedRole = ui.item.role;
        const selectedName = ui.item.value;
        let json = [];

        $("#inputGrade").val(selectedName);
        $("#inputGrade").attr("role", selectedRole);
        $("#inputGrade").attr("student-id", selectedID);

        json.push({
          // name: selectedName,
          grade: "Add Grade",
          schoolyear: "~",
          // remarks: "~",
          // reportedBy: item2[d].reportedBy,
        });

        // const result = _ref("incident");
        const result = _ref("grade");

        get(child(result, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let s = "";
            let teacher = sessionStorage.getItem("id");

            for (let item in data) {
              let item2 = data[item];
              for (let d in item2) {
                let data2 = item2[d][Object.keys(item2[d])[0]];
                console.log(data2, selectedID);
                if (data2.id == selectedID && teacher == d) {
                  // console.log(item2[d], selectedID);
                  json.push({
                    // name: selectedName,
                    grade: data2.grade,
                    schoolyear: data2.academicYear,
                    // reportedBy: item2[d].reportedBy,
                  });
                }
              }
            }

            console.log(json);

            $("#tbl-student-grade").DataTable({
              data: json,
              columns: [
                { data: "grade" },
                { data: "schoolyear" },
                // { data: "remarks" },
              ],
              searching: true,
              responsive: true,
              // columnDefs: [
              //   { visible: false,
              //     targets: [0] }
              // ],
              ordering: true,
              order: [[1, "desc"]],
              // processing: false,
              serverSide: false,
              destroy: true,
              info: false,
              language: {
                emptyTable: "No Entries to Show",
                infoEmpty: "No Entries to show",
              },
              createdRow: function (row, data, dataIndex) {
                // Combine columns into one with colspan
                // var combinedData = data.status + " on " + data.date + " with remarks: " + data.remarks;
                if (data.status == "Add Grade") {
                  $("td", row).css("background-color", "#d8d8d8");
                  $("td", row).css("cursor", "pointer");
                  $("td", row).attr(
                    "title",
                    "Double click to add new Attendance"
                  );
                  // $('td', row).css('background-color', '#d2ffd2');
                  // console.log(row);
                  // $('td:eq(0)', row).attr('colspan', 3).html(combinedData);
                  // Remove extra cells
                  // $('td:gt(0)', row).remove();
                }
              },
            });
          }
        });
      },
      search: function (event, ui) {
        // console.log("Test");
      },
    });

    $("#inputDoc").autocomplete({
      source: facilitiesStudentArray,
      select: (event, ui) => {
        event.preventDefault();
        const selectedID = ui.item.id;
        const selectedRole = ui.item.role;
        const selectedName = ui.item.value;

        $("#inputDoc").val(selectedName);
        $("#inputDoc").attr("role", selectedRole);
        $("#inputDoc").attr("student-id", selectedID);

        const result = _ref("doc");
        get(child(result, "/")).then((snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let json = [];

            for (let item in data) {
              if (data[item].id == selectedID) {
                let request = data[item].request.split(";");
                for (let item2 in request) {
                  if (request[item2] != "") {
                    let term = request[item2];
                    json.push({
                      document: term.toUpperCase(),
                    });
                  }
                }
              }
            }

            let uniqueValues = [];
            $.each(json, function (index, item) {
              if ($.inArray(item["document"], uniqueValues) === -1) {
                uniqueValues.push(item["document"]);
              }
            });

            json = uniqueValues.map(function (item) {
              return { document: item };
            });

            // console.log(json, uniqueValues);

            // $("#document-tbody").html(s);

            // if ($.fn.DataTable.isDataTable("#tbl-student-violation")) {
            //   $('#tbl-student-violation').DataTable().clear().destroy();
            // }

            $("#tbl-student-document").DataTable({
              data: json,
              columns: [{ data: "document" }],
              searching: true,
              responsive: true,
              // columnDefs: [
              //   { visible: false,
              //     targets: [0] }
              // ],
              ordering: true,
              // processing: false,
              serverSide: false,
              destroy: true,
              info: false,
              language: {
                emptyTable: "No Documents to Show",
                infoEmpty: "No entries to show",
              },
            });
          }
        });
      },
      search: function (event, ui) {
        console.log("Test");
      },
    });
    //   }
    // });
    // }
  });

  const aResult = _ref("attendance");
  onValue(aResult, (snapshot) => {
    if (snapshot.exists()) {
      let data = snapshot.val();
      // Input Auto-Suggest
      const userResult = _ref("user");
      onValue(userResult, (snapshot) => {
        // const data = snapshot.val();
        // console.log(snapshot.val());

        // if (data) {
        // const result = _ref("user");
        // get(child(result, "/")).then((snapshot) => {
        // if (snapshot.exists()) {
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
          mname = mname != undefined ? mname.toUpperCase() + "." : "";
          let lname = data[data2[i]].lname;
          let id = data[data2[i]].id;
          let role = data[data2[i]].role;
          let year = data[data2[i]].year;
          let fullname = `${lname}, ${fname} ${mname}`;
          let fullnameID = `${lname}, ${fname} ${mname} • ${role.toUpperCase()}`;

          if (role != "student") {
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
          } else if (role == "student") {
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

        console.log("Snap2", facilitiesStudentArray);

        $("#inputAttendance").autocomplete({
          source: facilitiesStudentArray,
          select: (event, ui) => {
            event.preventDefault();
            const selectedID = ui.item.id;
            const selectedRole = ui.item.role;
            const selectedName = ui.item.value;
            let json = [];

            $("#inputAttendance").val(selectedName);
            $("#inputAttendance").attr("role", selectedRole);
            $("#inputAttendance").attr("student-id", selectedID);

            json.push({
              // name: selectedName,
              status: "Add new attendance",
              date: "~",
              remarks: "~",
              // reportedBy: item2[d].reportedBy,
            });

            // const result = _ref("incident");
            const result = _ref("attendance");

            get(child(result, "/")).then((snapshot) => {
              if (snapshot.exists()) {
                let data = snapshot.val();
                let s = "";
                console.log(data);

                for (let item in data) {
                  let item2 = data[item];
                  for (let d in item2) {
                    // let item3 = item2[d][Object.keys(item2[d])[0]];
                    // console.log(item3, selectedID);
                    for (let item3 in item2[d]) {
                      // console.log(item2[d][item3]);
                      let dataItem = item2[d][item3];

                      if (dataItem.id == selectedID) {
                        // console.log(item2[d], selectedID);
                        json.push({
                          // name: selectedName,
                          status: dataItem.status,
                          date: `${dataItem.date} ${dataItem.time}`,
                          remarks: dataItem.remarks,
                          // reportedBy: item2[d].reportedBy,
                        });

                        // s += `<tr>`;
                        // s += `<th>${selectedName}</th>`;
                        // s += `<th>${item2[d].incident}</th>`;
                        // s += `<th>${item}</th>`;
                        // s += `<th>${item2[d].reportedBy}</th>`;
                        // s += `</tr>`;
                      }
                    }
                  }
                }

                console.log(json);

                $("#tbl-student-attendance").DataTable({
                  data: json,
                  columns: [
                    { data: "status" },
                    { data: "date" },
                    { data: "remarks" },
                  ],
                  searching: true,
                  responsive: true,
                  // columnDefs: [
                  //   { visible: false,
                  //     targets: [0] }
                  // ],
                  ordering: true,
                  autoWidth: false,
                  order: [[1, "desc"]],
                  // processing: false,
                  serverSide: false,
                  destroy: true,
                  info: false,
                  language: {
                    emptyTable: "No Entries to Show",
                    infoEmpty: "No Entries to show",
                  },
                  createdRow: function (row, data, dataIndex) {
                    // Combine columns into one with colspan
                    // var combinedData = data.status + " on " + data.date + " with remarks: " + data.remarks;
                    if (data.status == "Add new attendance") {
                      $("td", row).css("background-color", "#d8d8d8");
                      $("td", row).css("cursor", "pointer");
                      $("td", row).attr(
                        "title",
                        "Double click to add new Attendance"
                      );
                      // $('td', row).css('background-color', '#d2ffd2');
                      // console.log(row);
                      // $('td:eq(0)', row).attr('colspan', 3).html(combinedData);
                      // Remove extra cells
                      // $('td:gt(0)', row).remove();
                    } else if (data.status == "Excused") {
                      $("td", row).css("background-color", "#fffabe");
                    } else if (data.status == "Present") {
                      $("td", row).css("background-color", "#beffd2");
                    } else if (data.status == "Absent") {
                      $("td", row).css("background-color", "#ffbebe");
                    }
                  },
                });
              } else {
                console.log("NO Snap");
                $("#tbl-student-attendance").DataTable({
                  data: json,
                  columns: [
                    { data: "status" },
                    { data: "date" },
                    { data: "remarks" },
                  ],
                  searching: true,
                  responsive: true,
                  // columnDefs: [
                  //   { visible: false,
                  //     targets: [0] }
                  // ],
                  ordering: true,
                  order: [[1, "desc"]],
                  // processing: false,
                  serverSide: false,
                  destroy: true,
                  info: false,
                  language: {
                    emptyTable: "No Entries to Show",
                    infoEmpty: "No Entries to show",
                  },
                  createdRow: function (row, data, dataIndex) {
                    // Combine columns into one with colspan
                    // var combinedData = data.status + " on " + data.date + " with remarks: " + data.remarks;
                    if (data.status == "Add new attendance") {
                      $("td", row).css("background-color", "#d8d8d8");
                      $("td", row).css("cursor", "pointer");
                      $("td", row).attr(
                        "title",
                        "Double click to add new Attendance"
                      );
                      // $('td', row).css('background-color', '#d2ffd2');
                      // console.log(row);
                      // $('td:eq(0)', row).attr('colspan', 3).html(combinedData);
                      // Remove extra cells
                      // $('td:gt(0)', row).remove();
                    } else if (data.status == "Excused") {
                      $("td", row).css("background-color", "#fffabe");
                    } else if (data.status == "Present") {
                      $("td", row).css("background-color", "#beffd2");
                    } else if (data.status == "Absent") {
                      $("td", row).css("background-color", "#ffbebe");
                    }
                  },
                });
              }
            });
          },
          search: function (event, ui) {
            // console.log("Test");
          },
        });
      });
    }
  });

  $("#attendance-tbody").on("dblclick", "tr", (e) => {
    let data = $(e.target);
    let text = data.eq(0).text();
    let html = "";

    html = `<div style="width:100%">
              <input id="swal-attendance-date" type="date" />
              <input id="swal-attendance-time" type="time" />
              <br/>
              <br/>
              <div class="group">
                <input id="Radio1" name="Radios" type="radio" value="Present" checked="checked">
                <label class="first" for="Radio1">Present</label>
                <input id="Radio2" name="Radios" type="radio" value="Absent" >
                <label for="Radio2">Absent</label>
                <input id="Radio3" name="Radios" type="radio" value="Excused" >
                <label for="Radio3">Excused</label>
              </div>
              <br/>
              <textarea id="swal-attendance-remarks" style="width: 50%; margin-top: 20px; border: solid 2px #c1c1c1; padding: 10px;" placeholder="Remarks"></textarea>
            </div>`;

    // console.log(text);
    if (text == "Add new attendance") {
      Swal.fire({
        title: "Add attendance",
        html: html,
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Add",
        showCancelButton: true,
        width: "50%",
      }).then((result) => {
        if (result.isConfirmed) {
          let inputDate = $("#swal-attendance-date").val();
          let status = $("input[name='Radios']:checked").val();
          let inputTime = $("#swal-attendance-time").val();
          let inputRemarks = $("#swal-attendance-remarks").val();
          let teacher = sessionStorage.getItem("id");
          let studentID = $("#inputAttendance").attr("student-id");

          const result = _ref("attendance");
          const userUpdates = {};
          userUpdates[teacher + "/" + studentID + "/" + inputDate + "/status"] =
            status;
          userUpdates[teacher + "/" + studentID + "/" + inputDate + "/id"] =
            studentID;
          userUpdates[teacher + "/" + studentID + "/" + inputDate + "/date"] =
            inputDate;
          userUpdates[teacher + "/" + studentID + "/" + inputDate + "/time"] =
            inputTime;
          userUpdates[
            teacher + "/" + studentID + "/" + inputDate + "/remarks"
          ] = inputRemarks;
          console.log(userUpdates);
          update(result, userUpdates);
        } else {
          // $(e.target).prop("checked", !isChecked);
        }
      });

      $("#swal-attendance-date").val(GetDateGlobal(4));
      $("#swal-attendance-time").val(GetCurrentMilitaryTime());
    }
  });

  $("#grade-tbody").on("dblclick", "tr", (e) => {
    let data = $(e.target);
    let text = data.eq(0).text();
    let html = "";

    html = `<div style="width:100%; height: 100%" >
              <br/>
              <br/>
              <div class="group">
                <input id="Radio4" class="radio-grades" name="Radios" type="radio" value="2022-2023">
                <label class="first" for="Radio4">2022-2023</label>
                <input id="Radio5" class="radio-grades" name="Radios" type="radio" value="2023-2024" checked="checked">
                <label for="Radio5">2023-2024</label>
                <input id="Radio6" class="radio-grades" name="Radios" type="radio" value="2024-2025" >
                <label for="Radio6">2024-2025</label>
              </div>
              <br/>
              <hr style="margin: auto; width: 50%"/>
              <br/>

              <label for="input-grade">Input Student's Grade</label>
              <input type="number" id="input-grade" class="form-control" step="0.05" style="width: 25%; text-align: center; margin: auto; border: solid 1px gray;" placeholder="Grade" max="100">
              <br/>
              
            </div>`;

    if (text == "Add Grade") {
      Swal.fire({
        title: "Add Grade",
        html: html,
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Add",
        showCancelButton: true,
        width: "50%",
        height: "100%",
        heightAuto: false,
      }).then((result) => {
        if (result.isConfirmed) {
          let inputDate = GetDateGlobal(4);
          let grade = $("#input-grade").val();
          let academicYear = $("input[name='Radios']:checked").val();
          let teacher = sessionStorage.getItem("id");
          let studentID = $("#inputGrade").attr("student-id");

          const result = _ref("grade");
          const userUpdates = {};
          userUpdates[
            academicYear + "/" + teacher + "/" + studentID + "/academicYear"
          ] = academicYear;
          userUpdates[academicYear + "/" + teacher + "/" + studentID + "/id"] =
            studentID;
          userUpdates[
            academicYear + "/" + teacher + "/" + studentID + "/date"
          ] = inputDate;
          userUpdates[
            academicYear + "/" + teacher + "/" + studentID + "/grade"
          ] = grade;
          console.log(userUpdates);
          update(result, userUpdates);
        } else {
          // $(e.target).prop("checked", !isChecked);
        }
      });

      $("#swal-attendance-date").val(GetDateGlobal(4));
      $("#swal-attendance-time").val(GetCurrentMilitaryTime());
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

  // Clear Inputs
  $(".btn-clear").on("click", (e) => {
    let p = $(e.target).parent().parent().find(".clear");
    let r = $(e.target);
    // Clear input
    p.val("");
    p.attr("role", "");
    p.attr("staff-id", "");

    if (r.attr("rfidStatus") == "TABLE") {
      let table = $("#tbl-student-violation").DataTable();
      let table2 = $("#tbl-student-attendance").DataTable();
      let table3 = $("#tbl-student-grade").DataTable();
      table.clear().draw();
      table2.clear().draw();
      table3.clear().draw();
    } else if (r.attr("rfidStatus") == "TABLE2") {
      let table = $("#tbl-student-document").DataTable();
      table.clear().draw();
    } else if (r.attr("rfidStatus") == "SELECT") {
      $("#access-previous-role-option").text("");
      $("#access-select")[0].value = "disabled";
    }
  });
});
