import * as THREE from "../node_modules/three/build/three.module.js";
import camera from "./camera.js";

import { scene, cube, plane } from "./scene.js";

const { innerWidth, innerHeight } = window;

const canvas = document.getElementById("hero");
canvas.width = innerWidth;
canvas.height = innerHeight;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

console.log({plane});
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

//   plane.position.x += 0.01;

  renderer.render(scene, camera);
}

animate();
