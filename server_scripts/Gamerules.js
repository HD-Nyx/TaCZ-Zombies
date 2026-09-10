//-- TaCZ: Zombies
// Location: Server
// Purpose: Make gamerules consistant across worlds

// Configurable: No
const Gamerules = {
    announceAdvancements: false,
    blockExplosionDropDecay: false,
    commandBlockOutput: false,
    commandModificationBlockLimit: 10000,
    disableElytraMovementCheck: false,
    disableRaids: true,

    doDaylightCycle: false,
    doEntityDrops: true,
    doFireTick: false,
    doImmediateRespawn: false,
    doInsomnia: false,
    doLimitedCrafting: true,
    doMobLoot: false,
    doMobSpawning: false,
    doPatrolSpawning: false,
    doTileDrops: false,
    doTraderSpawning: false,
    doVinesSpread: false,
    doWardenSpawning: false,
    doWeatherCycle: false,

    drowningDamage: true,
    enderPearlsVanishOnDeath: true,
    fallDamage: true,
    fireDamage: true,
    forgiveDeadPlayers: false,
    freezeDamage: true,
    globalSoundEvents: false,
    keepInventory: true,
    lavaSourceConversion: false,
    logAdminCommands: true,

    maxCommandChainLength: 99999,
    maxCommandForkCount: 9999,
    maxEntityCramming: 50,

    mobExplosionDropDecay: true,
    mobGriefing: true,
    naturalRegeneration: false,

    playersNetherPortalCreativeDelay: 1,
    playersNetherPortalDefaultDelay: 10,
    playersSleepingPercentage: 100,

    projectilesCanBreakBlocks: true,
    randomTickSpeed: 0,
    reducedDebugInfo: false,
    sendCommandFeedback: true,
    showDeathMessages: true,

    snowAccumulationHeight: 0,
    spawnChunkRadius: 2,
    spawnRadius: 10,
    spectatorsGenerateChunks: false,

    tntExplosionDropDecay: false,
    universalAnger: true,
    waterSourceConversion: true
}

ServerEvents.loaded(event => {
    for (const [gamerule, value] of Object.entries(Gamerules)) {
        event.server.runCommandSilent(`gamerule ${gamerule} ${value}`)
    }
})
