const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container')
const up = document.getElementById('up');
const down = document.getElementById('down');
const right = document.getElementById('right');
const left = document.getElementById('left');
const reset = document.getElementById('reset');
const livesHTML = document.querySelector('.lives');
const time = document.getElementById('spanTime');
const recordView = document.querySelector('.record');
const playAgain = document.getElementById('playAgain')
const cleanRecord = document.getElementById('cleanRecords');

let canvasSize;
let elementSize;
const playerPosition = {
    x:undefined,
    y:undefined
};
const giftPosition = {
    x:undefined,
    y:undefined
};
const bombsPosition =[];

let cantidadLevels = mapRowsCols.map(element => bombsPosition.push([]));

let level = 0;
let lives = 3;
let flag = true;

let startTime;
let playerTime;
let intervalTime;



window.addEventListener('load', startGame);
window.addEventListener('resize', startGame);
up.addEventListener('click', moveUp)
down.addEventListener('click', moveDown)
right.addEventListener('click', moveR)
left.addEventListener('click', moveL)
reset.addEventListener('click', resetGame)
cleanRecord.addEventListener('click', cleanRecords)
window.addEventListener('keyup', (event) => {
   /*  if(event.key === 'ArrowUp') moveUp();
    else if(event.key === 'ArrowDown') moveDown();
    else if(event.key === 'ArrowLeft') moveL();
    else if(event.key === 'ArrowRight') moveR();
     */
    switch(event.key){
        case 'ArrowUp': moveUp();
        break;
        case 'ArrowDown': moveDown();
        break;
        case 'ArrowRight': moveR();
        break;
        case 'ArrowLeft': moveL();
        break;
    }

});

function cleanRecords(){
    localStorage.removeItem('record');
    recordView.innerText = 'Record: 🏁 -'
}
function gameOver(){
    game.clearRect(0,0,canvasSize,canvasSize);
    game.textAlign = 'center';
    game.fillText('GAME OVER!', canvasSize*.50, canvasSize*.20);
    livesHTML.innerText = 'GAME OVER';
    clearInterval(intervalTime);
    moveUp();
    /* setTimeout(() => resetGame(), 2000); */
}
function winGame (){
        console.log('FELICIDADES! Has completado el juego');
        game.clearRect(0,0,canvasSize,canvasSize);
        game.textAlign = 'center';
        game.fillText('CONGRATULATION!', canvasSize*.50, canvasSize*.20);
        game.fillText(emojis['WIN'], canvasSize*.50, canvasSize*.50);
        showRecord();
        clearInterval(intervalTime);
}
function resetGame(){
    location.reload()
}
function showTime(){
    playerTime = (Date.now() - startTime)/1000;
    time.innerText = playerTime.toFixed(2) + ' s';
}
function showRecord(){
    if(localStorage.getItem('record') == 0 || playerTime < localStorage.getItem('record')){
        localStorage.setItem('record', playerTime);
    }
    recordView.innerText = 'Record: 🏁'+ localStorage.getItem('record') + ' s';
}

function startGame(){
    canvasResize()
    game.textAlign = 'start';
    game.font = elementSize + 'px Arial'
    game.clearRect(0,0,canvasSize,canvasSize); 
    if(!startTime){
        startTime = Date.now();
        intervalTime = setInterval(showTime,100);
    }
    
    if (lives > 0){
        livesHTML.innerText = "Vidas: " + emojis['HEART'].repeat(lives);
    } else{
        gameOver();
        return;
    }
    if (!localStorage.getItem('record')){
        localStorage.setItem('record', 0)
    } else if (localStorage.getItem('record') == 0){
        recordView.innerText = 'Record: 🏁 -'
    } else {
        recordView.innerText = 'Record: 🏁 '+ localStorage.getItem('record')+ ' s';
    }
    for (let i = 0; i < 10; i++) {
        for (let z = 1; z <= 10; z++) {
            game.fillText(emojis[mapRowsCols[level][i][z-1]], elementSize*i, elementSize*z)

            if(mapRowsCols[level][i][z-1] == 'I'){
                giftPosition.x = elementSize*i;
                giftPosition.y = elementSize*z;
            }
            if(mapRowsCols[level][i][z-1] == 'O' && playerPosition.x == undefined){
                console.log(elementSize*i);
                playerPosition.x = elementSize*i;
                playerPosition.y = elementSize*z;
            }
            if(mapRowsCols[level][i][z-1] == 'X' && flag){
                bombsPosition[level].push({x: elementSize*i, y: elementSize*z})
            }
        }
    }
    flag = false;
    renderPlayer();
}

function renderPlayer (){
    const collision = bombsPosition[level].find(item => item.x.toFixed() == playerPosition.x.toFixed() && item.y.toFixed() == playerPosition.y.toFixed());

    if(Math.round(playerPosition.y) == Math.round(giftPosition.y) && Math.round(playerPosition.x) == Math.round(giftPosition.x)){
        level++;
        flag = true;
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        if (!mapRowsCols[level]){
            winGame();
            return;
        }
        startGame();
        console.log('Pasaste de nivel!!!');

    } else if(collision){
            playerPosition.x = undefined;
            playerPosition.y = undefined;
            lives--;
            flag = false;
            startGame();
            game.fillText(emojis['BOMB_COLLISION'], collision.x, collision.y);
            console.warn('BOOOM');

    } else {
        game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
    }
}
function canvasResize (){
    if(window.innerWidth < window.innerHeight){
        canvasSize = window.innerWidth * 0.70;
    } else {
        canvasSize = window.innerHeight * 0.70;
    }
    canvas.setAttribute('width', canvasSize );
    canvas.setAttribute('height', canvasSize );

    elementSize = canvasSize / 10;
}
function moveUp(){
    if(playerPosition.y < elementSize +2){
        playerPosition.y
    }else{
        playerPosition.y -= elementSize;
        startGame();

    }
}   
function moveDown(){
    if(playerPosition.y >= canvasSize){
        playerPosition.y
    }else{
        playerPosition.y += elementSize;
        startGame();

    }
}   
function moveR(){
    if(playerPosition.x > (canvasSize-elementSize - 4)){
        playerPosition.x
    }else{
        playerPosition.x += elementSize;
        startGame();

    }
}   
function moveL(){
    if(playerPosition.x < 4){
        playerPosition.x

    }else{
        playerPosition.x -= elementSize;
        startGame();

    }
}   
