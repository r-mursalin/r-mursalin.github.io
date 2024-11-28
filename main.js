import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var volume = 0;

const bell = new Wad({source : 'sound.mp3'});
//bell.play();
//bell.stop();

const polywad = new Wad.Poly({
	audioMeter: {
		clipLevel: .98, // the level (0 to 1) that you would consider "clipping".
		averaging: .95, // how "smoothed" you would like the meter to be over time. Should be between 0 and less than 1.
		clipLag: 750, // how long you would like the "clipping" indicator to show after clipping has occured, in milliseconds.
	},
})
polywad.add(bell);
setInterval(function(){
	//console.log("Volume: ", Math.round(polywad.audioMeter.volume * 1000))
volume = polywad.audioMeter.volume * 5;

}, 50)
polywad.play()


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube_material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cube_geometry, cube_material );
scene.add( cube );

cube.position.set(-2, 0, 0);

const sphere_geometry = new THREE.SphereGeometry( 0.75, 32, 16 );
const sphere_material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh(  sphere_geometry, sphere_material );
scene.add( sphere );

sphere.position.set(2, 0, 0);
sphere.rotation.set(0, -0.75, 0)

const loader = new GLTFLoader();

loader.load( 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/refs/heads/main/2.0/Duck/glTF/Duck.gltf', function ( gltf ) {
	scene.add( gltf.scene );
	gltf.scene.position.set(0, -0.75, 0)
	gltf.scene.rotation.set(0, -0.75, 0)

}, undefined, function ( error ) {

	console.error( error );

} );



camera.position.z = 5;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	cube.scale.set(volume, volume, volume);
	sphere.scale.set(volume, volume, volume);
	renderer.render( scene, camera );

}
