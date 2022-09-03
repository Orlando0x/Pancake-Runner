const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container')
const up = document.getElementById('up');
const down = document.getElementById('down');
const right = document.getElementById('right');
const left = document.getElementById('left');
const reset = document.getElementById('reset');
const livesHTML = document.querySelector('.lives');

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
let startPosition =[];

let level = 0;
let lives = 3;
let flag = true;




window.addEventListener('load', starGame);
window.addEventListener('resize', starGame);
up.addEventListener('click', moveUp)
down.addEventListener('click', moveDown)
right.addEventListener('click', moveR)
left.addEventListener('click', moveL)
reset.addEventListener('click', resetLives)
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


function resetLives(){
    location.reload()
}

function starGame(){
    console.log(level);
    canvasResize()
    game.textAlign = 'start';
    game.font = elementSize + 'px Arial'
    
    game.clearRect(0,0,canvasSize,canvasSize);
    console.log(lives);
    if (lives === 3){
        livesHTML.innerText = 'Vidas: 💚💚💚';
    }else if (lives === 2){
        livesHTML.innerText = 'Vidas: 💚💚';
    }else if (lives === 1){
        livesHTML.innerText = 'Vidas: 💚';
    }else {
        livesHTML.innerText = 'GAME OVER';
        level = 0;
        lives = 3;
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        setTimeout(() => starGame(), 1000);
        
    }
    
    for (let i = 0; i < 10; i++) {
        for (let z = 1; z <= 10; z++) {
            game.fillText(emojis[mapRowsCols[level][i][z-1]], elementSize*i, elementSize*z)

            if(mapRowsCols[level][i][z-1] == 'I'){
                giftPosition.x = elementSize*i;
                giftPosition.y = elementSize*z;
            }
            if(mapRowsCols[level][i][z-1] == 'O' && playerPosition.x == undefined){
                playerPosition.x = elementSize*i;
                playerPosition.y = elementSize*z;
                startPosition = [elementSize*i,elementSize*z];
                console.log(startPosition);
                renderPlayer();
            }
            if(mapRowsCols[level][i][z-1] == 'X' && flag ){
                bombsPosition[level].push({x: elementSize*i, y: elementSize*z})
                
            }
        }
        
    }
    console.log(bombsPosition);
    flag = false;
    renderPlayer();
}

function renderPlayer (){
    const gameOver = bombsPosition[level].find(item => item.x.toFixed() == playerPosition.x.toFixed() && item.y.toFixed() == playerPosition.y.toFixed())
    console.log(gameOver);

    if(Math.round(playerPosition.y) == Math.round(giftPosition.y) && Math.round(playerPosition.x) == Math.round(giftPosition.x)){
        level += 1;
        flag = true;
        if (!mapRowsCols[level]){
            console.log('FELICIDADES! Has completado el juego');
            game.clearRect(0,0,canvasSize,canvasSize);
            game.textAlign = 'center';
            game.fillText('FELICIDADES!', canvasSize*.50, canvasSize*.20);
            game.fillText(emojis['WIN'], canvasSize*.50, canvasSize*.50);
            return;
        }
        starGame();
        console.log('Pasaste de nivel!!!');

    }else if(gameOver){
        playerPosition.x = startPosition.x;
        playerPosition.y = startPosition.y;
        lives--;
        flag = false;
        starGame();
        game.fillText(emojis['BOMB_COLLISION'], gameOver.x, gameOver.y);
        console.warn('BOOOM');

    }
    else {
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
        starGame();

    }
}   
function moveDown(){
    if(playerPosition.y >= canvasSize){
        playerPosition.y
    }else{
        playerPosition.y += elementSize;
        starGame();

    }
}   
function moveR(){
    if(playerPosition.x > (canvasSize-elementSize - 4)){
        playerPosition.x
    }else{
        playerPosition.x += elementSize;
        starGame();

    }
}   
function moveL(){
    if(playerPosition.x < 4){
        playerPosition.x

    }else{
        playerPosition.x -= elementSize;
        starGame();

    }
}   