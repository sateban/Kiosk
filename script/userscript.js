$(document).ready(() => {
  console.log("userscript.js");
  var panorama, viewer, container, infospot, infospot2;

  container = document.querySelector('#container');

  // panorama = new PANOLENS.ImagePanorama('/assets/img/cavite.jpg');
  panorama = new PANOLENS.ImagePanorama('../assets/img/snow.jpeg');


  infospot = new PANOLENS.Infospot();
  infospot.position.set( 1000, 100, -2000 );
  infospot.addHoverText( 'Test' );

  infospot2 = new PANOLENS.Infospot();
  infospot2.position.set( 5000, 100, 2000 );
  infospot2.addHoverText( 'Tes2zt' );

  panorama.add(infospot , infospot2);

  viewer = new PANOLENS.Viewer({
    container: container
  });
  viewer.add(panorama);
});
