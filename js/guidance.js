$(document).ready(() => {
  const connectedRef = _ref();
  const onValue = _onValue();
  const get = _get();
  const set = _set();
  const child = _child();
  const onChildAdded = _childAdded();
  const update = _update();
  let isFirstLoad = true;
  let json2 = [];

  const result = _ref("incident");
  onValue(result, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      let json = [];
      let unlisted = [];
      let counter = 0;

      const result = _ref("user");
      get(child(result, "/")).then((snapshot2) => {
        let userData = snapshot2.val();

        for (let item in data) {
          let d = data[item];
          for (let item2 in d) {
            if (
              userData[d[item2].id] != undefined &&
              userData[d[item2].id].role == "student"
            ) {
              counter++;
              json.push({
                count: counter,
                date: item,
                studentName: userData[d[item2].id].name,
                studentID: d[item2].id,
                incident: d[item2].incident,
                reportedBy: d[item2].reportedBy,
              });
            }
          }
        }

        if (isFirstLoad) {
          json2 = json;
        } else {
          for (let item in json) {
            try {
              if (!json2[item].hasOwnProperty("count")) {
              }
            } catch (e) {
              unlisted.push({
                count: json[item].count,
              });
            }
          }
        }

        $("#list-of-students").DataTable({
          data: json,
          columns: [
            { title: "ID", data: "count" },
            { title: "Date", data: "date" },
            { title: "Student Name", data: "studentName" },
            {
              title: "Student ID",
              data: "studentID",
              className: "highlight-id",
            },
            { title: "Incident", data: "incident" },
            { title: "Reported By", data: "reportedBy" },
          ],
          searching: true,
          responsive: true,
          columnDefs: [{ visible: false, targets: [0] }],
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
        });

        if (!isFirstLoad) {
          const table = $("#list-of-students").DataTable(); // Get
          for (let item in unlisted) {
            // $("#list-of-students").find("tr").eq(+unlisted[item].count).css("background", "#edffed");
            let countOfNewLine = (json.length + 2) - unlisted[item].count;
            console.log(countOfNewLine);
            $("#list-of-students").find("tr").eq(countOfNewLine).animate(
              {
                backgroundColor: "#edffed",
              },
              500
            );

            $("#list-of-students").find("tr").eq(countOfNewLine).delay(5000).animate(
              {
                backgroundColor: "#fff",
              },
              1000
            );
            // table.rows().every(function (rowIdx, loopIdx, rowNode) {
            //   const row = table.row(rowIdx);

            //   // Access visible columns using row().data()
            //   // const visibleData = row.data();

            //   // Access data from the hidden column by index
            //   const hiddenColData = table.column(0).data()[rowIdx]; // Assuming index 1 is hidden

            //   // console.log("Hidden column data:", hiddenColData);
            //   // if(hiddenColData == )
            //   // console.log(unlisted[rowIdx].count);

            //   if(unlisted[item].count == hiddenColData){
            //     console.log(hiddenColData);
            //   }
            // });
          }
        }

        $("#total-incident").html(
          "<b>" + counter + " Incidents has been reported</b>"
        );

        counter = 0; // reset counter to 0 to avoid incrementing value
        unlisted = [];
        // console.log("Data", data);
        isFirstLoad = false;
      });
    }
  });

  $("#list-of-students").on("click", "tbody td", (e) => {
    console.log(e);
  });
});
