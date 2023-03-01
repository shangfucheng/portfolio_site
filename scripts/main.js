window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
    let funCards = document.getElementById('fun_cards');
    funCards.addEventListener('mouseover', (event)=>{
        windowWidth = 800;
        windowHeight = 800;
        mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
        mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
        
        document.getElementById('fun_cards').style.background = ('radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #2a2b29)');
    });
    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((c)=>{
        c.addEventListener('mouseover', (event)=>{
            windowWidth = 300;
            windowHeight = 260;
            mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
            mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
            c.style.background = ('radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #00f7ef, #2a2b29)');

            let text = c.querySelectorAll('p');
            Array.from(text).forEach((txt)=>{
                txt.style.visibility = 'visible';
            });
        });
    });
}

