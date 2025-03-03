<template>
  <form @submit.prevent="handleSubmit">
    <!-- Dropdown Pilih Kantor Cabang -->
    <FormField
      label="Pilih Kategori"
      id="kantorCabang"
      :isDropdown="true"
      v-model="form.kantorCabang"
      :options="kantorCabangOptions"
      required
    />

    <!-- Menampilkan alamat setelah memilih kantor cabang -->
    <div v-if="form.kantorCabang" class="mt-4">
      <FormField
        label="Alamat Kantor Cabang"
        id="alamatKantorCabang"
        v-model="form.alamatKantorCabang"
        :readonly="true"
      />
    </div>

    <!-- Tombol Kirim -->
    <div class="text-right mt-6">
      <ButtonComponent type="submit" :disabled="isButtonDisabled">
        Lanjutkan
      </ButtonComponent>
    </div>
  </form>
</template>

<script>
import FormField from "@/components/FormField.vue";
import ButtonComponent from "@/components/button.vue";
import { useFileStore } from "@/stores/filestore";

export default {
  components: {
    FormField,
    ButtonComponent,
  },
  data() {
    return {
      form: {
        kantorCabang: "", // Menyimpan pilihan kantor cabang
        alamatKantorCabang: "", // Menyimpan alamat kantor cabang
      },
      kantorCabangOptions: [
        { label: "Kantor Pusat PT BPR Universal", value: "01" },
        { label: "Kantor Kas BSD", value: "02" },
        { label: "Kantor Kas PIK", value: "03" },
        { label: "Kantor Cabang Tanggerang", value: "04" },
        { label: "Kantor Cabang Depok", value: "05" },
        { label: "Kantor Cabang Bekasi", value: "06" },
        { label: "Kantor Cabang Tambun", value: "07" },
        { label: "Kantor Cabang Bogor", value: "08" },
      ],
      kantorCabangAlamat: {
        "01": "Jl. Pusat No. 1, Jakarta",
        "02": "Jl. BSD Raya No. 12, BSD City",
        "03": "Jl. PIK No. 34, Pantai Indah Kapuk",
        "04": "Jl. Tanggerang Raya No. 45, Tanggerang",
        "05": "Jl. Depok No. 23, Depok",
        "06": "Jl. Bekasi No. 56, Bekasi",
        "07": "Jl. Tambun No. 78, Tambun",
        "08": "Jl. Bogor No. 90, Bogor",
      },
    };
  },
  watch: {
    "form.kantorCabang"(newVal) {
      this.form.alamatKantorCabang =
        this.kantorCabangAlamat[newVal] || "Alamat tidak ditemukan";
    },
  },
  computed: {
    isButtonDisabled() {
      return !this.form.kantorCabang; // Memastikan input tidak hanya berupa spasi
    },
  },
  methods: {
    handleSubmit() {
      const fileStore = useFileStore();
      fileStore.setFormDataKantorCabang(this.form);
      console.log("Form data has been saved to the store:", this.form);
      this.$router.push({ path: "/dashboard/uploadDokumen" });
    },
  },
};
</script>

<!-- <script>
import axios from "axios"; 
import FormField from "../../components/MicrositeBPR/0FormField.vue";

export default {
  components: {
    FormField,
  },
  data() {
    return {
      form: {
        kantorCabang: "",
      },
      kantorCabangOptions: [],
    };
  },
  methods: {
    async fetchKantorCabang() {
      try {
        // Corrected API URL
        const response = await axios.get("10.14.52.233:8001/kantor-cabang");
        const data = response.data.data;
        console.log(response.data)

        // Ensure the data is in the correct format
        this.kantorCabangOptions = data.map((item) => ({
          label: item.nama_bank,
          value: item.code,
        }));
      } catch (error) {
        console.error("Gagal mendapatkan data kantor cabang:", error);
      }
    },

    handleSubmit() {
      console.log("Data form:", this.form);
      this.$router.push({ path: "/uploadDokumen" });
      this.form = { kantorCabang: "" }; // Reset form
    },
  },

  mounted() {
    // Call API on component mount
    this.fetchKantorCabang();
  },
};
</script> -->
