const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningmessage = document.querySelector('[data-winning-message-text]');
const winningmessageElement = document.getElementById('winningMessage');
const restartButton =document.getElementById('restartButton');
const Xclass='x';
const CIRCLEclass='circle';
const winningCombination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [0,3,6]
];
let circleTurn;
startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn=false;
    winningmessageElement.classList.remove('show');
    cellElements.forEach(cell => {
    cell.classList.remove(Xclass);
    cell.classList.remove(CIRCLEclass);
    cell.removeEventListener('click',handleClick);
    cell.addEventListener('click', handleClick, {once: true});
});
setBoardHoverClass();
}

function handleClick(e){
    //place mark
    const cell=e.target
    const currentClass=circleTurn ? CIRCLEclass : Xclass;
    placeMark(cell, currentClass);
    //check for win
    if(checkWin(currentClass)){
        endGame(false);}
    else if(isDraw()){
            endGame(true);}
    else{
    swapTurns();
    setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winningmessage.innerText = "Draw!"
    }
    else{
        winningmessage.innerText = (circleTurn ? "O" : "X")+" WINS!";
    }
    winningmessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(Xclass) || cell.classList.contains(CIRCLEclass);
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(Xclass);
    board.classList.remove(CIRCLEclass);
    if(circleTurn){
        board.classList.add(CIRCLEclass);
    }
    else{
        board.classList.add(Xclass);
    }
}

function checkWin(currentClass){
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}