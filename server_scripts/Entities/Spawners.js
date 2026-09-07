// Spawners dictate where a zombie would spawn, placed spawners will save it's coords to the server for later use

// Get's the random random array, matches the index and get's the cooords
function RandomSpawner() { 
    ServerEvents.tick(event => {
        let server_data = event.server.persistentData

        if (!server_data.spawners || server_data.spawners.length === 0) return

        let level = event.server.overworld()
        let random_spawner = server_data.spawners[Math.floor(Math.random() * server_data.spawners.length)]
        let coords = random_spawner.split(',')
        
        let x = parseInt(coords[0])
        let y = parseInt(coords[1])
        let z = parseInt(coords[2])

        return x, y, z
    })
}

// Marks spawner corods if placed
BlockEvents.placed('minecraft:spawner', event => {
    let server = event.server
    let server_data = server.persistentData
    let posistion = `${event.block.x},${event.block.y},${event.block.z}`
    let player = event.player

    server_data.spawners = server_data.spawners || []

    if (server_data.spawners.indexOf(posistion) === -1) {
        server_data.spawners.push(posistion)
    }
    
    if (player) {
        player.tell(`§a[TaCZ: Zombies] Spawner placed at ${posistion}`)
    }
})

// sudo rm rf the spawner data if broken block === spawner
BlockEvents.broken('minecraft:spawner', event => {
    let server = event.server
    let server_data = server.persistentData
    let posistion = `${event.block.x},${event.block.y},${event.block.z}`
    let player = event.player

    if (server_data.spawners) {
        let index = server_data.spawners.indexOf(posistion)
        
        if (index !== -1) server_data.spawners.splice(index, 1)
    }

    if (player) {
        player.tell(`§c[TaCZ: Zombies] Spawner destryed at ${posistion}`)
    }
})