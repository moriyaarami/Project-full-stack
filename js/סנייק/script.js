const board = document.querySelector("#board");
const width = 50;
const height = 40;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
let direction = 'left';
let isGameOver = false;
let random;
let myInterval;
let score = 0;



let lastScore = localStorage.getItem('lastTurnScore');

document.querySelector('#lastScore span').innerText = lastScore;





function createBoard() {
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    for (let i = 0; i < width * height; i++) {
        const div = document.createElement("div");
        board.appendChild(div);
        divs.push(div);
    }

    color();
    setApple();
}

function color() {
    divs.forEach(div => {
        div.classList.remove("snake", "head");
    });

    snake.forEach((x, i) => {
        divs[x].classList.add("snake");
        if (i == 0) {
            divs[x].classList.add("head");

        }
    });
}


function move(dir) {
    if (isGameOver) {
        return;
    }

    let head = snake[0];


    if (dir === 'up') {
        if (direction === 'down') {
            return;
        }

        head -= width;

        // בדיקת גבולות - אם הנחש עומד לחרוג מה-0
        if (head < 0) {
            gaemeOver();
            return;

        }


    }
    else if (dir === 'down') {

        head += width;



        if (direction === 'up') {
            return;
        }

        if (head >= width * height) {
            gaemeOver();
            return;
        }

    }
    else if (dir === 'left') {
        if (direction === 'right') {
            return;
        }

        head++;

        if (head % width === 0) {
            gaemeOver();
            return;
        }
    }
    else if (dir === 'right') {
        if (direction === 'left') {
            return;
        }


        if (head % width === 0) {
            gaemeOver();
            return;
        }
        head--;
    }

    if (snake.includes(head)) {
        gaemeOver();
        return;
    }

    direction = dir;
    snake.unshift(head);

    // אם הראש החדש נוגע בפיתיון - אז שמים את הפיתיון במקום אחר
    // ולא מורידים את סוף הנחש
    if (head == random) {
        score++;
        document.querySelector('#score span').innerText = score;
        localStorage.setItem('score', score);

        sound("./Pebble.ogg");
        setApple();
    } else {
        snake.pop();
    }


    color();
    autoMove();
}

function autoMove() {
    clearInterval(myInterval);
    myInterval = setInterval(() => move(direction), 200 + (score * 2));
}

function gaemeOver() {
    isGameOver = true;
    clearInterval(myInterval);
    sound("./Country_Blues.ogg");
    setTimeout(() => alert("game over"), 50);
    setTimeout(() => newGame(), 200);
}

function setApple() {
    do {
        // מגריל מספר לפי כמות המשבצות
        random = Math.floor(Math.random() * width * height);
    } while (snake.includes(random)) // אם המספר יוצא על מיקום הנחש - מגרילים שוב

    divs.forEach(d => d.classList.remove('apple'));
    divs[random].classList.add('apple');
}

function sound(filename) {
    const audio = document.createElement("audio");
    audio.src = filename;
    audio.play();
}

function newGame() {
    snake.splice(0, snake.length);
    snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
    isGameOver = false;
    score = 0;
    color();
    setApple();
    document.querySelector('#score span').innerText = score;


    localStorage.setItem('lastTurnScore', localStorage.getItem('score'));


    document.querySelector('#lastScore span').innerText = localStorage.getItem('lastTurnScore');



}




/* function pause() {
    clearInterval(myInterval);
    document.querySelector('#button').removeEventListener('click', pause);
    document.querySelector('#button').addEventListener('click', resume);
    document.querySelector('#button').innerText = 'resume';
}

function resume() {
    autoMove();
    document.querySelector('#button').removeEventListener('click', resume);
    document.querySelector('#button').addEventListener('click', pause);
    document.querySelector('#button').innerText = 'pause';
} */

/* function localStorage() {
    localStorage.setItem('score', score);
    const lastScore = localStorage.getItem('score');
    if (lastScore > score) {
        document.querySelector('#record span').innerHTML = lastScore;
    } else {
        localStorage.setItem('score', score);
    }

} */



window.addEventListener("keydown", ev => {
    ev.preventDefault();

    switch (ev.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowRight": move("right"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
    }
});

/* הוספת אירועי לחיצה במצב של מובייל */

document.getElementById("up").addEventListener("click", () => {
    move("up");
});
document.getElementById("down").addEventListener("click", () => {
    move("down");
});
document.getElementById("right").addEventListener("click", () => {
    move("right");
});
document.getElementById("left").addEventListener("click", () => {
    move("left");
});

// window.addEventListener("keydown", ev => {
//     ev.preventDefault();

//     if (ev.key === "ArrowUp") {
//         move("up");
//     } else if (ev.key === "ArrowRight") {
//         move("right");
//     } else if (ev.key === "ArrowDown") {
//         move("down");
//     } else if (ev.key === "ArrowLeft") {
//         move("left");
//     }
// });