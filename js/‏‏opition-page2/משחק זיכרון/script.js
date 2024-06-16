const board = document.querySelector(".container");
const Emogi = ["😂", "😍", "😒", "😁", "😘", "😎", "🤷‍♀️", "😉", "😢"];
const EmogiCards = [...Emogi, ...Emogi];
const cardsCount = EmogiCards.length;
const win = document.querySelector("#win");
let score = 0;

score = +localStorage.getItem("score");
win.textContent = score;


let revealdCard = 0;/* קלף חשוף */
let activeCard = null;/* קלף פעיל */
let awaitingEndOfMoves = false; /* מחקה לסוף הפעולה */



function createCard(emogi) {
    const element = document.createElement("div");


    element.classList.add("card");
    element.innerHTML = '';

    element.setAttribute('data-emogi', emogi);
    element.setAttribute('data-reveled', "false");

    element.addEventListener("click", () => {
        const reveled = element.getAttribute('data-reveled');

        if (awaitingEndOfMoves || reveled === "true" || element == activeCard) {
            return;
        }

        element.style.backgroundColor = 'white';
        element.innerHTML = emogi;


        if (!activeCard) {
            activeCard = element;

            return;
        }

        /* בדיקת התאמה */
        const emogiMatch = activeCard.getAttribute('data-emogi');

        if (emogiMatch === emogi) {
            activeCard.setAttribute('data-reveled', "true");
            element.setAttribute('data-reveled', "true");

            awaitingEndOfMoves = false;
            activeCard = null;
            revealdCard += 2;

            if (revealdCard == cardsCount) {
                setTimeout(() => {
                    alert("ניצחת!");
                    score++;
                    localStorage.setItem('score', score);

                    document.querySelector("#win").textContent = localStorage.getItem('score');

                    const message = document.querySelector('#message');

                    const div = document.createElement('p');
                    div.textContent = "למשחק נוסף יש לרענן את הדף";
                    message.appendChild(div);

                }, 500);




            }

            return;
        }

        awaitingEndOfMoves = true;

        setTimeout(() => {
            element.style.backgroundColor = '';
            activeCard.style.backgroundColor = '';
            element.innerHTML = '';
            activeCard.innerHTML = '';


            awaitingEndOfMoves = false;
            activeCard = null;

        }, 1000)




    })

    return element;

}



function resetScores() {

    localStorage.clear();
    score = 0;
    win.textContent = score;

}



for (let i = 0; i < cardsCount; i++) {

    const randomIndex = Math.floor(Math.random() * EmogiCards.length);
    const randomEmogi = EmogiCards[randomIndex];
    const card = createCard(randomEmogi);
    EmogiCards.splice(randomIndex, 1);

    board.appendChild(card);

}









