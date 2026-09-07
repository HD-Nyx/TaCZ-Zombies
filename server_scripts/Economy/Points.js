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
        let current_tick = event.server.tickCount
        let last_kill_tick = killer.persistentData.getInt('LastKillTick') || 0
        let combo_count = killer.persistentData.getInt('KillCombo') || 0
        
        let time_window = 60 

        if (current_tick - last_kill_tick <= time_window) {
            combo_count += 1
        } else {
            combo_count = 1 
        }

        if (combo_count >= 2) {
            cue_points = cue_points + Math.floor(cue_points * 0.9) * (combo_count - 1)
            kill_message = `§c+${cue_points}§r points (${combo_count}x Kill Bonus!)`
        }

        killer.persistentData.putInt('LastKillTick', current_tick)
        killer.persistentData.putInt('KillCombo', combo_count)

        let current_points = killer.persistentData.getInt('Points')
        let new_points = current_points + cue_points
        killer.persistentData.putInt('Points', new_points)
        
        killer.displayClientMessage(Text.of(kill_message), true)
        killer.server.runCommandSilent(`scoreboard players set ${killer.username} Points ${new_points}`)
    }
})