var FPSOverlay = {};

(function () {

const kScale = 0.5
    ;

var scene
  , mIsLoaded = false
  , mCamera
  , mDigitTen
  , mMatTen
  , mDigitOne
  , mMatOne
  , mStartTime = -1
  , mSampleCount = 0
  ;

function setDigit(value, digit) {
  var offset = 15 - value;
  if (offset < 3) { offset = 3; }
  else if (offset > 15) { offset = 4; }

  digit.map.offset.y = offset / 16;
  digit.map.needsUpate = true;
  digit.needsUpdate = true;
}

function updatePosition() {
  if (!mIsLoaded) {
    return;
  }

  var windowWidth = window.innerWidth * 0.5;
  var windowHeight = window.innerHeight * 0.5;

  var digitWidth = mMatOne.map.image.width * kScale;
  var digitHeight = mMatOne.map.image.height * kScale / 16;
  var yValue = windowHeight - (digitHeight * 0.5);

  mDigitOne.position.set(windowWidth - (digitWidth * 0.5), yValue, 0);
  mDigitTen.position.set(windowWidth - (digitWidth * 1.5), yValue, 0);
  mDigitOne.needsUpdate = true;
  mDigitTen.needsUpdate = true;

  mCamera.left = -windowWidth;
  mCamera.right = windowWidth;
  mCamera.top = windowHeight;
  mCamera.bottom = -windowHeight;
  mCamera.updateProjectionMatrix();
}

function onLoad(texture) {
  mMatTen = new THREE.SpriteMaterial({ map: texture, color: 0x00ffffff, opacity: 0.7 });
  mDigitTen = new THREE.Sprite(mMatTen);
  mMatTen.map.offset = new THREE.Vector2(0, 15/16);
  mMatTen.map.repeat = new THREE.Vector2(1, 1/16);
  mDigitTen.scale.set(texture.image.width * kScale, texture.image.height * kScale / 16, 1);
  scene.add(mDigitTen);
  mMatOne = mMatTen.clone()
  mMatOne.map = mMatTen.map.clone();
  mMatOne.map.offset = new THREE.Vector2(0, 14/16);
  mMatOne.map.repeat = new THREE.Vector2(1, 1/16);
  mMatOne.map.needsUpdate = true;
  mDigitOne = new THREE.Sprite(mMatOne);
  mDigitOne.scale.set(texture.image.width * kScale, texture.image.height * kScale / 16, 1);
  scene.add(mDigitOne);
  mIsLoaded = true;
  updatePosition();
}

FPSOverlay.init = function (THREE, digitsFile) {
  if (digitsFile == undefined) {
    digitsFile = 'assets/digits.png';
  }
  var width = window.innerWidth;
  var height = window.innerHeight;
  mCamera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30 );
  scene = new THREE.Scene();
  var texture = new THREE.TextureLoader().load(digitsFile, onLoad);
};

FPSOverlay.update = function (renderer) {
  if (!mIsLoaded) {
    return;
  }

  mSampleCount++;
  const thisTime = performance.now();
  if (mStartTime < 0) {
    mStartTime = thisTime;
    return;
  }

  const diff = thisTime - mStartTime;

  if (diff > 500) {
    var fps = (1000 * mSampleCount) / diff;
    mStartTime = thisTime;
    mSampleCount = 0;
    ten = Math.floor(fps / 10);
    one = Math.round(fps % 10);
    if (one > 9) { one = 0; ten += 1; }
    setDigit(ten, mMatTen);
    setDigit(one, mMatOne);
  }
  renderer.render(scene, mCamera);
};

FPSOverlay.windowResize = updatePosition;

})();
