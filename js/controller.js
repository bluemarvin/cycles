var getAxis;
var getButton;
var getButtonPressed;
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
var buttonsPrev = []
var buttons = [];

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

  buttonsPrev = buttons;
  buttons = [];

  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);

  for (var pad = 0; pad < gamepads.length; pad++) {
    var gp = gamepads[pad];
    if (gp) {
      var str = "a:"
      for (var which = 0; which < gp.axes.length; which++) {
        var value = clamp(gp.axes[which]);
        str = str + ' ' + which + ':' + value; // (value != 0 ? '1' : '0');
        axisId = which + 1;
        if (axisId >= axes.length) {
           axes[axisId] = value;
        }
        else if (((axes[axisId] >= 0) && (value > axes[axisId])) ||
            ((axes[axisId] <= 0) && (value < axes[axisId]))) {
          axes[axisId] = value;
        }
      }
//      str = str + " b:"
      for (var which = 0; which < gp.buttons.length; which++) {
        buttons[which] = gp.buttons[which].value;
//        str = str + ' ' + which + ':' + gp.buttons[which].value;
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

  if (index < buttons.length) {
    result = buttons[index];
  }
  return result;
};

getButtonPressed = function (index) {
  var isPressed = false
    , wasPressed = false
    ;

  if (index < buttons.length) {
    isPressed = buttons[index] != 0;
  }

  if (index < buttonsPrev.length) {
    wasPressed = buttonsPrev[index] != 0;
  }

  return isPressed && !wasPressed;
};

window.addEventListener ("keydown", function (e) {
  switch (e.keyCode) {
    case ACode: ks[akey] = -1; e.preventDefault(); break;
    case DCode: ks[dkey] = 1; e.preventDefault(); break;
    case WCode: ks[wkey] = -1; e.preventDefault(); break;
    case SCode: ks[skey] = 1; e.preventDefault(); break;
    case LeftArrow: ks[leftkey] = -1; e.preventDefault(); break;
    case RightArrow: ks[rightkey] = 1; e.preventDefault(); break;
    case UpArrow: ks[upkey] = 1; e.preventDefault(); break;
    case DownArrow: ks[downkey] = -1; e.preventDefault(); break;
  }
}, false);

window.addEventListener ("keyup", function (e) {
  switch (e.keyCode) {
    case ACode: ks[akey] = 0; e.preventDefault(); break;
    case DCode: ks[dkey] = 0; e.preventDefault(); break;
    case WCode: ks[wkey] = 0; e.preventDefault(); break;
    case SCode: ks[skey] = 0; e.preventDefault(); break;
    case LeftArrow: ks[leftkey] = 0; e.preventDefault(); break;
    case RightArrow: ks[rightkey] = 0; e.preventDefault(); break;
    case UpArrow: ks[upkey] = 0; e.preventDefault(); break;
    case DownArrow: ks[downkey] = 0; e.preventDefault(); break;
  }
}, false);

})()
