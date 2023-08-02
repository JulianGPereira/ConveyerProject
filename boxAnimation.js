import * as THREE from 'three'
import{renderer,scene,camera} from './animation.js'
import{stage1Bulb,stage2Bulb,stage3Bulb,stage4Bulb} from './bulbAnimation.js'
import {temp,weight,quantity,dimentions} from './logic.js'
import { setValue,result} from './logic.js';
import { check } from './logic.js';
import { appendAlert,setValToMesh } from './appendAlert.js';
var stage1value,stage2value,stage3value,stage4value
const brown_color=new THREE.Color(0x964b00);
const grey_color = new THREE.Color(0x57554f);
const orange_color = new THREE.Color(0xffaa00);
var rightx=.55
var mainz=-2

var boxMesh=[]
var boxNum
//Create New Product
function createNewProduct(num){
  boxNum=num
  const geometry=new THREE.BoxGeometry(.5,.5,.5)
const material=new THREE.MeshStandardMaterial({color: grey_color})
console.log("Currently Box num is "+boxNum)
boxMesh[boxNum]=new THREE.Mesh(geometry,material)
boxMesh[boxNum].position.set(-7.5,3.6,-1.45)
boxMesh[boxNum].name='product'
boxMesh[boxNum].castShadow = true;
    boxMesh[boxNum].receiveShadow = true;
scene.add(boxMesh[boxNum])
//boxNum++
console.log("Currently Box num is "+boxNum)
console.log("id of box "+boxMesh[boxNum].id)
}

export {createNewProduct,boxMesh,boxNum}

var stage1 = document.getElementById("stage1");
stage1.addEventListener("click" , ()=> {
 
  stage1Bulb.material.color = orange_color;
  stage1.disabled=true
  stage2.disabled=false
  stage1value = document.getElementById('stage1value').value
    animateBoxStage(-5,stage1Res,stage1value,temp,grey_color,stage1Bulb);
});

var stage2 = document.getElementById("stage2");
stage2.addEventListener("click", ()=> {
  stage2Bulb.material.color = orange_color;
  stage2.disabled=true
  stage3.disabled=false
  stage2value = document.getElementById('stage2value').value
  animateBoxStage(-3.7,stage2Res,stage2value,weight,grey_color,stage2Bulb)
  });

var stage3 = document.getElementById("stage3");
stage3.addEventListener("click", ()=>{
  stage3Bulb.material.color = orange_color;
  stage3.disabled=true
  stage4.disabled=false
  stage3value =document.getElementById('stage3value').value
  animateBoxStage(-1.5,stage3Res,stage3value,quantity,grey_color,stage3Bulb)
});

var stage4 = document.getElementById("stage4");
stage4.addEventListener("click", ()=>{
  stage4Bulb.material.color = orange_color;
  stage4.disabled=true
  stage4value =document.getElementById('stage4value').value
  animateBoxStage(-.5,stage4Res,stage4value,dimentions,brown_color,stage4Bulb) 
 // addEntry()
 //check.disabled=false
});

export{stage1,stage2,stage3,stage4}

//function which animates in a straight line
function animateBoxStage(xPos,Res,Sval,Pval,color,bulb) {
  function animationStep() {
   // console.log("boxMeshboxNum "+boxNum)
      if (boxMesh[boxNum].position.x < xPos) {
          boxMesh[boxNum].position.x += 0.03;
          renderer.render(scene, camera);
          //console.log(boxMesh[boxNum].position.x);
          requestAnimationFrame(animationStep);
      } else {
        if(result==="Pending")
        {
          boxMesh[boxNum].position.set(xPos, 3.6, -1.45);
        } 
          setValue(Res,Sval,Pval,bulb);
          console.log(result)
        if(result==="Pass")
        {
          movetoPass(2)
          boxMesh[boxNum].material.color=color
          // boxMesh[boxNum].position.set(1.5, 3.6, mainz++);
        }
          if(result==="Fail")
            {
              moveRight(5)
            }
          renderer.render(scene, camera);   
      }
  }
  animationStep();
}

//Funvtion which moves boxes to failed section
function moveRight(zPos)
{
  boxMesh[boxNum].material.color=grey_color
  function animationStep() {
    if (boxMesh[boxNum].position.z < zPos) {
        boxMesh[boxNum].position.z += 0.03;
        renderer.render(scene, camera);
        //console.log(boxMesh[boxNum].position.z);
        requestAnimationFrame(animationStep);
    } else {
        boxMesh[boxNum].position.set(rightx--, 3.6, zPos);
        check.disabled=false 
        //setValToMesh()
        //setValue(Res,Sval,Pval,bulb);
        renderer.render(scene, camera);   
    }
}
animationStep();

}

function movetoPass(move)
{
  function animationStep() {
    if (boxMesh[boxNum].position.x < move) {
        boxMesh[boxNum].position.x += 0.03;
        renderer.render(scene, camera);
        //console.log(boxMesh[boxNum].position.z);
        requestAnimationFrame(animationStep);
    } else {
        boxMesh[boxNum].position.set(move, 3.6, mainz++);
        check.disabled=false 
        //appendAlert()
       // setValToMesh()
        console.log(boxMesh[boxNum].ID)
        //setValue(Res,Sval,Pval,bulb);
        renderer.render(scene, camera);   
    }
}
animationStep();

}