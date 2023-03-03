window.addEventListener("DOMContentLoaded", init);
let movieMap = new Map();
let movieArry = [];
// Starts the program, all function calls trace back here
function init() {
    if(movieArry.length ==0 && movieMap.size==0) document.getElementById("default").innerHTML = `NO Movies currently liste.`;
    else document.getElementById("default").innerHTML = "";
    movieArry = getMoviesFromStorage();
    arryToMap();
    loadMoviesFromDB(movieMap);
    movieRating();
    styleShadowDom();

    /*Add basic Style*/
    document.getElementById("default").style.textAlign = 'center';
    document.getElementById("default").style.fontSize = 'x-large';
    let btnDiv = document.getElementById('add_btn_div');
    btnDiv.style.display = 'flex';
    btnDiv.style.alignItems = 'cneter';
    btnDiv.style.justifyContent = 'center';
    document.body.style.backgroundColor = "skyBlue";
    let addBtn = document.getElementById('add_movie');
    addBtn.style.cursor = 'pointer' ;

    addBtn.onmouseover = (()=>{
        addBtn.style.backgroundColor="orange";
    });
    addBtn.onmouseout = (()=>{
        addBtn.style.backgroundColor = 'white';
    });

}

/*Function that convert movieMap(map) to movieArry(array)
 *So can be used to set localStorage*/ 
function mapToArry(){
    movieArry = [];
    for (let [movieID, value] of movieMap) {
        movieArry.push(value);
    }
}

/*Function that convert  movieArry(array) that read from localStorage
 *to movieMap(map) to load all the movies*/ 
function arryToMap(){
    Array.from(movieArry).forEach((movie)=>{
        if(!movieMap.has(movie['id'])){
            movieMap.set(movie['id'], {
                id: movie['id'],
                title: movie['title'],
                year: movie['year'],
                rate: movie['rate']
            })
        }
    });
}

/*Function that loads movies from localStorage*/
function loadMoviesFromDB(movieDB){
    if (movieDB.length === 0) return;

    let movieBlock = document.getElementById("movies");
    for (let [movieID, value] of movieDB) {
        document.getElementById("default").innerHTML ="";
        let mv = document.createElement("movie-rate");
        mv.data = value;
        mv.setAttribute("id", movieID);
        movieBlock.insertBefore(mv, movieBlock.lastChild);
        addBtnFunction(movieID);
    }
}

/**
 * This function saves the movies to localStorage
 *
 * @param {Array<Object>}  An array of movies
 */
function saveMoviesToStorage(savedMovies) {
    localStorage.setItem("movieDB", JSON.stringify(savedMovies));
}


function getMoviesFromStorage() {
    if (localStorage.getItem("movieDB")) {
        return JSON.parse(localStorage.getItem("movieDB"));
    } else {
        return [];
    }
}

/*Function to generate and pop input dialog for user to 
 *add movies*/
