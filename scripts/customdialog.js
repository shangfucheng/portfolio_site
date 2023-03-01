
export function customAlertCall(){
    let customDialog = document.getElementById("dialog");
    let alert = document.querySelector("#c_alert");
    alert.addEventListener("click", (event)=>{
        setTimeout(()=>{
            const alertTxt = document.createElement('h2');
            alertTxt.innerHTML = `Alert is Pressed.`;
            const alertBtn = document.createElement('button');
            alertBtn.textContent = `OK`;
            const dialogForm = document.createElement('form');
            dialogForm.setAttribute("method", "dialog");
            dialogForm.appendChild(alertTxt);
            dialogForm.appendChild(alertBtn);
            dialogForm.addEventListener("close",()=>{});
            customDialog.appendChild(dialogForm);
            customDialog.showModal();
        },0);  
        while (customDialog.firstChild) {
            customDialog.removeChild(customDialog.firstChild);
        }
        document.getElementById("output2").innerHTML = "";
    });
}

export function customConfirmCall(){
    let customDialog = document.getElementById("dialog");
    let confirm = document.querySelector("#c_confirm");
    confirm.addEventListener("click", (event)=>{
        setTimeout(()=>{
            const confirmTxt = document.createElement('h2');
            confirmTxt.innerHTML = `Do you confirm this?.`;
            const okBtn = document.createElement('button');
            okBtn.textContent = `OK`;
            let output = document.getElementById("output2");
            okBtn.addEventListener("click",(event)=>{
                output.innerHTML = `Confirm result: true`;
            });
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = `Cancel`;
            cancelBtn.addEventListener("click",(event)=>{
                output.innerHTML = `Confirm result: false`;
            });
            const spanBlk = document.createElement('span');
            spanBlk.appendChild(okBtn);
            spanBlk.appendChild(cancelBtn);
            const dialogForm = document.createElement('form');
            dialogForm.setAttribute("method", "dialog");
            dialogForm.appendChild(confirmTxt);
            dialogForm.appendChild(spanBlk);
            dialogForm.addEventListener("close",()=>{});
            customDialog.appendChild(dialogForm);
            customDialog.showModal();
        },0);  
        while (customDialog.firstChild) {
            customDialog.removeChild(customDialog.firstChild);
        }
        document.getElementById("output2").innerHTML = "";
    });
}

export function customPromptCall(){
    let customDialog = document.getElementById("dialog");
    let prompt = document.querySelector("#c_prompt");
    prompt.addEventListener("click", (event)=>{
        setTimeout(()=>{
            const promptTxt = document.createElement('p');
            promptTxt.innerHTML = `What is your name?.`;
            const inputBox = document.createElement("input");
            const okBtn = document.createElement('button');
            okBtn.textContent = `OK`;
            let output = document.getElementById("output2");
            okBtn.addEventListener("click",(event)=>{
                const clean = DOMPurify.sanitize(inputBox.value);
                output.innerHTML = `Prompt result: ${clean}`;
            });
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = `Cancel`;
            cancelBtn.addEventListener("click",(event)=>{
                output.innerHTML = `No user Input!`;
            });
            const spanBlk = document.createElement('span');
            spanBlk.appendChild(okBtn);
            spanBlk.appendChild(cancelBtn);
            const dialogForm = document.createElement('form');
            dialogForm.setAttribute("method", "dialog");
            dialogForm.appendChild(promptTxt);
            dialogForm.appendChild(inputBox);
            dialogForm.appendChild(spanBlk);
            dialogForm.addEventListener("close",()=>{});
            customDialog.appendChild(dialogForm);
            customDialog.showModal();
        },0);  
        while (customDialog.firstChild) {
            customDialog.removeChild(customDialog.firstChild);
        }
        document.getElementById("output2").innerHTML = "";
    });
}

