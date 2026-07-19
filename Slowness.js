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

                player.invulnerableTime = 5
                break
                
            case 'mutantmonsters:mutant_zombie':
                player.potionEffects.add('minecraft:slowness', 60, 1)
                player.potionEffects.add('minecraft:resistance', 80, 2)
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