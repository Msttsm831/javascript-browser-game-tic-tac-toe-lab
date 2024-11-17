/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

const board = ['', '', '', '', '', '', '', '', ''] 

const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

/*---------------------------- Variables (state) ----------------------------*/
let turn = 'X' 
let winner = false 
let tie = false 

/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function init() {
    board.fill('') 
    turn = 'X' 
    winner = false 
    tie = false 
    render() 
}

function render() {
    updateBoard() 
    updateMessage() 
}

function updateBoard() {
    board.forEach((cellValue, index) => {
        const square = squareEls[index] 

        if (cellValue === 'X') {
            square.textContent = 'X'
            square.style.color = 'red' 
        } 
        else if (cellValue === 'O') {
            square.textContent = 'O'
            square.style.color = 'blue' 
        } 
        else {
            square.textContent = '' 
            square.style.backgroundColor = '#f0f0f0' 
        }
    })
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`; 
    } 
    else if (!winner && tie) {
        messageEl.textContent = `It's a tie!`; 
    } 
    else {
        const winningPlayer = turn === 'X' ? 'X' : 'O';
        messageEl.textContent = `Congratulations ${winningPlayer}! You win!`; 
    }
}


function placePiece(index) {
    board[index] = turn 
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo 
        if (
            board[a] !== '' && 
            board[a] === board[b] && 
            board[a] === board[c] 
        ) {
            winner = true 
        }
    })
}

function checkForTie() {
    if (winner) return 

    tie = !board.includes('') 
}

function switchPlayerTurn() {
    if (winner) return 
    turn = turn === 'X' ? 'O' : 'X' 
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (board[index] !== '' || winner) return 
        placePiece(index)
        checkForWinner()
        checkForTie()
        switchPlayerTurn()
        render()
    })
})

resetBtnEl.addEventListener('click', init)

/*-------------------------------- Init --------------------------------*/

init()
