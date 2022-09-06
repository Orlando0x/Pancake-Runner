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
const bannerGO = document.querySelector('.banner-gameOver');
const bannerWIN = document.querySelector('.banner-WIN');
const bannerRercord = document.querySelector('.banner-record');

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
const startPosition = {
    x: undefined,
    y:undefined
}
let cantidadLevels = mapRowsCols.map(element => bombsPosition.push([]));

let level = 0;
let lives = 3;
let flag = true;

let startTime;
let playerTime;
let intervalTime;



window.addEventListener('load', startGame);
window.addEventListener('resize', resize);
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

function resize(){
    resetGame();
    startGame();
}
function cleanRecords(){
    localStorage.removeItem('record');
    recordView.innerText = 'Record: 🏁 -'
}
function gameOver(){
    canvas.classList.add('inactive');
    bannerGO.classList.remove('inactive');
    livesHTML.innerText = 'GAME OVER';
    clearInterval(intervalTime);
    /* setTimeout(() => resetGame(), 2000); */
}
function winGame (){
        canvas.classList.add('inactive');
        bannerWIN.classList.remove('inactive');
        console.log('FELICIDADES! Has completado el juego');
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
    if(localStorage.getItem('record') == 0){
        localStorage.setItem('record', playerTime);
    }else if (playerTime < localStorage.getItem('record')){
        bannerRercord.innerText = '🏆 New Record! 🏆';
        bannerRercord.classList.remove('inactive');
    }else{
        bannerRercord.innerText = '❌No has superado el record❌'
        bannerRercord.classList.remove('inactive');
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
                startPosition.x = elementSize*i;
                startPosition.y = elementSize*z;
                playerPosition.x = startPosition.x
                playerPosition.y = startPosition.y;
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
    console.log(collision);
    console.log(bombsPosition);
    console.log(playerPosition);
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
    canvasSize = Number(canvasSize.toFixed(0));
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
