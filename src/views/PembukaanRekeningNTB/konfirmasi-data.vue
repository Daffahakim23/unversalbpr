<template>
  <div>
    <div class="">
      <h1 class="text-base sm:text-lg md:text-xl font-semibold text-primary text-left mb-4">
        Data e-KTP
      </h1>
      <div v-if="formKTP" class="form-container">
        <div class="form-item" v-for="(value, key) in formKTP" :key="key">
          <div class="form-label">{{ formatLabel(key) }}</div>
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
          <strong class="form-value">
            <template v-if="formPribadi.tujuan === 'Lainnya'">
              {{ formPribadi.tujuanLainnya || '-' }}
            </template>
            <template v-else-if="formPribadi.tujuan">
              {{ formPribadi.tujuan }}
            </template>
            <template v-else>
              -
            </template>
          </strong>
        </div>
        <div class="form-item">
          <div class="form-label">RT/RW</div>
          <strong class="form-value">{{ formGabungan.rt }}/{{ formGabungan.rw }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Email</div>
          <strong class="form-value">{{ formGabungan.email }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Provinsi</div>
          <strong class="form-value">{{ formGabungan.provinsi }}</strong>
        </div>

        <div class="form-item">
          <div class="form-label">Nomor Handphone</div>
          <strong class="form-value">0{{ formGabungan.phone }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kota/Kabupaten</div>
          <strong class="form-value">{{ formGabungan.kabupaten }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kecamatan</div>
          <strong class="form-value">{{ formGabungan.kecamatan }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kelurahan</div>
          <strong class="form-value">{{ formGabungan.kelurahan }}</strong>
        </div>

        <div class="form-item">
          <div class="form-label">Pendidikan Terakhir</div>
          <strong class="form-value">{{ formGabungan.pendidikanTerakhir }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Kode Pos</div>
          <strong class="form-value">{{ formGabungan.kodePos }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Nomor Fax</div>
          <strong class="form-value">{{ formGabungan.nomorFax }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Nomor Telepon</div>
          <strong class="form-value">{{ formGabungan.nomorTelepon }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Hobi</div>
          <strong class="form-value">
            <template v-if="formGabungan.hobi === 'Lainnya'">
              {{ formGabungan.hobiLainnya || '-' }}
            </template>
            <template v-else-if="formGabungan.hobi">
              {{ formGabungan.hobi }}
            </template>
            <template v-else>
              -
            </template>
          </strong>
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
        <div class="form-item">
          <div class="form-label">Pekerjaan</div>
          <strong class="form-value">
            <template v-if="formPekerjaan.pekerjaan === 'LAINNYA'">
              {{ formPekerjaan.pekerjaanLainnya || '-' }}
            </template>
            <template v-else-if="formPekerjaan.pekerjaan">
              {{ formPekerjaan.pekerjaan }}
            </template>
            <template v-else>
              -
            </template>
          </strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.alamatDK">
          <div class="form-label">Alamat Perusahaan/Instansi</div>
          <strong class="form-value">{{ formPekerjaan.alamatDK }}</strong>
        </div>
        <div class="form-item" v-if="formPekerjaan.namaPerusahaanDK">
          <div class="form-label">Nama Perusahaan/ Instansi</div>
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
        <!-- <div class="form-item" v-if="formPribadi.tujuan">
          <div class="form-label">Tujuan Pembukaan Rekening</div>
          <strong class="form-value">{{ formPribadi.tujuan }}</strong>
        </div> -->
        <div class="form-item" v-if="formPekerjaan.nomorTeleponFaxDK">
          <div class="form-label">Nomor Fax Kantor</div>
          <strong class="form-value">{{ formPekerjaan.nomorTeleponFaxDK }}</strong>
        </div>
        <div class="form-item">
          <div class="form-label">Sumber Dana</div>
          <strong class="form-value">
            <template v-if="formPekerjaan.penghasilan === 'Lainnya'">
              {{ formPekerjaan.penghasilanLainnya || '-' }}
            </template>
            <template v-else-if="formPekerjaan.penghasilan">
              {{ formPekerjaan.penghasilan }}
            </template>
            <template v-else>
              -
            </template>
          </strong>
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
        <div class="form-item">
          <div class="form-label">Hubungan dengan Nasabah</div>
          <strong class="form-value">
            <template v-if="formBeneficialOwner.hubunganNasabahBO === 'Lainnya'">
              {{ formBeneficialOwner.hubunganNasabahLainnyaBO || '-' }}
            </template>
            <template v-else-if="formBeneficialOwner.hubunganNasabahBO">
              {{ formBeneficialOwner.hubunganNasabahBO }}
            </template>
            <template v-else>
              -
            </template>
          </strong>
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
        <div class="form-item">
          <div class="form-label">Pekerjaan</div>
          <strong class="form-value">
            <template v-if="formBeneficialOwner.pekerjaanBO === 'LAINNYA'">
              {{ formBeneficialOwner.pekerjaanLainnyaBO || '-' }}
            </template>
            <template v-else-if="formBeneficialOwner.pekerjaanBO">
              {{ formBeneficialOwner.pekerjaanBO }}
            </template>
            <template v-else>
              -
            </template>
          </strong>
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
          <div class="form-label">Hubungan dengan Nasabah Lainnya</div>
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
        <div class="form-item" v-if="formPribadi.kantorCabang">
          <div class="form-label">Jaringan Kantor</div>
          <strong class="form-value">{{ formPribadi.kantorCabang }}</strong>
        </div>
        <div class="form-item" v-if="formPribadi.alamatKantorCabang">
          <div class="form-label">Alamat Jaringan Kantor</div>
          <strong class="form-value">{{ formPribadi.alamatKantorCabang }}</strong>
        </div>
        <div class="form-item" v-if="formGabungan.produk">
          <div class="form-label">Produk yang Diinginkan</div>
          <strong class="form-value">{{ formGabungan.produk }}</strong>
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
      <div class="space-y-3 text-neutral-900 text-sm text-justify">
        <p>
          Dengan ini, saya/kami menyatakan bahwa:
        </p>
        <ul class="list-decimal just list-outside ml-4 text-neutral-900 space-y-2">
          <li>Seluruh data yang Saya isi dalam Layanan E-Form PT BPR Universal (selanjutnya disebut sebagai “Bank”)
            adalah
            benar dan merupakan data terbaru.</li>
          <li>Bank dapat melakukan pemeriksaan terhadap kebenaran data yang Saya berikan dalam Layanan E-Form ini.</li>
          <li>Bank telah memberikan penjelasan yang cukup mengenai karakteristik produk/fasilitas/layanan Bank yang akan
            Saya manfaatkan dan Saya telah mengerti serta memahami segala konsekuensi pemanfaatan produk Bank, termasuk
            manfaat, risiko, dan biaya-biaya yang melekat pada produk Bank tersebut.</li>
          <li>Dengan menekan tombol “Saya Setuju dan Mengerti”, Saya telah menerima, membaca, mengerti dan menyetujui
            isi
            Ketentuan dan Persyaratan Pembukaan Rekening (ditampilkan pada Layanan E-Form Universal BPR). Untuk itu
            dengan
            ini Saya menyatakan tunduk dan terikat dengan ketentuan-ketentuan tersebut, serta ketentuan lain terkait
            produk/fasilitas/layanan yang Saya pilih yang berlaku di Bank beserta segala bentuk perubahannya yang akan
            diberitahukan melalui sarana yang ditetapkan Bank.</li>
          <li>Saya memberi hak dan wewenang kepada Bank untuk melakukan pemblokiran dan/atau penutupan Rekening, apabila
            menurut pertimbangan Bank:
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
          <li>Saya setuju dan memberikan kuasa kepada Bank untuk mendebet dan/atau mengkredit rekening “default” Saya
            sesuai
            dengan data yang telah diisi pada Layanan E-Form dan tidak akan membatalkan secara sepihak.</li>
          <li>Saya menyatakan setuju dan bersedia menerima risiko apabila produk/fasilitas/layanan Bank yang saya pilih,
            tidak memenuhi ketentuan penjaminan simpanan yang ditetapkan oleh LPS. Termasuk perubahan-perubahannya dikemudian hari, yang akan diberitahukan dengan sarana yang ditetapkan
            Bank.
          </li>
          <li>Saya dengan ini menyatakan telah membaca, memahami, dan menyetujui Syarat dan Ketentuan Layanan
            Penyelenggara
            Sertifikasi Elektronik serta menjamin keakuratan data pribadi Saya untuk diproses lebih lanjut oleh PT
            Indonesia
            Digital Identity sebagai mitra dari Bank untuk keperluan penerbitan dan pengelolaan sertifikat elektronik.
          </li>
          <li>Saya menyatakan bahwa Tanda Tangan Digital yang Saya bubuhkan melalui Layanan E-Form menggunakan
            Sertifikat
            Elektronik yang diterbitkan oleh Penyelenggara Sertifikasi Elektronik (PSrE) PT Indonesia Digital Identity
            memiliki kekuatan hukum yang sah dan mengikat, serta dianggap setara dengan tanda tangan basah atau perintah
            tertulis yang ditandatangani secara fisik.</li>
          <li>Saya setuju Bank dapat memperoleh, menggunakan, mengelola, dan menyimpan data biometrik Saya, termasuk
            namun
            tidak terbatas pada pemanfaatan dokumen identitas diri Saya, face recognition, teknologi Tanda Tangan
            Digital,
            rekaman suara, untuk tujuan verifikasi identitas Saya dalam memproses Pembukaan Rekening yang Saya ajukan
            melalui Layanan E-Form berdasarkan ketentuan peraturan perundang-undangan yang berlaku.</li>
        </ul>
      </div>
    </div>

    <!-- Checkbox Persetujuan -->
    <!-- <div class="flex items-center">
      <input type="checkbox" id="agreement1" v-model="agreement1" class="mr-2 cursor-pointer" />
      <label for="agreement1" class="text-sm text-neutral-900 cursor-pointer">
        Saya setuju dengan pernyataan dan persetujuan di atas
      </label>
    </div> -->

    <div class="mt-2">
      <CustomCheckbox v-model="agreement1"
        labelText="Dengan ini Saya menyatakan telah membaca dan menyetujui seluruh isi pernyataan dan persetujuan nasabah di atas." />
    </div>

    <div class="mt-2">
      <CustomCheckbox v-model="agreement2"
        labelText="Saya bersedia mendapatkan informasi tambahan melalui email, SMS, Whatsapp, dan lainnya*" />
    </div>

    <!-- <div class="flex items-center mt-2">
      <input type="checkbox" id="agreement2" v-model="agreement2" class="mr-2 cursor-pointer items-baseline" />
      <label for="agreement2" class="text-sm text-neutral-900 cursor-pointer">
        Nasabah bersedia mendapatkan informasi tambahan melalui email,SMS, Whatsapp, dan lainnya*
      </label>
    </div> -->


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
import { produkOptions, jenisIdentitasBOOptions, jenisKelaminOptions, kewarganegaraanBOOptions, trueFalseOptions, kewarganegaraanOptions, persetujuanOptions } from "@/data/option";
import { FormModelKonfirmasiData } from "@/models/formModel";
// import ModalOTP from "@/components/ModalOTP.vue";
import ModalKonfirmasi from "@/components/ModalKonfirmasi.vue";
import { pendidikanOptions, tujuanOptions, hobiOptions, agamaOptions, statusPerkawinanOptions, penghasilanOptions, jumlahPenghasilanOptions, bidangPekerjaanDKOptions, korespondensiOptions, masaAktifKTPOptions, hubunganNasabahOptions, sumberDataNasabahOptions, npwp2Options, npwpOptions } from '@/data/option.js';
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
    CustomCheckbox,
    ButtonComponent,
    RadioButtonChoose,
    // ModalOTP,
    ModalKonfirmasi,
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
      const emailData = fileStore.formEmailRequestPembukaanRekening || {};

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
            if (key === "sumberDanaMilikPribadi") {
              value = this.getLabelFromOptions(value, trueFalseOptions);
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
        Object.entries(fileStore.npwp || {})
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
      iconSize: 20,
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
    getLabelFromOptions(value, options) {
      if (!options || options.length === 0) return value;

      const found = options.find((option) => option.value === value);
      return found ? found.label : value;
    },
    goBack() {
      this.$router.push({ path: "/dashboard/dataPekerjaanPembukaanRekeningNTB" });
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
        namaIbuKandung: "Nama Gadis Ibu Kandung",
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
        email: "Email",
        produk: "Produk yang di Inginkan",
        phone: "Nomor Handphone",
        namaFundingOfficer: "Nama Funding Officer",
        sumber: "Sumber Informasi Nasabah",

        // Data Pekerjaan (Beneficial Owner)
        penghasilanLainnya: "Sumber Dana Lainnya",
        sumberDanaMilikPribadi: "Sumber Dana Milik Pribadi",
        hubunganNasabahLainnyaBO: "Hubungan dengan Nasabah Lainnya",
        jenisIdentitasLainnyaBO: "Jenis Identitas Lainnya",
        pekerjaanLainnyaBO: "Pekerjaan Lainnya",
        jabatanLainnyaBO: "Jabatan Lainnya",
        penghasilanLainnyaBO: "Sumber Dana Lainnya",
        pekerjaan: "Pekerjaan",
        pekerjaanLainnya: "Pekerjaan Lainnya",
        penghasilan: "Sumber Dana",
        jumlahPenghasilan: "Penghasilan Perbulan",
        hubunganNasabah: "Hubungan dengan Nasabah",
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
        kodePosPerusahaanBO: "Kode Pos Perusahaan",
        tempatLahirBO: "Tempat Lahir",
        tanggalLahirBO: "Tanggal Lahir",
        jenisKelaminBO: "Jenis Kelamin",
        statusPerkawinanBO: "Status Perkawinan",
        kodePosBO: "Kode Pos",
        pekerjaanBO: "Pekerjaan",
        namaPerusahaanBO: "Nama Perusahaan",
        alamatPerusahaanBO: "Alamat Perusahaan",
        jabatanBO: "Jabatan",
        lamaBekerjaTahunBO: "Lama Bekerja Tahun",
        lamaBekerjaBulanBO: "Lama Bekerja Bulan",
        penghasilanBO: "Penghasilan",
        jumlahPenghasilanBO: "Jumlah Penghasilan",

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
        pernyataanChecked: "Pernyataan & Persetujuan Nasabah",

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

        const response = await api.post("/buka-rekening", this.requestData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Respons dari API:", response);

        if (response.status === 200) {
          fileStore.setEnvelopeId(response.data.envelope_id);
          fileStore.setSignUrl(response.data.sign_url);
          // console.log("Envelope ID:", response.data.envelope_id);
          // console.log("Sign Url:", response.data.sign_url);

          this.$router.push({ path: "/dashboard/panduanKameraPembukaanRekeningNTB" });
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

/* Kontainer Flexbox untuk membuat baris */
.form-container {
  display: flex;
  flex-wrap: wrap;
  /* Membungkus elemen ke baris berikutnya */
  gap: 16px;
  /* Jarak antar elemen */
}

/* Setiap item menjadi 50% dari lebar kontainer */
.form-item {
  flex: 1 1 calc(40% - 16px);
  /* Membuat elemen mengambil 50% lebar */
  display: flex flex-col;
  /* Mengatur label dan value dalam satu baris */
  justify-content: space-between;
  /* Memberikan spasi antara label dan value */
  /* padding: 4px; */
  /* border: 1px solid #ddd; */
  /* border-radius: 8px; */
  /* background-color: #f9f9f9; */
}

/* Gaya untuk label dan value */
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

.hidden-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  /* height: 0;
  width: 0; */
}

.custom-checkbox-label {
  display: flex;
  align-items: center;
}

.custom-checkbox-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.custom-checkbox-icon img {
  display: block;
  /* Mencegah ruang ekstra di sekitar gambar inline */
}

/* Styling saat fokus (opsional) */
.hidden-checkbox:focus+.custom-checkbox-label .custom-checkbox-icon img {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.custom-checkbox-icon img,
.custom-checkbox-icon svg {
  display: block;
  /* Memastikan elemen ikon tidak memiliki padding atau margin inline default */
}
</style>
