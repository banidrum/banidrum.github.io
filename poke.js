const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 1, 1, 20 );

var model;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xC5C5C3 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight( 0x404040 );
scene.add( light );
			
const directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 1 ).normalize();
scene.add( directionalLight );

// var texture = THREE.TextureLoader('./assets/background.png');
// var backgroundMesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(2, 2, 0),
//     new THREE.MeshBasicMaterial({map: texture})
// );

// backgroundMesh.material.depthTest = false;
// backgroundMesh.material.depthWrite = false;

// var backgroundScene = new THREE.Scene();
// var backgroundCamera = new THREE.Camera();
// backgroundScene.add(backgroundCamera);
// backgroundScene.add(backgroundMesh);

const backgroundLoader = new THREE.TextureLoader();

const loader = new THREE.GLTFLoader();

loader.load('./assets/Squirtle.glb', function(gltf) {			
	gltf.scene.scale.set( 2, 2, 2 );			   
	gltf.scene.position.x = 0.5; // Esquerda, direita
    gltf.scene.position.y = 0; // Cima, baixo				    
	gltf.scene.position.z = 5;	// Frente, trás			     
	
	model = gltf.scene;

	scene.add( gltf.scene );
}, undefined, function(error) {
    console.error(error);
});

backgroundLoader.load('./assets/background1920.png', function(texture) { 
    scene.background = texture;
});

const zSpeed = 0.25;
const xSpeed = 0.25;

document.addEventListener("keydown", keyPress, false);
function keyPress(e) {	
	let key = e.which;
	if(key == 87) {
		model.position.z += zSpeed;
	} else if(key == 83) {
		model.position.z -= zSpeed;
	} else if(key == 65) {
		model.position.x -= xSpeed;
	} else if(key == 68) {
		model.position.x += xSpeed;
	}
}

function animate() {
	render();
	requestAnimationFrame( animate );
	}

function render() {
    renderer.render(scene, camera);
}

render();

animate();