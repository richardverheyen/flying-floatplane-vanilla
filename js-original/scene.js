import * as THREE from '../node_modules/three/build/three.module.js';

const scene = new THREE.Scene();

// Add cube geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const plane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 3 );
const helper = new THREE.PlaneHelper( plane, 4, 0x00bcd4 );
scene.add( helper );

export  { 
    scene,
    cube,
    plane
};