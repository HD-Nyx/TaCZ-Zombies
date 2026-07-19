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
