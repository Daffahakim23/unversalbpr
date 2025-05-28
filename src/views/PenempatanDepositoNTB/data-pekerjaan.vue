<template>
  <form @submit.prevent="handleSubmit">
    <FormField label="Pekerjaan*" id="pekerjaan" :isDropdown="true" v-model="form.pekerjaan" :options="pekerjaanOptions"
      placeholder="Pilih Pekerjaan Anda" />

    <div v-if="form.pekerjaan === '9999'" class="">
      <FormField label="Pekerjaan Lainnya *" id="pekerjaanLainnya" type="text" v-model="form.pekerjaanLainnya"
        placeholder="Masukkan Pekerjaan Lainnya" />
    </div>

    <FormField label="Sumber Dana*" id="penghasilan" :isDropdown="true" v-model="form.penghasilan"
      :options="penghasilanOptions" placeholder="Pilih Sumber Penghasilan Anda" />

    <div v-if="form.penghasilan === '0'" class="">
      <FormField label="Sumber Dana Lainnya *" id="penghasilanLainnya" type="text" v-model="form.penghasilanLainnya"
        placeholder="Masukkan Sumber Dana Lainnya" />
    </div>

    <FormField label="Penghasilan Perbulan*" id="jumlahPenghasilan" :isDropdown="true" v-model="form.jumlahPenghasilan"
      :options="jumlahPenghasilanOptions" placeholder="Pilih Penghasilan Perbulan Anda" />

    <div
      v-if="['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013', '9999'].includes(form.pekerjaan)">
      <RadioButtonChoose label="Apakah Sumber Dana yang Anda Tempatkan Milik Anda Pribadi?*" id="sumberDanaMilikPribadi"
        v-model="form.sumberDanaMilikPribadi" :options="trueFalseOptions" name="sumberDana" :required="true" />
    </div>

    <!-- Form Benefial Owner -->
    <div v-if="['0009', '0011'].includes(form.pekerjaan) || form.sumberDanaMilikPribadi === false">
      <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
        Pemilik Manfaat <i>(Beneficial Owner)</i>
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        *Beneficial owner setiap orang yang merupakan pemilik sebenarnya dari dana yang ditempatkan pada bank;
        mengendalikan transaksi; memberikan kuasa untuk melakukan Transaksi; mengendalikan Badan Hukum; dan/atau
        melakukan pengendalian akhir dari transaksi yang dilakukan
      </p>

      <FormField label="Hubungan Nasabah*" id="hubunganNasabahBO" :isDropdown="true" :options="hubunganNasabahOptions"
        v-model="form.hubunganNasabahBO" placeholder="Pilih Hubungan Nasabah" :required="true" />

      <div v-if="form.hubunganNasabahBO === '0'" class="">
        <FormField label="Hubungan Nasabah Lainnya *" id="hubunganNasabahLainnyaBO" type="text"
          v-model="form.hubunganNasabahLainnyaBO" placeholder="Masukkan Hubungan Nasabah Lainnya" variant="alpha" />

      </div>
      <FormField label="Jenis Identitas*" id="jenisIdentitasBO" :isDropdown="true" :options="jenisIdentitasBOOptions"
        v-model="form.jenisIdentitasBO" placeholder="Pilih Jenis Identitas Beneficial Owner Anda" :required="true" />

      <div v-if="form.jenisIdentitasBO === '0'" class="">
        <FormField label="Jenis Identitas Lainnya *" id="jenisIdentitasLainnyaBO" type="text"
          v-model="form.jenisIdentitasLainnyaBO" placeholder="Masukkan Jenis Identitas Lainnya" variant="alpha" />

      </div>
      <FormField label="Kewarganegaraan*" id="kewarganegaraanBO" :isDropdown="true" type="text"
        v-model="form.kewarganegaraanBO" :options="kewarganegaraanBOOptions"
        placeholder="Pilih Kewarganegaraan Beneficial Owner Anda" />

      <div v-if="form.kewarganegaraanBO === false" class="">
        <FormField label="Kewarganegaraan Lainnya *" id="kewarganegaraanLainnyaBO" type="text"
          v-model="form.kewarganegaraanLainnyaBO" placeholder="Masukkan Kewarganegaraan Lainnya" variant="alpha" />

      </div>
      <FormField label="Nama Lengkap*" id="namaLengkapBO" :isDropdown="false" v-model="form.namaLengkapBO"
        placeholder="Masukkan Nama Lengkap Beneficial Owner Anda" :required="true" variant="alpha" />

      <div v-if="form.jenisIdentitasBO === '1'" class="">
        <FormField label="Nomor Dokumen Identitas*" id="nomorDokumenIdentitasBO" :isDropdown="false"
          v-model="form.nomorDokumenIdentitasBO" placeholder="Masukkan Nomor Dokumen Identitas Beneficial Owner Anda"
          :required="true" variant="numeric" :maxlength="20" />
      </div>

      <div v-if="form.jenisIdentitasBO === '2'" class="">
        <FormField label="Nomor Dokumen Identitas*" id="nomorDokumenIdentitasBO" :isDropdown="false"
          v-model="form.nomorDokumenIdentitasBO" placeholder="Masukkan Nomor Dokumen Identitas Beneficial Owner Anda"
          :required="true" variant="alphanumeric" :maxlength="20" />
      </div>

      <FormField label="Alamat*" id="alamatBO" v-model="form.alamatBO" :required="true"
        placeholder="Masukkan Alamat Beneficial Owner Anda" />

      <div class="flex flex-row gap-4">
        <FormField label="RT*" id="rtBO" v-model="form.rtBO" :required="true"
          placeholder="Masukkan RT Beneficial Owner Anda" variant="numeric" :maxlength="3" class="flex-1" />

        <FormField label="RW*" id="rwBO" v-model="form.rwBO" :required="true"
          placeholder="Masukkan RW Beneficial Owner Anda" variant="numeric" :maxlength="3" class="flex-1" />
      </div>

      <FormField label="Provinsi*" id="provinsiBO" :isDropdown="true" v-model="form.provinsiBO"
        :options="provinsiOptions" placeholder="Pilih Provinsi Beneficial Owner Anda" @change="fetchKabupaten" />

      <FormField label="Kabupaten/Kota*" id="kabupatenBO" :isDropdown="true" v-model="form.kabupatenBO"
        :options="kabupatenOptions" placeholder="Pilih Kabupaten/Kota Beneficial Owner Anda" @change="fetchKecamatan"
        :disabled="!form.provinsiBO" />

      <FormField label="Kecamatan*" id="kecamatanBO" :isDropdown="true" v-model="form.kecamatanBO"
        :options="kecamatanOptions" placeholder="Pilih Kecamatan Beneficial Owner Anda" :disabled="!form.kabupatenBO" />

      <FormField label="Kelurahan*" id="kelurahanBO" :isDropdown="true" v-model="form.kelurahanBO"
        :options="kelurahanOptions" placeholder="Pilih Kelurahan Beneficial Owner Anda" :disabled="!form.kecamatanBO" />

      <FormField label="Kode Pos*" id="kodePosBO" v-model="form.kodePosBO" :required="true"
        placeholder="Masukkan Kode Pos Beneficial Owner Anda" variant="numeric" :maxlength="5" />

      <FormField label="Tempat Lahir*" id="tempatLahirBO" :isDropdown="false" v-model="form.tempatLahirBO"
        variant="alpha" placeholder="Masukkan Tempat Lahir Beneficial Owner Anda" :required="true" />

      <FormField label="Tanggal Lahir*" id="tanggalLahirBO" type="date" v-model="form.tanggalLahirBO"
        placeholder="Pilih Tanggal Lahir Beneficial Owner Anda" />

      <FormField label="Jenis Kelamin*" id="jenisKelamin" :isDropdown="true" v-model="form.jenisKelaminBO"
        :options="jenisKelaminOptions" placeholder="Pilih Jenis Kelamin Beneficial Owner Anda" />

      <FormField label="Status Perkawinan*" id="statusPerkawinanBO" :isDropdown="true" v-model="form.statusPerkawinanBO"
        :options="statusPerkawinanOptions" placeholder="Pilih Status Perkawinan Beneficial Owner Anda"
        :required="true" />

      <FormField label="Pekerjaan*" id="pekerjaanBO" :isDropdown="true" v-model="form.pekerjaanBO"
        placeholder="Pilih Pekerjaan Beneficial Owner Anda" :options="pekerjaanOptions" />

      <div v-if="form.pekerjaanBO === '9999'" class="">
        <FormField label="Pekerjaan Lainnya *" id="pekerjaanLainnyaBO" type="text" v-model="form.pekerjaanLainnyaBO"
          placeholder="Masukkan Pekerjaan Beneficial Owner Lainnya" variant="alpha" />
      </div>

      <FormField label="Nama Perusahaan*" id="namaPerusahaanBO" v-model="form.namaPerusahaanBO"
        placeholder="Masukkan Nama Perusahaan Beneficial Owner Anda" :required="true" />

      <FormField label="Alamat Perusahaan*" id="alamatPerusahaanBO" v-model="form.alamatPerusahaanBO"
        placeholder="Masukkan Alamat Perusahaan Beneficial Owner Anda" :required="true" />

      <div class="flex flex-row gap-4">
        <FormField label="Kota*" id="kotaBO" v-model="form.kotaPerusahaanBO" :required="true"
          placeholder="Masukkan Kota Perusahaan" class="flex-1" />

        <FormField label="Kode Pos*" id="kodePosBO" v-model="form.kodePosPerusahaanBO" :required="true"
          placeholder="Masukkan Kode Pos Perusahaan" class="flex-1" variant="numeric" :maxlength="5" />
      </div>

      <div
        v-if="['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013'].includes(form.pekerjaanBO)">
        <FormField label="Jabatan*" id="jabatanBO" :isDropdown="true" v-model="form.jabatanBO" :options="jabatanOptions"
          placeholder="Pilih Jabatan Benefial Owner Anda" />
      </div>

      <div v-if="form.pekerjaanBO === '9999'" class="">
        <FormField label="Jabatan*" id="jabatanLainnyaBO" type="text" v-model="form.jabatanLainnyaBO"
          placeholder="Masukkan Jabatan Beneficial Owner Anda" />
      </div>

      <div class="flex flex-row gap-4">
        <QuantityCounter label="Lama Bekerja (Tahun)" id="lamaBekerjaTahunBO" v-model="form.lamaBekerjaTahunBO" :min="0"
          :max="50" :required="true" variant="numeric" />

        <QuantityCounter label="Lama Bekerja (Bulan)" id="lamaBekerjaBulanBO" v-model="form.lamaBekerjaBulanBO" :min="0"
          :max="11" :required="true" variant="numeric" />
      </div>

      <FormField label="Sumber Dana*" id="penghasilanBO" :isDropdown="true" v-model="form.penghasilanBO"
        placeholder="Pilih Sumber Dana Beneficial Owner Anda" :options="penghasilanOptions" />

      <div v-if="form.penghasilanBO === '0'" class="">
        <FormField label="Sumber Dana Lainnya *" id="penghasilanLainnyaBO" type="text"
          placeholder="Masukkan Sumber Dana Lainnya" v-model="form.penghasilanLainnyaBO" />
      </div>

      <FormField label="Penghasilan Perbulan*" id="jumlahPenghasilanBO" :isDropdown="true"
        placeholder="Pilih Penghasilan Beneficial Owner Anda" v-model="form.jumlahPenghasilanBO"
        :options="jumlahPenghasilanOptions" />

      <RadioButtonChoose label="Alamat korespondensi/Pengiriman Surat Menyurat*" :options="korespondensiOptions"
        v-model="form.korespondensi" name="korespondensi" />

      <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
        Pernyataan dan Persetujuan Nasabah
      </h2>
      <div class="flex flex-col items-start pt-2 pb-6">
        <div class="mr-2">
          <CustomCheckbox v-model="pernyataanChecked" labelText="Dengan menandatangani aplikasi
            ini,
            saya/kami menyatakan bahwa:" />
        </div>
        <div class="flex flex-col items-start pt-0">
          <ul class="list-decimal list-outside text-neutral-900 text-xs sm:text-sm md:text-sm space-y-2 ml-10 mt-1">
            <li>Data Beneficial Owner yang diisikan dalam Formulir Beneficial Owner ini adalah data yang
              sebenar-benarnya dan sebagai ketentuan untuk melakukan transaksi/pembukaan rekening di PT BPR Universal
              (selanjutnya disebut “Bank”).</li>
            <li>Bank dapat melakukan pemeriksaan terhadap kebenaran data yang saya/kami berikan dalam Formulir
              Beneficial Owner ini.</li>
            <li>Saya/kami memberi hak dan wewenang kepada Bank untuk melakukan pemblokiran dan atau penutupan rekening,
              apabila menurut pertimbangan Bank :
              <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
                <li>Saya/kami tidak mematuhi ketentuan Prinsip Mengenal Nasabah (Knowing Your Customer)</li>
                <li>Data yang saya/kami berikan kepada Bank tidak benar atau diragukan kebenarannya.</li>
                <li> Saya/kami menyalahgunakan rekening.</li>
              </ul>
            </li>
            <li> Bahwa berkaitan dengan pemenuhan NPWP untuk pembukaan rekening, saat ini saya,
              <RadioButtonChoose class="text-xs sm:text-sm md:text-sm" label="" id="npwp" :options="npwp3Options"
                :readonly="true" v-model="form.npwp" name="npwp" required />
              Dan berkomitmen akan segera
              menyampaikan kepada bank setelah
              memiliki NPWP. (Tidak berlaku bagi nasabah yang telah menyerahkan dokumen NPWP)
            </li>
            <li>Saya/Kami tidak memiliki kewajiban/domisili perpajakan di negara selain Indonesia.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Form Detail Pekerjaan -->
    <div v-if="[true].includes(form.sumberDanaMilikPribadi)">
      <!-- v-if="['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013', '9999'].includes(form.pekerjaan) || form.sumberDanaMilikPribadi === 'TIDAK'"> -->
      <FormField label="Nama Perusahaan/Instansi Tempat Bekerja*" id="namaPerusahaanDK" :isDropdown="false"
        v-model="form.namaPerusahaanDK" placeholder="Masukkan Nama Perusahaan/Instansi Tempat Bekerja" />

      <FormField label="Bidang Pekerjaan/Usaha*" id="bidangPekerjaanDK" :isDropdown="true"
        v-model="form.bidangPekerjaanDK" placeholder="Pilih Bidang Pekerjaan/Usaha" :options="bidangPekerjaanOptions" />

      <div v-if="form.bidangPekerjaanDK === 'lainnya'" class="">
        <FormField label="Bidang Pekerjaan Lainnya" id="bidangPekerjaanLainnyaDK" type="text"
          v-model="form.bidangPekerjaanLainnyaDK" placeholder="Masukkan Bidang Pekerjaan Lainnya" />
      </div>

      <div
        v-if="['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013'].includes(form.pekerjaan)">
        <FormField label="Jabatan/Posisi Pekerjaan*" id="jabatanDK" :isDropdown="true" v-model="form.jabatanDK"
          :options="jabatanOptions" placeholder=" Pilih Jabatan Pekerjaan Anda" />
      </div>

      <div v-if="form.pekerjaan === '9999'" class="">
        <FormField label="Jabatan*" id="jabatanLainnyaDK" type="text" v-model="form.jabatanLainnyaDK"
          placeholder="Masukkan Jabatan" />
      </div>

      <FormField label="Alamat Perusahaan*" id="alamatDK" :isDropdown="false" v-model="form.alamatDK"
        placeholder="Masukkan Alamat Anda" />

      <div class="flex flex-row gap-4">
        <FormField label="Kota Perusahaan*" id="kotaDK" v-model="form.kotaPerusahaanDK" :required="true"
          placeholder="Masukkan Kota Perusahaan" class="flex-1" />

        <FormField label="Kode Pos Perusahaan*" id="kodePosDK" v-model="form.kodePosPerusahaanDK" :required="true"
          placeholder="Masukkan Kode Pos Perusahaan" class="flex-1" variant="numeric" :maxlength="5" />
      </div>

      <div class="flex flex-row gap-4">
        <QuantityCounter label="Lama Bekerja (Tahun)" id="lamaBekerjaTahunDK" v-model="form.lamaBekerjaTahunDK" :min="0"
          :max="50" :required="true" variant="numeric" />

        <QuantityCounter label="Lama Bekerja (Bulan)" id="lamaBekerjaBulanDK" v-model="form.lamaBekerjaBulanDK" :min="0"
          :max="11" :required="true" variant="numeric" />
      </div>

      <FormField label="Nomor Telepon Kantor (Opsional)" id="nomorTeleponKantorDK" v-model="form.nomorTeleponKantorDK"
        placeholder="Masukkan Nomor Telepon Kantor Anda" variant="numeric" :maxlength="13" />

      <FormField label="Nomor Telepon Fax (Opsional)" id="nomorTeleponFaxDK" v-model="form.nomorTeleponFaxDK"
        placeholder="Masukkan Nomor Telepon Fax Anda" variant="numeric" :maxlength="13" />

      <RadioButtonChoose label="Alamat korespondensi/Pengiriman Surat Menyurat*" :options="korespondensiOptions"
        v-model="form.korespondensi" name="korespondensi" />
    </div>

    <!-- Form Kontak Darurat -->
    <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
      Kontak Darurat
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      *Dalam keadaan darurat, mohon agar dapat diberikan nama, alamat, dan no. telp yang dapat dihubungi sewaktu-waktu
      oleh pihak BANK <strong>(WAJIB DIISI)</strong>
    </p>
    <FormField label="Nama Lengkap Kontak Darurat*" id="namaLengkapKD" :isDropdown="false" v-model="form.namaLengkapKD"
      placeholder="Masukkan Nama Lengkap Kontak Darurat" variant="alpha" />

    <!-- <FormField label="Hubungan dengan Pemohon*" id="hubunganDenganPemohonKD" :options="hubunganPemohonKDOptions"
      :isDropdown="true" placeholder="Pilih Hubungan dengan Pemohon Kontak Darurat" v-model="form.hubunganPemohonKD"
      name="hubunganPemohonKD" /> -->

    <FormField label="Hubungan dengan Pemohon*" id="hubunganDenganPemohonKD"
      placeholder="Masukkan Hubungan dengan Pemohon Kontak Darurat" v-model="form.hubunganPemohonKD"
      name="hubunganPemohonKD" variant="alpha" />

    <div v-if="form.hubunganPemohonKD === 'lainnya'" class="">
      <FormField label="Hubungan dengan Pemohon Lainnya *" id="hubunganPemohonKDLainnya" type="text"
        v-model="form.hubunganPemohonKDLainnya" placeholder="Masukkan Hubungan Pemohon Lainnya" />
    </div>

    <FormField label="Alamat Terkini Kontak Darurat*" id="alamatKD" :isDropdown="false" v-model="form.alamatKD"
      placeholder="Masukkan Alamat Kontak Darurat" />

    <FormField label="Nomor Telepon Kontak Darurat*" id="nomorTeleponKD" v-model="form.nomorTeleponKD"
      placeholder="Masukkan Nomor Telepon Kontak Darurat" variant="numeric" :maxlength="13" />

    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
