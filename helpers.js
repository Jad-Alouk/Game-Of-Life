function strToNumCoords(coords) {

    const split = coords.split(",")
    const x = Number(split[0])
    const y = Number(split[1])

    return { x, y }

}

function numToStrCoords(x, y) {
    return `${x},${y}`
}

function initGens(currGen, nextGen, W, H, scale, originX, originY) {

    // 1. Calculate how many units are visible to the left and right of the origin
    const leftBound = Math.floor(-originX / scale)
    const rightBound = Math.ceil((W - originX) / scale)

    // 2. Calculate how many units are visible above and below the origin
    const topBound = Math.floor(-originY / scale)
    const bottomBound = Math.ceil((H - originY) / scale)

    // 3. Add a spot for each coord
    for (let x = leftBound; x <= rightBound; x++) {
        for (let y = topBound; y <= bottomBound; y++) {
            currGen[`${x},${y}`] = false
            nextGen[`${x},${y}`] = false
        }
    }

}

function getLiveNeighborsCount(currGen, x, y) {

    let count = 0

    // Right
    if (currGen[numToStrCoords(x + 1, y)]) count++

    // Left
    if (currGen[numToStrCoords(x - 1, y)]) count++

    // Top
    if (currGen[numToStrCoords(x, y - 1)]) count++

    // Bottom
    if (currGen[numToStrCoords(x, y + 1)]) count++

    // Top Right
    if (currGen[numToStrCoords(x + 1, y - 1)]) count++

    // Bottom Right
    if (currGen[numToStrCoords(x + 1, y + 1)]) count++

    // Top left
    if (currGen[numToStrCoords(x - 1, y - 1)]) count++

    // Bottom left
    if (currGen[numToStrCoords(x - 1, y + 1)]) count++

    return count

}


export {
    strToNumCoords,
    initGens,
    getLiveNeighborsCount
}