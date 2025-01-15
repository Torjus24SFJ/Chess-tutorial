// Select and assign html id as variables
const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelectorAll("#player")
const infoDisplay = document.querySelectorAll("#info-display")
const width = 8

// Array with variables that get svg from pieces
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
    // Add div and class to squares based on i (index)
    startPieces.forEach((startPieces, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        // Insert SVG to html div
        square.innerHTML = startPieces
        // Assign div's with pieces as draggable true
        square.firstChild && square.firstChild.setAttribute('draggable', true)
        // Square color alternating
        square.setAttribute('square-id', i)
        const row = Math.floor(i / width)
        if ( (row + i ) % 2 === 0){
            square.classList.add("light")
        }
            else 
            {
                square.classList.add("dark")
            }

    // Add black and white class with fill to pieces based on index in startPieces array
       if ( i <= 15){
        square.firstChild.firstChild.classList.add('black')
    }
    
    if ( i >= 48 ) {
           square.firstChild.firstChild.classList.add('white')
       }

        gameBoard.append(square)
    })
}
createBoard();

// Grab every element inside gameboard with class square
const allSquares = document.querySelectorAll('#gameboard .square')

allSquares.forEach((square) => {
    square.addEventListener('dragstart', dragStart)
})