const span1 = document.querySelector('#span1');
const span2 = document.querySelector('#span2');
const task = document.querySelector('.task');

let numOfEx = 0;
let numOfRightEx = 0;
let maxNumber;
let op;
let ex;
let result;
const operators = ['+', '-', '*', '/'];
const select = document.querySelector('select');
const div = document.querySelector('#answer');


select.addEventListener('change', fnc = () => {
    const selected = select.value;
    const Index = select.selectedIndex;
    maxNumber = selected == 'קל' ? 10 : selected == 'בינוני' ? 50 : selected == 'קשה' ? 100 : 0;

    ;

    RandomNumber(maxNumber);

});

function RandomNumber(n) {
    op = operators[Math.floor(Math.random() * operators.length)];
    let n1 = Math.floor(Math.random() * n) + 1;
    let n2 = Math.floor(Math.random() * n) + 1;

    ex = `${n1} ${op} ${n2}`;
    console.log(ex);
    task.innerHTML = ex;

    result = eval(ex);
    console.log(result);
}

const check = () => {
    const answer = document.querySelector("#value").value;



    if (answer == result) {
        numOfRightEx++;
        numOfEx++;
        span1.innerHTML = numOfRightEx;
        span2.innerHTML = numOfEx;
        div.innerHTML = 'תשובה נכונה';
        setTimeout(() => {
            div.innerHTML = '';
            RandomNumber(maxNumber);
        }, 1000)

    }

    else {
        numOfEx++;
        span1.innerHTML = numOfRightEx;
        span2.innerHTML = numOfEx;
        div.innerHTML = 'תשובה לא נכונה';
        setTimeout(() =>
            div.innerHTML = `התשובה הנכונה: ${result}`, 1000)
        setTimeout(() => div.innerHTML = '', 2000)

        setTimeout(() => RandomNumber(maxNumber), 2500)




    }

    document.querySelector("#value").value = "";


}

let btn = document.querySelectorAll(".btn-container button")

btn.forEach(b => {
    b.addEventListener("click", btnClick)
});

let delteBtn = document.querySelector("#delte");
delteBtn.removeEventListener("click", btnClick);
delteBtn.addEventListener("click", delte);

function delte() {
    document.querySelector("#value").value = "";
}

function btnClick() {
    document.querySelector("#value").value += this.textContent;

}

localStorage.setItem('numOfRightEx', numOfRightEx);

localStorage.getItem('numOfRightEx');



/* const btn = document.querySelectorAll(".btn-container button");
console.log(btn);

btn.forEach(b => {
    b.addEventListener("click", btnClick = () => {
        document.querySelector("#value").value += b.textContent;

    });
});
const delteBtn = document.querySelector('#delte');
delteBtn.removeEventListener("click", btnClick());
delteBtn.addEventListener("click", delte = () => {
    document.querySelector("#value").value = '';
}); */











