//-- TaCZ: Zombies
// Location: Server
// Purpose: Settings that the server scripts will uuse
// Configurable: Yes

global.TaCZ_Zombies = global.TaCZ_Zombies || {}

global.TaCZ_Zombies.Settings = {
    Guns: {
        MuzzleFlash: true
    },

    Points: {
        ZombieAmount: 100,
        BabyZombieAmount: 125,
        BruteAmount: 500
    },

    Player: {
        Speed: 0.1,
        JumpHeight: 0.35,
        DividePointsAmount: 2,
        SpectatorOnDeath: true
    },

    Team: {
        FriendlyFire: false
    }
}