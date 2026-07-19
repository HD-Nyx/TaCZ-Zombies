import { PointSettings } from "./_Settings"
import { PlayerSettings } from "./_Settings"

// Register Points (scoreboard)
ServerEvents.loaded(event => {
    // Clean up
    event.server.runCommandSilent('scoreboard players reset * Points')
    event.server.runCommandSilent('scoreboard objectives remove Points')

    event.server.runCommandSilent('scoreboard objectives add Points dummy "§cPoints"')
    event.server.runCommandSilent('scoreboard objectives setdisplay sidebar Points')
})

// Rewarding
EntityEvents.death(event => {
    let entity = event.entity
    let killer = event.source.player 


    if (!killer || !killer.isPlayer()) return
    
    let cue_points = 0
    let kill_message = ''

    switch (true) {
        case entity.type === 'minecraft:zombie' && entity.isBaby():
            cue_points = PointSettings.BabyZombieAmount
            kill_message = `§c+${PointSettings.BabyZombieAmount}§r points for killing a Baby Zombie..`
            break
            
        case entity.type === 'minecraft:zombie':
            cue_points = PointSettings.ZombieAmount
            kill_message = `§c+${PointSettings.ZombieAmount}§r points for killing a Zombie..`
            break
            
        case entity.type === 'mutantmonsters:mutant_zombie':
            cue_points = PointSettings.BruteAmount
            kill_message = `§c+${PointSettings.BruteAmount}§r points for killing a Brute..`
            break
    }

    if (cue_points > 0) {
        let current_points = killer.persistentData.getInt('Points')
        let new_points = current_points + cue_points

        killer.persistentData.putInt('Points', new_points)
        
        killer.displayClientMessage(Text.of(kill_message), true)
        killer.server.runCommandSilent(`scoreboard players set ${killer.username} Points ${new_points}`)
    }
})