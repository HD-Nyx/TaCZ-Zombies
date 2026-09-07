// A sort of start up script

// Imports
import { TeamSettings } from "./_Settings"

// All the persistants for player
PlayerEvents.loggedIn(event => {
    let player = event.player

    player.persistentData.putInt('Points', 0)
    event.server.runCommandSilent(`scoreboard players set ${player.username} Points 0`)

    if (player.isAlive()) {
        player.persistentData.putBoolean('IsDead', false)
    } else if (!player.isAlive()) {
        player.persistentData.putBoolean('IsDead', true)
    }
})

// Initilize Survivor team
ServerEvents.loaded(event => {
    let server = event.server

    server.runCommandSilent(`team add Survivors`)
    server.runCommandSilent(`team modify Survivors friendlyFire ${TeamSettings.FriendlyFire}`)
    server.runCommandSilent(`team modify Survivors nametagVisibility never`)
})

// Initilize Zombie team
ServerEvents.loaded(event => {
    let server = event.server

    server.runCommandSilent(`team add Zombies`)
    server.runCommandSilent('team modify Zombies color red')
})

// Remove teams (fixes debugging headache)
ServerEvents.unloaded(event => {
    let server = event.server

    server.runCommandSilent('team remove Survivors')
    server.runCommandSilent('team remove Zombies')
})

// Commands
ServerEvents.commandRegistry(event => {
    const { commands, arguments: args } = event

    event.register(
        commands.literal('tacz_zombies')
            .then(commands.literal('purchase')
            .then(commands.argument('item', args.STRING.create(event))
            .then(commands.argument('amount', args.INTEGER.create(event))
                    .executes(context => {
                        let player = context.source.player
                        let player_points = player.persistentData.getInt('Points')
                        
                        let item_input = args.STRING.getResult(context, 'item')
                        let amount_input = args.INTEGER.getResult(context, 'amount')
                        
                        if (player_points >= amount_input) {
                            player.displayClientMessage(Text.of('Purchase was succsessfull'), false)
                        } else {
                            player.displayClientMessage(Text.of('You do not have enough points peasant'), false)
                        }

                        player.give(Item.of(item_input, amount_input))
                        
                        return 1
                    })
                )
            )
        )
    )
})

// what the fuck is this syntax bro