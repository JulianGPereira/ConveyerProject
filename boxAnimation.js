import * as THREE from 'three'
import{renderer,realboxMesh5,scene,camera} from './animation.js'
import{stage1Bulb,stage2Bulb,stage3Bulb,stage4Bulb} from './bulbAnimation.js'
import {temp,weight,quantity,dimentions,stage1value,stage2value,stage3value,stage4value} from './logic.js'
import { setValue,result} from './logic.js';

const brown_color=new THREE.Color(0x964b00);
const grey_color = new THREE.Color(0x57554f);
const orange_color = new THREE.Color(0xffaa00);
var rightx=.55
var mainz=-2

var stage1 = document.getElementById("stage1");
stage1.addEventListener("click" , ()=> {
  stage1Bulb.material.color = orange_color;
  stage1.disabled=true
  stage2.disabled=false
    animateBoxStage(-5,stage1Res,stage1value,temp,grey_color,stage1Bulb);
});

var stage2 = document.getElementById("stage2");
stage2.addEventListener("click", ()=> {
  stage2Bulb.material.color = orange_color;
  stage2.disabled=true
  stage3.disabled=false
  animateBoxStage(-3.7,stage2Res,stage2value,weight,grey_color,stage2Bulb)
  });

var stage3 = document.getElementById("stage3");
stage3.addEventListener("click", ()=>{
  stage3Bulb.material.color = orange_color;
  stage3.disabled=true
  stage4.disabled=false
  animateBoxStage(-1.5,stage3Res,stage3value,quantity,grey_color,stage3Bulb)
});

var stage4 = document.getElementById("stage4");
stage4.addEventListener("click", ()=>{
  stage4Bulb.material.color = orange_color;
  stage4.disabled=true
  animateBoxStage(-.5,stage4Res,stage4value,dimentions,brown_color,stage4Bulb) 
 // addEntry()
});

export{stage1,stage2,stage3,stage4}

//function which animates in a straight line
function animateBoxStage(xPos,Res,Sval,Pval,color,bulb) {
  function animationStep() {
      if (realboxMesh5.position.x < xPos) {
          realboxMesh5.position.x += 0.03;
          renderer.render(scene, camera);
          //console.log(realboxMesh5.position.x);
          requestAnimationFrame(animationStep);
      } else {
        if(result==="Pending")
        {
          realboxMesh5.position.set(xPos, 3.6, -1.45);
        } 
          setValue(Res,Sval,Pval,bulb);
          console.log(result)
        if(result==="Pass")
        {
          
          realboxMesh5.material.color=color
          realboxMesh5.position.set(1, 3.6, mainz++);
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
  realboxMesh5.material.color=grey_color
  function animationStep() {
    if (realboxMesh5.position.z < zPos) {
        realboxMesh5.position.z += 0.03;
        renderer.render(scene, camera);
        //console.log(realboxMesh5.position.z);
        requestAnimationFrame(animationStep);
    } else {
        realboxMesh5.position.set(rightx--, 3.6, zPos);
        
        //setValue(Res,Sval,Pval,bulb);
        
        renderer.render(scene, camera);   
    }
}
animationStep();
}

