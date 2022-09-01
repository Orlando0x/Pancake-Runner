const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container')
const up = document.getElementById('up');
const down = document.getElementById('down');
const right = document.getElementById('right');
const left = document.getElementById('left');
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
let startPosition =[];
window.addEventListener('load', starGame);
window.addEventListener('resize', starGame);
up.addEventListener('click', moveUp)
down.addEventListener('click', moveDown)
right.addEventListener('click', moveR)
left.addEventListener('click', moveL)
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




function starGame(){
    canvasResize()
    game.textAlign = 'start';
    game.font = elementSize + 'px Arial'
    game.clearRect(0,0,canvasSize,canvasSize);
    for (let i = 0; i < 10; i++) {
        for (let z = 1; z <= 10; z++) {
            game.fillText(emojis[mapRowsCols[1][i][z-1]], elementSize*i, elementSize*z)

            if(mapRowsCols[1][i][z-1] == 'I'){
                giftPosition.x = elementSize*i;
                giftPosition.y = elementSize*z;
            }
            if(mapRowsCols[1][i][z-1] == 'O' && playerPosition.x == undefined){
                playerPosition.x = elementSize*i;
                playerPosition.y = elementSize*z;
                startPosition = [playerPosition.x,playerPosition.y];
                console.log(startPosition);
                renderPlayer();
            }
            if(mapRowsCols[1][i][z-1] == 'X' && playerPosition.x === startPosition[0] && playerPosition.y === startPosition[1]){
                bombsPosition.push({x: elementSize*i, y: elementSize*z})
            }
        }
    }

    renderPlayer();
}

function renderPlayer (){
    const gameOver = bombsPosition.find(item => item.x.toFixed() == playerPosition.x.toFixed() && item.y.toFixed() == playerPosition.y.toFixed())
    console.log(gameOver);

    if(Math.round(playerPosition.y) == Math.round(giftPosition.y) && Math.round(playerPosition.x) == Math.round(giftPosition.x)){
        console.log('Pasaste de nivel!!!');

    }else if(gameOver){
        game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
        console.warn('GAME OVER');

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