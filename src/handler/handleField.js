// src/mixins/handleField.js

export const handleFieldMixin = {
    data() {
        return {
            touched: {
                email: false,
                phone: false,
                phonePengirim: false,
                nomorTeleponKD: false,
                kodePos: false,
                nomorFaxError: false
            },
            emailError: false,
            phoneError: false,
            phonePengirimError: false,
            nikError: false,
            kodePosError: false,
            nomorFaxErrorError: false
        };
    },
    methods: {
        validateEmail(email) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        },
        validatePhone(phone) {
            return /^(8)\d{10,15}$/.test(phone);
        },
        validatePhonePengirim(phonePengirim) {
            return /^(8)\d{10,15}$/.test(phonePengirim);
        },
        validatePhoneKD(nomorTeleponKD) {
            return /^(08|8)\d{8,12}$/.test(nomorTeleponKD);
        },
        validateNik(nik) {
            const cleanedNik = String(nik).replace(/\D/g, '');
            return cleanedNik.length >= 16 && cleanedNik.length <= 20;
        },

        handleEmailBlur() {
            this.touched.email = true;
            if (this.form.email) {
                this.emailError = !this.validateEmail(this.form.email);
            } else {
                this.emailError = false;
            }
        },

        handlePhoneBlur() {
            this.touched.phone = true;
            if (this.form.phone) {
                this.phoneError = !this.validatePhone(this.form.phone);
            } else {
                this.phoneError = false; // Hapus error jika field kosong
            }
        },
        handlePhonePengirimBlur() {
            this.touched.nomorTeleponPengirim = true;
            if (this.form.nomorTeleponPengirim) {
                this.phoneError = !this.validatePhonePengirim(this.form.nomorTeleponPengirim);
            } else {
                this.phoneError = false; // Hapus error jika field kosong
            }
        },
        handlePhoneKDBlur() {
            this.touched.nomorTeleponKD = true;
            if (this.form.nomorTeleponKD) {
                this.phoneError = !this.validatePhoneKD(this.form.nomorTeleponKD);
            } else {
                this.phoneError = false; // Hapus error jika field kosong
            }
        },
        handleNikBlur() {
            this.touched.nik = true;
            if (this.form.nik.length > 0) {
                this.nikError = !this.validateNik(this.form.nik);
            } else {
                this.nikError = false;
            }
        },
        // handleNomorRekeningBlur() {
        //   this.touched.nomorRekening = true;
        //   if (this.form.nomorRekening.length > 0) {
        //     this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekening);
        //   } else {
        //     this.nomorRekeningError = false;
        //   }
        // },
    },
    watch: {
        "form.nomorFax": function (newVal) {
            const cleanedValue = String(newVal).replace(/\D/g, '').slice(0, 10);
            this.form.nomorFax = cleanedValue;
            if (cleanedValue.length > 0 && cleanedValue.length < 10) {
                this.nomorFaxError = true;
            } else {
                this.nomorFaxError = false;
            }
        },
        "form.kodePosPerusahaanDK": function (newVal) {
            const cleanedValue = String(newVal).replace(/\D/g, '').slice(0, 5);
            this.form.kodePos = cleanedValue;
            if (cleanedValue.length > 0 && cleanedValue.length < 5) {
                this.kodePosError = true;
            } else {
                this.kodePosError = false;
            }
        },

        "form.kodePosPerusahaanBO": function (newVal) {
            const cleanedValue = String(newVal).replace(/\D/g, '').slice(0, 5);
            this.form.kodePos = cleanedValue;
            if (cleanedValue.length > 0 && cleanedValue.length < 5) {
                this.kodePosError = true;
            } else {
                this.kodePosError = false;
            }
        },
        'form.email'(newEmail) {
            const trimmedEmail = newEmail ? String(newEmail).trim() : '';

            if ((this.touched.email && trimmedEmail.length > 0) || (trimmedEmail.length > 0)) {
                this.emailError = !this.validateEmail(trimmedEmail);
            } else {
                this.emailError = false;
            }
        },

        'form.phone'(newPhone) {
            const cleanedPhone = newPhone ? String(newPhone).replace(/\D/g, '') : '';

            if (cleanedPhone.startsWith('0')) {
                this.form.phone = cleanedPhone.substring(1);
            } else if (newPhone !== cleanedPhone) {
                this.form.phone = cleanedPhone;
            }

            if ((this.touched.phone && cleanedPhone.length > 0) || (cleanedPhone.length > 0)) {
                this.phoneError = !this.validatePhone(cleanedPhone);
            } else {
                this.phoneError = false;
            }
        },
        'form.nomorTeleponKD'(newPhoneKD) {
            const cleanedPhone = newPhoneKD ? String(newPhoneKD).replace(/\D/g, '') : '';

            if (newPhoneKD !== cleanedPhone) {
                this.form.nomorTeleponKD = cleanedPhone;
            }

            if ((this.touched.nomorTeleponKD && cleanedPhone.length > 0) || (cleanedPhone.length > 0)) {
                this.phoneError = !this.validatePhoneKD(cleanedPhone);
            } else {
                this.phoneError = false;
            }
        },
        'form.phonePengirim'(newPhonePengirim) {
            const cleanedPhone = newPhonePengirim ? String(newPhonePengirim).replace(/\D/g, '') : '';

            if (newPhonePengirim !== cleanedPhone) {
                this.form.phonePengirim = cleanedPhone;
            }

            if ((this.touched.phonePengirim && cleanedPhone.length > 0) || (cleanedPhone.length > 0)) {
                this.phoneError = !this.validatePhonePengirim(cleanedPhone);
            } else {
                this.phoneError = false;
            }
        },
        'form.nik'(newValue) {
            const cleanedValue = String(newValue).replace(/\D/g, '').slice(0, 20);
            if (newValue !== cleanedValue) {
                this.form.nik = cleanedValue;
                return;
            }
            if ((this.touched.nik && cleanedValue.length > 0) || (cleanedValue.length > 0)) {
                this.nikError = !this.validateNik(cleanedValue);
            } else {
                this.nikError = false;
            }
        },
        // 'form.nomorRekening'(newValue) {
        //   const cleanedValue = String(newValue).replace(/\D/g, '').slice(0, 10);
        //   if (newValue !== cleanedValue) {
        //     this.form.nomorRekening = cleanedValue;
        //     return;
        //   }
        //   if ((this.touched.nomorRekening && cleanedValue.length > 0) || (cleanedValue.length > 0)) {
        //     this.nomorRekeningError = !this.validateNomorRekening(cleanedValue);
        //   } else {
        //     this.nomorRekeningError = false;
        //   }
        // },
    }
};