import { PlayerSettings } from "./_Settings"

EntityEvents.death(event => {
    let entity = event.entity

    if (entity.isPlayer()) {
        // For dramatic effect
        let lightning = event.level.createEntity('minecraft:lightning_bolt')
        lightning.setPosition(entity.x, entity.y, entity.z)
        lightning.setVisualOnly(true)

        lightning.spawn()

        entity.server.runCommandSilent(`playsound minecraft:entity.ender_dragon.ambient master @a ${entity.x} ${entity.y} ${entity.z} 10.0 1.0`)
        
    }   
})

// Punishing player
EntityEvents.death(event => {
    let entity = event.entity

    if (entity.isPlayer()) {
        let current_points = entity.persistentData.getInt('Points')
        let new_points = Math.floor(current_points / PlayerSettings.DividePointsAmount)

        entity.persistentData.putInt('Points', new_points)
        entity.server.runCommandSilent(`scoreboard players set ${entity.username} Points ${new_points}`)
    }
})


// Spectator upon death
PlayerEvents.respawned(event => {
    if (PlayerSettings.SpectatorOnDeath) {
        let server = event.server
        let player = event.player

        server.runCommandSilent(`gamemode spectator ${player.username}`)
        server.runCommandSilent(`clear ${player.username}`)
    }
})