const playBoard = document.querySelector(".play-board");
const scoreDisplay = document.querySelector(".score");
const highscoreDisplay = document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");

let gameover=false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
 let setIntervalId;
 let score=0;


 let highscore=localStorage.getItem("high-score") || 0;
 highscoreDisplay.innerHTML=`High Score:${highscore}`


const changefoodposition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1; 
}

const handlegameover=()=>{
    clearInterval(setIntervalId);
alert("Game Over Better Luck Next Time");
location.reload();
}

const ChangeDirection = (e) => {
    if (e.key === "ArrowUp" &&  velocityY!=1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown" &&  velocityY!=-1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowLeft" &&  velocityX!=1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === "ArrowRight" &&  velocityX!=1) {
        velocityX = 1;
        velocityY = 0;
    }

}

controls.forEach(key => {
    key.addEventListener("click",()=> ChangeDirection(
        {
            key:key.dataset.key
        }
    ));
});


const initgame = () => {


    if(gameover) return handlegameover();
    let htmlMarkup = `<div class="food" style="grid-area:${foodX}/${foodY}"></div>`;

    
    
    if (snakeX === foodY && snakeY === foodX) {
        changefoodposition();
        snakeBody.push([foodX, foodY]);
        console.log(snakeBody);
        score++;

highscore=score >= highscore ? score:highscore;
localStorage.setItem("high-score",highscore);
        scoreDisplay.innerHTML=`score:${score}`
        highscoreDisplay.innerHTML=`High Score:${highscore}`


    }
    
for (let i = snakeBody.length-1; i>0; i--) {
    snakeBody[i]=snakeBody[i-1];
    
}
    snakeBody[0]=[snakeX,snakeY];


    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30) {
        gameover=true;
    }


    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="snakehead" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;

        if (i !=0 && snakeBody[0][1]=== snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]) {
            gameover=true;
        }
        
    }
    
    playBoard.innerHTML = htmlMarkup;
}

changefoodposition();
setIntervalId=setInterval(initgame, 195);
document.addEventListener("keydown", ChangeDirection);