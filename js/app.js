import * as THREE from "./three.module.js";
import { GLTFLoader } from './GLTFLoader.js';

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById('hero');



// Scene
const scene = new THREE.Scene();

// https://threejs.org/docs/#api/en/geometries/SphereGeometry
const geometry = new THREE.SphereGeometry( 10000, 40, 40, Math.PI, Math.PI / 6, Math.PI * 5 / 12, Math.PI * 2 / 12);
// const material = new THREE.MeshBasicMaterial( { color: 0x5D9EB8, wireframe: false } );
const material = new THREE.MeshStandardMaterial( { 
  color: 0x5D9EB8, 
  emissive: 0x5D9EB8, 
  wireframe: false,
});
const sphere = new THREE.Mesh( geometry, material );
const sphere2 = new THREE.Mesh( geometry, material );

sphere.rotation.z = Math.PI * 0.5;
sphere2.rotation.z = Math.PI * 0.5;
sphere.position.y = -10000;
sphere2.position.y = -10000;
scene.add( sphere );
scene.add( sphere2 );

// Light
// Ambient Light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.2);
scene.add(ambientLight);

const fog = new THREE.Fog("#C9E9E8", 1, 200);
scene.fog = fog;

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.x = -100;
camera.position.y = 50;
camera.position.z = 200;
camera.lookAt(0, 50, 0);


const loader = new GLTFLoader();
let floatplane;
loader.load( './floatplane1.glb', ( gltf ) => {

  floatplane = gltf.scene;
  floatplane.scale.set(2, 2, 2);
  floatplane.position.y = 80;

  floatplane.velocity = new THREE.Vector3();
  floatplane.acceleration = new THREE.Vector3();
  scene.add( gltf.scene );

}, undefined, function ( error ) {
  console.error( {error} );
} );

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Event listener to handle screen resize
window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();
// Animate
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update controls
    // controls.update();

    /**
     * When the first plane reaches a position of z = 0
     * we reset it to -2, its initial position
     */
    // plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;
    sphere.rotation.x = -((elapsedTime * 0.15) %  Math.PI / 6) + Math.PI * 0.5 / 6;;
    sphere2.rotation.x = -((elapsedTime * 0.15) %  Math.PI / 6) + Math.PI * 1.5 / 6;

    if (floatplane) {
      flyFloatplane(floatplane, keysHeld);
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();

function sigFigs(num, fig) {
  const orderOfMagnitude = Math.pow(10, fig);
  return Math.floor(num * orderOfMagnitude) / orderOfMagnitude;
}

function flyFloatplane(obj, keysArr) {

  // set the new acceleration based on the held down arrow keys
  if (keysArr.includes("ArrowUp")) {
    obj.acceleration.y = obj.acceleration.y + 0.0001;
  }
  if (keysArr.includes("ArrowDown")) {
    obj.acceleration.y = obj.acceleration.y - 0.0001;
  }
  if (keysArr.includes("ArrowRight")) {
    obj.acceleration.x = obj.acceleration.x + 0.0001;
  }
  if (keysArr.includes("ArrowLeft")) {
    obj.acceleration.x = obj.acceleration.x - 0.0001;
  }
  // dampening of acceleration
  obj.acceleration.x = sigFigs(obj.acceleration.x / 1.01, 6);
  obj.acceleration.y = sigFigs(obj.acceleration.y / 1.01, 6);

  obj.rotation.y = -sigFigs(obj.acceleration.x * -100, 4) + Math.PI;
  obj.rotation.x =  sigFigs(obj.acceleration.y * -100, 4);
  obj.rotation.z = Math.PI * -sigFigs(obj.acceleration.x * -50, 4);

  // use the updated acceleration to set the new velocity
  obj.velocity.x = sigFigs(obj.velocity.x / 50 + obj.acceleration.x, 4);
  obj.velocity.y = sigFigs(obj.velocity.y / 50 + obj.acceleration.y, 4);

  // use the updated velocity to set the new position
  obj.position.x += obj.velocity.x;
  obj.position.y += obj.velocity.y;
}