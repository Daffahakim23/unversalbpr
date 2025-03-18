<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Produk yang diinginkan" id="produk" :isDropdown="true" v-model="form.produk"
      placeholder="Pilih Produk yang Anda Inginkan" :options="produkOptions" required />

    <!-- <FormField class="mb-2" label="Nomor Rekening *" id="nomorRekening" type="text" v-model="form.nomorRekening"
      placeholder="Masukkan Nomor Rekening" required :readonly="form.belumPunyaRekening"
      @input="handleNomorRekeningInput"
      hint="*Jika Anda belum memiliki Rekening Tabungan, silakan melanjutkan pemilihan Kantor Cabang Pembukaan Bank." /> -->

    <!-- <div class="flex items-center mb-6">
      <input type="checkbox" id="belumPunyaRekening" v-model="form.belumPunyaRekening" @change="handleCheckboxChange"
        class="mr-2" />
      <label for="belumPunyaRekening" class="text-sm font-semibold text-neutral-800 cursor-pointer">
        Belum Punya Rekening
      </label>
    </div> -->

    <FormField label="Pilih Kantor Cabang Pembukaan Rekening*" id="kantorCabang" :isDropdown="true"
      v-model="form.kantorCabang" placeholder="Pilih Kantor Cabang" :options="kantorCabangOptions" required />

    <div v-if="form.kantorCabang" class="mt-4">
      <FormField label="Alamat Kantor Cabang Pembukaan Rekening" id="alamatKantorCabang"
        v-model="form.alamatKantorCabang" :readonly="true" />
    </div>

    <FormField label="Email *" id="email" type="email" v-model="form.email" placeholder="Masukkan Email Anda"
      :hint="emailError ? 'Email tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi alamat email yang aktif'"
      :error="emailError" @blur="handleEmailBlur" />

    <FormField label="Nomor Handphone*" id="phone" type="phone" v-model="form.phone"
      placeholder="Masukkan nomor handphone Anda" v-model:selectedCountryCode="selectedCountryCode"
      :hint="phoneError ? 'Nomor handphone tidak valid, silahkan periksa kembali' : 'Pastikan Anda mengisi nomor handphone yang aktif'"
      :error="phoneError" @blur="handlePhoneBlur" />

    <RadioButtonChoose label="Tujuan Simpanan*" :options="tujuanOptions" v-model="form.tujuan" name="tujuan" />

    <FormField label="Sumber Dana" id="sumberDana" :isDropdown="true" v-model="form.sumberDana"
      :options="penghasilanOptions" placeholder="Pilih Sumber Dana Anda" />

    <div v-if="form.sumberDana === 'lainnya'" class="">
      <FormField label="Sumber Dana Lainnya *" id="sumberDanaLainnya" type="text" v-model="form.sumberDanaLainnya"
        placeholder="Masukkan Sumber Penghasilan Lainnya" />
    </div>

    <FormField label="Nama Funding Officer (Opsional)" id="namaFundingOfficer" type="text"
      v-model="form.namaFundingOfficer" placeholder="Masukkan nama funding officer"
      hint="Funding Officer adalah petugas bank yang membantu pengelolaan simpanan Anda. Masukkan namanya jika ada, atau kosongkan jika tidak tahu atau belum pernah dilayani." />

    <div class="text-right">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>

  <ReusableModal title='Syarat dan Ketentuan Deposito' :isOpen="isModalOpen" :apiUrl="apiUrl"
    @close="isModalOpen = false" @confirm="handleModalConfirm" />
  <ModalError :isOpen="isModalError" :features="modalContent" icon="data-failed-illus.svg" @close="isModalError = false"
    @buttonClick1="handleModalClose" @buttonClick2="handleToDeposito" />
</template>

<script>
import axios from "axios";
import api from "@/API/api"
import FormField from "@/components/FormField.vue";
import ButtonComponent from "@/components/button.vue";
import ReusableModal from "@/components/ModalT&C.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import { FormModelRequestEmailVerification } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { sumberDataNasabahOptions, produkOptions, tujuanOptions, penghasilanOptions } from "@/data/option.js";
import ModalError from "@/components/ModalError.vue";
import errorIcon from "@/assets/icon-deposito.svg";

