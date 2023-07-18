import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js'
import MouseMeshInteraction from 'three_mmi'

console.log(THREE)

const canvas = document.querySelector(".webgl");

//set sizes
const sizes={
  width : canvas.width,
  height : canvas.height
}

//renderer
 const renderer = new THREE.WebGLRenderer(
  {
      antialias:true,
      canvas : canvas
  }
)
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled =true
renderer.gammaOutput=true



//set Scene
const scene =new THREE.Scene()
scene.background=new THREE.Color(0xffffff)

//Camera
const camera =new THREE.PerspectiveCamera(75, sizes.width/sizes.height,1,1000)
camera.position.set(-9,4,-3)
//scene.add(camera)

//lighting
const directionallight=new THREE.DirectionalLight(0xffffff,1)
directionallight.position.set(-6,5,-1)
directionallight.castShadow=true
// directionallight.shadow.mapSize.width=sizes.width
// directionallight.shadow.mapSize.height=sizes.height

scene.add(directionallight)

const ambientLight=new THREE.AmbientLight(0xffffff,1.5)
scene.add(ambientLight)

//OrbitControls
const controls=new OrbitControls(camera,renderer.domElement)
controls.addEventListener('change',()=> {renderer.render(scene,camera)})
controls.target.set(0,0,0)
controls.update()





// create product


const brown_color=new THREE.Color(0x964b00);
const grey_color = new THREE.Color(0x57554f);
const orange_color = new THREE.Color(0xffaa00);
const red_color = new THREE.Color(0xff0a0a);

const geometry=new THREE.BoxGeometry(.5,.5,.5)

const material=new THREE.MeshStandardMaterial({color: grey_color})

const mmi = new MouseMeshInteraction(scene, camera);

const realboxMesh5=new THREE.Mesh(geometry,material)
realboxMesh5.position.set(-7.5,3.6,-1.45)
realboxMesh5.name='product';
scene.add(realboxMesh5)

//mouse mesh interactions


mmi.addHandler('product', 'mouseenter', function(mesh) {
	console.log('mouse is over the mesh!  ', mesh);
	mesh.material.color = orange_color;
});

mmi.addHandler('product', 'mouseleave', function(mesh) {
	console.log('mouse has left!  ', mesh);
  if(mesh.position.x===.5)
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
  appendAlert('Details of selected product', 'primary')
});

//load the model
const loader =new GLTFLoader()
loader.load('project_revised.glb', function(glb){
  console.log(glb)
  const model=glb.scene;
  model.position.set(-6,3,-2)
  model.scale.set(.285,.285,.285)
  scene.add(model)
},function(xhr){
  console.log((xhr.loaded/xhr.total*100) +"%loaded")
},function(error){
  console.log('An error occured')
  

})



//render 3D model
function animateModel(){
  requestAnimationFrame(animateModel)
  mmi.update();
  renderer.render(scene,camera)
}
animateModel()

var stage1 = document.getElementById("stage1");
stage1.addEventListener("click" , function() {
    animateBoxStage1(-5);
});
var stage2 = document.getElementById("stage2");
stage2.addEventListener("click", animateBoxStage2);

var stage3 = document.getElementById("stage3");
stage3.addEventListener("click", animateBoxStage3);

var stage4 = document.getElementById("stage4");
stage4.addEventListener("click", animateBoxStage4);

function animateBoxStage1() {
    let myReq=requestAnimationFrame(animateBoxStage1)
    
    if ( realboxMesh5.position.x < -5 ) {
        realboxMesh5.position.set(realboxMesh5.position.x+.01,3.6,-1.45)
    } else { 
      realboxMesh5.position.set(-5,3.6,-1.45);
      setValue(stage1Res,stage1value,temp)
      cancelAnimationFrame(myReq); 
    }
    renderer.render(scene,camera)
    console.log(realboxMesh5.position.x)
        
    }

function animateBoxStage2()
{
    let myReq=requestAnimationFrame(animateBoxStage2)
    
    if ( realboxMesh5.position.x < -3.7 ) {
        realboxMesh5.position.set(realboxMesh5.position.x+.01,3.6,-1.45)
    } else { 
      realboxMesh5.position.set(-3.7,3.6,-1.45);
      setValue(stage2Res,stage2value,weight)
      cancelAnimationFrame(myReq); 
    }
    renderer.render(scene,camera)
    console.log(realboxMesh5.position.x)
}

function animateBoxStage3()
{
    let myReq=requestAnimationFrame(animateBoxStage3)
    
    if ( realboxMesh5.position.x < -1.5 ) {
        realboxMesh5.position.set(realboxMesh5.position.x+.01,3.6,-1.45)
    } else { 
     realboxMesh5.position.set(-1.5,3.6,-1.45);
     setValue(stage3Res,stage3value,quantity)
      cancelAnimationFrame(myReq); 
    }
    renderer.render(scene,camera)
    console.log(realboxMesh5.position.x)

}
function animateBoxStage4()
{
    let myReq=requestAnimationFrame(animateBoxStage4)
    
    if ( realboxMesh5.position.x < .5 ) {
        realboxMesh5.position.set(realboxMesh5.position.x+.01,3.6,-1.45)
    } else { 
      realboxMesh5.position.set(.5,3.6,-1.45);
      realboxMesh5.material.color=brown_color;
      setValue(stage4Res,stage4value,dimentions)
      cancelAnimationFrame(myReq); 
    }
    renderer.render(scene,camera)
    console.log(realboxMesh5.position.x)
}




