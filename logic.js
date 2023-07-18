var count=0
 var numOfFails=0
 var result
 var check = document.getElementById("submitFields");
 check.addEventListener("click", () =>
 {
  ID = document.getElementById('ProductID').value;
  temp = document.getElementById('Temperature').value;
  weight = document.getElementById('Weight').value;
  quantity = document.getElementById('quantity').value;
  dimentions = document.getElementById('Dimentions').value;
    stage1value = document.getElementById('stage1value').value
    stage2value = document.getElementById('stage2value').value
    stage3value =document.getElementById('stage3value').value
    stage4value =document.getElementById('stage4value').value

 // Do something with the field values
 // ...
 console.log(ID,temp,weight,quantity,dimentions)
console.log(stage1value,stage2value,stage3value,stage4value)
 });
 
   
function setValue(field,stagevalue,product) 
{
  count+=1;
 if(stagevalue>product)
 {
    field.value = "Pass";
    }
    else
    {
    changeInputClass(field)
    numOfFails+=1
    field.value="Fail"
  }
  console.log(numOfFails)
  console.log(count)
  if(count===4)
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

function changeInputClass(field) 
  {
    field.classList.remove("btn-outline-success");
    field.classList.add("btn-outline-danger");
  }

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
    `<table class="table">
          <thead>
            <tr>
              <th scope="col">ProductID</th>
              <th scope="col">Temperature</th>
              <th scope="col">Weight</th>
              <th scope="col">Quantity</th>
              <th scope="col">Dimentions</th>
            </tr>
          </thead>
          <tbody> 
            <tr>
              <th scope="row">${ID}</th>
              <td>${temp}</td>
              <td>${weight}</td>
              <td>${quantity}</td>
              <td>${dimentions}</td>
            </tr>
            <tr>
              <td scope="col" colspan="2">Product Status</td>
              <td colspan="3">${result}</td>
           </tr>
          </tbody>
        </table>
    </div>`
  ].join('')

  alertPlaceholder.append(wrapper)
}
 
