declare class TaCZServerEvents {
    // FIXED: Changed from taking a raw object to accepting a callback routine
    static entityShoot(callback: (event: LivingEntityShootEvent) => void): void;
    static entityAim(callback: (event: LivingEntityAimEvent) => void): void;
    static entityMelee(callback: (event: LivingEntityMeleeEvent) => void): void;
    static entityReload(callback: (event: LivingEntityReloadEvent) => void): void;

    static gunIndexLoad(callback: (event: GunIndexLoadEvent) => void): void;
    static ammoIndexLoad(callback: (event: AmmoIndexLoadEvent) => void): void;
    static attachmentIndexLoad(callback: (event: AttachmentIndexLoadEvent) => void): void;

    static gunDataLoad(callback: (event: GunDataLoadEvent) => void): void;
    static attachmentDataLoad(callback: (event: AttachmentDataLoadEvent) => void): void;
    static attachmentTagsLoad(callback: (event: AttachmentTagsLoadEvent) => void): void;
}

/** net.minecraft.world.entity.LivingEntity */
type LivingEntity = any;
/** net.minecraft.resources.ResourceLocation */
type ResourceLocation = any;
/** net.minecraft.world.item.ItemStack */
type ItemStack = any;
/** com.tacz.guns.resource.pojo.data.gun.GunData */
type GunData = any;
/** com.tacz.guns.resource.pojo.data.attachment.AttachmentData */
type AttachmentData = any;
/** com.tacz.guns.resource.pojo.GunIndexPOJO */
type GunIndexPOJO = any;
/** com.tacz.guns.resource.pojo.AmmoIndexPOJO */
type AmmoIndexPOJO = any;
/** com.tacz.guns.resource.pojo.AttachmentIndexPOJO */
type AttachmentIndexPOJO = any;


interface AbstractShooterEvent {
    getEntity(): LivingEntity;
    getShooter(): LivingEntity;
    getGunId(): ResourceLocation;
    getGunItem(): ItemStack;
}

interface LivingEntityShootEvent extends AbstractShooterEvent {
    cancelShoot(): void;
}

interface LivingEntityAimEvent extends AbstractShooterEvent {
    cancelAim(): void;
}

interface LivingEntityMeleeEvent extends AbstractShooterEvent {
    cancelMelee(): void;
}

interface LivingEntityReloadEvent extends AbstractShooterEvent {
    cancelReload(): void;
}

interface AbstractLoadEvent {
    getId(): ResourceLocation;
    getJson(): string;
    getStdJson(): string;
    setJson(json: string): void;
}

interface GunDataLoadEvent extends AbstractLoadEvent {
    getGunData(): GunData;
    removeGunData(): void;
}
interface AttachmentDataLoadEvent extends AbstractLoadEvent {
    getAttachmentData(): AttachmentData;
    removeAttachmentData(): void;
}
interface AttachmentTagsLoadEvent extends AbstractLoadEvent {
    getAttachmentTags(): string[];
    removeAttachmentTags(): void;
}
interface GunIndexLoadEvent extends AbstractLoadEvent {
    getPOJO(): GunIndexPOJO;
    removeGun(): void;
}
interface AmmoIndexLoadEvent extends AbstractLoadEvent {
    getPOJO(): AmmoIndexPOJO;
    removeAmmo(): void;
}
interface AttachmentIndexLoadEvent extends AbstractLoadEvent {
    getPOJO(): AttachmentIndexPOJO;
    removeAttachment(): void;
}
