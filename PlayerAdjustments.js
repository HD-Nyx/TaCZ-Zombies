// Player stats tweaked for TaCZ: Zombies
import { PlayerSettings } from "./_Settings"

function Tweak(event){
    let player = event.player

    let speed_attribute = player.getAttribute('minecraft:generic.movement_speed')
    let jump_attribute = player.getAttribute('minecraft:generic.jump_strength')
    
    if (jump_attribute) {
        speed_attribute.setBaseValue(PlayerSettings.Speed)
        jump_attribute.setBaseValue(PlayerSettings.JumpHeight)
    }
}

PlayerEvents.loggedIn(event => {
    Tweak(event)
})

PlayerEvents.respawned(event => {
    Tweak(event)
})