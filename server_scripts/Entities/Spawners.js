//-- TaCZ: Zombies
// Location: Server
// Purpose: Track every spawner placed and broken so then zombies know where to spawn
// Configurable: No

// Get a random spawner coordinate
function RandomSpawner(event) {
    let ServerData = event.server.persistentData
    let Spawners = ServerData.getList('spawners', 8)

    if (Spawners.isEmpty()) return null

    let RandomIndex = Math.floor(Math.random() * Spawners.size())
    let RandomPosition = Spawners.getString(RandomIndex)
    let Coordinates = RandomPosition.split(',')

    return {
        x: parseInt(Coordinates[0]),
        y: parseInt(Coordinates[1]),
        z: parseInt(Coordinates[2])
    }
}

// Marks spawner coords if placed
BlockEvents.placed('minecraft:spawner', event => {
    let ServerData = event.server.persistentData
    let Position = `${event.block.x},${event.block.y},${event.block.z}`
    let Player = event.player

    let Spawners = ServerData.getList('spawners', 8)

    let AlreadyExists = false

    for (let Index = 0; Index < Spawners.size(); Index++) {
        if (Spawners.getString(Index) === Position) {
            AlreadyExists = true
            break
        }
    }

    if (!AlreadyExists) {
        Spawners.add(Spawners.size(), StringTag.valueOf(Position))
        ServerData.put('spawners', Spawners)
    }

    if (Player) {
        Player.tell(`§a[TaCZ: Zombies] Spawner placed at ${Position}`)
    }
})

// Removes spawner data if a spawner is broken
BlockEvents.broken('minecraft:spawner', event => {
    let ServerData = event.server.persistentData
    let Position = `${event.block.x},${event.block.y},${event.block.z}`
    let Player = event.player

    let Spawners = ServerData.getList('spawners', 8)

    for (let Index = 0; Index < Spawners.size(); Index++) {
        if (Spawners.getString(Index) === Position) {
            Spawners.remove(Index)
            break
        }
    }

    ServerData.put('spawners', Spawners)

    if (Player) {
        Player.tell(`§c[TaCZ: Zombies] Spawner destroyed at ${Position}`)
    }
})