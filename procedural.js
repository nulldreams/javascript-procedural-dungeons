const starter = { name: 'starter', src: './assets/tiles/starter.png' }
const mid = { name: 'mid', src: './assets/tiles/mid.png' }
const mid_right = { name: 'mid_right', src: './assets/tiles/mid_right.png' }
const mid_left = { name: 'mid_left', src: './assets/tiles/mid_left.png' }
const last = { name: 'last', src: './assets/tiles/last.png' }

const randomTile = (first) => {
    let tiles
    if (first) tiles = [mid, mid_right]
    else tiles = [mid, mid_right, mid_left]
    const random = Math.floor(Math.random() * tiles.length)
    return tiles[random]
}

const dungeonTree = Array(4).fill().map(() => Array(4).fill([]))
const levels = 4
const initialPosition = { x: 0, y: 0 }
const lastPosition = initialPosition

const wait = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        return resolve(true)
    }, ms);
})

window.onload = () => {
    const canvas = document.getElementById('game').getContext('2d')
    const generateDungeon = async (column) => {
        for (let i = 0; i < levels; i++) {
            if (!dungeonTree[0]) addRoom(starter, i, { x: column, y: i * 32 }, canvas, column)
            if (i > 0 && i < levels - 1) addRoom(randomTile(column === 0 ? true : false), i, { x: column, y: i * 32 }, canvas, column)
            if (i === levels - 1) addRoom(last, i, { x: column, y: i * 32 }, canvas, column)
            await wait(500)
        }
        // if (column <= 0) column = 1
        if (column < 4) generateDungeon(column * 32)
    }
    
    const addRoom = (tile, id, position, canvas, column) => {
        // console.log(dungeonTree[column][id])
        // dungeonTree[column][id].push({
        //     "id": id,
        //     "tile": tile.name,
        //     "src": tile.src,
        //     "position": position,
        // })
        createImage(tile.src, canvas, position)
    }
    
    const createImage = (src, canvas, position) => {
        const image = new Image()
        image.onload = () => canvas.drawImage(image, position.x, position.y, 32, 32)
        image.src = src
    }

    generateDungeon(0)
}

// const game = async () => {
//     console.log(document.getElementById('game'))
//     var ctx = document.getElementById('game').getContext('2d')
//     createImage(roadTypes.starter, ctx)
// }

// setTimeout(() => {
//     setInterval(() => {
//         game()
//     }, 200);
// }, 1000);