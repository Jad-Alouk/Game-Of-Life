function resizeCanvas(canvas, winW, winH) {

    canvas.width = Math.floor(winW * 0.9)
    canvas.height = Math.floor(winH * 0.9)

}

function calcDimensions(W, H, scale, density) {

    scale = Math.floor(W / density)
    let originX = Math.floor(W / 2)
    let originY = Math.floor(H / 2)

    return { scale, density, originX, originY }

}

function changeScale(delatY, density) {

    if (delatY > 0) {
        density += 10

    } else {
        density -= 10
    }

    return density

}

function getCoords(pixelX, pixelY, originX, originY, scale) {

    const x = Math.floor((pixelX - originX) / scale)
    const y = Math.floor((originY - pixelY) / scale)

    return { x, y }
    
}

function drawGrid(canvas, scale, originX, originY) {

    const W = canvas.width
    const H = canvas.height
    const c = canvas.getContext("2d")

    c.clearRect(0, 0, W, H)
    c.strokeStyle = "white"
    c.lineWidth = 1

    // 1. Calculate how many units are visible to the left and right of the origin
    const leftBound = Math.ceil(-originX / scale)
    const rightBound = Math.ceil((W - originX) / scale)

    // 2. Calculate how many units are visible above and below the origin
    const topBound = Math.ceil(-originY / scale)
    const bottomBound = Math.ceil((H - originY) / scale)

    c.beginPath()

    // Draw Vertical Lines
    for (let x = leftBound; x <= rightBound; x++) {
        const xPos = originX + x * scale
        c.moveTo(xPos, 0)
        c.lineTo(xPos, H)
    }

    // Draw Horizontal Lines
    for (let y = topBound; y <= bottomBound; y++) {
        const yPos = originY + y * scale
        c.moveTo(0, yPos)
        c.lineTo(W, yPos)
    }

    c.stroke()
}


export {
    resizeCanvas,
    calcDimensions,
    changeScale,
    getCoords,

}