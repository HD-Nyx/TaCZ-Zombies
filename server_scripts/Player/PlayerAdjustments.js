//-- TaCZ: Zombies
// Location: Server
// Purpose: Change players movement stats
// Configurable: Yes

var Settings = global.TaCZ_Zombies.Settings

function Tweak(event){
    let player = event.player

    let speed_attribute = player.getAttribute('minecraft:generic.movement_speed')
    let jump_attribute = player.getAttribute('minecraft:generic.jump_strength')
    
    if (jump_attribute) {
        speed_attribute.setBaseValue(Settings.Player.Speed)
        jump_attribute.setBaseValue(Settings.Player.JumpHeight)
    }
}

PlayerEvents.loggedIn(event => {
    Tweak(event)
})

PlayerEvents.respawned(event => {
    Tweak(event)
})
