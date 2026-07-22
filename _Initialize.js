import { TeamSettings } from "./_Settings"

// All the persistants for player
PlayerEvents.loggedIn(event => {
    let player = event.player

    player.persistentData.putInt('Points', 0)
    event.server.runCommandSilent(`scoreboard players set ${player.username} Points 0`)

    if (player.isAlive()) {
        player.persistentData.putBoolean('IsDead', false)
    } else if (!player.isAlive()) {
        player.persistentData.putBoolean('IsDead', true)
    }
})

// Initilize Survivor team
ServerEvents.loaded(event => {
    let server = event.server

    server.runCommandSilent(`team add Survivors`)
    server.runCommandSilent(`team modify Survivors friendlyFire ${TeamSettings.FriendlyFire}`)
    server.runCommandSilent(`team modify Survivors nametagVisibility never`)
})

// Initilize Zombie team
ServerEvents.loaded(event => {
    let server = event.server

    server.runCommandSilent(`team add Zombies`)
    server.runCommandSilent('team modify Zombies color red')

})

// Remove teams (fixes debugging headache)
ServerEvents.unloaded(event => {
    let server = event.server

    server.runCommandSilent('team remove Survivors')
    server.runCommandSilent('team remove Zombies')
})