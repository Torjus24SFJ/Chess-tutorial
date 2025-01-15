const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelectorAll("#player")
const infoDisplay = document.querySelectorAll("#info-display")
const width = 8

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard(){
    startPieces.forEach((startPieces, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPieces
        square.setAttribute('square-id', i)
        // square.classList.add('light')
        const row = Math.floor(i / width)
        if ( (row + i ) % 2 === 0){
            square.classList.add("light")
        }
            else 
            {
                square.classList.add("dark")
            }
       
        gameBoard.append(square)
    })
}
createBoard();