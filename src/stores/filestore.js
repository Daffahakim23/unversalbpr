import { defineStore } from "pinia";
export const useFileStore = defineStore("fileStore", {
  state: () => ({
    envelope_id: null,
    nik: null,
    no_npwp: null,
    npwp: null,
    sign_url: null,
    uuid: null,
    alamat_email: null,
    nama_lengkap: null,
    no_hp: null,
    uploadedFiles: {
      ktp: null,
      npwp: null,
      fotoDiri: null,
      tandaTangan: null,
    },
    ktpImage: null,
    tandaTanganImage: null,
    npwpImage: null,
    fotoDiriImage: null,
    isKtpUploaded: false,
    isNpwpUploaded: false,
    isFotoDiriUploaded: false,
    isTandaTanganUploaded: false,
    formKTP: {},
    formPribadi: {},
    formPekerjaan: {},
    formShortForm: {},
    formRekening: {},
    formKantorCabang: {},
    formTandaTangan: {},
    formFotoDiri: {},
    formNPWP: {},
    formPembaruanData: {},
    formPenempatanDeposito: {},
    formPengkinianData: {},
    formEmailRequestPembukaanRekening: {},
    formEmailRequestDepositoNTB: {},
    formEmailRequestPencairanDeposito: {},
    formInstruksiPencairanDeposito: {},
    formDataPencairanDeposito: {},
    formDataPemindahbukuan: {},
    formDataPengirimPemindahbukuan: {},
    formDataPenerimaPemindahbukuan: {},

  }),
  actions: {
    resetStore() {
      this.$reset();
    },
    setUuid(value) {
      this.uuid = value;
    },
    setNik(value) {
      this.nik = value;
    },
    setNpwp(value) {
      this.npwp = value;
    },
    setNoNpwp(value) {
      this.no_npwp = value;
    },
    setEmail(value) {
      this.alamat_email = value;
    },
    setNamaLengkap(value) {
      this.nama_lengkap = value;
    },
    setEnvelopeId(value) {
      this.envelope_id = value;
    },
    setSignUrl(value) {
      this.sign_url = value;
    },
    setNoHP(value) {
      this.no_hp = value;
    },
    setFile(key, file) {
      this.uploadedFiles = { ...this.uploadedFiles, [key]: file };
    },
    setFileUploaded(documentType, status) {
      this[
        `is${documentType.charAt(0).toUpperCase() + documentType.slice(1)}Uploaded`
      ] = status;
    },
    setFormDataKTP(data) {
      this.formKTP = data;
    },
    setFormDataPribadi(data) {
      this.formPribadi = data;
    },
    setFormDataPekerjaan(data) {
      this.formPekerjaan = data;
    },
    setFormDataShortForm(data) {
      this.formShortForm = data;
    },
    setFormDataRekening(data) {
      this.formRekening = data;
    },
    setFormDataKantorCabang(data) {
      this.formKantorCabang = data;
    },
    setFormDataTandaTangan(data) {
      this.formTandaTangan = data;
    },
    setFormDataFotoDiri(data) {
      this.formFotoDiri = data;
    },
    setFormDataNPWP(data) {
      this.formNPWP = data;
    },
    setFormPembaruanData(data) {
      this.formPembaruanData = data;
    },
    setFormPenempatanDeposito(data) {
      this.formPenempatanDeposito = data;
    },
    setFormPengkinianData(data) {
      this.formPengkinianData = data;
    },
    setFormEmailRequestPembukaanRekening(data) {
      this.formEmailRequestPembukaanRekening = data;
    },
    setFormEmailRequestDepositoNTB(data) {
      this.formEmailRequestDepositoNTB = data;
    },
    setFormEmailRequestPencairanDeposito(data) {
      this.formEmailRequestPencairanDeposito = data;
    },
    setFormInstruksiPencairanDeposito(data) {
      this.formInstruksiPencairanDeposito = data;
    },
    setFormDataPencairanDeposito(data) {
      this.formDataPencairanDeposito = data;
    },
    setFormDataPemindahbukuan(data) {
      this.formDataPemindahbukuan = data;
    },
    setFormDataPengirimPemindahbukuan(data) {
      this.formDataPengirimPemindahbukuan = data;
    },
    setFormDataPenerimaPemindahbukuan(data) {
      this.formDataPenerimaPemindahbukuan = data;
    },
    setKtpImage(imageData) {
      this.ktpImage = imageData;
    },
    setTandaTanganImage(imageData) {
      this.tandaTanganImage = imageData;
    },
    setNpwpImage(imageData) {
      this.npwpImage = imageData;
    },
    setFotoDiriImage(imageData) {
      this.fotoDiriImage = imageData;
    }
  },
});
