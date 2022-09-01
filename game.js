const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container')
const up = document.getElementById('up');
const down = document.getElementById('down');
const right = document.getElementById('right');
const left = document.getElementById('left');

let canvasSize;
let elementSize;

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
    for (let i = 0; i < 10; i++) {
        for (let z = 1; z <= 10; z++) {
            game.fillText(emojis[mapRowsCols[0][i][z-1]], elementSize*i, elementSize*z)
        }
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
    console.log(`Me muevo hacia arriba`)
}   
function moveDown(){
    console.log(`Me muevo hacia abajo`)
}   
function moveR(){
    console.log(`Me muevo hacia la derecha`)
}   
function moveL(){
    console.log(`Me muevo hacia la izquierda`)
}   