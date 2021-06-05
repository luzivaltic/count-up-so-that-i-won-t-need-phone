

const numberContainers = document.querySelectorAll(".number-container");

const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

var totalSeconds = 0;

( () => {

    const elems = document.querySelectorAll(".timer");

    elems.forEach( elem => {
        gsap.set( elem.querySelector(".bottom-front") , { rotationX: 180 } );
    })

    flipUpdate();
})();

function flipUpdate()
{

    let curDay = Math.floor( totalSeconds / ( 24*60*60 ) );
    flip( days , curDay );

    let curHour = Math.floor( ( totalSeconds / ( 60*60 ) ) ) % 24;
    flip( hours , curHour );

    let curMinute = Math.floor( ( totalSeconds / 60 ) ) % 60;
    flip( minutes, curMinute );

    let cursecond = totalSeconds % 60;
    flip( seconds , cursecond );
}

let curSecs = 60;

var runner;

function flip( elem , num ) {

    if( num < 10 ) num = '0' + num;

    if( elem.querySelector(".number-container").innerText == num ) return;

    elem.querySelector(".top-back .number-container").innerText = num;
    elem.querySelector(".bottom-front .number-container").innerText =num;

    gsap.to( elem.querySelector('.top-front') , 0.7 , {
        rotationX : -180,
        ease: "quart.easeOut",
        onComplete: () => {
            elem.querySelector(".top-front .number-container").innerText =num;
            elem.querySelector(".bottom-back .number-container").innerText = num;
            gsap.set( elem.querySelector(".top-front") , { rotationX: 0 } );
        }

    })

    gsap.to( elem.querySelector(".bottom-front"), 0.7 , {
        rotationX : 0,
        ease: "quart.easeOut",
        onComplete: () => {
            gsap.set( elem.querySelector(".bottom-front") , { rotationX: 180 } );
        }
    })

}

totalSeconds = localStorage.getItem("totalSeconds");

if( totalSeconds == null || totalSeconds == "undefined" ) totalSeconds = 0;

else totalSeconds = parseFloat(totalSeconds);

flipUpdate();

console.log( localStorage.getItem("totalSeconds") );

function running()
{
    totalSeconds++;
    flipUpdate();
    localStorage.setItem("totalSeconds", JSON.stringify(totalSeconds));
}

document.querySelector(".button-start").addEventListener( "click", () =>{
    
    totalSeconds = localStorage.getItem("totalSeconds");

    if( totalSeconds == null || totalSeconds == "undefined" ) totalSeconds = 0;

    else totalSeconds = parseFloat(totalSeconds);

    clearInterval( runner );
    runner = setInterval( running , 1000 );
})

document.querySelector(".button-stop").addEventListener( "click", () =>{
    clearInterval( runner );
})

document.querySelector(".button-clear").addEventListener("click", () =>{
    localStorage.clear();
    clearInterval( runner );
    totalSeconds = 0;
    flipUpdate();
})
