const tasks = document.querySelector('.tasks');
let list = [];


function add() {
    const input = document.querySelector('input');

    if (!input.value) {
        return
    }

    const li = document.createElement('li');
    tasks.appendChild(li);

    list.push(input.value);


    const div = document.createElement('div');
    div.innerHTML = input.value;
    div.contentEditable = true;
    li.appendChild(div);

    const btn = document.createElement('button');
    btn.innerHTML = 'X';
    li.appendChild(btn);

    btn.addEventListener('click', function () {
        const isAloow = confirm(`האם אתה בטוח שברצונך למחוק את המוצר: ${div.innerHTML}`);
        if (isAloow) {
            li.remove();
            list.shift();
        }
    })

    input.value = '';

}

function keyup(ev) {
    if (ev.key == 'Enter') {
        add();
    }

}




