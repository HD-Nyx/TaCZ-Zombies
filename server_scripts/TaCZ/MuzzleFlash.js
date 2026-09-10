//-- TaCZ: Zombies
// Location: Server
// Purpose: Players area wil be lit up upon shooting
// Configurable: Yes

var Settings = global.TaCZ_Zombies.Settings

TaCZServerEvents.entityShoot(event => {
    if (Settings.Guns.MuzzleFlash === false) {
        return
    }
    
    const player_entity = event.getEntity()
    const server = player_entity.server
    const level = player_entity.level

    const offset_y = 1

    const target_block = level.getBlock(
        player_entity.blockX,
        player_entity.blockY + offset_y,
        player_entity.blockZ
    )

    if (target_block.id !== 'minecraft:air') {
        return
    }

    target_block.set('minecraft:light', { level: '12' })

    server.scheduleInTicks(1, () => {
        const light_block = level.getBlock(
            player_entity.blockX,
            player_entity.blockY + offset_y,
            player_entity.blockZ
        )

        if (light_block.id === 'minecraft:light') {
            light_block.set('minecraft:air')
        }
    })
})