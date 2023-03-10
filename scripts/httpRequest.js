window.addEventListener("DOMContentLoaded", init);
function init(){
    getReq();
    post();
    put();
    deletePost();
}

function getReq(){
    let getbtn = document.getElementById("getBtn");
    getbtn.addEventListener("click",(event)=>{
        const Http = new XMLHttpRequest();
        const url='https://httpbin.org/get';
        let methodForm = document.getElementById("methodForm");
        // methodForm.setAttribute("action", url);
        methodForm.setAttribute("method", "get");
        Http.onload = (e) => {
            if(Http.readyState===XMLHttpRequest.DONE){
                if(Http.status===200){
                    document.getElementById("response").innerHTML = JSON.parse(Http.responseText);
                    console.log(JSON.parse(Http.responseText));
                }else{
                    console.log("there is a problem of this request!");
                }
            }
        }
         
        Http.open("GET", url, true);
        Http.setRequestHeader(
            "Content-Type",
            "application/json"
          );
        Http.send(null);
    }); 
}

function post(){
    let postBtn = document.getElementById("postBtn");
    postBtn.addEventListener("click",(event)=>{
        const Http = new XMLHttpRequest();
        const url='https://httpbin.org/post';
        let methodForm = document.getElementById("methodForm");
        // methodForm.setAttribute("action", url);
        // methodForm.setAttribute("method", "post");
        let postForm = {
            id:document.getElementById('recoedID'),
            article_name:document.getElementById('articleName'),
            article_body:document.getElementById('articleBody')
        }
        Http.onreadystatechange = (e) => {
            if(Http.readyState===XMLHttpRequest.DONE){
                if(Http.status===200){
                    document.getElementById("response").innerHTML = Http.responseText;
                }else{
                    console.log("there is a problem of this request!");
                }
            }
        }

        Http.open("POST", url, true);
        Http.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
        Http.send(JSON.stringify(postForm));
    }); 
}

function put(){
    let putBtn = document.getElementById("putBtn");
    putBtn.addEventListener("click",(event)=>{
        const Http = new XMLHttpRequest();
        const url='https://httpbin.org/put';
        let methodForm = document.getElementById("methodForm");
        // methodForm.setAttribute("action", url);
        // methodForm.setAttribute("method", "post");
         let postForm = {
            id:document.getElementById('recoedID'),
            article_name:document.getElementById('articleName'),
            article_body:document.getElementById('articleBody')
        }
        console.log(postForm);
        Http.onreadystatechange = (e) => {
            if(Http.readyState===XMLHttpRequest.DONE){
                if(Http.status===200){
                    document.getElementById("response").innerHTML = Http.responseText;
                }else{
                    console.log("there is a problem of this request!");
                }
            }
        }

        Http.open("PUT", url, true);
        Http.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
        Http.send();
    }); 
}

function deletePost(){
    let deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.addEventListener("click",(event)=>{
        const Http = new XMLHttpRequest();
        const url='https://httpbin.org/delete';
        let methodForm = document.getElementById("methodForm");
        // methodForm.setAttribute("action", url);
        // methodForm.setAttribute("method", "post");
         let postForm = {
            id:document.getElementById('recoedID'),
            article_name:document.getElementById('articleName'),
            article_body:document.getElementById('articleBody')
        }
        Http.onreadystatechange = (e) => {
            if(Http.readyState===XMLHttpRequest.DONE){
                if(Http.status===200){
                    document.getElementById("response").innerHTML = Http.responseText;
                }else{
                    console.log("there is a problem of this request!");
                }
            }
        }

        Http.open("DELETE", url, true);
        Http.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
        Http.send();
    }); 
}