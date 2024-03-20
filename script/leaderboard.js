$(document).ready(() => {
  $("#tbl-leaderboard").DataTable({
    searching: false,
    paging: false,
    responsive: true,
    ordering: false,
    // processing: false,
    // serverSide: false,
    rowReorder: {
      selector: "td:nth-child(2)",
    },
    // columnDefs: [
    //   { width: "10%", targets: 0 },
    //   { width: "auto", targets: 0 },
    //   { width: "auto", targets: 0 },
    // ],
    destroy: false,
    info: false,
    language: {
      emptyTable: "Loading...",
      infoEmpty: "No entries to show",
    },
  });

  leaderboardMode("spelling");
});

$("#lbl-speech, #lbl-spelling").on("click", (event) => {
  var name = $(event.currentTarget).attr("name");
  console.log(name);
  leaderboardMode(name);
});

// function convertToFormalTime(date) {
//   let timestamp = date; // Assuming it's in milliseconds

//   // Create a new Date object
//   let date = new Date(timestamp);

//   // Extract the components of the date
//   let year = date.getFullYear();
//   let month = String(date.getMonth() + 1).padStart(2, "0");
//   let day = String(date.getDate()).padStart(2, "0");
//   let hours = String(date.getHours()).padStart(2, "0");
//   let minutes = String(date.getMinutes()).padStart(2, "0");
//   let seconds = String(date.getSeconds()).padStart(2, "0");

//   // Form the formal date string
//   let formalDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//   return formalDate;
// }
