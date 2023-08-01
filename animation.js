import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js'
import MouseMeshInteraction from 'three_mmi'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

//import { addEntry } from './logic.js';
import {stage1Bulb,stage2Bulb,stage3Bulb,stage4Bulb}  from './bulbAnimation.js';
import { appendAlert,removeAlert } from './appendAlert.js';
var realboxMesh5

const canvas = document.querySelector(".webgl");

//set sizes
const sizes={
  width : canvas.width,
  height : canvas.height
}
//set Scene

const scene =new THREE.Scene()
scene.background = new THREE.Color(0xB1E1FF);

//renderer

 const renderer = new THREE.WebGLRenderer(
  {
      antialias:true,
      canvas : canvas
  }
)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.gammaOutput=true

//LabelRenderer
let labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(sizes.width,sizes.height);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  document.body.appendChild(labelRenderer.domElement);


//Camera
const camera =new THREE.PerspectiveCamera(75, sizes.width/sizes.height,1,1000)
camera.position.set(-9,4,-3)
//scene.add(camera)

//lighting
{
  const skyColor = 0xB1E1FF;  // light blue
  const groundColor = 0xB97A20;  // brownish orange
  const intensity = 0.25;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);
}


{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  light.position.set(-11, 6, 5);
  light.target.position.set(-5, 0, -1);
  scene.add(light);
  scene.add(light.target);

}

{
const ambientLight=new THREE.AmbientLight(0xffffff,1.5)
scene.add(ambientLight)
}

//OrbitControls
const controls = new OrbitControls(camera, labelRenderer.domElement);
  controls.minDistance = 9;
  controls.maxDistance = 15;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI/2.6 ;

// create product

const brown_color=new THREE.Color(0x964b00);
const grey_color = new THREE.Color(0x57554f);
const orange_color = new THREE.Color(0xffaa00);
const red_color = new THREE.Color(0xff0a0a);

//Function to create new Product when button is clicked
function createNewProduct(){
  const geometry=new THREE.BoxGeometry(.5,.5,.5)
const material=new THREE.MeshStandardMaterial({color: grey_color})
realboxMesh5=new THREE.Mesh(geometry,material)
realboxMesh5.position.set(-7.5,3.6,-1.45)
realboxMesh5.name='product'
realboxMesh5.castShadow = true;
    realboxMesh5.receiveShadow = true;
scene.add(realboxMesh5)

}

//StageBulb from bulbAnimation.js
scene.add(stage1Bulb);
scene.add(stage2Bulb);
scene.add(stage3Bulb);
scene.add(stage4Bulb);


//mouse mesh interactions

const mmi = new MouseMeshInteraction(scene, camera);

mmi.addHandler('product', 'mouseenter', function(mesh) {
  console.log('mouse is over the mesh!  ', mesh);
  mesh.material.color = orange_color;
});

mmi.addHandler('product', 'mouseleave', function(mesh) {
  console.log('mouse has left!  ', mesh);
  removeAlert()
  if(mesh.position.x===2)
  mesh.material.color= brown_color;
  else
  mesh.material.color = grey_color;
});


mmi.addHandler('product', 'mousedown', function(mesh) {
  console.log('mouse button is pressing on the mesh!  ', mesh);

  mesh.material.color = red_color;
});


mmi.addHandler('product', 'mouseup', function(mesh) {
  console.log('mouse button is released on the mesh!  ', mesh);
  mesh.material.color = orange_color;
  
});

mmi.addHandler('product', 'click', function(mesh) {
  console.log('mouse button is clicked on the mesh!  ', mesh);
  appendAlert()
});

//load the conveyer model

const loader =new GLTFLoader()
loader.load('projectNEW.glb', function(glb){
  console.log(glb)
  const model=glb.scene;
  model.position.set(-6,3,-2)
  model.scale.set(.285,.285,.285)
  glb.scene.traverse(function (child) {
    if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
    }
})
  scene.add(model)
},function(xhr){
  console.log((xhr.loaded/xhr.total*100) +"%loaded")
},function(error){
  console.log('An error occured')

})

export{renderer,realboxMesh5,scene,camera}

{

  //adds the green plain with grass texture
  const planeSize = 40;

  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://tse4.mm.bing.net/th/id/OIP.otoD-SYDka3m_wo3kKQptwHaHa?pid=ImgDet&rs=1');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.receiveShadow = true;
  mesh.rotation.x = Math.PI * -.5;
  mesh.position.set(-7,2.5,-2)
  scene.add(mesh);
}


function animateModel(){
  requestAnimationFrame(animateModel)
  mmi.update();
  renderer.render(scene,camera)
   labelRenderer.render(scene, camera);
}
animateModel()

export {createNewProduct}
