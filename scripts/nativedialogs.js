import {customAlertCall, customConfirmCall, customPromptCall} from "./customdialog.js";

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
    /*for simple dialog*/
    alertCall();
    confirmCall();
    promptCall();
    saferPromptCall();
    /*for custom dialog*/
    customAlertCall();
    customConfirmCall();
    customPromptCall();
}

function alertCall(){
    document.getElementById("output").innerHTML = "";
    let alertBtn = document.getElementById("alert");
    alertBtn.addEventListener("click", (event) => {
        /*setTimeout() will put alert call in callback Queue, 
         *only going to execute after call stack empty,
         *So document.getElementById("output").textContent = "";
         *will be called first, and when it finished, the first
         *function in callback queue will be call*/
        setTimeout(()=>{alert("alert pressed!")},0);
        /*Will be called first in call stack*/
        document.getElementById("output").textContent = "";
    });
}

function confirmCall(){
    document.getElementById("output").textContent = "";
    let confirmBtn = document.getElementById("confirm");
    confirmBtn.addEventListener("click", (event)=>{
        /*will be hold at callback Queue until call stack empty*/
        setTimeout(()=>{
            let confirmed;
            if (confirm("Do you confirm this?")) {
                confirmed = `The value returned by the confirm method is : true`;
            } else {
                confirmed = `The value returned by the confirm method is : false`;
            }
            document.getElementById("output").textContent = confirmed;
        }, 0);
        /*called first*/
        document.getElementById("output").textContent = "";
    });
}

function promptCall(){
    document.getElementById("output").textContent = "";
    let pmt = document.getElementById("prompt");
    pmt.addEventListener("click", (event)=>{
        /*will be hold at callback Queue until call stack empty*/
        setTimeout(()=>{
            let p = prompt("What is your Name?", `\<b onmouseover=\"alert('pwned')\"\>Roll me\<\/b\>`);
            if (p != null) {
                document.getElementById("output").innerHTML = `prompt result: ${p}`;
            }
            else{
                document.getElementById("output").textContent = "User didn\’t enter anything!";
            }
        },0);
        /*called first*/
        document.getElementById("output").textContent = "";
    });
}

function saferPromptCall(){
    document.getElementById("output").textContent = "";
    let sfPmt = document.getElementById("sf_prompt");
    sfPmt.addEventListener("click", (event)=>{
        /*will be hold at callback Queue until call stack empty*/
        setTimeout(()=>{
            let p = prompt("What is your Name?", `\<b onmouseover=\"alert('pwned')\">Roll me\</b\>`);
            if(p != null){
                const clean = DOMPurify.sanitize(p);
                document.getElementById("output").innerHTML = `Safer Prompt Result: ${clean}`;
            }else{
                document.getElementById("output").textContent = "User didn’t enter anything!";
            }
        },0);
        /*called first*/
        document.getElementById("output").textContent = "";
    });   
}

