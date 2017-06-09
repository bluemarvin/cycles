function toggleFullscreen(element) {
  if (document.fullscreen || document.webkitIsFullScreen) {
    if (document.exitFullscreen) {
console.log("standard EXIT FULLSCREEN");
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
console.log("WebKit EXIT FULLSCREEN");
      document.webkitExitFullscreen();
    } else {
console.log("No EXIT FULLSCREEN FOUND");
    }
  } else if (element) {
    if (element.requestFullscreen) {
console.log("standard FULLSCREEN");
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
console.log("Moz FULLSCREEN");
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
console.log("WebKit FULLSCREEN");
        element.webkitRequestFullScreen();
    } else {
console.log("No FULLSCREEN FOUND");
    }
  }
}
