// Select and assign html id as variables
const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

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
        square.firstChild.firstChild.classList.add('white')
    }
    
    if ( i >= 48 ) {
           square.firstChild.firstChild.classList.add('black')
       }

        gameBoard.append(square)
    })
}
createBoard();

// Grab every element inside gameboard with class square
const allSquares = document.querySelectorAll('.square')

allSquares.forEach((square) => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

// Prevent default turns off default behavior and allows the pieces to drop into a new square
function dragOver(e) {
    e.preventDefault();
}

// Propegation stops event from bubbling upwards to parent elements of the target(gameboard, body etc)
// Parent node makes the piece drop into the parent element
// Append removes the original element and drops it into a new place
function dragDrop(e) {
    e.stopPropagation()
    console.log('player go', playerGo)
    console.log('e target', e.target)
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {
        // first check - is move valid
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement)
            e.target.remove() // removes piece when another is dropped on top
            changePlayer()
            return
        }
        // second check - display feedback text
        if (taken & !takenByOpponent) {
            infoDisplay.textContent = 'Invalid move'
            setTimeout(() => {
                infoDisplay.textContent = ''
            }, 2000)
            return
        }
        if(valid){
            e.target.append(draggedElement)
            changePlayer()
            return
        }
    }

}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) 
        || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log('target id:', targetId)
    console.log('start id:', startId)
    console.log('piece:', piece)
    
    // gets pices with front row index - reverse index between black and white on move //! Very much broken
    switch(piece) {
        case 'pawn' :
            const starterRow = [8,9,10,11,12,13,14,15]
            if ( 
                starterRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId ||
                startId + width - 1 === targetId && document.querySelector(`[square-id=${tartId + width - 1}]`).firstChild ||
                startId + width + 1 === targetId && document.querySelector(`[square-id=${tartId + width + 1}]`).firstChild
    
            )
            {
                return true;
            }
    }
}


// change playerDisplay each turn
function changePlayer(){
    if (playerGo === 'black'){
        reverseIds()
        playerGo = 'white'
        playerDisplay.textContent = 'white'
    }
    else 
    {
        revertIds()
        playerGo = 'black'
        playerDisplay.textContent = 'black'
    }
}

function reverseIds(){
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds(){
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', i))
}