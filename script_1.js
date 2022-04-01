const section = document.querySelector("section.book")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x888888);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 6);
scene.add(light);

const loader = new THREE.TextureLoader()
const urls = [
    "https://raw.githubusercontent.com/sohamdasdesigns/getLifeThesis/main/static/page1/edge1.png",
    "https://raw.githubusercontent.com/sohamdasdesigns/getLifeThesis/main/static/page1/spine1.png",
    "https://raw.githubusercontent.com/sohamdasdesigns/getLifeThesis/main/static/page1/top1.png",
    "https://raw.githubusercontent.com/sohamdasdesigns/getLifeThesis/main/static/page1/bottom1.png",
    "https://raw.githubusercontent.com/sohamdasdesigns/getLifeThesis/main/static/page1/front1.png",
    "https://raw.githubusercontent.com/sohamdasdesigns/getLifeThesis/main/static/page1/back1.png",
]

const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
const materials = urls.map(url => {
    return new THREE.MeshLambertMaterial( { 
    map: loader.load(url),
    transparent: true,
    opacity: 0.85,
    })
} );
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 6;

if (window.matchMedia("(max-width: 767px)").matches)
{
    camera.position.z = 6;
    console.log('mobile');
}
else {
    camera.position.z = 10;
    camera.position.x = -2;
    camera.position.y = -2;
    console.log('pc')
}

let currentTimeline = window.pageYOffset / 3000
let aimTimeline = window.pageYOffset / 3000

function animate() {
	requestAnimationFrame( animate );

    currentTimeline += (aimTimeline - currentTimeline) * 0.05
    
    const rx = currentTimeline * -0.5 + 0.5
    const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2

    cube.rotation.set(rx, ry * -1.5, 0)

	renderer.render( scene, camera );
}
animate();

window.addEventListener("scroll", function () {
    aimTimeline = window.pageYOffset / 3000
})