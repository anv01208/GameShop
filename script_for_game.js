var counter = 0
var x_counter = 0
var o_counter = 0
var draw_counter = 0
var cells = document.querySelectorAll('#field td')
var header = document.getElementById('main-header')
var x_wins = document.getElementById('x')
var o_wins = document.getElementById('o')
var draw = document.getElementById('draw')

function isEnder() {
    if (counter < 4) {
        return false
    }
    if (cells[0].innerHTML == cells[1].innerHTML && cells[1].innerHTML == cells[2].innerHTML && cells[0].innerHTML != '') {
        return true
    }
    if (cells[3].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[5].innerHTML && cells[3].innerHTML != '') {
        return true
    }
    if (cells[6].innerHTML == cells[7].innerHTML && cells[7].innerHTML == cells[8].innerHTML && cells[6].innerHTML != '') {
        return true
    }
    if (cells[0].innerHTML == cells[3].innerHTML && cells[3].innerHTML == cells[6].innerHTML && cells[0].innerHTML != '') {
        return true
    }
    if (cells[1].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[7].innerHTML && cells[1].innerHTML != '') {
        return true
    }
    if (cells[2].innerHTML == cells[5].innerHTML && cells[5].innerHTML == cells[8].innerHTML && cells[2].innerHTML != '') {
        return true
    }
    if (cells[0].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[8].innerHTML && cells[0].innerHTML != '') {
        return true
    }
    if (cells[2].innerHTML == cells[4].innerHTML && cells[4].innerHTML == cells[6].innerHTML && cells[2].innerHTML != '') {
        return true
    }
    if (counter > 7) {
        draw +=1
        header.innerHTML = 'Draw!'
        return false
    }
}

function cellClick() {
    var img = document.createElement('img')
    img.style.width = '75%';
    if (counter % 2 == 0) {
        img.src = 'close.png'
    }
    else {
        img.src = 'circle.png'
    }
    this.appendChild(img)
    if (isEnder()) {
        for (var cell of cells) {
            cell.removeEventListener('click', cellClick)
        }
        if (counter % 2 == 0) {
            x_counter += 1
            header.innerHTML = 'X is winner!'
        }
        else {
            o_counter +=1
            header.innerHTML = 'O is winner!'
        }
    }
    counter += 1
    this.removeEventListener('click', cellClick)
}

function startGame() {
    counter = 0
    header.innerHTML = 'Tic Tac Toe'
    x_wins.innerHTML = 'X wins : ' + x_counter
    o_wins.innerHTML = 'O wins : ' + o_counter
    draw.innerHTML = 'Draw : ' + draw_counter
    for (var cell of cells) {
        cell.innerHTML = ''
        cell.addEventListener('click', cellClick)
    }
}