export default {
  emits: ["update-progress"],
  components: {
    FormField,
    ButtonComponent,
    ReusableModal,
    RadioButtonChoose,
    ModalError,
  },
  data() {
    return {
      apiUrl: "https://universaldev.coreinitiative.id/api/v1/content/detail/TERM_OPEN_SAVING",
      form: new FormModelRequestEmailVerification(),
      touched: {
        email: false,
        phone: false,
      },
      sumberDataNasabahOptions,
      produkOptions,
      tujuanOptions,
      penghasilanOptions,
      isModalOpen: false,
      isSubmitting: false,
      selectedCountryCode: "ID",
      kantorCabangOptions: [],
      kantorCabangAlamat: {},
      emailError: false,
      phoneError: false,
      isModalError: false,
      modalContent: [
        {
          label: "Konfirmasi Penempatan Deposito",
          icon: errorIcon,
          description:
            "Apakah Anda yakin ingin melanjutkan penempatan deposito?",
          buttonString1: "Tetap Dihalaman Ini",
          buttonString2: "Penempatan Deposito",
        },
      ],
    };
  },

  computed: {
    isButtonDisabled() {
      const emailValid = this.form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      const phoneValid = this.form.phone && /^(08(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,9}$/.test(this.form.phone);
      if (!this.form.produk || !emailValid || !phoneValid || !this.form.sumberDana || !this.form.tujuan) {
        return true;
      }
      return false;
    }
  },

  watch: {
    "form.kantorCabang"(newVal) {
      this.form.alamatKantorCabang = this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
    },
    // "form.email"(newEmail) {
    //   if (this.touched.email) {
    //     this.emailError = newEmail && !this.validateEmail(newEmail);
    //   }
    // },
    'form.produk'(newVal) {
      if (Number(newVal) === 2) {
        this.isModalError = true;
        this.form.produk = '';
      }
    }
  },

  methods: {
    handleToDeposito() {
      this.$router.push({ path: "/dashboard/penempatanDepositoExisting" });
    },
    handleModalClose() {
      this.isModalError = false;
    },
    validatePhone(phone) {
      return /^(08(1[1-3]|2[1-3]|3[1-3]|5[2-3]|7[7-8]|8[1-3]|9[5-9]))\d{6,9}$/.test(phone);
    },
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    handleEmailBlur() {
      this.touched.email = true;
      if (this.form.email) {
        this.emailError = !this.validateEmail(this.form.email);
      }
    },
    handlePhoneBlur() {
      this.touched.phone = true;
      if (this.form.phone) {
        this.phoneError = !this.validatePhone(this.form.phone);
      }
    },
    async fetchBranches() {
      try {
        const response = await axios.get("http://10.14.52.233:8001/list-branch");

        if (response.data && response.data.branch) {
          this.kantorCabangOptions = response.data.branch.map(branch => {
            const label = branch.branch_name.replace(/\s*\(\d+\)$/, '');

            return {
              label: label.trim(),
              value: branch.branch_code
            };
          });

          this.kantorCabangAlamat = response.data.branch.reduce((acc, branch) => {
            acc[branch.branch_code] = branch.branch_address.Valid ? branch.branch_address.String : "Alamat tidak tersedia";
            return acc;
          }, {});
        }
      } catch (error) {
        console.error("Gagal mengambil data kantor cabang:", error);
      }
    },
    // async fetchData() {
    //   try {
    //     const response = await axios.get("https://testapi.io/api/daffa/request-email-verification");
    //     console.log("Response data:", response.data);
    //     const data = Array.isArray(response.data) ? response.data[0] : response.data;
    //     if (data) {
    //       Object.keys(this.form).forEach(key => { if (data[key] !== undefined) this.form[key] = data[key]; });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },

    async handleSubmit() {
      if (this.emailError) {
        console.error("Email tidak valid.");
        return;
      }

      if (this.phoneError) {
        console.error("Nomor telepon tidak valid.");
        return;
      }

      const selectedBranch = this.kantorCabangOptions.find(
        branch => branch.value === this.form.kantorCabang
      );
      try {
        this.requestData = {
          produk_yang_diinginkan: Number(this.form.produk),
          kode_kantor_cabang: this.form.kantorCabang,
          kantor_cabang: selectedBranch ? selectedBranch.label : "",
          alamat_email: this.form.email,
          no_hp: this.form.phone,
          tujuan_simpanan: Number(this.form.tujuan),
          sumber_dana: Number(this.form.sumberDana),
          nama_fo: this.form.namaFundingOfficer,
          kategori_nasabah: Number("1"),
          tanggal: new Date().toISOString().split("T")[0],
          // nomor_rekening_lama: this.form.nomorRekening,
        };
        console.log("Data sementara disimpan:", this.requestData);
        this.isModalOpen = true;
      } catch (error) {
        console.error("Error saat membuka modal:", error);
      }
    },

    async handleModalConfirm() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      try {
        if (!this.requestData) {
          console.error("Error: Data request tidak ditemukan.");
          this.isSubmitting = false;
          return;
        }

        const finalData = {
          ...this.requestData,
          syarat_ketentuan: true,
          dek_pajak_indo: true,
          dek_pajak_amerika: true,
          dek_pajak_amerika_penduduk_us: 12345,
        };

        console.log("Mengirim data:", finalData);

        const response = await api.post("/pembukaan-existing", finalData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          const fileStore = useFileStore();
          fileStore.setFormEmailRequestPembukaanRekening(this.form);
          fileStore.setUuid(response.data.uuid);
          fileStore.setEmail(this.requestData.alamat_email);
          fileStore.setNoHP(this.requestData.no_hp);
          console.log("UUID :", response.data.uuid);
          console.log("Email :", this.requestData.alamat_email);
          console.log("Nomor Handphone :", this.requestData.no_hp);

          this.$router.push({ path: "/dashboard/verifikasiEmailPembukaanRekeningExisting" });

        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }

      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
        console.error("Error saat mengirim data:", error);
      } finally {
        this.isSubmitting = false;
      }
    }
  },

  mounted() {
    this.$emit("update-progress", 15);
    this.fetchBranches();
  },

  created() {
    // this.fetchData();
  },
};
</script>
