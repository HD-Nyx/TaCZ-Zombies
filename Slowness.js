// Situations where slowness gets applied

// 1. Getting hit by a zombie (@a)
EntityEvents.afterHurt(event => {
    if (event.entity.isPlayer()) {
        let player = event.entity
        let attacker = event.source.actual
        
        if (!attacker) return

        switch (attacker.type) {
            case 'minecraft:zombie':
                player.potionEffects.add('minecraft:slowness', 30, 2) 
                event.server.runCommandSilent(`execute at ${player.username} run playsound minecraft:entity.breeze.hurt hostile @a ~ ~ ~ 1.0 1.0`)

                player.invulnerableTime = 50
                break
                
            case 'mutantmonsters:mutant_zombie':
                player.potionEffects.add('minecraft:slowness', 60, 1)
                player.potionEffects.add('minecraft:resistance', 80, 2)
                event.server.runCommandSilent(`execute at ${player.username} run playsound minecraft:entity.breeze.death hostile @a ~ ~ ~ 1.0 1.0`)
                break
        }
    }
})

// 2. Being on fire by molotov (@e)
EntityEvents.afterHurt(event => {
    let entity = event.entity

    if (entity.hasEffect('lrtactical:flammable')) {
        entity.potionEffects.add('minecraft:slowness', 60, 3)
    }
})