function main() {
  //access the canvas
  const canvas = document.querySelector('#c');

  //set the canvas as webGLRenderer for threejs
  const renderer = new THREE.WebGLRenderer({ canvas });

  //set the camera with fov(field of view), aspect ratio, near and far clipping planes
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;        //moving camera away from origin to actually see the scene

  //define scene
  const scene = new THREE.Scene();

  //adding background color to scene
  scene.background = new THREE.Color(0xAAAAAA);

  //add light to the scene
  {
    const color = 'white';
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  //define geometry of the body
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  //define material of the body
  const material = new THREE.MeshPhongMaterial({color: "red" }); 

  //make the body by combining geometry and material
  const cube = new THREE.Mesh(geometry, material);

  //add body to the scene
  scene.add(cube);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  
  function render(time) {
    time *= 0.001;  // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    //fixing the stretcing issue of cubes when resizing window
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  //animate the cube
  requestAnimationFrame(render);
}

main();