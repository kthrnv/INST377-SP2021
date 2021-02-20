document.addEventListener('DOMContentLoaded' | () {
    const bird = document.querySelecter('.bird')
    const gameDisplay = document.querySelecter('.game=container')
    const ground = document.querySelecter('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2

    function startGame() {
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    startGame()
})