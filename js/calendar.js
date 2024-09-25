$(document).ready(() => {
  const connectedRef = _ref();
  const onValue = _onValue();
  const get = _get();
  const set = _set();
  const child = _child();
  const onChildAdded = _childAdded();
  const update = _update();

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

      let calendarEl = document.getElementById("calendar");
      let today = new Date();
      let clickCnt = 0;
    
      let calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,
        headerToolbar: {
          left: "prevYear,prev,next,nextYear today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        },
        select: function (startDate, endDate, jsEvent, view) {},
        dateClick: function (info) {
        },
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
    }
  });


});
