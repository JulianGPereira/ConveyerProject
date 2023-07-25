import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js'
import MouseMeshInteraction from 'three_mmi'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import {ID,temp,weight,quantity,dimentions,stage1value,stage2value,stage3value,stage4value} from './logic.js'
import { setValue,stagesResultAlert,result} from './logic.js';

var z=4

var realboxMesh5

var productLabel
console.log(THREE)

console.log("Id is "+ID)
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

//set Scene

const scene =new THREE.Scene()
scene.background = new THREE.Color(0xB1E1FF);
export{scene}
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
  controls.minDistance = 5;
  controls.maxDistance = 100;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI/2.6 ;
// create product


const brown_color=new THREE.Color(0x964b00);
const grey_color = new THREE.Color(0x57554f);
const orange_color = new THREE.Color(0xffaa00);
const red_color = new THREE.Color(0xff0a0a);


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

//Bulb Animation

const box1Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box1Material=new THREE.MeshStandardMaterial({ color: grey_color });

  const stage1Bulb = new THREE.Mesh(box1Geometry, box1Material);
  stage1Bulb.name='bulb1'
  stage1Bulb.position.set(-6.4,4.45,-1.9)
scene.add(stage1Bulb);

const box2Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box2Material=new THREE.MeshStandardMaterial({ color: grey_color });
const stage2Bulb = new THREE.Mesh(box2Geometry, box2Material);
  stage2Bulb.name='bulb2'
  stage2Bulb.position.set(-4.7,4.45,-1.9)
scene.add(stage2Bulb);

const box3Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box3Material=new THREE.MeshStandardMaterial({ color: grey_color });
const stage3Bulb = new THREE.Mesh(box3Geometry, box3Material);
  stage3Bulb.name='bulb3'
  stage3Bulb.position.set(-3.3,4.45,-1.9)
scene.add(stage3Bulb)

const box4Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box4Material=new THREE.MeshStandardMaterial({ color: grey_color });
const stage4Bulb = new THREE.Mesh(box4Geometry, box4Material);
  stage4Bulb.name='bulb4'
  stage4Bulb.position.set(-1.4,4.45,-1.9)
scene.add(stage4Bulb);
export{stage1Bulb,stage2Bulb,stage3Bulb,stage4Bulb}

//mouse mesh interactions

const mmi = new MouseMeshInteraction(scene, camera);

mmi.addHandler('product', 'mouseenter', function(mesh) {
  console.log('mouse is over the mesh!  ', mesh);
  mesh.material.color = orange_color;
});

mmi.addHandler('product', 'mouseleave', function(mesh) {
  console.log('mouse has left!  ', mesh);
  removeAlert()
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
  appendAlert()
});

//load the model

const loader =new GLTFLoader()
loader.load('project_revised.glb', function(glb){
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

{
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

//Product animation during click
var stage1 = document.getElementById("stage1");
stage1.addEventListener("click" , ()=> {
  stage1Bulb.material.color = orange_color;
    animateBoxStage(-5,stage1Res,stage1value,temp,grey_color,stage1Bulb);
});

var stage2 = document.getElementById("stage2");
stage2.addEventListener("click", ()=> {
  stage2Bulb.material.color = orange_color;
  animateBoxStage(-3.7,stage2Res,stage2value,weight,grey_color,stage2Bulb)
  });

var stage3 = document.getElementById("stage3");
stage3.addEventListener("click", ()=>{
  stage3Bulb.material.color = orange_color;
  animateBoxStage(-1.5,stage3Res,stage3value,quantity,grey_color,stage3Bulb)
});
var stage4 = document.getElementById("stage4");
stage4.addEventListener("click", ()=>{
  stage4Bulb.material.color = orange_color;
  animateBoxStage(.5,stage4Res,stage4value,dimentions,brown_color,stage4Bulb) 
});

//function which animates in a straight line
function animateBoxStage(xPos,Res,Sval,Pval,color,bulb) {
  function animationStep() {
      if (realboxMesh5.position.x < xPos) {
          realboxMesh5.position.x += 0.03;
          renderer.render(scene, camera);
          console.log(realboxMesh5.position.x);
          requestAnimationFrame(animationStep);
      } else {
          realboxMesh5.position.set(xPos, 3.6, -1.45);
          realboxMesh5.material.color=color
          setValue(Res,Sval,Pval,bulb);
          
          renderer.render(scene, camera);   
      }
  }
  animationStep();
}
//Append popup when mesh is clicked

const appendAlert = (boxMesh) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<table class="table">
         <thead>
            <tr style ="font-size:10px">
              <th scope="col">ProductID</th>
              <th scope="col">Temperature</th>
              <th scope="col">Weight</th>
              <th scope="col">Quantity</th>
              <th scope="col">Dimentions</th>
            </tr>
          </thead>
          <tbody>
            <tr style ="font-size:10px">
              <td>${ID}</td>
              <td>${temp}</td>
              <td>${weight}</td>
              <td>${quantity}</td>
              <td>${dimentions}</td>
            </tr>
           <tr style ="font-size:10px">
                <th scope="col">Product stages</th>
               <th scope="col">Stage1</th>
                <th scope="col">Stage2</th>
                <th scope="col">Stage3</th>
                <th scope="col">Stage4</th>
           </tr>
           <tr style ="font-size:10px">
               <td></td>
                <td>${stagesResultAlert[1]}</td>
                <td>${stagesResultAlert[2]}</td>
                <td>${stagesResultAlert[3]}</td>
                <td>${stagesResultAlert[4]}</td>
           </tr>
           <tr style ="font-size:10px">
              <th scope="col" colspan="2">Product Status</th>
              <td colspan="3">${result}</td>
           </tr>
          </tbody>
        </table>
  </div>`
  ].join('')
  wrapper.className = "label";
  wrapper.style.marginTop = "-1em";
  productLabel = new CSS2DObject(wrapper);
  productLabel.position.set(0,1,1);
  realboxMesh5.add(productLabel); 

}

function removeAlert()
{
  realboxMesh5.remove(productLabel); 
 
}

export {createNewProduct}

