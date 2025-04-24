<template>
    <form @submit.prevent="handleSubmit">
        <!-- Apakah terdapat perubahan dalam pekerjaan Anda saat ini?* -->
        <RadioButtonChoose label="Apakah terdapat perubahan dalam pekerjaan Anda saat ini?*" :options="trueFalseOptions"
            v-model="form.ubahPekerjaan" name="ubahPekerjaan" />
        <div v-if="form.ubahPekerjaan === true" class="mt-4">
            <FormField label="Pekerjaan*" id="pekerjaan" :isDropdown="true" v-model="form.pekerjaan"
                :options="pekerjaanOptions" placeholder="Pilih Pekerjaan Anda" />

            <div v-if="form.pekerjaan === 'lainnya'" class="">
                <FormField label="Pekerjaan Lainnya *" id="pekerjaanLainnya" type="text" v-model="form.pekerjaanLainnya"
                    placeholder="Masukkan Pekerjaan Lainnya" />
            </div>

            <FormField label="Sumber Dana*" id="penghasilan" :isDropdown="true" v-model="form.penghasilan"
                :options="penghasilanOptions" placeholder="Pilih Sumber Penghasilan Anda" />

            <div v-if="form.penghasilan === 'lainnya'" class="">
                <FormField label="penghasilan Lainnya *" id="penghasilanLainnya" type="text"
                    v-model="form.penghasilanLainnya" placeholder="Masukkan Sumber Penghasilan Lainnya" />
            </div>

            <FormField label="Penghasilan Perbulan*" id="jumlahPenghasilan" :isDropdown="true"
                v-model="form.jumlahPenghasilan" :options="jumlahPenghasilanOptions"
                placeholder="Pilih Penghasilan Perbulan Anda" />
        </div>

        <!-- Apakah Anda yakin dana yang digunakan milik Anda pribadi?* -->
        <RadioButtonChoose label="Apakah Anda yakin dana yang digunakan milik Anda pribadi?*"
            :options="trueFalseOptions" v-model="form.sumberDana" name="sumberDana" />

        <!-- Form Benefial Owner -->
        <div v-if="form.sumberDana === true" class="mt-4">
            <FormField label="Nama Perusahaan*" id="namaPerusahaanDK" :isDropdown="false"
                v-model="form.namaPerusahaanDK" placeholder="Masukkan Nama Perusahaan Anda" />

            <FormField label="Bidang Pekerjaan*" id="bidangPekerjaanDK" :isDropdown="true"
                v-model="form.bidangPekerjaanDK" placeholder="Pilih Bidang Pekerjaan Anda"
                :options="bidangPekerjaanOptions" />

            <div v-if="form.bidangPekerjaanDK === 'lainnya'" class="">
                <FormField label="Bidang Pekerjaan Lainnya" id="bidangPekerjaanLainnyaDK" type="text"
                    v-model="form.bidangPekerjaanLainnyaDK" placeholder="Masukkan Bidang Pekerjaan Lainnya" />

            </div>
            <FormField label="Jabatan*" id="jabatanDK" :isDropdown="true" v-model="form.jabatanDK"
                :options="jabatanOptions" placeholder="Pilih Jabatan Anda" />

            <div v-if="form.jabatanDK === 'lainnya'" class="">
                <FormField label="Jabatan Lainnya *" id="jabatanLainnyaDK" type="text" v-model="form.jabatanLainnyaDK"
                    placeholder="Masukkan Jabatan Lainnya" />

            </div>
            <FormField label="Alamat Perusahaan*" id="alamatDK" :isDropdown="false" v-model="form.alamatDK"
                placeholder="Masukkan Alamat Anda" />

            <div class="flex flex-row gap-4">
                <FormField label="Kota Perusahaan*" id="kotaDK" v-model="form.kotaPerusahaanDK" :required="true"
                    placeholder="Masukkan Kota Perusahaan" class="flex-1" />

                <FormField label="Kode Pos Perusahaan*" id="kodePosDK" v-model="form.kodePosPerusahaanDK"
                    :required="true" type="Number" placeholder="Masukkan Kode Pos Perusahaan" class="flex-1" />
            </div>

            <div class="flex flex-row gap-4">
                <QuantityCounter label="Lama Bekerja (Tahun)" id="lamaBekerjaTahunDK" v-model="form.lamaBekerjaTahunDK"
                    :min="0" :max="50" :required="true" />

                <QuantityCounter label="Lama Bekerja (Bulan)" id="lamaBekerjaBulanDK" v-model="form.lamaBekerjaBulanDK"
                    :min="0" :max="50" :required="true" />
            </div>

            <FormField label="Nomor Telepon Kantor (Opsional)" id="nomorTeleponKantorDK"
                v-model="form.nomorTeleponKantorDK" placeholder="Masukkan Nomor Telepon Kantor Anda" />

            <FormField label="Nomor Telepon Fax (Opsional)" id="nomorTeleponFaxDK" v-model="form.nomorTeleponFaxDK"
                placeholder="Masukkan Nomor Telepon Fax Anda" />

            <RadioButtonChoose label="Alamat korespondensi/Pengiriman Surat Menyurat*" :options="korespondensiOptions"
                v-model="form.korespondensi" name="korespondensi" />
        </div>

        <div v-if="form.sumberDana === false" class="mt-4">
            <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
                Pemilik Manfaat <i>(Beneficial Owner)</i>
            </h2>
            <p class="text-sm text-gray-600 mb-4">
                *Beneficial owner setiap orang yang merupakan pemilik sebenarnya dari dana yang ditempatkan pada bank;
                mengendalikan transaksi; memberikan kuasa untuk melakukan Transaksi; mengendalikan Badan Hukum; dan/atau
                melakukan pengendalian akhir dari transaksi yang dilakukan
            </p>

            <FormField label="Hubungan Nasabah*" id="hubunganNasabahBO" :isDropdown="true"
                :options="hubunganNasabahOptions" v-model="form.hubunganNasabahBO" placeholder="Pilih Hubungan Nasabah"
                :required="true" />

            <div v-if="form.hubunganNasabahBO === 'lainnya'" class="">
                <FormField label="Hubungan Nasabah Lainnya *" id="hubunganNasabahLainnyaBO" type="text"
                    v-model="form.hubunganNasabahLainnyaBO" placeholder="Masukkan Hubungan Nasabah Lainnya" />

            </div>
            <FormField label="Jenis Identitas*" id="jenisIdentitasBO" :isDropdown="true"
                :options="jenisIdentitasBOOptions" v-model="form.jenisIdentitasBO"
                placeholder="Pilih Jenis Identitas Beneficial Owner Anda" :required="true" />

            <div v-if="form.jenisIdentitasBO === 'lainnya'" class="">
                <FormField label="Jenis Identitas Lainnya *" id="jenisIdentitasLainnyaBO" type="text"
                    v-model="form.jenisIdentitasLainnyaBO" placeholder="Masukkan Jenis Identitas Lainnya" />

            </div>
            <FormField label="Kewarganegaraan*" id="kewarganegaraanBO" :isDropdown="true" type="text"
                v-model="form.kewarganegaraanBO" :options="kewarganegaraanBOOptions"
                placeholder="Pilih Kewarganegaraan Beneficial Owner Anda" />

            <div v-if="form.kewarganegaraanBO === false" class="">
                <FormField label="Kewarganegaraan Lainnya *" id="kewarganegaraanLainnyaBO" type="text"
                    v-model="form.kewarganegaraanLainnyaBO" placeholder="Masukkan Kewarganegaraan Lainnya" />

            </div>
            <FormField label="Nama Lengkap*" id="namaLengkapBO" :isDropdown="false" v-model="form.namaLengkapBO"
                placeholder="Masukkan Nama Lengkap Beneficial Owner Anda" :required="true" />

            <FormField label="Nomor Dokumen Identitas*" id="nomorDokumenIdentitasBO" :isDropdown="false" type="Number"
                v-model="form.nomorDokumenIdentitasBO"
                placeholder="Masukkan Nomor Dokumen Identitas Beneficial Owner Anda" :required="true" />

            <FormField label="Detail Alamat Tempat Tinggal Terkini*" id="alamatBO" v-model="form.alamatBO"
                :required="true" placeholder="Masukkan Alamat Beneficial Owner Anda" />

            <div class="flex flex-row gap-4">
                <FormField label="RT*" id="rtBO" v-model="form.rtBO" :required="true"
                    placeholder="Masukkan RT Beneficial Owner Anda" class="flex-1" />

                <FormField label="RW*" id="rwBO" v-model="form.rwBO" :required="true"
                    placeholder="Masukkan RW Beneficial Owner Anda" class="flex-1" />
            </div>

            <FormField label="Provinsi*" id="provinsiBO" :isDropdown="true" v-model="form.provinsiBO"
                :options="provinsiOptions" placeholder="Pilih Provinsi Beneficial Owner Anda"
                @change="fetchKabupaten" />

            <FormField label="Kabupaten/Kota*" id="kabupatenBO" :isDropdown="true" v-model="form.kabupatenBO"
                :options="kabupatenOptions" placeholder="Pilih Kabupaten/Kota Beneficial Owner Anda"
                @change="fetchKecamatan" :disabled="!form.provinsiBO" />

            <FormField label="Kecamatan*" id="kecamatanBO" :isDropdown="true" v-model="form.kecamatanBO"
                :options="kecamatanOptions" placeholder="Pilih Kecamatan Beneficial Owner Anda"
                :disabled="!form.kabupatenBO" />

            <FormField label="Kelurahan*" id="kelurahanBO" :isDropdown="true" v-model="form.kelurahanBO"
                :options="kelurahanOptions" placeholder="Pilih Kelurahan Beneficial Owner Anda"
                :disabled="!form.kecamatanBO" />

            <FormField label="Kode Pos*" id="kodePosBO" v-model="form.kodePosBO" :required="true"
                placeholder="Masukkan Kode Pos Beneficial Owner Anda" />

            <FormField label="Tempat Lahir*" id="tempatLahirBO" :isDropdown="false" v-model="form.tempatLahirBO"
                placeholder="Masukkan Tempat Lahir Beneficial Owner Anda" :required="true" />

            <FormField label="Tanggal Lahir*" id="tanggalLahirBO" type="date" v-model="form.tanggalLahirBO"
                placeholder="Pilih Tanggal Lahir Beneficial Owner Anda" />

            <FormField label="Jenis Kelamin*" id="jenisKelamin" :isDropdown="true" v-model="form.jenisKelaminBO"
                :options="jenisKelaminOptions" placeholder="Pilih Jenis Kelamin Beneficial Owner Anda" />

            <FormField label="Status Perkawinan*" id="statusPerkawinanBO" :isDropdown="true"
                v-model="form.statusPerkawinanBO" :options="statusPerkawinanOptions"
                placeholder="Pilih Status Perkawinan Beneficial Owner Anda" :required="true" />

            <FormField label="Pekerjaan*" id="pekerjaanBO" :isDropdown="true" v-model="form.pekerjaanBO"
                placeholder="Pilih Pekerjaan Beneficial Owner Anda" :options="pekerjaanOptions" />

            <div v-if="form.pekerjaanBO === 'lainnya'" class="">
                <FormField label="Pekerjaan Lainnya *" id="pekerjaanLainnyaBO" type="text"
                    v-model="form.pekerjaanLainnyaBO" placeholder=" " />
            </div>

            <FormField label="Nama Perusahaan*" id="namaPerusahaanBO" v-model="form.namaPerusahaanBO"
                placeholder="Masukkan Nama Perusahaan Beneficial Owner Anda" :required="true" />

            <FormField label="Alamat Perusahaan*" id="alamatPerusahaanBO" v-model="form.alamatPerusahaanBO"
                placeholder="Masukkan Alamat Perusahaan Beneficial Owner Anda" :required="true" />

            <div class="flex flex-row gap-4">
                <FormField label="Kota*" id="kotaBO" v-model="form.kotaPerusahaanBO" :required="true"
                    placeholder="Masukkan Kota Perusahaan" class="flex-1" />

                <FormField label="Kode Pos*" id="kodePosBO" v-model="form.kodePosPerusahaanBO" :required="true"
                    type="Number" placeholder="Masukkan Kode Pos Perusahaan" class="flex-1" />

            </div>
            <FormField label="Jabatan*" id="jabatanBO" :isDropdown="true" v-model="form.jabatanBO"
                :options="jabatanOptions" placeholder="Pilih Jabatan Beneficial Owner Anda" />

            <div v-if="form.jabatanBO === 'lainnya'" class="">
                <FormField label="Jabatan Lainnya *" id="jabatanLainnyaBO" type="text" v-model="form.jabatanLainnyaBO"
                    placeholder="Masukkan Jabatan Lainnya" />
            </div>

            <div class="flex flex-row gap-4">
                <QuantityCounter label="Lama Bekerja (Tahun)" id="lamaBekerjaTahunBO" v-model="form.lamaBekerjaTahunBO"
                    :min="0" :max="50" :required="true" />

                <QuantityCounter label="Lama Bekerja (Bulan)" id="lamaBekerjaBulanBO" v-model="form.lamaBekerjaBulanBO"
                    :min="0" :max="50" :required="true" />
            </div>

            <FormField label="Sumber Dana*" id="penghasilanBO" :isDropdown="true" v-model="form.penghasilanBO"
                placeholder="Pilih Sumber Beneficial Owner Anda" :options="penghasilanOptions" />

            <div v-if="form.penghasilanBO === 'lainnya'" class="">
                <FormField label="Penghasilan Lainnya *" id="penghasilanLainnyaBO" type="text"
                    placeholder="Masukkan Penghasilan Lainnya" v-model="form.penghasilanLainnyaBO" />

            </div>
            <FormField label="Penghasilan Perbulan*" id="jumlahPenghasilanBO" :isDropdown="true"
                placeholder="Pilih Penghasilan Beneficial Owner Anda" v-model="form.jumlahPenghasilanBO"
                :options="jumlahPenghasilanOptions" />

            <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
                Pernyataan dan Persetujuan Nasabah
            </h2>
            <div class="flex items-baseline pt-2 pb-6">
                <input type="checkbox" v-model="form.pernyataanChecked"
                    class="w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded-sm focus:ring-primary dark:focus:ring-primary dark:ring-offset-neutral-800 focus:ring-2 dark:bg-primary dark:border-neutral-600">
                <div class="flex flex-col items-start pt-0">
                    <p class="ml-2 mt-0 text-neutral-900 text-xs sm:text-sm md:text-sm">Dengan menandatangani aplikasi
                        ini,
                        saya/kami menyatakan bahwa:</p>
                    <ul class="list-decimal list-outside text-neutral-900 text-xs sm:text-sm md:text-sm space-y-2 ml-6">
                        <li>Data Beneficial Owner yang diisikan dalam Formulir Beneficial Owner ini adalah data yang
                            sebenar-benarnya dan sebagai ketentuan untuk melakukan transaksi/pembukaan rekening di PT
                            BPR Universal
                            (selanjutnya disebut “Bank”).</li>
                        <li>Bank dapat melakukan pemeriksaan terhadap kebenaran data yang saya/kami berikan dalam
                            Formulir
                            Beneficial Owner ini.</li>
                        <li>Saya/kami memberi hak dan wewenang kepada Bank untuk melakukan pemblokiran dan atau
                            penutupan rekening,
                            apabila menurut pertimbangan Bank :
                            <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
                                <li>Saya/kami tidak mematuhi ketentuan Prinsip Mengenal Nasabah (Knowing Your Customer)
                                </li>
                                <li>Data yang saya/kami berikan kepada Bank tidak benar atau diragukan kebenarannya.
                                </li>
                                <li> Saya/kami menyalahgunakan rekening.</li>
                            </ul>
                        </li>
                        <li> Bahwa berkaitan dengan pemenuhan NPWP untuk pembukaan rekening, saat ini saya,
                            <RadioButtonChoose class="text-xs sm:text-sm md:text-sm" label="" id="npwp"
                                :options="npwpOptions" v-model="form.npwp" name="npwp" required />
                            Dan berkomitmen akan segera
                            menyampaikan kepada bank setelah
                            memiliki NPWP. (Tidak berlaku bagi nasabah yang telah menyerahkan dokumen NPWP)
                        </li>
                        <li>Saya/Kami tidak memiliki kewajiban/domisili perpajakan di negara selain Indonesia.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Form Kontak Darurat -->
        <h2 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-1">
            Kontak Darurat
        </h2>
        <p class="text-sm text-gray-600 mb-4">
            *Dalam keadaan darurat, mohon agar dapat diberikan nama, alamat, dan no. telp yang dapat dihubungi
            sewaktu-waktu
            oleh pihak BANK <strong>(WAJIB DIISI)</strong>
        </p>
        <FormField label="Nama Lengkap Kontak Darurat*" id="namaLengkapKD" :isDropdown="false"
            v-model="form.namaLengkapKD" placeholder="Masukkan Nama Lengkap Kontak Darurat" />

        <FormField label="Hubungan dengan Pemohon*" id="hubunganDenganPemohonKD" :options="hubunganPemohonKDOptions"
            :isDropdown="true" placeholder="Pilih Hubungan dengan Pemohon Kontak Darurat"
            v-model="form.hubunganPemohonKD" name="hubunganPemohonKD" />

        <div v-if="form.hubunganPemohonKD === 'lainnya'" class="">
            <FormField label="Hubungan dengan Pemohon Lainnya *" id="hubunganPemohonKDLainnya" type="text"
                v-model="form.hubunganPemohonKDLainnya" placeholder="Masukkan Hubungan Pemohon Lainnya" />
        </div>

        <FormField label="Alamat Terkini Kontak Darurat*" id="alamatKD" :isDropdown="false" v-model="form.alamatKD"
            placeholder="Masukkan Alamat Kontak Darurat" />

        <FormField label="Nomor Telepon Kontak Darurat*" id="nomorTeleponKD" v-model="form.nomorTeleponKD" type="Number"
            placeholder="Masukkan Nomor Telepon Kontak Darurat" />

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
import {
    penghasilanOptions, jumlahPenghasilanOptions, hubunganNasabahOptions, statusPerkawinanOptions, korespondensiOptions, hubunganPemohonKDOptions, jenisIdentitasBOOptions, kewarganegaraanBOOptions, jenisKelaminOptions, npwpOptions, trueFalseOptions
} from "@/data/option.js";
import { fetchBidangPekerjaan, fetchPekerjaan } from '@/services/service.js';


