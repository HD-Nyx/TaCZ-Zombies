function TaCZTweak(event) {
    let server = event.server
    let player = event.player
    let username = player.username
    
    server.runCommandSilent(`attribute ${username} tacz_attributes:recoil base set 1.5`)
    server.runCommandSilent(`attribute ${username} tacz_attributes:gun_damage base set 0.8`)
} 

PlayerEvents.loggedIn(event => {
    TaCZTweak(event)
})

PlayerEvents.loggedOut(event => {
    TaCZTweak(event)
})

