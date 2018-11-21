(function() {
  if (!window.STOP_CONFETTI) {
    window.STOP_CONFETTI = true;

    var canvas = document.getElementById("confetti-time");
    canvas.style.display = "none";
  } else {
    var canvas = document.getElementById("confetti-time");
    canvas.style.display = "block";

    window.STOP_CONFETTI = false;

    if(typeof window.step !== "undefined") {
      // Start it up again!
      window.step()
    }
  }
}).call(this);
