let userScore=0;
let compScore=0;
let userscorepara=document.querySelector("#user-score");
let comcorepara=document.querySelector("#comp-score");
const choices=document.querySelectorAll(".choice");
const move=document.querySelector("#move");
const gencompchoice=()=>{
    const options=["stone","paper","Scissor"];
    const random=Math.floor(Math.random()*3);
    return options[random];

};
const draw=()=>{
    console.log("Draw!!");
    move.innerText="Draw!!";
    winAndLooseSound(drawSound);
}
const showWinner=(userwin,userchoice,compchoice)=>{
    if(userwin){
        userScore++;
        userscorepara.innerText=userScore;
        console.log("You win!!😊😊");
       winAndLooseSound(winSound);
        move.innerText=`You win!!😊😊 ${userchoice} beats ${compchoice}`;
    }else{
        compScore++;
        comcorepara.innerText=compScore;
        console.log("You lose 😕😕")
        move.innerText=`You loose 😕😕!! ${compchoice} beats ${userchoice}`;
      winAndLooseSound(lossSound);
    
    }
    if(gamemode==="bestof5"){
        checkGameOver();
    }
    };

const playGame=(userchoice)=>{
    console.log("Userchoice",userchoice);
    const compchoice=gencompchoice();
    console.log("Computer choice",compchoice);
    if(userchoice==compchoice){
        draw();
    }
    else {
    let userwin=true;
    if(userchoice==="stone"){
    userwin=compchoice==="paper"?false:true;
    
    }else if(userchoice==="paper"){
        userwin=compchoice==="Scissor"?false:true;
        
    }else{
        userwin=compchoice==="stone"?false:true;
        
    }
    showWinner(userwin,userchoice,compchoice);
    }
};
choices.forEach((choice)=>{
choice.addEventListener("click",()=>{
    const userchoice=choice.getAttribute("id");
    playGame(userchoice);
});
});

const themeicon=document.querySelector("#themeicon");
themeicon.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    clicksound.currentTime=0;
    clicksound.play();
});

let isMuted=false;
const soundicon=document.querySelector("#soundicon");
const soundIcon=document.querySelector("#soundicon i");
soundicon.addEventListener("click",()=>{
    clicksound.currentTime=0;
    clicksound.play();
    isMuted=!isMuted;
    allSound.forEach (sound=>{
     sound.muted=isMuted;  

     if(isMuted){
        soundIcon.className="fa-solid fa-volume-xmark";
     }else{
        soundIcon.className="fa-solid fa-volume-high";
     }
    })
})

// ---Hamburger section--
const hamburger=document.querySelector(".hamburger");
const panel=document.getElementById("panel");
hamburger.addEventListener("click",()=>{
    panel.classList.toggle("show");
    clicksound.currentTime=0;
    clicksound.play();
});
document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !hamburger.contains(e.target)) {
        panel.classList.remove("show");
    }
});

// --panel-option section--
const mode=document.querySelector("#mode");
const modeoption=document.getElementById("modeoption");
mode.addEventListener("click",()=>{
    modeoption.classList.toggle("show");
    clicksound.currentTime=0;
    clicksound.play();
});


let gamemode="normal";
document.querySelector("#normal").addEventListener("click",()=>{
    gamemode="normal";
    bgMusic(Gamesound);
    move.innerText="🎮 Normal Mode Started!";
});
document.querySelector("#bestof5").addEventListener("click",()=>{
    gamemode="bestof5";
    move.innerText="🔥 Best of 5 Mode Started!";
    bgMusic(best5sound);
});
const checkGameOver=()=>{
    if(userScore===3||compScore===3){
        if(userScore>compScore){
            move.innerText="🏆 You won the match!";
            winAndLooseSound(winSound);
        }else{
            move.innerText="💀 Computer won the match!";
            lossSound.currentTime=0;
            lossSound.play();
        }
        //reset game
        setTimeout(()=>{
        userScore=0;
        compScore=0;
        userscorepara.innerText=0;
        comcorepara.innerText=0;
        },1500);
        
    }
};

// --Reset The Score--
const reset=document.querySelector("#reset");
reset.addEventListener("click",()=>{
    userScore=0;
        compScore=0;
        userscorepara.innerText=0;
        comcorepara.innerText=0;
        move.innerText="Game Reset 🔄 (0-0)"
        clicksound.currentTime=0;
    clicksound.play();
    allSound.forEach (sound=>{
    sound.pause();
    sound.currentTime=0;    
    })
});

// --Sound--
const clicksound=new Audio("sounds/click.mp3");
const lossSound=new Audio("sounds/loose.mp3");
const winSound=new Audio("sounds/win.mp3");
const Gamesound=new Audio("sounds/games.mp3");
const best5sound=new Audio("sounds/best5.mp3");
const drawSound=new Audio("sounds/draw.mp3");

Gamesound.volume=0.2;
best5sound.volume=0.2;

function bgMusic(music){
    Gamesound.pause();
    Gamesound.currentTime=0;

    

    best5sound.pause();
    best5sound.currentTime=0;

    music.loop=true;
    music.play();
}
function winAndLooseSound(music){
    lossSound.pause();
    lossSound.currentTime=0;

    winSound.pause();
    winSound.currentTime=0;

    drawSound.pause();
    drawSound.currentTime=0;
    music.play();
}
const allSound=[clicksound,lossSound,winSound,Gamesound,best5sound];
