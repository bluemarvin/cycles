function addGrid(scene) {

  var tileSize = 250
    , maxGrid = 250
    , minGrid = -250
    , gridPoints = []
    ;


  var GridSize = Math.floor((maxGrid - minGrid) / tileSize);

  for (var ix = 0; ix <= GridSize; ix++) {

    var TheX = (ix * tileSize) + minGrid;

    for (var jy = 0; jy <= GridSize; jy++) {

      var TheY = (jy * tileSize) + minGrid;
      var Offset = (ix * (GridSize + 1)) + jy;
      gridPoints[Offset] = { x: TheX, y: 0, z: TheY };
    }
  }

  var ValuesPerQuad = 18; // 6 (verices) * 3 (components per vertex)

  var vertices = new Float32Array(GridSize * GridSize * ValuesPerQuad);
  var count = 0;
  var uvCount = 0;
  var Factor = 100;

  function setVertex(list, place, virtex) {
     list[place] = virtex.x;
     list[place + 1] = virtex.y;
     list[place + 2] = virtex.z;
  }

  function setUV(list, place, u, v) {
    list[place] = u;
    list[place + 1] = v;
  }

  var uvs = new Float32Array(GridSize * GridSize * 6 * 2 );
  for (var ix = 0; ix < GridSize; ix++) {
    for (var jy = 0; jy < GridSize; jy++) {

      var v1 = gridPoints[(ix * (GridSize + 1)) + jy + 1];
      var v2 = gridPoints[((ix + 1) * (GridSize + 1)) + jy + 1];
      var v3 = gridPoints[((ix + 1) * (GridSize + 1)) + jy];
      var v4 = gridPoints[(ix * (GridSize + 1)) + jy];

      setVertex(vertices, count, v2);
      setUV(uvs, uvCount, Factor, Factor);
      setVertex(vertices, count + 3, v3);
      setUV(uvs, uvCount + 2, Factor, 0);
      setVertex(vertices, count + 6, v4);
      setUV(uvs, uvCount + 4, 0, 0);
      setVertex(vertices, count + 9, v2);
      setUV(uvs, uvCount + 6, Factor, Factor);
      setVertex(vertices, count + 12, v4);
      setUV(uvs, uvCount + 8, 0, 0);
      setVertex(vertices, count + 15, v1);
      setUV(uvs, uvCount + 10, 0, Factor);
      count += ValuesPerQuad;
      uvCount += 12;
    }
  }

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  var texture = THREE.ImageUtils.loadTexture( 'assets/grid2.png' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  //          texture.anisotropy = renderer.getMaxAnisotropy();
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function setWall(list, offset, b1, b2) { // , height) {
    var height = 50
    var v1 = { x: b1.x, y: 0,      z: b1.y };
    var v2 = { x: b1.x, y: height, z: b1.y };
    var v3 = { x: b2.x, y: height, z: b2.y };
    var v4 = { x: b2.x, y: 0,      z: b2.y };
    setVertex(list, offset, v1);
    setVertex(list, offset + 3, v2);
    setVertex(list, offset + 6, v3);
    setVertex(list, offset + 9, v1);
    setVertex(list, offset + 12, v3);
    setVertex(list, offset + 15, v4);
  }

  var wall = new Float32Array(4 * ValuesPerQuad);
  setWall(wall, 0, { x: minGrid, y: maxGrid }, { x: maxGrid, y: maxGrid })
  setWall(wall, ValuesPerQuad, { x: maxGrid, y: minGrid }, { x: minGrid, y: minGrid })
  setWall(wall, ValuesPerQuad * 2, { x: minGrid, y: minGrid }, { x: minGrid, y: maxGrid })
  setWall(wall, ValuesPerQuad * 3, { x: maxGrid, y: maxGrid }, { x: maxGrid, y: minGrid })
  geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(wall, 3));
  material = new THREE.MeshBasicMaterial( { color: 0x666666 } );
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
