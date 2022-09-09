import * as THREE from "../node_modules/three/build/three.module.js";
const camera = new THREE.PerspectiveCamera(
  75, //fov
  window.innerWidth / window.innerHeight, //aspect
  0.1, //near
  1000 //far
);
camera.position.z = 10;

export default camera;