function popDialog(mv){
    let movieDialog = document.getElementById("movie_dialog");
    const dialogForm = document.createElement('form');
    dialogForm.setAttribute("method", "dialog");
    dialogForm.style.width = "500px";
    dialogForm.style.height = "200px";
    dialogForm.style.display = 'flexbox';
    dialogForm.style.alignItems = 'center';
    dialogForm.style.justifyContent = 'center';
    dialogForm.style.textAlign = 'left';
    const titleTxt = document.createElement('label');
    titleTxt.innerHTML = `Title: `;
    const titleInputBox = document.createElement("input");
    titleInputBox.setAttribute("id", "title_input");
    let obj = movieMap.get(mv);
    if(movieMap.has(mv)) titleInputBox.value = obj['title'];
    const titleDiv = document.createElement('div');
    titleDiv.appendChild(titleTxt);
    titleDiv.appendChild(titleInputBox);
    const yearTxt = document.createElement('label');
    yearTxt.innerHTML = `Year of Release: `;
    const yearInputBox = document.createElement("input");
    yearInputBox.setAttribute("id", "year_input");
    if(movieMap.has(mv)) yearInputBox.value = obj['year'];
    const yearDiv = document.createElement('div');
    yearDiv.appendChild(yearTxt);
    yearDiv.appendChild(yearInputBox);
    /*************Rating selection menu************/
    const ratingSelec = document.createElement("select");
    ratingSelec.setAttribute("id", "rate_select");
    const rate_G = document.createElement("option");
    rate_G.value = "G";
    rate_G.innerHTML = "G";
    const rate_PG = document.createElement("option");
    rate_PG.value = "PG";
    rate_PG.innerHTML = "PG";
    const rate_PG13 = document.createElement("option");
    rate_PG13.value = "PG-13";
    rate_PG13.innerHTML = "PG-13";
    const rate_R = document.createElement("option");
    rate_R.value = "R";
    rate_R.innerHTML = "R";
    const rate_NR = document.createElement("option");
    rate_NR.value = "NR";
    rate_NR.innerHTML = "NR";
    ratingSelec.appendChild(rate_G);
    ratingSelec.appendChild(rate_PG);
    ratingSelec.appendChild(rate_PG13);
    ratingSelec.appendChild(rate_R);
    ratingSelec.appendChild(rate_NR);
    if(movieMap.has(mv)) ratingSelec.value = obj['rate'];
    /*************END of Rating selection menu************/
    let mv_list = document.getElementById("movies");
    const saveBtn = document.createElement('button');
    saveBtn.textContent = `Save`;

    if(mv==0){
        saveBtn.addEventListener("click",(event)=>{
            const cleanTitle = DOMPurify.sanitize(titleInputBox.value);
            const cleanYear = DOMPurify.sanitize(yearInputBox.value);
            const rateSel = document.getElementById("rate_select");
            const rs = rateSel.options[rateSel.selectedIndex].value;
            let movieID = "movie"+Math.floor(Math.random() * 99999) +
            (Math.random() + 1).toString(36).substring(7);;
            movieMap.set(movieID, {
                id: movieID,
                title: cleanTitle,
                year: cleanYear,
                rate: rs
            })
            let newMov = document.createElement("movie-rate");
            newMov.setAttribute("id", movieID);
            newMov.data = movieMap.get(movieID);
            document.getElementById("default").innerHTML ="";
            mv_list.insertBefore(newMov, mv_list.lastChild);
            mapToArry();
            saveMoviesToStorage(movieArry);
            addBtnFunction(movieID);
            styleShadowDom()
        });
    }else{
        saveBtn.addEventListener("click",(event)=>{
            const cleanTitle = DOMPurify.sanitize(titleInputBox.value);
            const cleanYear = DOMPurify.sanitize(yearInputBox.value);
            const rateSel = document.getElementById("rate_select");
            const rs = rateSel.options[rateSel.selectedIndex].value;
            movieMap.set(mv, {
                id: mv,
                title: cleanTitle,
                year: cleanYear,
                rate: rs
            });
            let editMv = document.getElementById(mv).shadowRoot;
            editMv.firstChild.textContent =`${cleanTitle} (${cleanYear}) - Rated: ${rs}` ;  
            mapToArry();
            saveMoviesToStorage(movieArry); 
        });
    }
    titleDiv.style.marginTop = '25px';
    titleDiv.style.marginBottom = '20px';
    yearDiv.style.marginBottom = '20px';
    ratingSelec.style.marginBottom = '20px';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = `Cancel`;
    cancelBtn.addEventListener("close",(event)=>{});
    const btnDiv = document.createElement('div');
    btnDiv.appendChild(saveBtn);
    btnDiv.appendChild(cancelBtn);
    dialogForm.appendChild(titleDiv);
    dialogForm.appendChild(yearDiv);
    dialogForm.appendChild(ratingSelec);
    dialogForm.appendChild(btnDiv);
    // dialogForm.addEventListener("close",()=>{});
    movieDialog.appendChild(dialogForm);
    movieDialog.showModal();
}

function movieRating(){
    let movieDialog = document.getElementById("movie_dialog");
    let addMovie = document.querySelector("#add_movie");
    addMovie.addEventListener("click", (event)=>{
        setTimeout(()=>{
            popDialog(0);
        },0);  
        
        while (movieDialog.firstChild) {
            movieDialog.removeChild(movieDialog.firstChild);
        }
        if(movieArry.length ==0) document.getElementById("default").innerHTML = `NO Movies currently liste.`;
        else document.getElementById("default").innerHTML ="";
    });
}


/**
 * add delete, edit, confirm functionality to newly added movie
 *
 * @param {string} movieID a string that represents a specific movie
 */
function addBtnFunction(movieID) {
    deleteMovie(movieID);
    editMovie(movieID);
  }


/**
 * give newest edit btn functionality to edit relevant movie input
 * on click edit.
 *
 * @param {string} movieID a string that represents a specific task
 */
function editMovie(movieID) {
    let movieBlock = document.getElementById(movieID);
    let shadowRoot = movieBlock.shadowRoot;
    let editBtn = shadowRoot.childNodes[1].getElementsByClassName("editBtn")[0];
    editBtn.addEventListener("click", (event) => {
        let movieDialog = document.getElementById("movie_dialog");
        while (movieDialog.firstChild) {
            movieDialog.removeChild(movieDialog.firstChild);
        }
        popDialog(movieID);
    });
  }


  /**
 * give newest delete btn functionality to remove relevant task
 * on click delete, will remove the task shadow dom and remove from
 * localstorage.
 *
 * @param {string} movieID a string that represents a specific movie
 */
function deleteMovie(movieID) {
    // get current localStorage
    let movieBlock = document.getElementById(movieID);
    let shadowRoot = movieBlock.shadowRoot;

    let deleteBtn = shadowRoot.childNodes[1].getElementsByClassName("deleteBtn")[0];
    deleteBtn.addEventListener("click", (event) => {
        if(movieMap.size==0) return;
        movieMap.delete(movieID);
        movieBlock.remove();
        mapToArry();
        // saved modified movies to localstorage
        saveMoviesToStorage(movieArry);
        if(movieArry.length ==0 || movieMap.size==0) document.getElementById("default").innerHTML = `NO Movies currently liste.`;
        else document.getElementById("default").innerHTML ="";
    });
  }

  /*Style function to assign style to all shadowDom cards*/
  function styleShadowDom(){
    document.querySelectorAll("movie-rate").forEach(mr => {
        mr.style.display = "flex";
        mr.shadowRoot.children[1].style.margin = "30px";
        mr.shadowRoot.children[0].style.fontSize = "x-large";
    });
  }