window.addEventListener("DOMContentLoaded", init);
function init(){
    selectAPI();
    /*select ajax as default when page first load*/
    let apiBtn = document.getElementsByClassName("apiSel")[0].getElementsByTagName('input');
    apiBtn[0].click();   
}

function selectAPI(){
    let apiBtn = document.getElementsByClassName("apiSel")[0].getElementsByTagName('input');
    apiBtn[0].onclick = function (){
        let getBtn = document.getElementById("getBtn");
        getBtn.removeEventListener('click', getFetch);
        getBtn.addEventListener('click', get);
        let postBtn = document.getElementById("postBtn");
        postBtn.addEventListener('click', post);
        let putBtn = document.getElementById("putBtn");
        putBtn.addEventListener('click', put);
        let deleteBtn = document.getElementById("deleteBtn");
        deleteBtn.addEventListener('click', deletePost);
    }
    apiBtn[1].onclick = function (){
        let getBtn = document.getElementById("getBtn");
        getBtn.removeEventListener('click', get);
        getBtn.addEventListener('click', getFetch);
        let postBtn = document.getElementById("postBtn");
        postBtn.addEventListener('click', postFetch);
        let putBtn = document.getElementById("putBtn");
        putBtn.addEventListener('click', putFetch);
        let deleteBtn = document.getElementById("deleteBtn");
        deleteBtn.addEventListener('click', deleteFetch);
    }
}
    

function get(){
    const Http = new XMLHttpRequest();
    let url='https://httpbin.org/get';
    let methodForm = document.querySelectorAll('input');
    let articleBody = document.querySelector('textarea');
    let query = `?id=${methodForm[0].value}&article_name=${methodForm[1].value}&article_body=${articleBody.value}`
    url += query;
    console.log(url);

    Http.onreadystatechange = (e) => {
        if(Http.readyState===XMLHttpRequest.DONE){
            if(Http.status===200){
                document.getElementById("response").innerHTML = "";
                let response = JSON.parse(Http.responseText);
                /*Header table first*/
                let text = "";
                for (let x in response) {
                    text = "<table border='1' style='width:100%' >"
                    text += '<caption>'+ x + '</caption>'
                    try{
                        if(typeof(response[x])==='object' && Object.keys(response[x]).length > 1){
                            for(let y in response[x]){
                                text += "<tr>"
                                text += "<th>" + y  + "</th>";
                                text += "<td>" + response[x][y] + "</td>";
                                text += "</tr>";
                            }
                        }else{
                            text += "<tr>"
                            text += "<th>" + x + "</th>";
                            text += "<td>" + JSON.stringify(response[x]) + "</td>";
                            text += "</tr>";
                        }
                    }catch(e){
                        console.log(e);
                    }
                    text += "</table>"
                    document.getElementById("response").innerHTML += text;
                }
            }else{
                console.log("there is a problem of this get request!");
            }
        }
    }
        
    Http.open("GET", url);
    Http.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
        );
    Http.send();
}

function post(){
    const Http = new XMLHttpRequest();
    const url='https://httpbin.org/post';
    let methodForm = document.querySelectorAll('input');
    let articleBody = document.querySelector('textarea');
    const form = document.getElementById('methodForm');
    const formData = new FormData(form);
    let FD = {
        id: methodForm[0].value,
        article_name: methodForm[1].value,
        articcle_body: articleBody.value
    }

    // for([key, value] of formData) console.log(key, value);
    Http.onreadystatechange = (e) => {
        if(Http.readyState===XMLHttpRequest.DONE){
            if(Http.status===200){
                let response = JSON.parse(Http.responseText);
                document.getElementById("response").innerHTML = "";
                /*Header table first*/
                let text = "";
                for (let x in response) {
                    text = "<table border='1' style='width:100%' >"
                    text += '<caption>'+ x + '</caption>'
                    try{
                        if(typeof(response[x])==='object' && Object.keys(response[x]).length > 1){
                            for(let y in response[x]){
                                text += "<tr>"
                                text += "<th>" + y  + "</th>";
                                text += "<td>" + response[x][y] + "</td>";
                                text += "</tr>";
                            }
                        }else{
                            text += "<tr>"
                            text += "<th>" + x + "</th>";
                            text += "<td>" + JSON.stringify(response[x]) + "</td>";
                            text += "</tr>";
                        }
                    }catch(e){
                        console.log(e);
                    }
                    text += "</table>"
                    document.getElementById("response").innerHTML += text;
                }
            }else{
                console.log("there is a problem of this post request!");
            }
        }
    }

    Http.open("POST", url, true);
    Http.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
        );
    Http.send(FD);
}

