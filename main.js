import {
    resizeCanvas,
    calcDimensions,
    changeScale,
    getCoords
} from "./grid.js"

import { strToNumCoords, initGens, getLiveNeighborsCount } from "./helpers.js"


const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const userRun = document.querySelector("#run")
const userClear = document.querySelector("#clear")

// Globals
let gameState = false
let SPEED_RATE = 100
let currGen = {}
let nextGen = {}

let dimensions = {
    scale: 10,       // Cell size
    density: 70,    // Number of cells per row
    originX: 0,
    originY: 0
}


// Events
window.addEventListener(
    "resize",
    () => {

        resizeCanvas(
            canvas,
            window.innerWidth, window.innerHeight
        )

        dimensions = calcDimensions(
            canvas.width, canvas.height, 
            dimensions.scale, dimensions.density
        )

    }
    
)

canvas.addEventListener(
    "wheel",
    (e) => {

        dimensions.density = changeScale(e.deltaY, dimensions.density)

        dimensions = calcDimensions(
            canvas.width, canvas.height, 
            dimensions.scale, dimensions.density
        )

    }
)

canvas.addEventListener(
    "click",
    (e) => {

        if (!gameState) {

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.x
            const y = e.clientY - rect.y
            
            
            const coords = getCoords(
                x, y,
                dimensions.originX,
                dimensions.originY,
                dimensions.scale
            )
            
            if (currGen[`${coords.x},${coords.y}`]) {
                currGen[`${coords.x},${coords.y}`] = false
            } else {
                currGen[`${coords.x},${coords.y}`] = true
            }

        }

    }
)

userRun.addEventListener(
    "click",
    () => {
        gameState = !gameState

        if (gameState) {
            userRun.style.backgroundColor = "orange"
        } else {
            userRun.style.backgroundColor = "green"
        }
    }
)

userClear.addEventListener(
    "click",
    () => {
        gameState = false
        userRun.style.backgroundColor = "green"
        currGen = {}
        nextGen = {}
        initGens(
            currGen, nextGen,
            canvas.width, canvas.height,
            dimensions.scale,
            dimensions.originX, dimensions.originY
        )
    }
)


// Init
resizeCanvas(
    canvas,
    window.innerWidth, window.innerHeight
)

dimensions = calcDimensions(
    canvas.width, canvas.height,
    dimensions.scale, dimensions.density
)

initGens(
    currGen, nextGen,
    canvas.width, canvas.height,
    dimensions.scale,
    dimensions.originX, dimensions.originY
)


// Animation
let lastTime = 0

function run(timestamp) {

    if (!gameState) {
        draw()
        requestAnimationFrame(run)
        return
    }

    if (timestamp - lastTime < SPEED_RATE) {
        requestAnimationFrame(run)
        return
    }

    lastTime = timestamp
    draw()

    for (const coord in currGen) {
        const pos = strToNumCoords(coord)
        const count = getLiveNeighborsCount(currGen, pos.x, pos.y)
        const isAlive = currGen[coord]

        if (isAlive) {
            nextGen[coord] = (count === 2 || count === 3)
        } else {
            nextGen[coord] = (count === 3)
        }
    }

    ;[currGen, nextGen] = [nextGen, currGen]
    nextGen = {}
    requestAnimationFrame(run)

}

function draw() {

    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "white"
    
    for (const coord in currGen) {
        if (currGen[coord]) {
            const pos = strToNumCoords(coord)
            c.fillRect(
                Math.floor(pos.x * dimensions.scale + dimensions.originX),
                Math.ceil(-(pos.y * dimensions.scale - dimensions.originY)) - dimensions.scale,
                dimensions.scale,
                dimensions.scale
            )
        }
    }

}

requestAnimationFrame(run)