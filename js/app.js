import * as THREE from "./../node_modules/three/build/three.module.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById('hero');

// Scene
const scene = new THREE.Scene();

/**
 * Uncomment the following to add fog to the back of the 
 * scene (at 3 units of distance from the center)
 */
const fog = new THREE.Fog("#000000", 1, 1000);
scene.fog = fog;

// Objects
// const geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
// const material = new THREE.MeshStandardMaterial({
//     map: gridTexture,
//     displacementMap: terrainTexture,
//     displacementScale: 0.4,
// });

// const plane2 = new THREE.Mesh(geometry, material);
// plane2.rotation.x = -Math.PI * 0.5;
// plane2.position.y = 0.0;
// plane2.position.z = -1.85; // 0.15 - 2 (the length of the first plane)

// scene.add(plane2);

const geometry = new THREE.SphereGeometry( 1000, 20, 20, Math.PI, Math.PI / 6, Math.PI / 3, Math.PI / 3);
const material = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } );
const sphere = new THREE.Mesh( geometry, material );
const sphere2 = new THREE.Mesh( geometry, material );

sphere.rotation.z = Math.PI * 0.5;
sphere2.rotation.z = Math.PI * 0.5;
sphere.position.y = -1000;
sphere2.position.y = -1000;
scene.add( sphere );
scene.add( sphere2 );

// Light
// Ambient Light
const ambientLight = new THREE.AmbientLight("#ffffff", 10);
scene.add(ambientLight);

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
camera.lookAt(0, 0, 0);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
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
console.log({sphere});
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

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();