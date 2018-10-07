let container = document.getElementById('container');
let renderer = new THREE.CanvasRenderer();
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000);
let distance = 500; 
let geometry = new THREE.Geometry();


function setCanvas(height,width){
	let canvDiv = document.querySelector('#container');
	let aboutHeight = document.querySelector('#about').offsetHeight+15;
	let canvWidth = document.querySelector('#about').offsetWidth;
	let canvHeight= aboutHeight+'px';

	canvDiv.style.height = canvHeight;
	renderer.setSize( canvWidth , aboutHeight );
	container.appendChild( renderer.domElement ); 
}

let section = document.querySelector('#about')

section.addEventListener('mouseenter',setCanvas);

scene.add(camera);

for( let i=0; i<100; i++){
	let particle = new THREE.Particle( new THREE.ParticleCanvasMaterial({

		color : Math.random() * 0x808080 + 0x808080,
		opacity:1,
		program: function(context){
			context.beginPath();
			context.arc(0,0,1,0,Math.PI * 2,true);
			context.closePath();
			context.fill();
		}

	}));

	particle.position.x = Math.random() * distance * 2 - distance;
	particle.position.y = Math.random() * distance * 2 - distance;
	particle.position.z = Math.random() * distance * 2 - distance;
	particle.scale.x = particle.scale.y = Math.random() * 10 + 5;

	geometry.vertices.push( new THREE.Vertex(particle.position) )

	scene.add(particle);
}

let line = new THREE.Line( geometry, new THREE.LineBasicMaterial({
	color : 0x000000,
	opacity:0.05
}));
scene.add(line);

camera.position.z = 100;
camera.lookAt(scene.position);

renderer.render( scene, camera);


function onMouseMove(event){
	let mouseX = event.clientX - window.innerWidth/2;
	let mouseY = event.clientY - window.innerHeight/2;
	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (mouseY - camera.position.y) * 0.05;
	camera.position.z = distance;
	camera.lookAt(scene.position);
	renderer.render( scene, camera);
}

section.addEventListener('mousemove',onMouseMove,false);

window.addEventListener('resize',function(){
	setCanvas();
});