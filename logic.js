import data from './data.json' assert { type: 'json' };
import { createNewProduct } from './animation.js';
import * as THREE from 'three'
import{stage1Bulb,stage2Bulb,stage3Bulb,stage4Bulb} from './bulbAnimation.js'
import { stage1,stage2,stage3,stage4 } from './boxAnimation.js';

const red_color = new THREE.Color(0xff0a0a);
const green_color=new THREE.Color(0x008000)
const grey_color = new THREE.Color(0x57554f);
var stagesResultAlert
var count
 var numOfFails=0
 var productNum=0
 var result


var ID,temp,weight,quantity,dimentions

var stage1Res,stage2Res,stage3Res,stage4Res
var check = document.getElementById("submitFields");
export {check}
 check.addEventListener("click", () =>
 {
  check.disabled=true
  stage1Res = document.getElementById('stage1Res')
  stage2Res = document.getElementById('stage2Res')
  stage3Res =document.getElementById('stage3Res')
  stage4Res =document.getElementById('stage4Res')
   //initialize values
  result="pending"
   count=0
   numOfFails=0
   stage1Res.value=''
   stage2Res.value=''
   stage3Res.value=''
   stage4Res.value=''
  stagesResultAlert=["","Pending","Pending","Pending","Pending"]
  stage1Bulb.material.color=grey_color
  stage2Bulb.material.color=grey_color
  stage3Bulb.material.color=grey_color
  stage4Bulb.material.color=grey_color
  stage1.disabled =false
  stage2.disabled =true
  stage3.disabled =true
  stage4.disabled =true
  //get box to starting position
  createNewProduct()
   //get product details from json file
  ID=data.products[productNum].id
  temp=data.products[productNum].temperature
  weight=data.products[productNum].weight
  quantity=data.products[productNum].quality
  dimentions=data.products[productNum].dimentions
//set value to the product details text field
  document.getElementById('ProductID').setAttribute('value',ID)
  document.getElementById('Temperature').setAttribute('value',temp)
  document.getElementById('Weight').setAttribute('value',weight)
  document.getElementById('quantity').setAttribute('value',quantity)
  document.getElementById('Dimentions').setAttribute('value',dimentions)
  //for now get threshold values from the stages field
    

    productNum+=1
    
 // Do something with the field values

  stage1Res.classList.remove("btn-outline-danger");
  stage2Res.classList.remove("btn-outline-danger");
  stage3Res.classList.remove("btn-outline-danger");
  stage4Res.classList.remove("btn-outline-danger");

  stage1Res.classList.remove("btn-outline-success");
  stage2Res.classList.remove("btn-outline-success");
  stage3Res.classList.remove("btn-outline-success");
  stage4Res.classList.remove("btn-outline-success");

  stage1Res.classList.add("btn-outline-secondary");
  stage2Res.classList.add("btn-outline-secondary");
  stage3Res.classList.add("btn-outline-secondary");
  stage4Res.classList.add("btn-outline-secondary");
  

 console.log(ID,temp,weight,quantity,dimentions)
console.log(stage1value,stage2value,stage3value,stage4value)

 });
 function setID()
 {
   return ID
 }
 export{setID,ID,temp,weight,quantity,dimentions}
//find if Pass or FAil

function setValue(field,stagevalue,product,stageBulb)
{
    
  count+=1;
 if(stagevalue>product)
 {
   stageBulb.material.color=green_color
   console.log(stageBulb.name)
  stagesResultAlert [count]=field.value = "Pass"
  changeInputClass(field,stagesResultAlert [count])
    }
    else
    {
    
    numOfFails+=1
    stagesResultAlert [count]=field.value = "Fail"
    changeInputClass(field,stagesResultAlert [count])
    console.log(stageBulb.name)
    stageBulb.material.color=red_color
  }
  console.log(numOfFails)
  console.log(count)
  if(count>=4)
  {
    if(numOfFails>1)
    {  
      result="Fail"
    }else{
      result="Pass"
    }
  }else{
    result="Pending"
  }
  
}
export {setValue,stagesResultAlert,result}
//change color of stages field

function changeInputClass(field,res)
  {
    console.log("result is "+res)
    if(res=="Fail"){
    field.classList.remove("btn-outline-secondary");
    field.classList.add("btn-outline-danger");
  }else{
    field.classList.remove("btn-outline-secondary");
    field.classList.add("btn-outline-success");

  }
}