</template>


<script>
import api from "@/API/api";
import FormField from "@/components/FormField.vue";
import RadioButtonChoose from "@/components/RadioButton.vue";
import ButtonComponent from "@/components/button.vue";
import QuantityCounter from "@/components/QuantityCounter.vue";
import { FormModelDataPekerjaan } from "@/models/formModel";
import { useFileStore } from "@/stores/filestore";
import { penghasilanOptions, jumlahPenghasilanOptions, hubunganNasabahOptions, statusPerkawinanOptions, korespondensiOptions, hubunganPemohonKDOptions, jenisIdentitasBOOptions, kewarganegaraanBOOptions, jenisKelaminOptions, npwpOptions, npwp2Options, npwp3Options, memilikiRekeningOptions, trueFalseOptions } from "@/data/option.js";
import { fetchBidangPekerjaan, fetchBranches, fetchJabatanKonfirmasi, fetchPekerjaan } from '@/services/service.js';
import CustomCheckbox from '@/components/CustomCheckbox.vue';


export default {
  components: {
    FormField,
    RadioButtonChoose,
    ButtonComponent,
    QuantityCounter,
    CustomCheckbox
  },
  data() {
    return {
      form: new FormModelDataPekerjaan(),
      pernyataanChecked: false,
      isFirstFetch: true,
      penghasilanOptions,
      trueFalseOptions,
      jumlahPenghasilanOptions,
      hubunganNasabahOptions,
      statusPerkawinanOptions,
      korespondensiOptions,
      hubunganPemohonKDOptions,
      jenisIdentitasBOOptions,
      kewarganegaraanBOOptions,
      memilikiRekeningOptions,
      jenisKelaminOptions,
      npwpOptions,
      npwp2Options,
      npwp3Options,
      quantity: 5,
      jabatanOptions: [],
      pekerjaanOptions: [],
      bidangPekerjaanOptions: [],
      provinsiOptions: [],
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],
      fileStore: useFileStore(),
    };
  },

  computed: {
    isButtonDisabled() {
      // const isLamaBekerjaValidDK = this.form.lamaBekerjaTahunDK > 0 || this.form.lamaBekerjaBulanDK > 0;
      // const isLamaBekerjaValidBO = this.form.lamaBekerjaTahunBO > 0 || this.form.lamaBekerjaBulanBO > 0;

      const isLainnyaEmpty = (
        (this.form.pekerjaan === "9999" && !this.form.pekerjaanLainnya?.trim()) ||
        (this.form.penghasilan === "0" && !this.form.penghasilanLainnya?.trim()) ||
        (this.form.bidangPekerjaanDK === "lainnya" && !this.form.bidangPekerjaanLainnyaDK?.trim()) ||
        (this.form.jabatanDK === "lainnya" && !this.form.jabatanLainnyaDK?.trim()) ||
        (this.form.pekerjaanBO === "9999" && !this.form.pekerjaanLainnyaBO?.trim()) ||
        (this.form.penghasilanBO === "0" && !this.form.penghasilanLainnyaBO?.trim()) ||
        (this.form.jabatanBO === "lainnya" && !this.form.jabatanLainnyaBO?.trim()) ||
        (this.form.hubunganNasabahBO === "0" && !this.form.hubunganNasabahLainnyaBO?.trim()) ||
        (this.form.jenisIdentitasBO === "0" && !this.form.jenisIdentitasLainnyaBO?.trim())
      );

      console.log('isLainnyaEmpty:', isLainnyaEmpty, 'pekerjaan:', this.form.pekerjaan, 'pekerjaanLainnya:', this.form.pekerjaanLainnya);
      if (isLainnyaEmpty) return true;

      console.log({
        pekerjaan9999: this.form.pekerjaan === "9999",
        pekerjaanLainnya: this.form.pekerjaanLainnya,
        penghasilan0: this.form.penghasilan === "0",
        penghasilanLainnya: this.form.penghasilanLainnya,
      });


      const isRequiredFieldsFilled = (
        this.form.pekerjaan &&
        // (this.form.pekerjaan !== "9999" || (this.form.pekerjaanLainnya && this.form.pekerjaanLainnya.trim())) &&
        (this.form.pekerjaan !== "9999" || !!this.form.pekerjaanLainnya?.trim()) &&
        this.form.penghasilan &&
        this.form.jumlahPenghasilan &&
        this.form.namaLengkapKD &&
        this.form.hubunganPemohonKD &&
        this.form.alamatKD &&
        this.form.nomorTeleponKD &&
        this.form.korespondensi
      );
      if (!isRequiredFieldsFilled) return true;

      const isBeneficialOwnerFilled = (
        this.pernyataanChecked === true &&
        this.form.hubunganNasabahBO &&
        (this.form.hubunganNasabahBO !== "0" || this.form.hubunganNasabahLainnyaBO) &&
        this.form.jenisIdentitasBO &&
        (this.form.jenisIdentitasBO !== "0" || this.form.jenisIdentitasLainnyaBO) &&
        this.form.kewarganegaraanBO &&
        this.form.namaLengkapBO &&
        this.form.nomorDokumenIdentitasBO &&
        this.form.alamatBO &&
        this.form.rtBO &&
        this.form.rwBO &&
        this.form.provinsiBO &&
        this.form.kabupatenBO &&
        this.form.kecamatanBO &&
        this.form.kelurahanBO &&
        this.form.kodePosBO &&
        this.form.tempatLahirBO &&
        this.form.tanggalLahirBO &&
        (this.form.jenisKelaminBO !== null && this.form.jenisKelaminBO !== undefined) &&
        this.form.statusPerkawinanBO &&
        this.form.pekerjaanBO &&
        (this.form.pekerjaanBO !== "9999" || this.form.pekerjaanLainnyaBO) &&
        this.form.namaPerusahaanBO &&
        this.form.alamatPerusahaanBO &&
        this.form.kotaPerusahaanBO &&
        this.form.kodePosPerusahaanBO &&
        // this.form.jabatanBO &&
        (this.form.lamaBekerjaTahunBO > 0 || this.form.lamaBekerjaBulanBO > 0) &&
        this.form.penghasilanBO &&
        (this.form.penghasilanBO !== "0" || this.form.penghasilanLainnyaBO) &&
        this.form.jumlahPenghasilanBO &&
        (
          (this.form.pekerjaanBO === '9999' && !!this.form.jabatanLainnyaBO?.trim()) ||
          (['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013'].includes(this.form.pekerjaanBO) && !!this.form.jabatanBO) ||
          (!['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013', '9999'].includes(this.form.pekerjaanBO))
          // Pastikan logika untuk pekerjaan di luar daftar sudah sesuai
        )
      );

      const isDetailPekerjaanFilled =
        !!this.form.namaPerusahaanDK?.trim() &&
        !!this.form.bidangPekerjaanDK &&
        (
          (this.form.pekerjaan === '9999' && !!this.form.jabatanLainnyaDK?.trim()) ||
          (['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013'].includes(this.form.pekerjaan) && !!this.form.jabatanDK) ||
          (!['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0010', '0012', '0013', '9999'].includes(this.form.pekerjaan))
        ) &&
        (this.form.lamaBekerjaTahunDK > 0 || this.form.lamaBekerjaBulanDK > 0) &&
        !!this.form.kodePosPerusahaanDK?.trim() &&
        !!this.form.alamatDK?.trim() &&
        !!this.form.kotaPerusahaanDK?.trim();

      // console.log("nama perusahaan:", this.form.namaPerusahaanDK);
      // console.log("bidangPekerjaanDK:", this.form.bidangPekerjaanDK);
      // console.log("jabatanDK:", this.form.jabatanDK);
      // console.log("alamatDK:", this.form.alamatDK);
      // console.log("kodePosPerusahaanDK:", this.form.kodePosPerusahaanDK);
      // console.log("kotaPerusahaanDK:", this.form.kotaPerusahaanDK);
      // console.log("lamaBekerjaTahunDK:", this.form.lamaBekerjaTahunDK);
      // console.log("lamaBekerjaBulanDK:", this.form.lamaBekerjaBulanDK);


      console.log("isRequiredFieldsFilled:", isRequiredFieldsFilled);
      console.log("isDetailPekerjaanFilled:", isDetailPekerjaanFilled);
      console.log("isBeneficialOwnerFilled:", isBeneficialOwnerFilled);
      console.log("sumberDanaMilikPribadi:", this.form.sumberDanaMilikPribadi);
      console.log("pekerjaan:", this.form.pekerjaan);


      if (['0009', '0011'].includes(this.form.pekerjaan)) {
        return !isBeneficialOwnerFilled;
      } else {
        if (this.form.sumberDanaMilikPribadi === true) {
          return !isDetailPekerjaanFilled;
        } else if (this.form.sumberDanaMilikPribadi === false) {
          return !isBeneficialOwnerFilled;
        } else {
          console.log('Path: Sumber Dana Milik Pribadi is not selected (yet)');
          return true; // Atau logika lain sesuai kebutuhan Anda, misalnya tetap nonaktif
        }
      }
    },
  },

  watch: {
    'form.pekerjaan': function (newVal) {
      console.log('Pekerjaan berubah menjadi:', newVal);
      if (newVal !== '9999') {
        this.form.pekerjaanLainnya = "";
        this.form.sumberDanaMilikPribadi = "";
        this.form.namaPerusahaanDK = "";
        this.form.bidangPekerjaanDK = "";
        this.form.bidangPekerjaanLainnyaDK = "";
        this.form.jabatanDK = "";
        this.form.jabatanLainnyaDK = "";
        this.form.alamatDK = "";
        this.form.kotaPerusahaanDK = "";
        this.form.kodePosPerusahaanDK = "";
        this.form.lamaBekerjaTahunDK = "";
        this.form.lamaBekerjaBulanDK = "";
        this.form.nomorTeleponKantorDK = "";
        this.form.nomorTeleponFaxDK = "";
        this.form.korespondensi = "";
      } else {
        console.log('Pekerjaan menjadi Lainnya, pekerjaanLainnya saat ini:', this.form.pekerjaanLainnya);
        // this.form.pekerjaanLainnya = "";
        this.form.hubunganNasabahBO = "";
        this.form.hubunganNasabahLainnyaBO = "";
        this.form.jenisIdentitasBO = "";
        this.form.jenisIdentitasLainnyaBO = "";
        this.form.kewarganegaraanBO = "";
        this.form.kewarganegaraanLainnyaBO = "";
        this.form.namaLengkapBO = "";
        this.form.nomorDokumenIdentitasBO = "";
        this.form.alamatBO = "";
        this.form.rtBO = "";
        this.form.rwBO = "";
        this.form.provinsiBO = "";
        this.form.kabupatenBO = "";
        this.form.kecamatanBO = "";
        this.form.kelurahanBO = "";
        this.form.kodePosBO = "";
        this.form.tempatLahirBO = "";
        this.form.tanggalLahirBO = "";
        this.form.jenisKelaminBO = "";
        this.form.statusPerkawinanBO = "";
        this.form.pekerjaanBO = "";
        this.form.pekerjaanLainnyaBO = "";
        this.form.namaPerusahaanBO = "";
        this.form.alamatPerusahaanBO = "";
        this.form.kotaPerusahaanBO = "";
        this.form.kodePosPerusahaanBO = "";
        this.form.jabatanBO = "";
        this.form.jabatanLainnyaBO = "";
        this.form.lamaBekerjaTahunBO = "";
        this.form.lamaBekerjaBulanBO = "";
        this.form.penghasilanBO = "";
        this.form.penghasilanLainnyaBO = "";
        this.form.jumlahPenghasilanBO = "";
        this.form.pernyataanChecked = false;
        this.form.npwp = "";
      }
      if (!newVal) {
        this.form.jabatanDK = "";
        this.jabatanOptions = [];
      } else {
        this.fetchJabatan(newVal);
      }
    },
    'form.pekerjaanBO': function (newVal) {
      if (newVal !== '9999') {
        this.form.pekerjaanLainnyaBO = "";
      } else {
        this.form.pekerjaanLainnyaBO = "";
      }
      if (!newVal) {
        this.form.jabatanBO = "";
        this.jabatanOptions = [];
      } else {
        this.fetchJabatan(newVal);
      }
    },
    'form.sumberDanaMilikPribadi': function (newVal) {
      if (newVal === true) {
        this.form.hubunganNasabahBO = "";
        this.form.hubunganNasabahLainnyaBO = "";
        this.form.jenisIdentitasBO = "";
        this.form.jenisIdentitasLainnyaBO = "";
        this.form.kewarganegaraanBO = "";
        this.form.kewarganegaraanLainnyaBO = "";
        this.form.namaLengkapBO = "";
        this.form.nomorDokumenIdentitasBO = "";
        this.form.alamatBO = "";
        this.form.rtBO = "";
        this.form.rwBO = "";
        this.form.provinsiBO = "";
        this.form.kabupatenBO = "";
        this.form.kecamatanBO = "";
        this.form.kelurahanBO = "";
        this.form.kodePosBO = "";
        this.form.tempatLahirBO = "";
        this.form.tanggalLahirBO = "";
        this.form.jenisKelaminBO = "";
        this.form.statusPerkawinanBO = "";
        this.form.pekerjaanBO = "";
        this.form.pekerjaanLainnyaBO = "";
        this.form.namaPerusahaanBO = "";
        this.form.alamatPerusahaanBO = "";
        this.form.kotaPerusahaanBO = "";
        this.form.kodePosPerusahaanBO = "";
        this.form.jabatanBO = "";
        this.form.jabatanLainnyaBO = "";
        this.form.lamaBekerjaTahunBO = "";
        this.form.lamaBekerjaBulanBO = "";
        this.form.penghasilanBO = "";
        this.form.penghasilanLainnyaBO = "";
        this.form.jumlahPenghasilanBO = "";
      } else if (newVal === false) {
        this.form.namaPerusahaanDK = "";
        this.form.bidangPekerjaanDK = "";
        this.form.bidangPekerjaanLainnyaDK = "";
        this.form.jabatanDK = "";
        this.form.jabatanLainnyaDK = "";
        this.form.alamatDK = "";
        this.form.kotaPerusahaanDK = "";
        this.form.kodePosPerusahaanDK = "";
        this.form.lamaBekerjaTahunDK = "";
        this.form.lamaBekerjaBulanDK = "";
        this.form.nomorTeleponKantorDK = "";
        this.form.nomorTeleponFaxDK = "";
        this.form.korespondensi = "";
      }
    },
    // "form.pekerjaan": function (newPekerjaan, oldPekerjaan) {
    //   console.log("Pekerjaan dipilih:", newPekerjaan);

    //   // if (newPekerjaan !== oldPekerjaan) {
    //   //   this.resetFormKecualiPekerjaan();
    //   // }

    //   if (!newPekerjaan) {
    //     this.form.jabatanDK = "";
    //     this.jabatanOptions = [];
    //   } else {
    //     this.fetchJabatan(newPekerjaan);
    //   }
    // },
    // "form.pekerjaanBO": function (newPekerjaan) {
    //   console.log("Pekerjaan dipilih:", newPekerjaan);
    //   if (!newPekerjaan) {
    //     this.form.jabatanBO = "";
    //     this.jabatanOptions = [];
    //   } else {
    //     this.fetchJabatan(newPekerjaan);
    //   }
    // },
    "form.provinsiBO": function (newProvinsi) {
      if (!newProvinsi) {
        this.form.kabupatenBO = "";
        this.form.kecamatanBO = "";
        this.kabupatenOptions = [];
        this.kecamatanOptions = [];
      } else {
        this.fetchKabupaten();
      }
    },
    "form.kabupatenBO": function (newKabupaten) {
      if (!newKabupaten) {
        this.form.kecamatanBO = "";
        this.kecamatanOptions = [];
      } else {
        this.fetchKecamatan();
      }
    },

    "form.kecamatanBO": function (newKecamatan) {
      if (!newKecamatan) {
        this.form.kelurahanBO = "";
        this.kelurahanOptions = [];
      } else {
        this.fetchKelurahan();
      }
    },
    // 'form.pekerjaan'(newVal) {
    //   if (newVal !== 'lainnya') {
    //     this.form.pekerjaanLainnya = '';
    //   }
    // },
    'form.penghasilan'(newVal) {
      if (newVal !== 'lainnya') {
        this.form.penghasilanLainnya = '';
      }
    },
    'form.jenisIdentitasBO'(newVal) {
      if (newVal !== 'lainnya') {
        this.form.jenisIdentitasLainnyaBO = '';
      }
    },
    'form.kewarganegaraanBO'(newVal) {
      if (newVal !== 'lainnya') {
        this.form.kewarganegaraanLainnyaBO = '';
      }
    },
    'form.hubunganNasabahBO'(newVal) {
      if (newVal !== 'lainnya') {
        this.form.hubunganNasabahLainnyaBO = '';
      }
    },
    'form.penghasilanBO'(newVal) {
      if (newVal !== 'lainnya') {
        this.form.penghasilanLainnyaBO = '';
      }
    },
    'form.bidangPekerjaanDK'(newVal) {
      if (newVal !== 'lainnya') {
        this.form.bidangPekerjaanLainnyaDK = '';
      }
    },
    'form.jabatanDK'(newVal) {
      if (newVal !== 'lainnya') {
        this.form.jabatanLainnyaDK = '';
      }
    },
  },

  methods: {
    resetFormKecualiPekerjaan() {
      const pekerjaanSebelumReset = this.form.pekerjaan;
      this.form = new FormModelDataPekerjaan();
      this.form.pekerjaan = pekerjaanSebelumReset;
    },
    async fetchPekerjaan() {
      try {
        const pekerjaanOptions = await fetchPekerjaan();
        this.pekerjaanOptions = pekerjaanOptions;
      } catch (error) {
        console.error("Gagal mengambil data Jabatan:", error);
      }
    },

    async fetchBidangPekerjaan() {
      try {
        const bidangPekerjaanOptions = await fetchBidangPekerjaan();
        this.bidangPekerjaanOptions = bidangPekerjaanOptions;
      } catch (error) {
        console.error("Gagal mengambil data Bidang Pekerjaan:", error);
      }
    },

    async fetchJabatan(kodePekerjaan) {
      try {
        console.log("Mengambil jabatan untuk pekerjaan:", kodePekerjaan); // Cek kode pekerjaan
        const response = await api.get("/list-jabatan");
        console.log("Data jabatan diterima:", response.data);

        if (response.data && response.data.jabatan) {
          this.jabatanOptions = response.data.jabatan
            .filter(j => j.occupation_code === String(kodePekerjaan))
            .map(j => ({
              label: j.label,
              value: j.code
            }));

          console.log("Jabatan options:", this.jabatanOptions);
        } else {
          console.error("Format data jabatan tidak sesuai:", response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data jabatan:", error.response ? error.response.data : error.message);
      }
    },

    async fetchProvinsi() {
      try {
        const response = await api.get("/provinsi");
        console.log("Data provinsi diterima:", response.data);

        if (response.data && response.data.provinsi) {
          this.provinsiOptions = response.data.provinsi.map(p => ({
            label: p.provinsi,
            value: p.provinsi
          }));
          console.log("Provinsi options:", this.provinsiOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
      }
    },

    async fetchKabupaten() {
      this.kabupatenOptions = [];
      this.kecamatanOptions = [];
      this.kelurahanOptions = [];

      if (!this.form.provinsiBO) return;

      try {
        const response = await api.get(`/provinsi?provinsi=${this.form.provinsiBO}`);
        console.log("Data kabupaten diterima:", response.data);

        if (response.data && response.data.kabupaten) {
          this.kabupatenOptions = response.data.kabupaten.map(k => ({
            label: k.kabupaten,
            value: k.kabupaten
          }));
          console.log("Kabupaten options:", this.kabupatenOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data kabupaten:", error);
      }
    },

    async fetchKecamatan() {
      this.kecamatanOptions = [];
      this.kelurahanOptions = [];

      if (!this.form.provinsiBO || !this.form.kabupatenBO) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsiBO}&kabupaten=${this.form.kabupatenBO}`
        );
        console.log("Data kecamatan diterima:", response.data);

        if (response.data && response.data.kecamatan) {
          this.kecamatanOptions = response.data.kecamatan.map(kec => ({
            label: kec.kecamatan,
            value: kec.kecamatan
          }));
          console.log("Kecamatan options:", this.kecamatanOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data kecamatan:", error);
      }
    },

    async fetchKelurahan() {
      this.kelurahanOptions = [];

      if (!this.form.provinsiBO || !this.form.kabupatenBO || !this.form.kecamatanBO) return;

      try {
        const response = await api.get(
          `/provinsi?provinsi=${this.form.provinsiBO}&kabupaten=${this.form.kabupatenBO}&kecamatan=${this.form.kecamatanBO}`
        );
        console.log("Data kelurahan diterima:", response.data);

        if (response.data && response.data.kelurahan) {
          this.kelurahanOptions = response.data.kelurahan.map(kel => ({
            label: kel.kelurahan,
            value: kel.kelurahan
          }));
          console.log("Kelurahan options:", this.kelurahanOptions);
        }
      } catch (error) {
        console.error("Gagal mengambil data kelurahan:", error);
      }
    },

    async fetchData() {
      try {
        const fileStore = useFileStore();
        const dataPekerjaan = fileStore.formPekerjaan;
        const dataNPWP = fileStore.formNPWP; // Asumsikan Anda memiliki state formNPWP di store

        console.log("Data Pekerjaan from Pinia:", dataPekerjaan);
        console.log("Data NPWP from Pinia:", dataNPWP);

        if (dataPekerjaan) {
          Object.keys(this.form).forEach((key) => {
            if (dataPekerjaan[key] !== undefined) {
              this.form[key] = dataPekerjaan[key];
            }
          });
        }

        if (dataNPWP) {
          Object.keys(this.form).forEach((key) => {
            if (dataNPWP[key] !== undefined) {
              this.form[key] = dataNPWP[key];
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    goBack() {
      this.$router.push({ path: "/dashboard/dataPribadiPenempatanDepositoNTB" });
    },

    async handleSubmit() {
      try {
        const fileStore = useFileStore();
        const uuid = fileStore.uuid;

        if (!uuid) {
          console.error("UUID tidak ditemukan di fileStore");
          alert("Terjadi kesalahan, UUID tidak ditemukan.");
          return;
        }

        const requestData = {
          uuid: uuid,
          kode_pekerjaan: this.form.pekerjaan,
          pekerjaan: this.form.pekerjaan === '9999' ? this.form.pekerjaanLainnya : this.pekerjaanOptions.find(p => p.value === this.form.pekerjaan)?.label || "",
          // pekerjaan_lainnya: this.form.pekerjaanLainnya,
          sumber_penghasilan: Number(this.form.penghasilan),
          // sumber_penghasilan: this.form.penghasilan === 'lainnya' ? this.form.penghasilanLainnya : Number(this.form.penghasilan) || "",
          sumber_penghasilan_lainnya: String(this.form.penghasilanLainnya),
          penghasilan_perbulan: Number(this.form.jumlahPenghasilan),

          // DATA PEKERJAAN
          nama_perusahaan: this.form.namaPerusahaanDK,
          bidang_pekerjaan_usaha:
            this.bidangPekerjaanOptions.find((b) => b.value === this.form.bidangPekerjaanDK)?.label || "",
          kode_jabatan: this.form.jabatanDK,
          // jabatan_pekerjaan: this.jabatanOptions.find(j => j.value === this.form.jabatanDK)?.label || "",
          jabatan_pekerjaan: this.form.pekerjaan === '9999' ? this.form.jabatanLainnyaDK : this.jabatanOptions.find(p => p.value === this.form.jabatanDK)?.label || "",
          alamat_pekerjaan: this.form.alamatDK,
          lama_bekerja_tahun: String(this.form.lamaBekerjaTahunDK),
          lama_bekerja_bulan: String(this.form.lamaBekerjaBulanDK),
          nomor_telp_kantor: this.form.nomorTeleponKantorDK,
          nomor_fax_kantor: this.form.nomorTeleponFaxDK,
          alamat_korespondensi_surat: Number(this.form.korespondensi),
          kota_pekerjaan: this.form.kotaPerusahaanDK,
          kode_pos_pekerjaan: Number(this.form.kodePosPerusahaanDK),
          dana_milik_pribadi: Boolean(this.form.sumberDanaMilikPribadi),

          // DATA BENEFICIAL OWNER
          hubungan_dengan_nasabah_bo: Number(this.form.hubunganNasabahBO),
          jenis_identitas_bo: Number(this.form.jenisIdentitasBO),
          jenis_identitas_bo_lainnya: this.form.jenisIdentitasLainnyaBO,
          kewarganegaraan_ind_bo: Boolean(this.form.kewarganegaraanBO),
          kewarganegaraan_lainnya_bo: this.form.kewarganegaraanLainnyaBO,
          nama_lengkap_bo: this.form.namaLengkapBO,
          nama_dokumen_identitas_bo: this.form.nomorDokumenIdentitasBO,
          alamat_bo: this.form.alamatBO,
          rt_bo: this.form.rtBO,
          rw_bo: this.form.rwBO,
          provinsi_bo: this.form.provinsiBO,
          kota_bo: this.form.kabupatenBO,
          kode_jabatan_bo: this.form.jabatanBO,
          // jabatan_bo: this.jabatanOptions.find(j => j.value === this.form.jabatanBO)?.label || "",
          jabatan_bo: this.form.pekerjaanBO === '9999' ? this.form.jabatanLainnyaBO : this.jabatanOptions.find(p => p.value === this.form.jabatanBO)?.label || "",
          kecamatan_bo: this.form.kecamatanBO,
          desa_kelurahan_bo: this.form.kelurahanBO,
          kode_pos_bo: Number(this.form.kodePosBO),
          tempat_lahir_bo: this.form.tempatLahirBO,
          tanggal_lahir_bo: this.form.tanggalLahirBO
            ? new Date(this.form.tanggalLahirBO).toISOString().split("T")[0]
            : null,
          kode_pekerjaan_bo: this.form.pekerjaanBO,
          // pekerjaan_bo: this.pekerjaanOptions.find(p => p.value === this.form.pekerjaanBO)?.label || "",
          pekerjaan_bo: this.form.pekerjaanBO === '9999' ? this.form.pekerjaanLainnyaBO : this.pekerjaanOptions.find(p => p.value === this.form.pekerjaanBO)?.label || "",
          nama_perusahaan_bo: this.form.namaPerusahaanBO,
          alamat_perusahaan_bo: this.form.alamatPerusahaanBO,
          lama_bekerja_tahun_bo: String(this.form.lamaBekerjaTahunBO),
          lama_bekerja_bulan_bo: String(this.form.lamaBekerjaBulanBO),
          penghasilan_perbulan_bo: Number(this.form.jumlahPenghasilanBO),
          sumber_dana_bo: Number(this.form.penghasilanBO),
          pernyataan_kebenaran_identitas: Boolean(this.form.pernyataanChecked),

          // KONTAK DARURAT
          nama_lengkap_kontak_darurat: this.form.namaLengkapKD,
          hubungan_dengan_pemohon_kontak_darurat: this.form.hubunganPemohonKD,
          alamat_terkini_kontak_darurat: this.form.alamatKD,
          nomor_telpon_kontak_darurat: this.form.nomorTeleponKD,
        };

        console.log("Request data:", requestData);

        const response = await api.post("/data-pekerjaan-deposito", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response code:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 201 || response.status === 200) {
          console.log("Data berhasil dikirim:", response.data);
          fileStore.setFormDataPekerjaan(this.form);
          console.log("Form data has been saved to the store:", this.form);
          window.scrollTo(0, 0);
          this.$router.push({ path: "/dashboard/konfirmasiDataPenempatanDepositoNTB" });
        } else {
          console.error("Gagal mengirim data, status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
  },
  mounted() {
    this.$emit("update-progress", 60);
    this.fetchProvinsi();
    this.fetchKabupaten();
    this.fetchKecamatan();
    this.fetchKelurahan();
    this.fetchPekerjaan();
    this.fetchJabatan();
    this.fetchBidangPekerjaan();
    this.fetchData();
  },
  created() {
    if (this.fileStore.formNPWP) {
      this.form.npwp = this.fileStore.formNPWP;
    }
  },
};
</script>
