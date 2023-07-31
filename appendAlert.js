import {CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import {ID,temp,weight,quantity,dimentions} from './logic.js'
import { stagesResultAlert,result} from './logic.js';
import { realboxMesh5 } from './animation.js';

var productLabel
const appendAlert = () => {
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

  export{appendAlert,removeAlert}