function put(){
    const Http = new XMLHttpRequest();
    const url='https://httpbin.org/put';
    let methodForm = document.querySelectorAll('input');
    let articleBody = document.querySelector('textarea');
    let form = document.querySelector('#methodForm');
    const formData = new FormData(form);
    
    Http.onreadystatechange = (e) => {
        if(Http.readyState===XMLHttpRequest.DONE){
            if(Http.status===200){
                document.getElementById("response").innerHTML = "";
                let response = JSON.parse(Http.responseText);
                /*Header table first*/
                let text = "";
                for (let x in response) {
                    text = "<table border='1' style='width:100%' >"
                    text += '<caption>'+ x + '</caption>'
                    try{
                        if(typeof(response[x])==='object' && Object.keys(response[x]).length > 1){
                            for(let y in response[x]){
                                text += "<tr>"
                                text += "<th>" + y  + "</th>";
                                text += "<td>" + response[x][y] + "</td>";
                                text += "</tr>";
                            }
                        }else{
                            text += "<tr>"
                            text += "<th>" + x + "</th>";
                            text += "<td>" + JSON.stringify(response[x]) + "</td>";
                            text += "</tr>";
                        }
                    }catch(e){
                        console.log(e);
                    }
                    text += "</table>"
                    document.getElementById("response").innerHTML += text;
                }
            }else{
                console.log("there is a problem of this put request!");
            }
        }
    }

    Http.open("PUT", url, true);
    Http.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
        );
    Http.send(formData);
}

function deletePost(){
    const Http = new XMLHttpRequest();
    let url='https://httpbin.org/delete';
    let methodForm = document.querySelectorAll('input');
    let articleBody = document.querySelector('textarea');
    url+= `?id=${methodForm[0].value}&article_name=${methodForm[1].value}&article_body=${articleBody.value}`
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
                document.getElementById("response").innerHTML = "";
                let response = JSON.parse(Http.responseText);
                /*Header table first*/
                let text = "";
                for (let x in response) {
                    text = "<table border='1' style='width:100%' >"
                    text += '<caption>'+ x + '</caption>'
                    try{
                        if(typeof(response[x])==='object' && Object.keys(response[x]).length > 1){
                            for(let y in response[x]){
                                text += "<tr>"
                                text += "<th>" + y  + "</th>";
                                text += "<td>" + response[x][y] + "</td>";
                                text += "</tr>";
                            }
                        }else{
                            text += "<tr>"
                            text += "<th>" + x + "</th>";
                            text += "<td>" + JSON.stringify(response[x]) + "</td>";
                            text += "</tr>";
                        }
                    }catch(e){
                        console.log(e);
                    }
                    text += "</table>"
                    document.getElementById("response").innerHTML += text;
                }
            }else{
                console.log("there is a problem of this delete request!");
            }
        }
    }

    Http.open("DELETE", url, true);
    // Http.setRequestHeader(
    //     "Content-Type",
    //     "application/x-www-form-urlencoded"
    //   );
    Http.send();
}


