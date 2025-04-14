<template>
    <ButtonComponent @click="openPopup">Buka Halaman Tanda Tangan</ButtonComponent>/
    <!-- <iframe
        src="https://sandbox-sign.np.vida.id/direct-sign/3dc81c1f-0b68-4f3a-b84c-20b8ce193624?code=XqElUnHBevFQPJTVaRwCICw72NXXElbU2ex%2Fy6BD%2BYbriIg81ltJeyljJ1%2BEUDofWYTG0X7rDVjT7xTyGhK%2BwCt6%2FKHCyytvO7s6Pi7aFTLWOaqLP5zjs4D7Ef6rp%2FtQszvTtpERIK30iICvXULr21OyltssbdG4%2BzxEAX1D8gBPIMEhPlSB7ekH2dgruo9GNn%2BL%2BX3W0a%2BdczteTVG4wkTIFLsMzAlYfMFB%2BN4XEmuxXH6xRptoNzsf99o7ig1LQeNg%2FSDiiZIULKdhBjxoc%2BCKYAinanaq9qMb9TV%2Bl5MjD056F5vO5HpZIraMqvgsxkLRS0lufOH50ImP9G9R5A%3D%3D"
        width="600" height="400"></iframe> -->
    <!-- <iframe
        src="https://sandbox-sign.np.vida.id/direct-sign/3dc81c1f-0b68-4f3a-b84c-20b8ce193624?code=XqElUnHBevFQPJTVaRwCICw72NXXElbU2ex%2Fy6BD%2BYbriIg81ltJeyljJ1%2BEUDofWYTG0X7rDVjT7xTyGhK%2BwCt6%2FKHCyytvO7s6Pi7aFTLWOaqLP5zjs4D7Ef6rp%2FtQszvTtpERIK30iICvXULr21OyltssbdG4%2BzxEAX1D8gBPIMEhPlSB7ekH2dgruo9GNn%2BL%2BX3W0a%2BdczteTVG4wkTIFLsMzAlYfMFB%2BN4XEmuxXH6xRptoNzsf99o7ig1LQeNg%2FSDiiZIULKdhBjxoc%2BCKYAinanaq9qMb9TV%2Bl5MjD056F5vO5HpZIraMqvgsxkLRS0lufOH50ImP9G9R5A%3D%3D"
        width="600" height="450" style="border: 0" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
    </iframe> -->
</template>

<script>
import ButtonComponent from "@/components/button.vue";

export default {
    components: {
        ButtonComponent,
    },
    emits: ["update-progress"],
    mounted() {
        this.$emit("update-progress", 75);
    },
    methods: {
        openPopup() {
            const url =
                "https://sandbox-sign.np.vida.id/direct-sign/3dc81c1f-0b68-4f3a-b84c-20b8ce193624?code=XqElUnHBevFQPJTVaRwCICw72NXXElbU2ex%2Fy6BD%2BYbriIg81ltJeyljJ1%2BEUDofWYTG0X7rDVjT7xTyGhK%2BwCt6%2FKHCyytvO7s6Pi7aFTLWOaqLP5zjs4D7Ef6rp%2FtQszvTtpERIK30iICvXULr21OyltssbdG4%2BzxEAX1D8gBPIMEhPlSB7ekH2dgruo9GNn%2BL%2BX3W0a%2BdczteTVG4wkTIFLsMzAlYfMFB%2BN4XEmuxXH6xRptoNzsf99o7ig1LQeNg%2FSDiiZIULKdhBjxoc%2BCKYAinanaq9qMb9TV%2Bl5MjD056F5vO5HpZIraMqvgsxkLRS0lufOH50ImP9G9R5A%3D%3D";
            window.open(url, "_blank", "width=600,height=400");
        },
    },
};
</script>
