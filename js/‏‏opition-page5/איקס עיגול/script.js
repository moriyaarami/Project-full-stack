const divs = document.querySelectorAll('#board>div');
let isX = true;
let isGameOf = false;
let poinstX = document.querySelector('.pointsX');
let poinstO = document.querySelector('.pointsO');
let countX = +localStorage.getItem('scoreX');
let countO = +localStorage.getItem('scoreO');

for (const div of divs) {
    div.addEventListener('click', function (ev) {
        if (isGameOf) {

            return;
        }

        const elem = ev.target;

        if (elem.innerText) {
            return;
        }

        if (isX) {
            elem.innerText = 'X';
        } else {
            elem.innerText = 'O';
        }

        isX = !isX;
        showTurn();
        checkWinner();
        /*   localStorage.setItem('theWinner', win); */
    })
}

function showTurn() {
    document.querySelector('.currentTurn').classList.remove('currentTurn');

    if (isX) {
        document.querySelector('#players>div:first-child').classList.add('currentTurn');
    } else {
        document.querySelector('#players>div:last-child').classList.add('currentTurn');
    }

}

function checkWinner() {

    const option = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const op of option) {
        if (op.every(y => divs[y].innerText === 'X')) {
            winner(op, 'X');
            countX += 1;
            poinstX.innerHTML = countX;
            break;
        } else if (op.every(y => divs[y].innerText === 'O')) {
            winner(op, 'O');
            countO += 1;
            poinstO.innerHTML = countO;
            break;
        }

    }

    if (!isGameOf && [...divs].every(x => x.innerText)) {
        setTimeout(() => alert('אין מנצח'), 50)
        isGameOf = true;
    }

    localStorage.setItem('scoreX', countX);
    localStorage.setItem('scoreO', countO);
    localStorage.getItem('scoreX');
    localStorage.getItem('scoreO');


}

function winner(op, win) {
    setTimeout(() => alert(win + " is winner!"), 50);
    isGameOf = true;


    /* צובע את הסט המנצח  */
    op.forEach(x => divs[x].classList.add('win'));
}



function newGame() {

    divs.forEach(x => {
        x.innerText = '';
        x.classList.remove('win');
    });

    isX = !isX;
    isGameOf = false;

    showTurn();

}

function resetPoints() {
    poinstX.innerHTML = 0;
    poinstO.innerHTML = 0;
    countX = 0;
    countO = 0;
    localStorage.clear();
}

const scoreX = localStorage.getItem('scoreX');
const scoreO = localStorage.getItem('scoreO');
poinstX.innerHTML = scoreX;
poinstO.innerHTML = scoreO;






