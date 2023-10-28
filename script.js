// Dados iniciais
let quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let player = ''
let aviso = ''
let jogando = false

reset()

// Eventos
document.querySelector ('.reset').addEventListener ('click', reset)
document.querySelectorAll ('.item').forEach (item => {
    item.addEventListener ('click', itemClick)
})

// Funções
function itemClick (event) {
    let item = event.target.getAttribute ('data-item')

    if (jogando && quadro [item] === '') {
        quadro [item] = player

        quadroRenderizado()
        playerAlternado()
    }
}

function reset() {
    aviso = ''

    let random = Math.floor(Math.random() * 2)

    player = (random === 0) ? 'x' : 'o'

    for (let i in quadro) {
        quadro [i] = ''
    }

    jogando = true

    quadroRenderizado()
    infoRenderizada()
}

function quadroRenderizado() {
    for (let i in quadro) {
        let item = document.querySelector (`div[data-item=${i}]`)
        item.innerHTML = quadro [i]
    }

    checarJogo()
}

function infoRenderizada() {
    document.querySelector ('.vez').innerHTML = player
    document.querySelector ('.resultado').innerHTML = aviso
}

function playerAlternado() {
    player = (player === 'x') ? 'o' : 'x'

    infoRenderizada()
}

function checarJogo() {
    if (checarOGanhador ('x')) {
        aviso = 'O "x" venceu'
        jogando = false
    } else if (checarOGanhador ('o')) {
        aviso = 'O "o" venceu'
        jogando = false
    } else if (estaCheio()) {
        aviso = 'Deu empate'
        jogando = false
    }
}

function checarOGanhador (player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (let w in pos) {
        let pArray = pos [w].split(',')
        let hasWon = pArray.every (option => quadro [option] === player)
    
        if (hasWon) {
            return true
        }
    }

    return false
}

function estaCheio() {
    for (let i in quadro) {
        if (quadro [i] === '') {
            return false
        }
    }

    return true
}