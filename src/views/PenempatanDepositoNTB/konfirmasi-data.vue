<template>
  <div>
    <div class="">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data e-KTP
      </h1>
      <div v-if="formKTP" class="form-container">
        <div class="form-item" v-for="(value, key) in formKTP" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Dokumen
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div :class="[
          'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md relative',
          fileStore.isKtpUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
        ]">
          <div class=" flex items-center">
            <img src="/src/assets/ektp.svg" alt="KTP" class="h-12 mr-4" />
            <div>
              <span class="text-sm font-medium text-neutral-900">E-KTP</span>
              <div v-if="fileStore.isKtpUploaded" class="flex flex-row items-center gap-1">
                <img src="/src/assets/success.svg" class="h-4" />
                <p class="text-xs text-neutral-600">{{ nik }}</p>
              </div>
              <div v-else>
                <p class="text-xs text-neutral-600">Foto E-KTP Anda</p>
              </div>
            </div>
          </div>
          <div>
            <img v-if="fileStore.isKtpUploaded" src="/src/assets/success.svg" alt="Download" class="h-6" />
            <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
          </div>
        </div>
        <div :class="[
          'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md  relative',
          fileStore.isFotoDiriUploaded
            ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
        ]" :aria-disabled="fileStore.isFotoDiriUploaded ? 'true' : null">
          <div class="flex items-center">
            <img src="/src/assets/liveness.svg" alt="Liveness" class="h-12 mr-4" />
            <div>
              <span class="text-sm font-medium text-neutral-900">Foto Diri</span>
              <div v-if="fileStore.isFotoDiriUploaded" class="flex flex-row items-center gap-1">
                <img src="/src/assets/success.svg" class="h-4" />
                <p class="text-xs text-neutral-600">Telah Dilengkapi</p>
              </div>
              <div v-else>
                <p class="text-xs text-neutral-600">Foto Diri Anda</p>
              </div>
            </div>
          </div>
          <div>
            <img v-if="fileStore.isFotoDiriUploaded" src="/src/assets/success.svg" alt="Download" class="h-6" />
            <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
          </div>
        </div>
        <div :class="[
          'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md relative',
          fileStore.isNpwpUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
        ]">
          <div class="flex items-center">
            <img src="/src/assets/npwp.svg" alt="NPWP" class="h-12 mr-4" />
            <div>
              <span class="text-sm font-medium text-neutral-900">NPWP (jika ada)</span>
              <div v-if="fileStore.isNpwpUploaded" class="flex flex-row items-center gap-1">
                <img src="/src/assets/success.svg" class="h-4" />
                <p class="text-xs text-neutral-600">{{ npwp }}</p>
              </div>
              <div v-else>
                <p class="text-xs text-neutral-600">Foto NPWP Anda</p>
              </div>
            </div>
          </div>
          <div>
            <img v-if="fileStore.isNpwpUploaded" src="/src/assets/success.svg" alt="Download" class="h-6" />
            <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
          </div>
        </div>
        <div :class="[
          'flex flex-row items-center justify-between p-4 border rounded-lg hover:shadow-md relative',
          fileStore.isTandaTanganUploaded ? 'bg-semantic/success-100 border-semantic/success-600' : 'border-primary-100',
        ]">
          <div class="flex items-center">
            <img src="/src/assets/tanda-tangan.svg" alt="Tanda Tangan" class="h-12 mr-4" />
            <div>
              <span class="text-sm font-medium text-neutral-900">Tanda Tangan</span>
              <!-- <p class="text-xs text-neutral-600">Foto Tanda Tangan Anda</p> -->
              <div v-if="fileStore.isTandaTanganUploaded" class="flex flex-row items-center gap-1">
                <img src="/src/assets/success.svg" class="h-4" />
                <p class="text-xs text-neutral-600">Telah Dilengkapi</p>
              </div>
              <div v-else>
                <p class="text-xs text-neutral-600">Foto Tanda Tangan Anda</p>
              </div>
            </div>
          </div>
          <div>
            <img v-if="fileStore.isTandaTanganUploaded" src="/src/assets/success.svg" alt="Download" class="h-6" />
            <img v-else src="/src/assets/upload-icon.svg" alt="Download" class="h-6" />
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data Pribadi
      </h1>
      <!-- <div v-if="formGabungan" class="form-container">
        <div class="form-item" v-for="(value, key) in formGabungan" :key="key">
          <div class="form-label">{{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div> -->

      <div class="form-container">
        <div class="form-item" v-if="formGabungan.namaPanggilan">
          <div class="form-label">Nama Alias/Panggilan</div>
          <strong class="form-value">{{ formGabungan.namaPanggilan }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Alamat Tempat Tinggal Terkini</div>
          <strong class="form-value">{{ formGabungan.alamat }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Tujuan Pembukaan Rekening</div>
          <strong class="form-value">{{ formGabungan.tujuan }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">RT/RW</div>
          <strong class="form-value">{{ formGabungan.rt }}/{{ formGabungan.rw }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Provinsi</div>
          <strong class="form-value">{{ formGabungan.provinsi }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Email</div>
          <strong class="form-value">{{ formGabungan.email }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kota/Kabupaten</div>
          <strong class="form-value">{{ formGabungan.kabupaten }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Nomor Fax</div>
          <strong class="form-value">{{ formGabungan.nomorFax }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kode Pos</div>
          <strong class="form-value">{{ formGabungan.kodePos }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Pendidikan Terakhir</div>
          <strong class="form-value">{{ formGabungan.pendidikanTerakhir }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Nomor Telepon</div>
          <strong class="form-value">{{ formGabungan.nomorTelepon }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Nomor Handphone</div>
          <strong class="form-value">0{{ formGabungan.phone }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Hobi</div>
          <strong class="form-value">{{ formGabungan.hobi }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Sumber Informasi Nasabah</div>
          <strong class="form-value">{{ formGabungan.sumber }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.korespondensi">
          <div class="form-label">Alamat Korespondensi Surat Menyurat</div>
          <strong class="form-value">{{ formPekerjaan.korespondensi }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Data Pekerjaan & Finansial
      </h1>
      <!-- <div v-if="formPekerjaan" class="form-container">
        <div class="form-item" v-for="(value, key) in formPekerjaan" :key="key">
          <div class="form-label"> {{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div> -->
      <div class="form-container">
        <div class="form-item" v-if="formPekerjaan.pekerjaan">
          <div class="form-label">Pekerjaan</div>
          <strong class="form-value">{{ formPekerjaan.pekerjaan }}</strong>
        </div>

        <div class="form-item" v-if="formPekerjaan.pekerjaanLainnya">
          <div class="form-label">Pekerjaan Lainnya</div>
          <strong class="form-value">{{ formPekerjaan.pekerjaanLainnya }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.alamatDK">
          <div class="form-label">Alamat Perusahaan/Instansi</div>
          <strong class="form-value">{{ formPekerjaan.alamatDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.namaPerusahaanDK">
          <div class="form-label">Nama Perusahaan/Instansi</div>
          <strong class="form-value">{{ formPekerjaan.namaPerusahaanDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.lamaBekerjaTahunDK">
          <div class="form-label">Lama Bekerja (Tahun)</div>
          <strong class="form-value">{{ formPekerjaan.lamaBekerjaTahunDK }} Tahun</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.bidangPekerjaanDK">
          <div class="form-label">Bidang Pekerjaan/Usaha</div>
          <strong class="form-value">{{ formPekerjaan.bidangPekerjaanDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.lamaBekerjaBulanDK">
          <div class="form-label">Lama Bekerja (Bulan)</div>
          <strong class="form-value">{{ formPekerjaan.lamaBekerjaBulanDK }} Bulan</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.jabatanDK">
          <div class="form-label">Jabatan/Posisi Pekerjaan</div>
          <strong class="form-value">{{ formPekerjaan.jabatanDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.nomorTeleponKantorDK">
          <div class="form-label">Nomor Telepon Kantor</div>
          <strong class="form-value">{{ formPekerjaan.nomorTeleponKantorDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.kotaPerusahaanDK">
          <div class="form-label">Kota Perusahaan</div>
          <strong class="form-value">{{ formPekerjaan.kotaPerusahaanDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.kodePosPerusahaanDK">
          <div class="form-label">Kode Pos Perusahaan</div>
          <strong class="form-value">{{ formPekerjaan.kodePosPerusahaanDK }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.tujuan">
          <div class="form-label">Tujuan Pembukaan Rekening</div>
          <strong class="form-value">{{ formPribadi.tujuan }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.nomorTeleponFaxDK">
          <div class="form-label">Nomor Fax Kantor</div>
          <strong class="form-value">{{ formPekerjaan.nomorTeleponFaxDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.penghasilan">
          <div class="form-label">Sumber Dana</div>
          <strong class="form-value">{{ formPekerjaan.penghasilan }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.jumlahPenghasilan">
          <div class="form-label">Penghasilan Perbulan</div>
          <strong class="form-value">{{ formPekerjaan.jumlahPenghasilan }}</strong>
        </div>
      </div>
    </div>

    <div class="py-4" v-if="hasBeneficialOwner">
      <div class="border-t border-neutral-200 my-4"></div>
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Pemilik Manfaat
      </h1>
      <!-- <div v-if="formBeneficialOwner" class="form-container">
        <div class="form-item" v-for="(value, key) in formBeneficialOwner" :key="key">
          <div class="form-label"> {{ formatLabel(key) }}:</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div> -->
      <div class="form-container">
        <div class="form-item" v-if="formBeneficialOwner.hubunganNasabahBO">
          <div class="form-label">Hubungan dengan Nasabah</div>
          <strong class="form-value">{{ formBeneficialOwner.hubunganNasabahBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.alamatBO">
          <div class="form-label">Alamat</div>
          <strong class="form-value">{{ formBeneficialOwner.alamatBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.namaLengkapBO">
          <div class="form-label">Nama Lengkap</div>
          <strong class="form-value">{{ formBeneficialOwner.namaLengkapBO }}</strong>
        </div>

        <div class="form-item" v-if="formBeneficialOwner.rtBO">
          <div class="form-label">RT/RW</div>
          <strong class="form-value">{{ formBeneficialOwner.rtBO }}/{{ formBeneficialOwner.rwBO }}</strong>
        </div>
        <!-- <div class="form-item" v-if="formBeneficialOwner.jenisIdentitasBO">
          <div class="form-label">Jenis Identitas</div>
          <strong class="form-value">{{ formBeneficialOwner.jenisIdentitasBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.jenisIdentitasLainnyaBO">
          <div class="form-label">Jenis Identitas Lainnya</div>
          <strong class="form-value">{{ formBeneficialOwner.jenisIdentitasLainnyaBO }}</strong>
        </div> -->
        <div class="form-item" v-if="formBeneficialOwner.nomorDokumenIdentitasBO">
          <div class="form-label">Nomor Dokumentasi Identitas</div>
          <strong class="form-value">{{ formBeneficialOwner.nomorDokumenIdentitasBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.provinsiBO">
          <div class="form-label">Provinsi</div>
          <strong class="form-value">{{ formBeneficialOwner.provinsiBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.tempatLahirBO">
          <div class="form-label">Tempat Lahir dan tanggal lahir</div>
          <strong class="form-value">{{ formBeneficialOwner.tempatLahirBO }} {{ formBeneficialOwner.tanggalLahirBO
          }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.kabupatenBO">
          <div class="form-label">Kota/Kabupaten</div>
          <strong class="form-value">{{ formBeneficialOwner.kabupatenBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.kewarganegaraanBO">
          <div class="form-label">Kewarganegaraan</div>
          <strong class="form-value">{{ formBeneficialOwner.kewarganegaraanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.kelurahanBO">
          <div class="form-label">Desa/Kelurahan</div>
          <strong class="form-value">{{ formBeneficialOwner.kelurahanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.pekerjaanBO">
          <div class="form-label">Pekerjaan</div>
          <strong class="form-value">{{ formBeneficialOwner.pekerjaanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.kodePosBO">
          <div class="form-label">Kode Pos</div>
          <strong class="form-value">{{ formBeneficialOwner.kodePosBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.jenisKelaminBO">
          <div class="form-label">Jenis Kelamin</div>
          <strong class="form-value">{{ formBeneficialOwner.jenisKelaminBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.statusPerkawinanBO">
          <div class="form-label">Status Perkawinan</div>
          <strong class="form-value">{{ formBeneficialOwner.statusPerkawinanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.jumlahPenghasilanBO">
          <div class="form-label">Penghasilan Perbulan</div>
          <strong class="form-value">{{ formBeneficialOwner.jumlahPenghasilanBO }}</strong>
        </div>
        <!-- <div class="form-item" v-if="formBeneficialOwner.kecamatanBO">
          <div class="form-label">Kecamatan</div>
          <strong class="form-value">{{ formBeneficialOwner.kecamatanBO }}</strong>
        </div> -->
        <!-- <div class="form-item" v-if="formBeneficialOwner.hubunganNasabahLainnyaBO">
          <div class="form-label">Hubungan Nasabah Lainnya</div>
          <strong class="form-value">{{ formBeneficialOwner.hubunganNasabahLainnyaBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.pekerjaanLainnyaBO">
          <div class="form-label">Pekerjaan Lainnya</div>
          <strong class="form-value">{{ formBeneficialOwner.pekerjaanLainnyaBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.namaPerusahaanBO">
          <div class="form-label">Nama Perusahaan</div>
          <strong class="form-value">{{ formBeneficialOwner.namaPerusahaanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.alamatPerusahaanBO">
          <div class="form-label">Alamat Perusahaan</div>
          <strong class="form-value">{{ formBeneficialOwner.alamatPerusahaanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.jabatanBO">
          <div class="form-label">Jabatan</div>
          <strong class="form-value">{{ formBeneficialOwner.jabatanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.jabatanLainnyaBO">
          <div class="form-label">Jabatan Lainnya</div>
          <strong class="form-value">{{ formBeneficialOwner.jabatanLainnyaBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.lamaBekerjaTahunBO">
          <div class="form-label">Lama Bekerja (Tahun)</div>
          <strong class="form-value">{{ formBeneficialOwner.lamaBekerjaTahunBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.lamaBekerjaBulanBO">
          <div class="form-label">Lama Bekerja (Bulan)</div>
          <strong class="form-value">{{ formBeneficialOwner.lamaBekerjaBulanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.penghasilanBO">
          <div class="form-label">Penghasilan BO</div>
          <strong class="form-value">{{ formBeneficialOwner.penghasilanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.jumlahPenghasilanBO">
          <div class="form-label">Penghasilan Perbulan BO</div>
          <strong class="form-value">{{ formBeneficialOwner.jumlahPenghasilanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.penghasilanLainnyaBO">
          <div class="form-label">Penghasilan Lainnya BO</div>
          <strong class="form-value">{{ formBeneficialOwner.penghasilanLainnyaBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.kotaPerusahaanBO">
          <div class="form-label">Kota Perusahaan</div>
          <strong class="form-value">{{ formBeneficialOwner.kotaPerusahaanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.kodePosPerusahaanBO">
          <div class="form-label">Kode Pos Perusahaan</div>
          <strong class="form-value">{{ formBeneficialOwner.kodePosPerusahaanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.kodePosPerushaanBO">
          <div class="form-label">Kode Pos Perusahaan</div>
          <strong class="form-value">{{ formBeneficialOwner.kodePosPerushaanBO }}</strong>
        </div>
        <div class="form-item" v-if="formBeneficialOwner.pernyataanChecked">
          <div class="form-label">Pernyataan</div>
          <strong class="form-value">{{ formBeneficialOwner.pernyataanChecked }}</strong>
        </div> -->
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Produk yang Diinginkan
      </h1>
      <div class="form-container">
        <div class="form-item" v-if="formGabungan.produk">
          <div class="form-label">Produk yang Diinginkan:</div>
          <strong class="form-value">{{ formGabungan.produk }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.produkDeposito">
          <div class=" form-label">Produk Deposito</div>
          <strong class="form-value">{{ formPenempatanDeposito.produkDeposito }}</strong>
        </div>
        <!-- <div class="form-item" v-if="formPenempatanDeposito.produkDeposito">
          <div class=" form-label">Produk Deposito</div>
          <strong class="form-value">{{ formPenempatanDeposito.produkDeposito }}</strong>
        </div> -->
        <div class="form-item" v-if="formPribadi.kantorCabang">
          <div class="form-label">Jaringan Kantor</div>
          <strong class="form-value">{{ formPribadi.kantorCabang }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.alamatKantorCabang">
          <div class="form-label">Alamat Jaringan Kantor</div>
          <strong class="form-value">{{ formPribadi.alamatKantorCabang }}</strong>
        </div>
        <div class="form-item" v-if="formGabungan.namaFundingOfficer">
          <div class="form-label">Nama Funding Officer</div>
          <strong class="form-value">{{ formGabungan.namaFundingOfficer }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Instruksi Pembukaan Deposito
      </h1>
      <div v-if="formPenempatanDeposito" class="form-container">
        <!-- <div class="form-item" v-for="(value, key) in formPenempatanDeposito" :key="key">
          <div class="form-label"> {{ formatLabel(key) }}</div>
          <strong class="form-value">{{ value }}</strong>
        </div> -->
        <div class="form-item" v-if="formPenempatanDeposito.nominal">
          <div class=" form-label">Nominal Deposito</div>
          <strong class="form-value">{{ formPenempatanDeposito.nominal }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.terbilang">
          <div class=" form-label">Terbilang</div>
          <strong class="form-value">{{ formPenempatanDeposito.terbilang }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.metodePencairan">
          <div class=" form-label">Saat Jatuh Tempo Nominal</div>
          <strong class="form-value">{{ formPenempatanDeposito.metodePencairan }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.jangkaWaktu">
          <div class=" form-label">Jangka Waktu & Suku Bunga</div>
          <strong class="form-value">{{ formPenempatanDeposito.jangkaWaktu }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.nomorRekeningPenyetoran">
          <div class=" form-label">Nomor Rekening Penyetoran Deposito</div>
          <strong class="form-value">{{ formPenempatanDeposito.nomorRekeningPenyetoran }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.nomorRekeningPemilik">
          <div class=" form-label">Nomor Rekening Pembayaran Bunga</div>
          <strong class="form-value">{{ formPenempatanDeposito.nomorRekeningPemilik }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.nomorRekening">
          <div class=" form-label">Nomor Rekening Pembayaran Bunga</div>
          <strong class="form-value">{{ formPenempatanDeposito.nomorRekening }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.namaRekeningPenyetoran">
          <div class=" form-label">Nama Pemilik Rekening Penyetoran Deposito</div>
          <strong class="form-value">{{ formPenempatanDeposito.namaRekeningPenyetoran }}</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.namaLengkap">
          <div class=" form-label">Nama Pemilik Rekening Pembayaran Bunga</div>
          <strong class="form-value">{{ formPenempatanDeposito.namaLengkap }}</strong>
        </div>
        <div class="form-item">
          <div class=" form-label">Nama Bank</div>
          <strong class="form-value">Universal BPR</strong>
        </div>
        <div class="form-item" v-if="formPenempatanDeposito.namaBank">
          <div class=" form-label">Nama Bank</div>
          <strong class="form-value">{{ formPenempatanDeposito.namaBank }}</strong>
        </div>
      </div>
    </div>


    <div class="form-item" v-if="formPenempatanDeposito.pembayaranBunga">
      <div class=" form-label">Metode Pembayaran Bunga</div>
      <strong class="form-value">{{ formPenempatanDeposito.pembayaranBunga }}</strong>
    </div>

    <!-- <div class="mr-2 mb-4" v-if="formPenempatanDeposito.pembayaranBunga == 3">
      <CustomCheckbox :readonly="true" v-model="formPenempatanDeposito.isChecked" labelText="Saya setuju bahwa pembayaran bunga deposito akan dipindahbukukan ke Rekening Tabungan Universal atas nama saya
          sendiri, yang akan dibuat oleh Petugas Bank dengan nomor rekening yang akan diinformasikan melalui email resmi PT
          BPR Universal: notifikasi@universalbpr.co.id" />
    </div>

    <div class="mr-2 mb-4" v-if="formPenempatanDeposito.pembayaranBunga == 4">
      <CustomCheckbox :readonly="true" v-model="formPenempatanDeposito.isChecked" labelText="4" />
    </div> -->

    <div v-if="formPenempatanDeposito.isChecked === true" class="mr-2 mb-4">
      <CustomCheckbox :readonly="true" v-model="formPenempatanDeposito.isChecked" labelText="Saya setuju bahwa pembayaran bunga deposito akan dipindahbukukan ke Rekening Tabungan Universal atas nama saya
          sendiri, yang akan dibuat oleh Petugas Bank dengan nomor rekening yang akan diinformasikan melalui email resmi PT
          BPR Universal: notifikasi@universalbpr.co.id" />
    </div>
    <div v-if="formPenempatanDeposito.setujuBiayaTransfer === true" class="mr-2 mb-4">
      <CustomCheckbox :readonly="true" v-model="formPenempatanDeposito.setujuBiayaTransfer" labelText="Saya menyetujui pemotongan biaya administrasi transfer pembayaran bunga deposito ke Rekening Bank Lain,
          sesuai dengan ketentuan PT BPR Universal." />
    </div>

    <div class="form-item" v-if="formPenempatanDeposito.metodePenyetoran">
      <div class=" form-label">Cara Penyetoran</div>
      <strong class="form-value">{{ formPenempatanDeposito.metodePenyetoran }}</strong>
    </div>

    <div class="mr-2 mb-6">
      <CustomCheckbox :readonly="true" v-model="formPenempatanDeposito.setujuPenyetoran"
        labelText="Saya Setuju bahwa penyetoran untuk pembukaan deposito akan dilakukan pendebetan melalui rekening Tabungan Universal atas nama saya sendiri yang akan dibuat oleh Petugas Bank dan diinformasikan kepada saya melalui email resmi PT BPR Universal: notifikasi@universalbpr.co.id." />
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Kontak Darurat
      </h1>
      <div v-if="formKontakDarurat" class="form-container">
        <div class="form-item" v-for="(value, key) in formKontakDarurat" :key="key">
          <div class="form-label"> {{ formatLabel(key) }}</div>
          <strong class="form-value">{{ value }}</strong>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-200 my-4"></div>

    <div class="py-4">
      <h1 class="text-base sm:text-base md:text-xl font-semibold text-primary text-left mb-4">
        Pernyataan dan Persetujuan Nasabah
      </h1>
      <div class="space-y-3 text-neutral-900 text-sm">
        <p>
          Dengan ini, saya/kami menyatakan bahwa:
        </p>
        <ul class="list-decimal list-outside ml-4 text-neutral-900 space-y-2">
          <li>Data Nasabah yang diisikan dalam Formulir Pembukaan Rekening baru pada PT BPR Universal (selanjutnya
            disebut "Bank") ini adalah data yang sebenar-benarnya.</li>
          <li>Bank dapat melakukan pemeriksaan terhadap kebenaran data yang kami berikan dalam formulir Data Nasabah
            ini.</li>
          <li>Bank telah memberikan penjelasan yang cukup mengenai karakteristik Produk Bank yang akan saya/kami
            manfaatkan dan saya telah mengerti serta memahami segala konsekuensi pemanfaatan Produk Bank, termasuk
            manfaat, risiko, dan biaya-biaya yang melekat pada produk Bank tersebut.</li>
          <li>Saya/kami telah menerima, membaca, mengerti, dan menyetujui isi Ketentuan Umum dan Persyaratan Pembukaan
            Rekening baru. Untuk itu dengan ini saya/kami menyatakan tunduk dan terikat dengan ketentuan-ketentuan
            tersebut, serta ketentuan lain terkait produk/fasilitas yang saya/kami pilih yang berlaku di Bank beserta
            segala bentuk perubahannya yang akan diberitahukan dengan sarana yang ditetapkan Bank.</li>
          <li>Saya/kami memberi hak dan wewenang kepada Bank untuk melakukan pemblokiran dan atau penutupan rekening,
            apabila menurut pertimbangan Bank :
            <ul class="list-disc list-outside ml-4 mt-2 space-y-1">
              <li>Saya/kami tidak mematuhi ketentuan Prinsip Mengenal Nasabah <span class="italic">(Knowing Your
                  Customer)</span>.</li>
              <li>Data yang saya/kami berikan kepada Bank tidak benar atau diragukan kebenarannya.</li>
              <li>Saya/kami menyalahgunakan rekening.</li>
            </ul>
          </li>
          <li>Bahwa berkaitan dengan pemenuhan NPWP untuk pembukaan rekening,
            <p class="mt-2"><b>Saat ini saya/kami (Pilih Salah Satu)</b></p>
            <RadioButtonChoose class="text-xs sm:text-sm md:text-sm cursor-not-allowed" label="" id="npwpChoice1"
              :options="npwpOptions" :readonly="true" v-model="formNPWP.npwp" name="npwpSelection" required />
            <div class=" ml-4">
              <Flagbox :type="info" class="mt-4 !font-normal">
                Apabila di kemudian hari Pemberi Pernyataan telah memiliki NPWP/sesuai dengan ketentuan peraturan
                perundang-undangan di bidang perpajakan diwajibkan mendaftarkan diri pada Kantor Direktorat Jenderal
                Pajak, maka saya/kami akan segera menyerahkan NPWP kepada Universal BPR. (Tidak berlaku bagi nasabah
                yang
                telah menyerahkan dokumen NPWP).
              </Flagbox>
              <RadioButtonChoose class="text-xs sm:text-sm md:text-sm cursor-not-allowed" label="" id="npwpChoice2"
                :options="npwp2Options" :readonly="true" v-model="formNPWP.npwp2" name="npwpSelection" required />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Checkbox Persetujuan -->
    <!-- <div class="flex items-center">
      <input type="checkbox" id="agreement1" v-model="agreement1" class="mr-2 cursor-pointer" />
      <label for="agreement1" class="text-sm text-neutral-900 cursor-pointer">
        Saya setuju dengan pernyataan dan persetujuan di atas
      </label>
    </div>

    <div class="flex items-center mt-2">
      <input type="checkbox" id="agreement2" v-model="agreement2" class="mr-2 cursor-pointer items-baseline" />
      <label for="agreement2" class="text-sm text-neutral-900 cursor-pointer">
        Nasabah bersedia mendapatkan informasi tambahan melalui email,SMS, Whatsapp, dan lainnya*
      </label>
    </div> -->

    <div class="">
      <CustomCheckbox v-model="agreement1" labelText="Saya telah menyetujui pernyataan dan persetujuan di atas" />
    </div>

    <div class="mt-2">
      <CustomCheckbox v-model="agreement2"
        labelText="Nasabah bersedia mendapatkan informasi tambahan melalui email,SMS, Whatsapp, dan lainnya*" />
    </div>


    <div class="flex justify-between mt-6">
      <ButtonComponent variant="outline" @click="goBack">Kembali</ButtonComponent>
      <ButtonComponent type="button" :disabled="isSubmitting || isButtonDisabled" @click="handleSubmit">
        {{ isSubmitting ? "Mengirim..." : "Simpan" }}
      </ButtonComponent>
    </div>
  </div>
  <ModalKonfirmasi :isOpen="isModalOpen" @close="closeModalKonfirmasi" @yes="handleKonfirmasi" />
  <!-- <ModalOTP :isOpen="isModalOTPOpen" @close="isModalOTPOpen = false" @otp-method-selected="handleOTPMethodSelected"
    :icon="'nama-icon.svg'" :features="features" :no_hp="no_hp" /> -->
</template>s

<script>
import { computed } from 'vue';
import Flagbox from '@/components/flagbox.vue';
import api from "@/API/api";
import RadioButtonChoose from "@/components/RadioButton.vue";
import { useFileStore } from "@/stores/filestore";
import ButtonComponent from "@/components/button.vue";
import { alamatSesuaiEktpOptions, trueFalseOptions } from "@/data/option";
import { FormModelKonfirmasiData } from "@/models/formModel";
// import ModalOTP from "@/components/ModalOTP.vue";
import ModalKonfirmasi from "@/components/ModalKonfirmasi.vue";
import { kewarganegaraanOptions, metodePencairanOptions, pendidikanOptions, tujuanOptions, hobiOptions, agamaOptions, statusPerkawinanOptions, penghasilanOptions, jumlahPenghasilanOptions, bidangPekerjaanDKOptions, korespondensiOptions, jangkaWaktuDepositoDEBUTMatiusOptions, jangkaWaktuDepositoDEBUTSanmereOptions, jangkaWaktuDepositoGreenOptions, jangkaWaktuDepositoPeduliOptions, jangkaWaktuDepositoUniversalOptions, pembayaranBungaOptions, metodePenyetoranNTBOptions, produkDepositoOptions, hubunganNasabahOptions, jenisIdentitasBOOptions, kewarganegaraanBOOptions, jenisKelaminOptions, persetujuanOptions, produkOptions, sumberDataNasabahOptions, masaAktifKTPOptions, npwpOptions, npwp2Options } from '@/data/option.js';
import { fetchBidangPekerjaan, fetchBranches, fetchJabatanKonfirmasi, fetchPekerjaan } from '@/services/service.js';
import CustomCheckbox from '@/components/CustomCheckbox.vue';

import ektpIcon from "@/assets/ektp.svg";
import npwpIcon from "@/assets/npwp.svg";
import livenessIcon from "@/assets/liveness.svg";
import tandaTanganIcon from "@/assets/tanda-tangan.svg";
import defaultIcon from "@/assets/default.svg";




export default {
  emits: ['updateProgress'],
  components: {
    ButtonComponent,
    RadioButtonChoose,
    // ModalOTP,
    ModalKonfirmasi,
    CustomCheckbox,
    Flagbox
  },
  name: "DataPribadi",
  computed: {
    isButtonDisabled() {
      return !this.agreement1 || !this.agreement2;
    },
    hasBeneficialOwner() {
      return this.formBeneficialOwner && Object.keys(this.formBeneficialOwner).length > 0;
    },
    formKTP() {
      const fileStore = useFileStore();
      const data = fileStore.formKTP || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key];
          if (key === "jenisKelamin") {
            value = this.getLabelFromOptions(value, [
              { value: true, label: "Laki-laki" },
              { value: false, label: "Perempuan" },
            ]);
          }
          if (value === null || value === undefined || value === "") {
            continue; // Lewati iterasi ini jika value tidak ada
          }
          if (key === "kewarganegaraan") {
            value = this.getLabelFromOptions(value, kewarganegaraanOptions);
          }
          if (key === "masaAktifKtp") {
            value = this.getLabelFromOptions(value, masaAktifKTPOptions);
          }
          if (key === "agama") {
            value = this.getLabelFromOptions(value, agamaOptions);
          }
          if (key === "statusPerkawinan") {
            value = this.getLabelFromOptions(value, statusPerkawinanOptions);
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },
    // formPenempatanDeposito() {
    //   const fileStore = useFileStore();
    //   return Object.fromEntries(
    //     Object.entries(fileStore.formPenempatanDeposito || {}).filter(([_, value]) => value)
    //   );
    // },
    formPribadi() {
      const fileStore = useFileStore();
      const data = fileStore.formPribadi || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];
          if (key === "produk") {
            value = this.getLabelFromOptions(value, produkOptions);
          } else if (key === "tujuan") {
            value = this.getLabelFromOptions(value, tujuanOptions);
          }
          if (key === "kantorCabang") {
            if (this.kantorCabangOptions) {
              const selectedBranch = this.kantorCabangOptions.find(
                (option) => option.value === value
              );
              value = selectedBranch ? selectedBranch.label : value;
            }
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },

    formGabungan() {
      const fileStore = useFileStore();
      const pribadiData = fileStore.formPribadi || {};
      const emailData = fileStore.formEmailRequestDepositoNTB || {};

      const gabunganData = {
        ...pribadiData,
        ...emailData,
      };

      const processedData = {};

      for (const key in gabunganData) {
        if (gabunganData.hasOwnProperty(key)) {
          let value = gabunganData[key];
          if (key === "pendidikanTerakhir") {
            value = this.getLabelFromOptions(value, pendidikanOptions);
          } else if (key === "tujuan") {
            value = this.getLabelFromOptions(value, tujuanOptions);
          } else if (key === "hobi") {
            value = this.getLabelFromOptions(value, hobiOptions);
          } else if (key === "produk") {
            value = this.getLabelFromOptions(value, produkOptions);
          } else if (key === "produkDeposito") {
            value = this.getLabelFromOptions(value, produkDepositoOptions);
          } else if (key === "sumber") {
            value = this.getLabelFromOptions(value, sumberDataNasabahOptions);
          } else if (key === "alamatSesuaiEktp") {
            value = this.getLabelFromOptions(value, trueFalseOptions);
          } else if (key === "kantorCabang") {
            if (this.kantorCabangOptions) {
              const selectedBranch = this.kantorCabangOptions.find(
                (option) => option.value === value
              );
              value = selectedBranch ? selectedBranch.label : value;
            }
          }
          if (value === null || value === undefined || value === '') {
            value = "-";
          }

          processedData[key] = value;
        }
      }
      return processedData;
    },

    formPekerjaan() {
      const fileStore = useFileStore();
      const data = fileStore.formPekerjaan || {};
      const processedData = {};
      for (const key in data) {
        if (key === 'npwp') {
          continue; // Lewati iterasi ini jika key adalah 'npwp'
        }
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (!key.endsWith("KD") && !key.endsWith("BO")) {
            if (key === "pernyataanChecked") {
              value = this.getLabelFromOptions(value, persetujuanOptions);
            }
            if (key === "penghasilan") {
              value = this.getLabelFromOptions(value, penghasilanOptions);
            }
            if (key === "jumlahPenghasilan") {
              value = this.getLabelFromOptions(value, jumlahPenghasilanOptions);
            }
            if (key === "bidangPekerjaanDK") {
              value = this.getLabelFromOptions(value, bidangPekerjaanDKOptions);
            }
            if (key === "korespondensi") {
              value = this.getLabelFromOptions(value, korespondensiOptions);
            }
            if (key === "pekerjaan") {
              if (this.pekerjaanOptions && this.pekerjaanOptions.length > 0) {
                const selectedPekerjaan = this.pekerjaanOptions.find(
                  (option) => option.value === value
                );
                value = selectedPekerjaan ? selectedPekerjaan.label : value;
              } else {
                console.warn("");
              }
            }
            if (key === "jabatanDK") {
              if (this.jabatanOptions && this.jabatanOptions.length > 0) {
                const selectedJabatan = this.jabatanOptions.find(
                  (option) => option.value === value
                );
                value = selectedJabatan ? selectedJabatan.label : value;
              } else {
                console.warn("");
              }
            }

            if (key === "bidangPekerjaanDK") {
              if (this.bidangPekerjaanOptions && this.bidangPekerjaanOptions.length > 0) {
                const selectedBidangPekerjaan = this.bidangPekerjaanOptions.find(
                  (option) => option.value === value
                );
                value = selectedBidangPekerjaan ? selectedBidangPekerjaan.label : value;
              } else {
                console.warn("");
              }
            }
            processedData[key] = value;
          }
        }
      }
      return processedData;
    },

    formPenempatanDeposito() {
      const fileStore = useFileStore();
      const data = fileStore.formPenempatanDeposito || {};
      const processedData = {};
      for (const key in data) {
        //         if (key === 'isChecked') {
        //   continue; // Lewati iterasi ini jika key adalah 'npwp'
        // }
        //         if (key === 'setujuPenyetoran') {
        //   continue; // Lewati iterasi ini jika key adalah 'npwp'
        // }
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (key === "nominal") {
            value = this.formatCurrency(value); // Format nominal di sini
          }

          if (key === "metodePencairan") {
            value = this.getLabelFromOptions(value, metodePencairanOptions);
          }
          if (key === "jangkaWaktu") {
            value = this.getLabelFromOptions(value, jangkaWaktuDepositoUniversalOptions);
            value = this.getLabelFromOptions(value, jangkaWaktuDepositoGreenOptions);
            value = this.getLabelFromOptions(value, jangkaWaktuDepositoDEBUTSanmereOptions);
            value = this.getLabelFromOptions(value, jangkaWaktuDepositoDEBUTMatiusOptions);
            value = this.getLabelFromOptions(value, jangkaWaktuDepositoPeduliOptions);
          }
          if (key === "pembayaranBunga") {
            value = this.getLabelFromOptions(value, pembayaranBungaOptions);
          }
          if (key === "metodePenyetoran") {
            value = this.getLabelFromOptions(value, metodePenyetoranNTBOptions);
          }
          if (key === "produkDeposito") {
            value = this.getLabelFromOptions(value, produkDepositoOptions);
          }
          if (key === "kantorCabang") {
            if (this.kantorCabangOptions) {
              const selectedBranch = this.kantorCabangOptions.find(
                (option) => option.value === value
              );
              value = selectedBranch ? selectedBranch.label : value;
            }
          }
          processedData[key] = value;
        }
      }
      return processedData;
    },


    formKontakDarurat() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.formPekerjaan || {})
          .filter(([key, value]) => value && key.endsWith('KD'))
      );
    },

    formNPWP() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.formNPWP || {})
      );
    },

    formBeneficialOwner() {
      const fileStore = useFileStore();
      const data = fileStore.formPekerjaan || {};
      const processedData = {};

      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] && key.endsWith('BO')) {
          let value = data[key];

          if (key === "hubunganNasabahBO") {
            value = this.getLabelFromOptions(value, hubunganNasabahOptions);
          }
          if (key === "kewarganegaraanBO") {
            value = this.getLabelFromOptions(value, kewarganegaraanBOOptions);
          }
          if (key === "jenisIdentitasBO") {
            value = this.getLabelFromOptions(value, jenisIdentitasBOOptions);
          }
          if (key === "jenisKelaminBO") {
            value = this.getLabelFromOptions(value, jenisKelaminOptions);
          }
          if (key === "statusPerkawinanBO") {
            value = this.getLabelFromOptions(value, statusPerkawinanOptions);
          }
          if (key === "penghasilanBO") {
            value = this.getLabelFromOptions(value, penghasilanOptions);
          }
          if (key === "jumlahPenghasilanBO") {
            value = this.getLabelFromOptions(value, jumlahPenghasilanOptions);
          }
          if (key === "pekerjaanBO") {
            if (this.pekerjaanOptions && this.pekerjaanOptions.length > 0) {
              const selectedPekerjaan = this.pekerjaanOptions.find(
                (option) => option.value === value
              );
              value = selectedPekerjaan ? selectedPekerjaan.label : value;
            } else {
              console.warn("");
            }
          }
          if (key === "jabatanBO") {
            if (this.jabatanOptions && this.jabatanOptions.length > 0) {
              const selectedJabatan = this.jabatanOptions.find(
                (option) => option.value === value
              );
              value = selectedJabatan ? selectedJabatan.label : value;
            } else {
              console.warn("");
            }
          }

          if (key === "bidangPekerjaanBO") {
            if (this.bidangPekerjaanOptions && this.bidangPekerjaanOptions.length > 0) {
              const selectedBidangPekerjaan = this.bidangPekerjaanOptions.find(
                (option) => option.value === value
              );
              value = selectedBidangPekerjaan ? selectedBidangPekerjaan.label : value;
            } else {
              console.warn("");
            }
          }
          processedData[key] = value;
        }
      }

      return processedData;
    },
    // formPekerjaan() {
    //   const fileStore = useFileStore();

    //   return Object.fromEntries(
    //     Object.entries(fileStore.formPekerjaan || {})
    //       .filter(([_, value]) => value) // Hanya menyertakan data yang tidak kosong
    //       .map(([key, value]) => {
    //         if (key === "pekerjaan") return [key, getLabel(value, pekerjaanOptions)];
    //         if (key === "penghasilan") return [key, getLabel(value, penghasilanOptions)];
    //         return [key, value];
    //       })
    //   );
    // },
    uploadedFiles() {
      const fileStore = useFileStore();
      return Object.fromEntries(
        Object.entries(fileStore.uploadedFiles || {}).filter(([_, value]) => value)
      );
    },
  },
  setup() {
    const fileStore = useFileStore();
    const no_hp = computed(() => fileStore.no_hp || "user@example.com");
    const nik = computed(() => fileStore.nik || "123123123");
    const npwp = computed(() => fileStore.no_npwp || "Telah Dilengkapi");
    return { fileStore, nik, no_hp, npwp }
  },

  data() {
    return {
      form: new FormModelKonfirmasiData(),
      trueFalseOptions,
      npwp2Options,
      npwpOptions,
      RadioButtonChoose,
      masaAktifKTPOptions,
      isCheckedCondition3: true,
      isCheckedCondition4: true,
      agreement1: false,
      agreement2: false,
      isSubmitting: false,
      // isModalOTPOpen: false,
      isModalOpen: false,
      kantorCabangOptions: [],
      jabatanOptions: [],
      pekerjaanOptions: [],
      bidangPekerjaanOptions: [],
      kantorCabangAlamat: {},
      features: [
        {
          label: 'Pilih Metode Konfirmasi OTP',
          description: 'Kode OTP akan dikirimkan melalui metode yang Anda pilih',
          label1: 'WhatsApp',
          icon1: new URL('@/assets/whatsapp-icon.svg', import.meta.url).href,
          method1: 'whatsapp',
          label2: 'SMS',
          icon2: new URL('@/assets/sms-icon.svg', import.meta.url).href,
          method2: 'sms'
        },
      ],
    };
  },

  methods: {
    async fetchBranches() {
      try {
        const { kantorCabangOptions, kantorCabangAlamat } = await fetchBranches();
        this.kantorCabangOptions = kantorCabangOptions;
        this.kantorCabangAlamat = kantorCabangAlamat;
      } catch (error) {
        console.error("Gagal mengambil data kantor cabang:", error);
      }
    },
    async fetchPekerjaan() {
      try {
        const pekerjaanOptions = await fetchPekerjaan();
        this.pekerjaanOptions = pekerjaanOptions;
      } catch (error) {
        console.error("Gagal mengambil data Jabatan:", error);
      }
    },
    async fetchJabatanKonfirmasi(kodePekerjaan) {
      try {
        const jabatanOptions = await fetchJabatanKonfirmasi(kodePekerjaan);
        this.jabatanOptions = jabatanOptions;
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
    formPekerjaan() {
      const fileStore = useFileStore();
      const data = fileStore.formPekerjaan || {};
      const processedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          let value = data[key];

          if (!key.endsWith("KD") && !key.endsWith("BO")) {
            if (key === "pernyataanChecked") {
              value = this.getLabelFromOptions(value, persetujuanOptions);
            }
            if (key === "penghasilan") {
              value = this.getLabelFromOptions(value, penghasilanOptions);
            }
            if (key === "jumlahPenghasilan") {
              value = this.getLabelFromOptions(value, jumlahPenghasilanOptions);
            }
            if (key === "bidangPekerjaanDK") {
              value = this.getLabelFromOptions(value, bidangPekerjaanDKOptions);
            }
            if (key === "korespondensi") {
              value = this.getLabelFromOptions(value, korespondensiOptions);
            }
            if (key === "pekerjaan") {
              if (this.pekerjaanOptions && this.pekerjaanOptions.length > 0) {
                const selectedPekerjaan = this.pekerjaanOptions.find(
                  (option) => option.value === value
                );
                value = selectedPekerjaan ? selectedPekerjaan.label : value;
              } else {
                console.warn("");
              }
            }
            if (key === "jabatanDK") {
              if (this.jabatanOptions && this.jabatanOptions.length > 0) {
                const selectedJabatan = this.jabatanOptions.find(
                  (option) => option.value === value
                );
                value = selectedJabatan ? selectedJabatan.label : value;
              } else {
                console.warn("");
              }
            }

            if (key === "bidangPekerjaanDK") {
              if (this.bidangPekerjaanOptions && this.bidangPekerjaanOptions.length > 0) {
                const selectedBidangPekerjaan = this.bidangPekerjaanOptions.find(
                  (option) => option.value === value
                );
                value = selectedBidangPekerjaan ? selectedBidangPekerjaan.label : value;
              } else {
                console.warn("");
              }
            }
            processedData[key] = value;
          }
        }
      }
      return processedData;
    },
    formatCurrency(amount) {
      if (typeof amount !== 'number') return amount;

      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(amount);
    },
    getLabelFromOptions(value, options) {
      if (!options || options.length === 0) return value;

      const found = options.find((option) => option.value === value);
      return found ? found.label : value;
    },
    goBack() {
      this.$router.push({ path: "/dashboard/dataPekerjaanPenempatanDepositoNTB" });
    },
    formatLabel(key) {
      const labels = {
        nik: "NIK",
        namaLengkap: "Nama Lengkap",
        tanggalLahir: "Tanggal Lahir",
        tempatLahir: "Tempat Lahir",
        jenisKelamin: "Jenis Kelamin",
        agama: "Agama",
        alamat: "Alamat",
        rt: "RT",
        rw: "RW",
        provinsi: "Provinsi",
        kabupaten: "Kota / Kabupaten",
        kecamatan: "Kecamatan",
        kelurahan: "Kelurahan",
        kodePos: "Kode Pos",
        statusPerkawinan: "Status Perkawinan",
        masaAktifKtp: "Masa Aktif e-KTP",
        namaIbuKandung: "Nama Ibu Kandung",
        kewarganegaraan: "Kewarganegaraan",

        // Data Pribadi
        namaPanggilan: "Nama Alias / Panggilan",
        tujuan: "Tujuan Menabung",
        KantorCabang: "Jaringan Kantor",
        pendidikanTerakhir: "Pendidikan Terakhir",
        hobi: "Hobi",
        nomorTelepon: "Nomor Telepon",
        nomorFax: "Nomor Fax",
        kantorCabang: "Jaringan Kantor",
        alamatKantorCabang: "Alamat Jaringan Kantor",
        alamatSesuaiEktp: "Alamat Sesuai EKTP",
        phone: "Nomor Handphone",
        namaFundingOfficer: "Nama Funding Officer",
        sumber: "Sumber Informasi Nasabah",
        email: "Email",

        // Data Pekerjaan (Beneficial Owner)
        penghasilanLainnya: "Penghasilan Lainnya",
        sumberDanaMilikPribadi: "Sumber Dana Milik Pribadi",
        hubunganNasabahLainnyaBO: "Hubungan Nasabah Lainnya",
        jenisIdentitasLainnyaBO: "Jenis Identitas Lainnya",
        pekerjaanLainnyaBO: "Pekerjaan Lainnya",
        jabatanLainnyaBO: "Jabatan Lainnya",
        penghasilanLainnyaBO: "Penghasilan Lainnya",
        pekerjaan: "Pekerjaan",
        penghasilan: "Penghasilan",
        jumlahPenghasilan: "Penghasilan Perbulan",
        hubunganNasabah: "Hubungan Nasabah",
        jenisIdentitasBO: "Jenis Identitas",
        hubunganNasabahBO: "Hubungan dengan Nasabah",
        kotaPerusahaanBO: "Kota Perusahaan",
        kodePosPerusahaanBO: "Kode Pos Perusahaan",
        kewarganegaraanBO: "Kewarganegaraan",
        namaLengkapBO: "Nama",
        nomorDokumenIdentitasBO: "Nomor Dokumentasi Identitas",
        alamatBO: "Alamat",
        rtBO: "RT",
        rwBO: "RW",
        provinsiBO: "Provinsi",
        kabupatenBO: "Kota / Kabupaten",
        kecamatanBO: "Kecamatan",
        kelurahanBO: "Kelurahan",
        kodePosBO: "Kode Pos",
        tempatLahirBO: "Tempat Lahir",
        tanggalLahirBO: "Tanggal Lahir",
        jenisKelaminBO: "Jenis Kelamin",
        statusPerkawinanBO: "Status Perkawinan",
        pekerjaanBO: "Pekerjaan",
        namaPerusahaanBO: "Nama Perusahaan",
        alamatPerusahaanBO: "Alamat Perusahaan",
        jabatanBO: "Jabatan",
        lamaBekerjaTahunBO: "Lama Bekerja (Tahun)",
        lamaBekerjaBulanBO: "Lama Bekerja (Bulan)",
        penghasilanBO: "Penghasilan",
        jumlahPenghasilanBO: "Penghasilan Perbulan",
        kodePosPerushaanBO: "Kode Pos Perusahaan",
        pernyataanChecked: "Pernyataan",

        // Data Pekerjaan (Detail Pekerjaan)
        namaPerusahaanDK: "Nama Perusahaan/ Instansi",
        pekerjaanLainnya: "Pekerjaan Lainnya",
        bidangPekerjaanDK: "Bidang Pekerjaan/ Usaha",
        jabatanDK: "Jabatan/ Posisi Pekerjaan",
        kotaPerusahaanDK: "Kota Perusahaan",
        kodePosPerusahaanDK: "Kode Pos Perusahaan",
        hubunganPemohonKD: "Hubungan Pemohon",
        lamaBekerjaTahunDK: "Lama Bekerja (Tahun)",
        lamaBekerjaBulanDK: "Lama Bekerja (Bulan)",
        nomorTeleponKantorDK: "Nomor Telepon Kantor",
        nomorTeleponFaxDK: "Nomor Fax Kantor",
        alamatDK: "Alamat Perusahaan/ Instansi",
        korespondensi: "Alamat Korespondensi Surat Menyurat",

        // Data Penempatan
        nominal: "Nominal",
        terbilang: "Terbilang",
        jangkaWaktu: "Jangka Waktu & Suku Bunga",
        metodePencairan: "Saat Jatuh Tempo Nominal",
        produk: "Produk Deposito yang Dipilih",
        pembayaranBunga: "Pembayaran Bunga",
        metodePenyetoran: "Metode Penyetoran",
        namaBank: "Nama Bank",
        nomorRekening: "Nomor Rekening Penyetoran Deposito",
        produkDeposito: "Produk Deposito",
        namaPemilikRekening: "Nama Pemilik Rekening Penyetoran Deposito",
        setujuBiayaTransfer: " Setuju Biaya Transfer",
        biayaTransfer: "Biaya Transfer",
        metodeTransfer: "Metode Transfer",

        // kontak Darurat
        namaLengkapKD: "Nama Lengkap Kontak Darurat",
        hubunganKD: "Hubungan Kontak Darurat",
        nomorTeleponKD: "Nomor Telepon Kontak Darurat",
        alamatKD: "Alamat Kontak Darurat",
      };
      return labels[key] || key;
    },
    formatFileLabel(key) {
      const labels = {
        ktp: "e-KTP",
        npwp: "NPWP",
        fotoDiri: "Foto Diri",
        tandaTangan: "Tanda Tangan",
      };
      return labels[key] || key;
    },
    getFileIcon(key) {
      const icons = {
        ktp: ektpIcon,
        npwp: npwpIcon,
        fotoDiri: livenessIcon,
        tandaTangan: tandaTanganIcon
      };
      return icons[key] || defaultIcon;
    },
    handleSubmit(event) {
      event.preventDefault();
      if (!this.agreement1) {
        alert("Harap menyetujui syarat dan ketentuan terlebih dahulu.");
        return;
      }
      this.isModalOpen = true;
    },

    closeModalKonfirmasi() {
      this.isModalOpen = false;
    },

    handleKonfirmasi(confirm) {
      this.isModalOpen = false;

      if (confirm) {
        this.lanjutkanPengiriman();
      } else {
        console.log("Pengiriman data dibatalkan oleh pengguna.");
      }
    },

    async lanjutkanPengiriman() {
      if (this.isSubmitting) {
        return;
      }
      const fileStore = useFileStore();
      this.isSubmitting = true;

      try {
        this.requestData = {
          uuid: fileStore.uuid || "",
          s_k_nasabah_bersedia_info_tambahan: true,
          s_k_data_benar_dipertanggungjawabkan: true,
        };

        console.log("Mengirim data:", this.requestData);

        const response = await api.post("/buka-rekening-deposito", this.requestData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          fileStore.setEnvelopeId(response.data.envelope_id);
          fileStore.setSignUrl(response.data.sign_url);
          // console.log("Envelope ID:", response.data.envelope_id);

          this.$router.push({ path: "/dashboard/panduanKameraPenempatanDepositoNTB" });
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
    },
  },
  mounted() {
    this.$emit("update-progress", 90);
    this.fetchBranches();
    this.fetchBidangPekerjaan();
    this.fetchPekerjaan();
    this.fetchJabatanKonfirmasi();
  },
};
</script>


<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 10px;
}

.grid {
  margin-top: 20px;
}

.flex {
  display: flex;
  align-items: center;
}

.cursor-pointer {
  cursor: pointer;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.form-item {
  flex: 1 1 calc(40% - 16px);
  display: flex flex-col;
  justify-content: space-between;
}

.form-label {
  font-weight: 400;
  font-size: 14px;
  color: #7D7D78;
}

.form-value {
  font-weight: 500;
  font-size: 16px;
  color: #1C1C17;
}

@media screen and (max-width: 768px) {
  .form-value {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .form-value {
    font-size: 14px;
  }
}
</style>
