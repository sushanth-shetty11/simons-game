let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0; 


let btns = ["yellow", "red", "green", "blue"];

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("h3"); 

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game is started");
        started = true;

        levelup();   
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(randBtn);  
}



function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
        console.log("same value");
    } else {
        if (level > highScore) {  
            highScore = level;
            highScoreDisplay.innerText = `High Score: ${highScore}`; 
        }
        h2.innerHTML = `Game over! Your Score was <b>${level}</b> <br> press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "rgb(171, 206, 206)"; // Reset to the original background color
        }, 250); 
        reset();
    }
}


function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
