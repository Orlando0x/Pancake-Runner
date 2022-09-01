const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container')
let canvasSize;
let elementSize;

window.addEventListener('load', starGame);
window.addEventListener('resize', starGame);

function starGame(){
    canvasResize()
    game.textAlign = 'start';
    game.font = elementSize + 'px Arial'
    for (let i = 0; i < 10; i++) {
        for (let z = 1; z <= 10; z++) {
            game.fillText(emojis[mapRowsCols[2][i][z-1]], elementSize*i-10, elementSize*z-5)
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
