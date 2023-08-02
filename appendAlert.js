import {CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import {ID,temp,weight,quantity,dimentions} from './logic.js'
import { stagesResultAlert,result} from './logic.js';
import { boxMesh,boxNum } from './boxAnimation.js';
console.log(stagesResultAlert+" this is rhe stage results")

//appends the popup message on top of product
var productLabel=[]
function setValToMesh()
{
  boxMesh[boxNum].ID=ID
  boxMesh[boxNum].temp=temp
  boxMesh[boxNum].weight=weight
  boxMesh[boxNum].quantity=quantity
  boxMesh[boxNum].dimentions=dimentions
  boxMesh[boxNum].result=result
  boxMesh[boxNum].s1=stagesResultAlert[1]
  boxMesh[boxNum].s2=stagesResultAlert[2]
  boxMesh[boxNum].s3=stagesResultAlert[3]
  boxMesh[boxNum].s4=stagesResultAlert[4]
}

 function appendAlert(mesh)  {
  setValToMesh()
   console.log("append to box "+boxNum)
  console.log("box val "+ID,temp,weight,quantity,dimentions)
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
                <td>${mesh.ID}</td>
                <td>${mesh.temp}</td>
                <td>${mesh.weight}</td>
                <td>${mesh.quantity}</td>
                <td>${mesh.dimentions}</td>
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
                  <td>${mesh.s1}</td>
                  <td>${mesh.s2}</td>
                  <td>${mesh.s3}</td>
                  <td>${mesh.s4}</td>
             </tr>
             <tr style ="font-size:10px">
                <th scope="col" colspan="2">Product Status</th>
                <td colspan="3">${mesh.result}</td>
             </tr>
            </tbody>
          </table>
    </div>`
    ].join('')
    wrapper.className = "label";
    wrapper.style.marginTop = "-1em";
     productLabel = new CSS2DObject(wrapper);
    productLabel.position.set(0,1,1);
    mesh.add(productLabel); 
    productLabel.visible=true
    // boxMesh[boxNum].alert=temp
    // console.log(boxMesh[boxNum].alert)
  }

  
  function removeAlert()
  {
   productLabel.visible=false
  }

  export{appendAlert,removeAlert,productLabel,setValToMesh}