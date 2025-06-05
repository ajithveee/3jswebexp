import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

// Basic Scene Setup
const sceneContainer = document.getElementById('scene-container');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
camera.position.set(2, 2, 5); // Adjusted camera position for a better initial view
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
renderer.setClearColor(0xFFFFFF); // White background for the scene
sceneContainer.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Softer ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Softer directional light
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Objects

// Ground Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10); // Made plane larger
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, side: THREE.DoubleSide }); // Changed to MeshStandardMaterial for better lighting interaction
const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
groundPlane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
groundPlane.position.y = -0.5; // Position it slightly below the cube's base
scene.add(groundPlane);

// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff }); // Changed to MeshStandardMaterial, example color blue
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0; // Position cube's center at y=0, so it sits on the ground plane at y=-0.5
scene.add(cube);

// Adjust camera position if needed to ensure both objects are visible
camera.position.set(2, 2, 3); // Slightly adjusted camera for better view of cube on plane
camera.lookAt(cube.position); // Look at the cube

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.1; // Adjusted for low sensitivity
controls.enableZoom = false; // As per plan
controls.enablePan = false;  // As per plan
controls.enabled = false; // Initially disabled, will be enabled on hover

// Placeholder for animate function to render the scene
function animate() {
    requestAnimationFrame(animate);

    if (controls.enabled) { // Only update if controls are active (hovering)
        controls.update(); // Apply damping and other updates
    }

    renderer.render(scene, camera);
}

// Placeholder for objects, controls, and interactions - will be added in subsequent steps

// Initial render call in animate will be started later
// For now, to ensure the setup is okay, we can call render once.
// renderer.render(scene, camera); // This will be removed when animate() is fully implemented.

// Start animation loop
animate();

// Hover Interaction
sceneContainer.addEventListener('mouseenter', () => {
    controls.enabled = true;
});

sceneContainer.addEventListener('mouseleave', () => {
    controls.enabled = false;
    // Optional: smoothly reset camera to an initial position or stop motion.
    // For now, simply disabling is fine as damping will smooth out the stop.
});

// Ensure the animate loop is started if it hasn't been already.
// (Should be already started from the previous step)
// if (typeof animate === 'function') {
//    animate();
// }
