console.log('welcome to postmaster');

//initally hide parameters box
let parameters = document.getElementById('parameters');
let requestJsonBox = document.getElementById('requestJsonBox');

parameters.style.display = 'none';


//if user chooses json format, hide jsonbox and show paramaeters box

jsonradio = document.getElementById('json');
jsonradio.addEventListener('click', () => {
    parameters.style.display = 'none';

    requestJsonBox.style.display = 'block';
});

//if user chooses custom parameters format, hide jsonbox and show paramaeters box

paramsradio = document.getElementById('params');
paramsradio.addEventListener('click', () => {
    requestJsonBox.style.display = 'none';
    parameters.style.display = 'block';

});


// if the user clicks on plus button, add more parameters
let addParamCount =1;
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', ()=>{
    let div = document.createElement('div');
    div.innerHTML=` 
    <div class="row g-3 my-1">
        <legend class="col-form-label col-sm-2 pt-0">Enter Parameter ${addParamCount+1} </legend>

        <div class="col">
            <input type="text" id="paramkey${addParamCount+1}" class="form-control" placeholder="Parameter key"
                aria-label="First name">
        </div>
        <div class="col">
            <input type="text" id="paramval${addParamCount+1}" class="form-control" placeholder="Parameter value"
                aria-label="Last name">
        </div>
        <div class="col">
            <button class="btn btn-primary subtractParams">-</button>
        </div>
    </div>`
    addParamCount++;
    parameters.appendChild(div);
// to remove parameters
// issue : while removing a parameter which is not the last -1. confirm occurs in loop  2. numeric parameter values become disordered
let subtractParams= document.getElementsByClassName('subtractParams');
for(item of subtractParams){
    item.addEventListener('click', (e)=>{
       confirm('Do u want to delete this parameter?');
        e.target.parentElement.parentElement.remove();
        addParamCount--;

})
}

})

let submit=document.getElementById('submit');
submit.addEventListener('click', ()=>{
    document.getElementById('responseJsonText').value="Please wait.... Fetching response.."
    let url= document.getElementById('url').value;
    let reqType = document.querySelector("input[name='reqtype']:checked").value;
    let contype = document.querySelector("input[name='contype']:checked").value;


    if(contype=='params'){
        data ={};
        for(let i=0;i<addParamCount+1;i++){
            if(document.getElementById("paramkey"+(i+1))!=undefined){
            let paramkey=document.getElementById("paramkey"+(i+1) ).value;
            let paramval = document.getElementById("paramval"+(i+1) ).value;
            data[paramkey] = paramval;
            }
        }
        data=JSON.stringify(data);
    }
    else{
        data=document.getElementById('requestJsonText').value;
    }
    //  log all the values on console for the purpose of debugging
    console.log('url is :' , url);

    console.log('request type is : ',  reqType);
    console.log('content type is : ', contype);
    console.log('data is : ', data);

    if(reqType=='get'){
        fetch(url, {
            method: 'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value=text;
        })
    }
    else{
        fetch(url, {
            method: 'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value=text;
        })
    }

})

document.addEventListener('keydown', (event)=> {
    try {
  
      if (event.shiftKey) {
        submit.click();
        console.log("shift pressed");
      }
  
    } catch (err) {
      console.log(err);
    }
  });