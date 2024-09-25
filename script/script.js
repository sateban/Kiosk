$(document).ready(() => {
  console.log("script.js");

  var map = L.map("map", {
    drawControl: false,
    minZoom: 1,
    maxZoom: 3,
    center: [0, 0],
    zoom: 4,
    rotate: true,
  });

  // OnLoad, set to zoom out and automatically zoom in after
  map.setZoom(map.getZoom() - 2);

  // var imageUrl = "assets/img/rhs.png"; // Update with your local image path
  var imageUrl = "../assets/img/campus.png"; // Update with your local image path
  // var imageUrl = "assets/img/campus2.png"; // Update with your local image path
  var w = 1920, //1101,
      h = 1080, //851,
      url = imageUrl;

  // const img = new Image();
  //   img.onload = function () {
  //   w = this.width;
  //   h = this.height;
  // };

  // img.src = imageUrl;
  
  // console.log(map.getBounds());

  var southWest = map.unproject([0, h], map.getMaxZoom() - 1);
  var northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
  // var bounds = new L.LatLngBounds(southWest, northEast);

  // Calculate the appropriate bounds for the image overlay
  // var northEast = map.unproject(
  //   map.project(map.getBounds()._northEast).add([0, -map.getSize().y])
  // );
  // var southWest = map.unproject(
  //   map
  //     .project(map.getBounds()._southWest)
  //     .add([map.getSize().x, map.getSize().y])
  // );

  // var imageBounds = [[southWest.lat, southWest.lng], [northEast.lat, northEast.lng]];
  // const image = document.getElementById("localImage");
  // const width = image.width;
  // const height = image.height;
  // console.log("Image size:", width, "x", height);

  // Animation
  var options = {
    draw: {
      circle: false, // Turns off this drawing tool
      rectangle: false,
      marker: false,
      circlemarker: false,
    },
  };

  // var drawControl = new L.Control.Draw(options);
  //   map.addControl(drawControl);

  // var pixelCoordinate = { x: 100, y: 50 }; // Example fixed coordinates

  // // Convert the pixel coordinate to a geographic LatLng object:
  // var latLng = map.containerPointToLatLng(pixelCoordinate);

  // // Example usage:
  // console.log("Latitude:", latLng.lat);
  // console.log("Longitude:", latLng.lng);

  // Calculate the appropriate bounds for the image overlay
  //  var southWest = map.unproject([0, image.height], map.getMaxZoom() - 1);
  // var northEast = map.unproject([image.width, 0], map.getMaxZoom() - 1);
  // let multiplier = 3;
  // var southWest = L.latLng(-latLng.lat, latLng.lng);
  // var northEast = L.latLng(latLng.lat * multiplier, -latLng.lng * multiplier);
  // var southWest = L.latLng(0, 0);
  // var northEast = L.latLng(width * multiplier, height * multiplier);
  // var northEast = L.latLng(width * multiplier, height * multiplier);
  // var southWest = L.latLng(-width, -height);
  // var northEast = L.latLng(height, width);
  var bounds = new L.LatLngBounds(southWest, northEast);
  // var bounds = [[0, 0], [image.height, image.width]];
  console.log(bounds);
  // console.log(southWest, northEast);

  var imageBounds = [
    [-90, -180],
    [90, 500],
  ]; // Coordinates for the entire world

  let imageOverlay = L.imageOverlay(url, bounds).addTo(map);

  var b = [
    [0, 0],
    [h, w],
  ];

  map.fitBounds(bounds);
  // tell leaflet that the map is exactly as big as the image
  // map.fitBounds(bounds);
  // map.setMaxBounds(bounds);
  // map.clearLayers();

  // Add the image overlay
  // L.imageOverlay(imageUrl, imageBounds).addTo(map);

  function DrawRoute(facilityCoordinates, name) {
    let flyDuration = 1;
    map.flyToBounds(bounds, { duration: flyDuration });

    map.eachLayer(function (layer) {
      if (layer instanceof L.Polyline || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
      // console.log("layer", layer);

      if (layer instanceof L.Popup) {
        map.closePopup(layer);
      }
    });

    // Define a set of coordinates for the custom route
    var routeCoordinates = JSON.parse(`[${facilityCoordinates}]`);
    // var routeCoordinates = [
    //   // [80.505, -0.09], // London
    //   // [48.8566, 2.3522], // Paris
    //   // [52.52, 13.405], // Berlin
    //   // [55.6761, 12.5683], // Copenhagen
    //   // Add more coordinates as needed
    //   [79.75618619869906, 180.33442411000644],
    //   [80.68125340950854, 142.1654255532393],
    //   [59.569949963781134, 140.23059152501605],
    //   [59.569949963781134, 86.05523873476587],
    // ];

    // Create a polyline with the route coordinates
    // var polyline = L.polyline(routeCoordinates, {
    //   color: "blue",
    //   weight: 10,
    //   dashArray: "0, 0", // Defines pattern: 5px dash, 10px space
    //   dashOffset: "0",
    // }).addTo(map);

    // Add markers at each point
    let c = 0;
    routeCoordinates.forEach(function (coordinate) {
      if (c == 0 || c == routeCoordinates.length - 1) {
        // var myIcon = L.divIcon({
        //         html: "<i class='fa fa-user fa-2x' aria-hidden='true'></i>",
        //       });
        // // you can set .my-div-icon styles in CSS

        //       L.marker(coordinate, {icon: myIcon}).addTo(map);
        var marker = L.marker(coordinate).addTo(map);
        // marker.addTo(map);
        // marker.remove();

        // marker.bindPopup("Test").openPopup();
      }
      c++;
    });

    var startPopup = L.popup(routeCoordinates[0], {
      content: `<p style="text-align: center">You a here  <i class="fa fa-user fa-lg mb-1"></i></p>`,
      closeOnClick: false,
    })
      .addTo(map)
      .openOn(map);

    var destPopup = L.popup(routeCoordinates[routeCoordinates.length - 1], {
      content: `<p style="text-align: center;">${name}</p>`,
      closeOnClick: false,
    })
      .addTo(map)
      .openOn(map);

    // startPopup.addTo(map).openPopup();
    // destPopup.addTo(map).openPopup();

    // You are here
    // var startPopup = L.popup()
    //   .setLatLng(routeCoordinates[0])
    //   .setContent('<p style="text-align: center">You a here.</p>')
    //   .openOn(map);

    // // Destination
    // var destPopup = L.popup()
    // .setLatLng(routeCoordinates[routeCoordinates.length - 1])
    // .setContent('<p style="text-align: center">Faculty</p>')
    // .openOn(map);

    // Fit the map to the bounds of the route
    var bounds2 = L.latLngBounds(routeCoordinates);
    // map.fitBounds(bounds2);

    // Calculate maximum drag bounds based on image overlay bounds
    var maxBounds = imageOverlay.getBounds();
    console.log({ maxBounds });
    // Set maximum drag bounds for the map
    map.setMaxBounds(maxBounds);
    // L.Rotate.debug(map);

    // map.setMinZoom(3);

    var seqGroup = L.motion
      .seq([
        L.motion
          .polyline(
            routeCoordinates,
            {
              color: "blue",
              weight: 8,
              dashArray: "10, 0",
              dashOffset: "0",
            },
            {
              easing: L.Motion.Ease.easeInOutQuad,
            },
            {
              removeOnEnd: true,
              icon: L.divIcon({
                html: "<img class='user-icon' src='../assets/img/user.png'>",
                className: "",
                iconSize: L.point(27.5, 24),
              }),
              // icon: L.divIcon({html: "<i class='fa fa-user fa-2x' aria-hidden='true'></i>", iconSize: L.point(27.5, 24)})
            }
          )
          .motionDuration(5000),
      ])
      .addTo(map);

    // var rhoInput = document.getElementById('rho_input');
    // rhoInput.addEventListener('change', );

    $("#rho_input").on("input", (e) => {
      // console.log(e);
      console.log(L.Rotate.rotate.bind(e));
    });

    // Add rotation after ending
    seqGroup.on("motion-ended", (e) => {
      // var outerPolyline = L.polyline(routeCoordinates, {
      //   color: "white",
      //   weight: 11,
      // }).addTo(map);
      // L.polyline(
      //   routeCoordinates,
      //   {
      //     color: "white",
      //     weight: 10,
      //     dashArray: "10, 0",
      //     dashOffset: "0",
      //   },
      //   {
      //     renderer: L.canvas(),
      //   }
      // ).addTo(map);
    });
    // L.geoJson(routeCoordinates, { style: polystyle }).addTo(map);

    setTimeout(function () {
      console.count();
      // map.fitBounds(bounds);
      map.flyToBounds(bounds2, { duration: 2 });

      setTimeout(function () {
        seqGroup.motionStart();
        // seqGroup.motionStop();
      }, 2000);
    }, 500 + flyDuration * 1000);
  }

  // Add click event listener to the map
  map.on("click", onMapClick);
  function onMapClick(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    console.log("[", lat, ",", lng, "],");

    // You can further process the coordinates here:
    // - Display them in a popup on the map
    // - Store them in a variable or array
    // - Send them to a server using AJAX
  }

  // Populate Accordion
  GetListOfFacilities();

  window.ProcessListofFacilities = (data) => {
    // console.log("ProcessListofFacilities",data)
    let dataObject = Object.keys(data);
    let accordion = "";

    for (let i = 0; i < dataObject.length; i++) {
      // console.log(dataObject[i]);
      let facilityName = dataObject[i].replaceAll(" ", "");

      accordion += `
        <div class="accordion-item" style="">
        <h2 class="accordion-header" id="panelsStayOpen-${facilityName}">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapse${facilityName}"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapse${facilityName}">
            ${dataObject[i]}
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapse${facilityName}"
            class="accordion-collapse collapse ${i == 1 ? "show" : ""}"
            aria-labelledby="panelsStayOpen-${facilityName}"
            data-bs-parent="#accordion1">
          <div class="accordion-body">`;

      for (let y = 0; y < data[dataObject[i]].length; y++) {
        let facilitySubRooms = data[dataObject[i]][y].floor;
        let path = data[dataObject[i]][y].path;
        accordion += `<div class="facility" value="${path}">${facilitySubRooms}</div>`;
        // console.log(data[dataObject[i]][y]);
      }

      // accordion +=   `
      //   <p><button>Room 101</button></p>`;

      accordion += `
              </div>
            </div>
          </div>`;
    }

    $("#loading").animate({ height: "-=200px" }, "slow").fadeOut(500);
    $("#accordion1").html(accordion); //.fadeIn(1000);
    // $("#loading").fadeOut(500);
    $("#accordion1").fadeIn(500, "swing");
  };

  $("#accordion1").on("click", ".accordion-body div", (e) => {
    let coordinates = $(e.target).attr("value");
    console.log($(e.target).attr("value"));

    let name = $(e.target).text();

    if (coordinates.length > 10) {
      DrawRoute(coordinates, name);
    } else {
      throw new Error("Incorrect fetched coordinate");
    }
    // console.log();
  });
});
