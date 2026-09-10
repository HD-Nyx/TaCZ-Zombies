//-- TaCZ: Zombies
// Location: Server
// Purpose: Provide players points after killing a certion zombie
// Configurable: Yes

var Settings = global.TaCZ_Zombies.Settings

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
            cue_points = Settings.Points.BabyZombieAmount
            kill_message = `§c+${Settings.Points.BabyZombieAmount}§r points for killing a Baby Zombie..`
            break
            
        case entity.type === 'minecraft:zombie':
            cue_points = Settings.Points.ZombieAmount
            kill_message = `§c+${Settings.Points.ZombieAmount}§r points for killing a Zombie..`
            break
            
        case entity.type === 'mutantmonsters:mutant_zombie':
            cue_points = Settings.Points.BruteAmount
            kill_message = `§c+${Settings.Points.BruteAmount}§r points for killing a Brute..`
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
        
        killer.displayClientMessage(kill_message, true)
        event.server.runCommandSilent(`scoreboard players set ${killer.username} Points ${new_points}`)
    }
})