function getFetch(){
    let url='https://httpbin.org/get';
    let methodForm = document.querySelectorAll('input');
    let articleBody = document.querySelector('textarea');
    let query = `?id=${methodForm[0].value}&article_name=${methodForm[1].value}&article_body=${articleBody.value}`
    url += query;
    // Default options are marked with *
    fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
        // "Content-Type": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        
    }).then((response) => response.json())
    .then((data) => {
        document.getElementById("response").innerHTML = "";
        /*Header table first*/
        let text = "";
        for (let x in data) {
            text = "<table border='1' style='width:100%' >"
            text += '<caption>'+ x + '</caption>'
            try{
                if(typeof(data[x])==='object' && Object.keys(data[x]).length > 1){
                    for(let y in data[x]){
                        text += "<tr>"
                        text += "<th>" + y  + "</th>";
                        text += "<td>" + data[x][y] + "</td>";
                        text += "</tr>";
                    }
                }else{
                    text += "<tr>"
                    text += "<th>" + x + "</th>";
                    text += "<td>" + JSON.stringify(data[x]) + "</td>";
                    text += "</tr>";
                }
            }catch(e){
                console.log(e);
            }
            text += "</table>"
            document.getElementById("response").innerHTML += text;
        }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function postFetch(){
    let url='https://httpbin.org/post';
    let form = document.querySelector('#methodForm');
    const formData = new FormData(form);
    // Default options are marked with *
    fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
        // "Content-Type": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        
    }).then((response) => response.json())
    .then((data) => {
        document.getElementById("response").innerHTML = "";
        /*Header table first*/
        let text = "";
        for (let x in data) {
            text = "<table border='1' style='width:100%' >"
            text += '<caption>'+ x + '</caption>'
            try{
                if(typeof(data[x])==='object' && Object.keys(data[x]).length > 1){
                    for(let y in data[x]){
                        text += "<tr>"
                        text += "<th>" + y  + "</th>";
                        text += "<td>" + data[x][y] + "</td>";
                        text += "</tr>";
                    }
                }else{
                    text += "<tr>"
                    text += "<th>" + x + "</th>";
                    text += "<td>" + JSON.stringify(data[x]) + "</td>";
                    text += "</tr>";
                }
            }catch(e){
                console.log(e);
            }
            text += "</table>"
            document.getElementById("response").innerHTML += text;
        }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function putFetch(){
    let url='https://httpbin.org/put';
    let form = document.querySelector('#methodForm');
    const formData = new FormData(form);

    // Default options are marked with *
    fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
        // "Content-Type": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        
    }).then((response) => response.json())
    .then((data) => {
        document.getElementById("response").innerHTML = "";
        /*Header table first*/
        let text = "";
        for (let x in data) {
            text = "<table border='1' style='width:100%' >"
            text += '<caption>'+ x + '</caption>'
            try{
                if(typeof(data[x])==='object' && Object.keys(data[x]).length > 1){
                    for(let y in data[x]){
                        text += "<tr>"
                        text += "<th>" + y  + "</th>";
                        text += "<td>" + data[x][y] + "</td>";
                        text += "</tr>";
                    }
                }else{
                    text += "<tr>"
                    text += "<th>" + x + "</th>";
                    text += "<td>" + JSON.stringify(data[x]) + "</td>";
                    text += "</tr>";
                }
            }catch(e){
                console.log(e);
            }
            text += "</table>"
            document.getElementById("response").innerHTML += text;
        }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function deleteFetch(){
    let url='https://httpbin.org/delete';
    let methodForm = document.querySelectorAll('input');
    let articleBody = document.querySelector('textarea');
    let query = `?id=${methodForm[0].value}&article_name=${methodForm[1].value}&article_body=${articleBody.value}`
    url += query;
    // Default options are marked with *
    fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
        // "Content-Type": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        
    }).then((response) => response.json())
    .then((data) => {
        document.getElementById("response").innerHTML = "";
        /*Header table first*/
        let text = "";
        for (let x in data) {
            text = "<table border='1' style='width:100%' >"
            text += '<caption>'+ x + '</caption>'
            try{
                if(typeof(data[x])==='object' && Object.keys(data[x]).length > 1){
                    for(let y in data[x]){
                        text += "<tr>"
                        text += "<th>" + y  + "</th>";
                        text += "<td>" + data[x][y] + "</td>";
                        text += "</tr>";
                    }
                }else{
                    text += "<tr>"
                    text += "<th>" + x + "</th>";
                    text += "<td>" + JSON.stringify(data[x]) + "</td>";
                    text += "</tr>";
                }
            }catch(e){
                console.log(e);
            }
            text += "</table>"
            document.getElementById("response").innerHTML += text;
        }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sayhello', (req, res) => {
    const name = req.body.name;
    const message = `Hello ${name}`;

    if (req.headers['sent-by'] === 'JavaScript') {
        res.json({ message: message });
    } else {
        // super terrible short version here - use a template middleware for a better version
        res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Hello!</title></head><body><h1>${message}</h1></body></html>`);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});