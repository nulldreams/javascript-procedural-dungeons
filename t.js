const snake = document.getElementsByClassName("snake")[0]
const directions = {
    top: 'margin-top',
    left: 'margin-left',
    right: 'margin-left',
    bottom: 'margin-top'
}
const position = { top: 1, left: 1, right: 1, bottom: 1 }
const gameOptions = {
    paused: false,
    snake: {
        speed: 1,
        position: {
            x: 0,
            y: 0
        }
    }
}
let direction = "right"

const game = async () => {
    const margin = directions[direction]
    if ((direction === "top" || direction === "left")) gameOptions.snake.speed = -1
    if ((direction === "right" || direction === "bottom")) gameOptions.snake.speed = 1
    setPosition(gameOptions.snake.position, gameOptions.snake.speed)
    checkInputs()
}

const setPosition = ({ x, y }, speed) => {
    position[direction] += speed
    snake.setAttribute("style", `margin-top: ${position.top}px; margin-left: ${position.left}px`)
}

const checkInputs = (e) => {
    if (!e) return
    switch (e.key) {
        case "ArrowUp":
            direction = "top"
            break
        case "ArrowRight":
            direction = "right"
            break
        case "ArrowLeft":
            direction = "left"
            break
        case "ArrowDown":
            direction = "bottom"
            break
    }
    console.log(direction, e.key)
}

document.body.onkeydown = checkInputs
setInterval(() => {
    game()
}, 200);