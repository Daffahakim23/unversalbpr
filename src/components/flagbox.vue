<template>
    <div v-if="isVisible" :class="['flag-box', boxClass, 'flex items-start relative']">
        <!-- Icon tetap di atas -->
        <img :src="iconSrc" alt="icon" class="flag-icon self-start" />

        <!-- Konten utama -->
        <div class="flag-content">
            <slot></slot>
        </div>

        <!-- Tombol close di pojok kanan -->
        <button v-if="closable" @click="isVisible = false" class="close-btn ml-auto">
            <img :src="closeIcon" alt="close" class="close-icon" />
        </button>
    </div>
</template>

<script>
import errorIcon from "@/assets/error-icon.svg";
import warningIcon from "@/assets/warning-icon.svg";
import successIcon from "@/assets/success-icon.svg";
import infoIcon from "@/assets/info-icon.svg";
import closeIcon from "@/assets/close.svg";

export default {
    name: "FlagBox",
    props: {
        type: {
            type: String,
            default: "info",
            validator: (value) => ["info", "error", "warning", "success"].includes(value),
        },
        closable: {
            type: Boolean,
            default: false,
        },
        closeIcon: {
            type: String,
            default: closeIcon, // Default ikon close
        },
    },
    data() {
        return {
            isVisible: true,
        };
    },
    computed: {
        boxClass() {
            return {
                "flag-info": this.type === "info",
                "flag-error": this.type === "error",
                "flag-warning": this.type === "warning",
                "flag-success": this.type === "success",
            };
        },
        iconSrc() {
            switch (this.type) {
                case "error":
                    return errorIcon;
                case "warning":
                    return warningIcon;
                case "success":
                    return successIcon;
                default:
                    return infoIcon;
            }
        },
    },
};
</script>

<style scoped>
.flag-box {
    border-radius: 8px;
    padding: 12px;
    gap: 8px;
    font-weight: 500;
    position: relative;
    /* Untuk memastikan tombol close tetap dalam box */
}

/* Ukuran ikon */
.flag-icon {
    width: 20px;
    height: 20px;
}

/* Tombol close di pojok kanan atas */
.close-btn {
    background: none;
    border: none;
    cursor: pointer;
}

.close-icon {
    width: 16px;
    height: 16px;
}

/* Info */
.flag-info {
    border: 1px solid #B2D5FF;
    background-color: #E5F1FF;
    color: #003B70;
}

/* Error */
.flag-error {
    border: 1px solid #FFB5B2;
    background-color: #FFE1E0;
    color: #BA0803;
}

/* Warning */
.flag-warning {
    border: 1px solid #FFFDBD;
    background-color: #FFFEE0;
    color: #BDB600;
}

/* Success */
.flag-success {
    border: 1px solid #C6F0D1;
    background-color: #E7F9EB;
    color: #22863B;
}
</style>
