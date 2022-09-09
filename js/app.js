import * as THREE from "./three.module.js";
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

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();