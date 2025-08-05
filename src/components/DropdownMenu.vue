<template>
    <div id="main-dropdown"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 shadow-primary-100">
        <ul class="py-2 text-sm text-gray-700 " aria-labelledby="mainDropdownButton">
            <li>
                <button id="nestedDropdownButton" data-dropdown-toggle="nested-dropdown"
                    data-dropdown-placement="right-start" type="button"
                    class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Info
                    Produk<svg class="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg></button>
                <div id="nested-dropdown"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                    <ul class="py-2 text-sm text-gray-700" aria-labelledby="nestedDropdownButton">
                        <li>
                            <a @click="$router.push('/dashboard/infoProdukPembukaanRekeningNTB')"
                                class="px-4 py-2 text-xs font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Pembukaan
                                Rekening Nasabah</a>
                        </li>
                        <li>
                            <a @click="$router.push('/dashboard/infoProdukPembukaanRekeningExisting')"
                                class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Pembukaan
                                Rekening Non-Nasabah</a>
                        </li>
                        <li>
                            <a @click="$router.push('/dashboard/infoProdukPenempatanDepositoNTB')"
                                class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Pembukaan
                                Deposito Nasabah</a>
                        </li>
                        <li>
                            <a @click="$router.push('/dashboard/infoProdukPenempatanDepositoExisting')"
                                class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Pembukaan
                                Deposito Non-Nasabah</a>
                        </li>
                        <li>
                            <a @click="$router.push('/dashboard/infoProdukPencairanDeposito')"
                                class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Penutupan
                                Deposito</a>
                        </li>
                        <li>
                            <a @click="$router.push('/dashboard/infoProdukPemindahbukuan')"
                                class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Transfer</a>
                        </li>
                        <li>
                            <a @click="$router.push('/dashboard/infoProdukPengkinianData')"
                                class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Pengkinian
                                Data</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <a @click="$router.push('/dashboard/syaratKetentuan')"
                    class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Syarat
                    &
                    Ketentuan
                </a>
            </li>
            <li>
                <a @click="$router.push('/dashboard/kebijakanPrivasi')"
                    class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Kebijakan
                    Privasi
                </a>
            </li>
            <li>
                <a @click="$router.push('/dashboard/faq')"
                    class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">FAQ
                </a>
            </li>
            <li>
                <a @click="$router.push('/dashboard/tentang')"
                    class="px-4 py-2 font-medium text-primary hover:bg-gray-100 flex justify-between items-center w-full">Tentang
                    Kami</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DropdownMenu',
};
</script>