export default {
    components: {
        FormField,
        RadioButtonChoose,
        ButtonComponent,
        QuantityCounter,
    },
    data() {
        return {
            form: new FormModelDataPekerjaan(),
            pernyataanChecked: false,
            isFirstFetch: true,
            penghasilanOptions,
            jumlahPenghasilanOptions,
            hubunganNasabahOptions,
            statusPerkawinanOptions,
            korespondensiOptions,
            hubunganPemohonKDOptions,
            jenisIdentitasBOOptions,
            kewarganegaraanBOOptions,
            jenisKelaminOptions,
            npwpOptions,
            trueFalseOptions,
            quantity: 5,
            jabatanOptions: [],
            pekerjaanOptions: [],
            bidangPekerjaanOptions: [],
            provinsiOptions: [],
            kabupatenOptions: [],
            kecamatanOptions: [],
            kelurahanOptions: [],
        };
    },

    computed: {
        isButtonDisabled() {
            const isLainnyaEmpty = (
                (this.form.pekerjaan === "lainnya" && !this.form.pekerjaanLainnya?.trim()) ||
                (this.form.penghasilan === "lainnya" && !this.form.penghasilanLainnya?.trim()) ||
                (this.form.bidangPekerjaanDK === "lainnya" && !this.form.bidangPekerjaanLainnyaDK?.trim()) ||
                (this.form.jabatanDK === "lainnya" && !this.form.jabatanLainnyaDK?.trim()) ||
                (this.form.pekerjaanBO === "lainnya" && !this.form.pekerjaanLainnyaBO?.trim()) ||
                (this.form.penghasilanBO === "lainnya" && !this.form.penghasilanLainnyaBO?.trim()) ||
                (this.form.jabatanBO === "lainnya" && !this.form.jabatanLainnyaBO?.trim())
            );
            if (isLainnyaEmpty) return true;
        },
    },

    watch: {
        'form.pekerjaan': function (newVal) {
            if (['0009', '0011'].includes(newVal)) {
                // Hapus data yang berakhiran DK (Detail Pekerjaan)
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
                // Hapus data Beneficial Owner (BO)
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
        "form.pekerjaanBO": function (newPekerjaan) {
            console.log("Pekerjaan dipilih:", newPekerjaan);
            if (!newPekerjaan) {
                this.form.jabatanBO = "";
                this.jabatanOptions = [];
            } else {
                this.fetchJabatan(newPekerjaan);
            }
        },
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
                const data = fileStore.formPekerjaan;

                console.log("Data from Pinia:", data);

                if (data) {
                    Object.keys(this.form).forEach((key) => {
                        if (data[key] !== undefined) {
                            this.form[key] = data[key];
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },

        goBack() {
            this.$router.push({ path: "/dashboard/dataPribadiPengkinianData" });
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
                    pekerjaan: this.pekerjaanOptions.find(p => p.value === this.form.pekerjaan)?.label || "",
                    pekerjaan_lainnya: this.form.pekerjaanLainnya,
                    sumber_penghasilan: Number(this.form.penghasilan),
                    sumber_penghasilan_lainnya: String(this.form.penghasilanLainnya),
                    penghasilan_perbulan: Number(this.form.jumlahPenghasilan),

                    // DATA PEKERJAAN
                    nama_perusahaan: this.form.namaPerusahaanDK,
                    bidang_pekerjaan_usaha:
                        this.bidangPekerjaanOptions.find((b) => b.value === this.form.bidangPekerjaanDK)?.label || "",
                    kode_jabatan: this.form.jabatanDK,
                    jabatan_pekerjaan: this.jabatanOptions.find(j => j.value === this.form.jabatanDK)?.label || "",
                    alamat_pekerjaan: this.form.alamatDK,
                    lama_bekerja_tahun: String(this.form.lamaBekerjaTahunDK),
                    lama_bekerja_bulan: String(this.form.lamaBekerjaBulanDK),
                    nomor_telp_kantor: this.form.nomorTeleponKantorDK,
                    nomor_fax_kantor: this.form.nomorTeleponFaxDK,
                    alamat_korespondensi_surat: Number(this.form.korespondensi),
                    kota_pekerjaan: this.form.kotaPerusahaanDK,
                    kode_pos_pekerjaan: Number(this.form.kodePosPerusahaanDK),

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
                    jabatan_bo: this.jabatanOptions.find(j => j.value === this.form.jabatanBO)?.label || "",
                    kecamatan_bo: this.form.kecamatanBO,
                    desa_kelurahan_bo: this.form.kelurahanBO,
                    kode_pos_bo: Number(this.form.kodePosBO),
                    tempat_lahir_bo: this.form.tempatLahirBO,
                    tanggal_lahir_bo: this.form.tanggalLahirBO
                        ? new Date(this.form.tanggalLahirBO).toISOString().split("T")[0]
                        : null,
                    kode_pekerjaan_bo: this.form.pekerjaanBO,
                    pekerjaan_bo: this.pekerjaanOptions.find(p => p.value === this.form.pekerjaanBO)?.label || "",
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

                const response = await api.post("/data-pekerjaan", requestData, {
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
                    this.$router.push({ path: "/dashboard/konfirmasiDataPembukaanRekeningNTB" });
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
        // this.fetchData();
    },
};
</script>