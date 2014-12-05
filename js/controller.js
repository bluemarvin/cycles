var getAxis;
var getButton;
var pollController;


(function () {

var gamepads = {};

function gamepadHandler(event, connecting) {
  var gamepad = event.gamepad;

  if (connecting) {
console.log("Adding controller");
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
console.log("Removing controller");
  }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

var axes = [];
var button = [];

var ACode = 65
  , DCode = 68
  , WCode = 87
  , SCode = 83
  , LeftArrow = 37
  , RightArrow = 39
  , UpArrow = 38
  , DownArrow = 40
  , ks = [0,0,0,0,0,0,0,0]
  , akey = 0
  , dkey = 1
  , wkey = 2
  , skey = 3
  , leftkey = 4
  , rightkey = 5
  , upkey = 6
  , downkey = 7
  ;

function clamp(value) {
  var result = value;
  if (result > 1) {
    result = 1;
  }
  else if (result < -1) {
    result = -1;
  }

  result = result * result * (result >= 0 ? 1 : -1);

  if ((result < 0.05) && (result > -0.05)) {
    result = 0;
  }

  return result;
}

pollController = function () {
  axes = [];
  axes[0] = 0;
  axes[1] = ks[akey] + ks[dkey];
  axes[2] = ks[wkey] + ks[skey];
  axes[3] = ks[leftkey] + ks[rightkey];
  axes[4] = -(ks[upkey] + ks[downkey]);

  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

  for (var pad = 0; pad < gamepads.length; pad++) {
    var gp = gamepads[pad];
    if (gp) {
      var str = "a:"
      for (var which = 0; which < gp.axes.length; which++) {
        var value = clamp(gp.axes[which]);
        str = str + ' ' + which + ':' + (value != 0 ? '1' : '0');
        if (which >= axes.length) {
           axes[which] = value;
        }
        else if (((axes[which] >= 0) && (value > axes[which])) ||
            ((axes[which] <= 0) && (value < axes[which]))) {
          axes[which] = value;
        }
      }
      str = str + " b:"
      for (var which = 0; which < gp.buttons.length; which++) {
        str = str + ' ' + which + ':' + gp.buttons[which].value;
      }
      console.log(str);
    }
  }
}

getAxis = function (index) {
  var result = 0;

  if (index < axes.length) {
    result = axes[index];
  }

  return result;
};

getButton = function (index) {
  var result = 0;

  if (index < button.length) {
    result = button[index];
  }
  return result;
};

window.addEventListener ("keydown", function (e) {
  switch (e.keyCode) {
    case ACode: ks[akey] = -1; break;
    case DCode: ks[dkey] = 1; break;
    case WCode: ks[wkey] = -1; break;
    case SCode: ks[skey] = 1; break;
    case LeftArrow: ks[leftkey] = -1; break;
    case RightArrow: ks[rightkey] = 1; break;
    case UpArrow: ks[upkey] = 1; break;
    case DownArrow: ks[downkey] = -1; break;
  }
}, false);

window.addEventListener ("keyup", function (e) {
  switch (e.keyCode) {
    case ACode: ks[akey] = 0; break;
    case DCode: ks[dkey] = 0; break;
    case WCode: ks[wkey] = 0; break;
    case SCode: ks[skey] = 0; break;
    case LeftArrow: ks[leftkey] = 0; break;
    case RightArrow: ks[rightkey] = 0; break;
    case UpArrow: ks[upkey] = 0; break;
    case DownArrow: ks[downkey] = 0; break;
  }
}, false);

})()
