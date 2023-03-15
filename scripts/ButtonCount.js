/* 
* movie shadow dom
* dynamically add new <movie-rate> when add button clicked
* either create a empty <movie-rate> or
* update current <movie-rate> with data input.
*/
class buttonCount extends HTMLElement {
    
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
     *                          "click": count,
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;

      let shadowRoot = this.shadowRoot;

      // create new task div element
      let clickBtn = document.createElement('button');
      clickBtn.setAttribute("id", "clickBtn");
      clickBtn.setAttribute('type', 'button');
      // add task element valuse.
      clickBtn.innerHTML += `Times Clicked: ${data["click"]}`;
      
      shadowRoot.appendChild(clickBtn);

      let style = document.createElement("style");
      style.textContent = `
        /*style for click btn*/
        button {
            font-size: 10em;
            padding: 12px 20px;
            border-radius: 10px;
            box-sizing: border-box;
            color:#2003fc;
            padding:5px 15px; 
            background:transparent; 
            cursor: pointer;
            transition: all 0.15s;
        }
      `;
      shadowRoot.append(style);
    }
    
  }
  // define <button-count>
  customElements.define("button-count", buttonCount);






