window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
    project_animation();
    codeBlock_animation();

    /*Fun card background*/
    // let funCards = document.getElementById('fun_cards');
    // funCards.addEventListener('mouseover', (event)=>{
    //     windowWidth = 800;
    //     windowHeight = 800;
    //     mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
    //     mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
        
    //     document.getElementById('fun_cards').style.background = ('radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #2a2b29)');
    // });

    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((c)=>{
        c.addEventListener('mouseover', (event)=>{
            windowWidth = 300;
            windowHeight = 260;
            mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
            mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
            c.style.background = ('radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #66adad, #535e5e)');

            let text = c.querySelectorAll('p');
            Array.from(text).forEach((txt)=>{
                txt.style.visibility = 'visible';
            });
        });
    });

    let index = 0,
    interval = 1000;

    const rand = (min, max) => 
        Math.floor(Math.random() * (max - min + 1)) + min;

        const animate = star => {
        star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
        star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

        star.style.animation = "none";
        star.offsetHeight;
        star.style.animation = "";
    }

    for(const star of document.getElementsByClassName("magic-star")) {
        setTimeout(() => {
            animate(star);
            
            setInterval(() => animate(star), 1000);
        }, index++ * (interval / 3))
    }

    /*Reset code block vertical line height when window resize*/
    let vHeight = document.querySelector("#codeBlock").offsetHeight;
    document.querySelector(".vl").style.height = ""+vHeight+"px";
    document.querySelector(".vl").style.maxHeight = ""+vHeight+"px";
    document.querySelector(".vl").style.mHeight = ""+vHeight+"px";
    window.onresize = function(){
        document.querySelector(".vl").style.height = "0px";
        document.querySelector(".vl").style.maxHeight = "0px";
        document.querySelector(".vl").style.mHeight = "0px";
        vHeight = document.querySelector("#codeBlock").offsetHeight;
        document.querySelector(".vl").style.height = ""+vHeight+"px";
        document.querySelector(".vl").style.maxHeight = ""+vHeight+"px";
        document.querySelector(".vl").style.mHeight = ""+vHeight+"px";
    };

}

/*projects intersect animation fucn*/
function project_animation(){
    // Remove the transition class
    const rt = document.querySelector('.ray_tracing');
    rt.classList.remove('ray_tracing_activate');

    // Create the observer, same as before:
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                rt.classList.add('ray_tracing_activate');
                return;
            }

            rt.classList.remove('ray_tracing_activate');
        });
    });

    const toDoList = document.querySelector('.todo_list');
    toDoList.classList.remove('tdl_animation_activate');

    // Create the observer, same as before:
    const observer1 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                toDoList.classList.add('tdl_animation_activate');
                return;
            }

            toDoList.classList.remove('tdl_animation_activate');
        });
    });

    const flexBot = document.querySelector('.amazonflexbot');
    flexBot.classList.remove('ray_tracing_activate');

    const observer2 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                flexBot.classList.add('amzb_animation_activate');
                return;
            }

            flexBot.classList.remove('amzb_animation_activate');
        });
    });


    observer.observe(document.querySelector('.ray_tracing'));
    observer1.observe(document.querySelector('.todo_list'));
    observer2.observe(document.querySelector('.amazonflexbot'));
}

function codeBlock_animation(){
    const code = document.querySelector('.highLight');
    code.classList.remove('hl_animation');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                code.classList.add('hl_animation');
                return;
            }

            code.classList.remove('hl_animation');
        });
    });

    observer.observe(document.querySelector('.highLight'));
}


