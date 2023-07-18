// Listeners
document.addEventListener("keydown", keyPush)

// canvas
const canvas = document.querySelector("canvas")
const titleScore = document.getElementById("scoreNumber")
const ctx = canvas.getContext("2d")
const gameOverCard = document.getElementById("gameOverCard")

// game
let gameIsRunning = true

// player
const snakeSize = 30
let snakePosX = 0
let snakePosY = ( canvas.height / 2)
let snakeSpeed = 30

let velocityX = 1 // přepni na 1
let velocityY = 0

// Food
let foodPosX = 0
let foodPosY = 0

// tail
let tail = []
let snakeLength = 4

// Score
let score = 0

// game loop
const gameLoop = () => {
    if (gameIsRunning){
        gameOverCard.style.display = "none"
        drawStuff()
        moveStuff()
        setTimeout(gameLoop, 1000 / 15)
    }
    // spusť funkci každý jeden frame, 60fps
    //requestAnimationFrame(gameLoop) 
}
resetFood()
gameLoop()


function moveStuff() {
    snakePosX += snakeSpeed * velocityX
    snakePosY += snakeSpeed * velocityY

    // wall collision
    if( snakePosX > canvas.width - snakeSize ){
        snakePosX = 0
    }
    if( snakePosX < 0 ){
        snakePosX = canvas.width
    }
    if( snakePosY > canvas.height - snakeSize ){
        snakePosY = 0
    }
    if( snakePosY < 0 ){
        snakePosY = canvas.height
    }

    // game over
    tail.forEach(( snakePart ) => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y){
           gameOver()
           //console.log("game over");
        }
    })

    // tail 
    tail.push({ x: snakePosX, y: snakePosY })

    // forget earliest parts of snake
    tail = tail.slice( -1 * snakeLength)

    // food collistion
    if(snakePosY === foodPosY && snakePosX === foodPosX){
        titleScore.textContent = ++score
        snakeLength++
        resetFood()
    }
}


function drawStuff() {
    // background
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height)

    // grid
    drawGrid()
    
    // food
    rectangle("blue", foodPosX, foodPosY, snakeSize, snakeSize )
    
    // tail
    tail.forEach( snakePart => 
        rectangle("gray", snakePart.x, snakePart.y, snakeSize, snakeSize)    
    )

    // snake
    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize )
}

// nakresli čtverec // hrací plocha, had
function rectangle(color, x, y, height, width){
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function resetFood() {
    foodPosX = Math.floor(Math.random() * (canvas.width / 30) ) * snakeSize 
    foodPosY = Math.floor(Math.random() * (canvas.height / 30) ) * snakeSize 

    if( foodPosX === snakePosX && foodPosY === snakePosY){
        resetFood()
    }
}

function gameOver(){
    titleScore.innerHTML = ` <strong> ${score} </strong>`
    gameIsRunning = false
    gameOverCard.style.display = "block"
}

// Keyboard
function keyPush(event){
    switch (event.key) {
        case "ArrowUp":
            if(velocityY !== 1){
                velocityY = -1
                velocityX = 0
            }
            break;

        case "ArrowDown":
            if(velocityY !== -1){
                velocityY = +1
                velocityX = 0
            }
            break;

        case "ArrowRight":
            if(velocityX !== -1){
                velocityY = 0
                velocityX = +1
            }
            break;

        case "ArrowLeft":
            if(velocityX !== 1){
                velocityY = 0
                velocityX = -1
            }
            break;
            default:
            // restart game
            if ( ! gameIsRunning ) location.reload()
            break
    }
}

//draw grid
function drawGrid() {
    for (let i = 0; i < canvas.width / snakeSize; i++) {
        for (let j = 0; j < canvas.width / snakeSize; j++) {
            rectangle("white", snakeSize * i, snakeSize * j, snakeSize - 1, snakeSize - 1) 
        }
    }
}

