/* 
* movie shadow dom
* dynamically add new <movie-rate> when add button clicked
* either create a empty <movie-rate> or
* update current <movie-rate> with data input.
*/
class moviePost extends HTMLElement {
    
    constructor() {
      super(); // Inheret everything from HTMLElement
      const shadowRoot = this.attachShadow({ mode: "open" });
    }
  
    /**
     * Called when the .data property is set on this element.
     *
     * @param {Object} data - The data to pass into the <task-card>, must be of the
     *                        following format:
     *                        {
     *                          "title": "movie title",
     *                          "date": "movie date", 
     *                          "rate":"movie rate", 
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;

      let shadowRoot = this.shadowRoot;

      // create new task div element
      let newMovie = document.createElement('span');
      newMovie.setAttribute("class", "movie_lists")
      // add task element valuse.
      newMovie.innerHTML += ` 
        ${data["title"]} (${data["year"]}) - Rated: ${data["rate"]}
        `;
      let mvBtn = document.createElement('span');
      mvBtn.innerHTML += `
      <button type="submit" class="editBtn" >Edit</button>
      <button type="submit" class="deleteBtn" >Delete</button>
      <br>`
      shadowRoot.appendChild(newMovie);
      shadowRoot.appendChild(mvBtn);

      let style = document.createElement("style");
      style.textContent = `
        li{
            background: #f4ecec;
            width: 80%;
            border: solid 1px;
            border-radius: 5px;
            padding: 10px 10px;
            margin: 8px;
        }
        /*style for submit btn*/
        button[type=submit] {
            color: #03324a;
            padding:5px 15px; 
            background:transparent; 
            border:0 none;
            cursor: pointer;
            -webkit-border-radius: 5px;
            border-radius: 10px; 
            transition: all 0.15s;
        }
        button[type=submit]:hover {
            color:#1DDDDD;
        }
      `;
      // shadowRoot.append(style);
    }
    
  }
  // define <movieRate>
  customElements.define("movie-rate", moviePost);






