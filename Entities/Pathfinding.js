// Pathfinding for zombies
// Designed so then zombies know your location at all times and relentlessly chase you down
function GetNearestPlayerCoords(level, x, y, z) {
    let players = level.getPlayers()
    let nearest_player = null
    let closest_distance = Infinity
    
    players.forEach(player => {
        if (player.isCreative() || player.isSpectator()) return
        
        let distance = player.distanceToSqr(x, y, z)
        
        if (distance < closest_distance) {
            closest_distance = distance
            nearest_player = player
        }
    })
    
    if (nearest_player) {
        return {entity: nearest_player, x: nearest_player.x, y: nearest_player.y, z: nearest_player.z}
    } else {
        return null
    }
}


LevelEvents.tick(event => {
    let level = event.level

    level.getEntities().forEach(entity => {
        if (entity.type !== 'minecraft:zombie') return
        
        let target = GetNearestPlayerCoords(level, entity.x, entity.y, entity.z)
        
        if (target) {
            entity.getNavigation().moveTo(target.x, target.y, target.z, 1)
            entity.setTarget(target.entity)
        }
    })
})