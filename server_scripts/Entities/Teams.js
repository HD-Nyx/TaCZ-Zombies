// Teams for players and mobs, used for changing entity to entity interactions
// Teams are created at '../_Initialize.js'

// Team for player
PlayerEvents.loggedIn(event => {
    let server = event.server
    let player = event.player

    if (player.getTeam() === null ) {
        server.runCommandSilent(`team join Survivors ${player.username}`)
    }
})

PlayerEvents.loggedOut(event => {
    let server = event.server
    let player = event.player

    server.runCommandSilent(`team leave ${player.username}`)
})

// Adds new Zombies to the Zombies team
EntityEvents.spawned(event => {
    let server = event.server
    let entity = event.entity

    if (entity.type === 'minecraft:zombie' || entity.type === 'mutantmonsters:mutant_zombie') {
        server.runCommandSilent(`team join Zombies ${entity.stringUuid}`)
    }
})