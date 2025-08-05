<template>
  <div class="mx-auto bg-white">

    <div v-if="staticIntroContent" class="text-gray-700 text-sm leading-relaxed">
      <div v-html="staticIntroContent"></div>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">
      <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
      <p>Memuat Syarat & Ketentuan...</p>
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-600">
      <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
      <p>{{ error }}</p>
      <button @click="fetchTermsAndConditions"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Coba Lagi</button>
    </div>

    <div v-else class="space-y-4">
      <div v-for="(section, index) in sections" :key="index" class="border-b border-gray-200">
        <div
          class="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-md px-2"
          @click="toggleExpand(index)">
          <span class="text-gray-800 font-medium">{{ section.title }}</span>
          <span class="text-primary font-semibold flex items-center">
            {{ section.expanded ? 'Tutup' : 'Buka' }} <i
              :class="{ 'fa-chevron-down': section.expanded, 'fa-chevron-right': !section.expanded }"
              class="fas ml-2 text-sm"></i>
          </span>
        </div>

        <transition name="v-transition">
          <div v-if="section.expanded" class="px-2 pb-4 pt-2 text-gray-600 text-sm leading-relaxed text-justify">
            <div :ref="el => { if (el) addNumberedContent(el, index) }" v-html="section.content"></div>
          </div>
        </transition>
      </div>
      <div v-if="sections.length === 0 && !loading && !error" class="text-center py-8 text-gray-500">
        Tidak ada syarat & ketentuan yang ditemukan.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  data() {
    return {
      sections: [],
      loading: true,
      error: null,
      staticIntroContent: '',
      apiUrl: 'https://cdncontentqa.coreinitiative.id/api/v1/content/detail/TERM_MS_SAVING_VIA_EFORM'
    };
  },
  mounted() {
    this.fetchTermsAndConditions();
  },
  methods: {
    async fetchTermsAndConditions() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(this.apiUrl, { /* ... */ });
        if (!response.ok) { /* ... */ }

        const apiData = await response.json();
        console.log("API Response (Full):", apiData);

        if (apiData.success === true && apiData.code === 200 && apiData.data && apiData.data.content && apiData.data.content.detail) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(apiData.data.content.detail, 'text/html');
          const allElements = Array.from(doc.body.children);

          let currentSections = [];
          let currentSectionTitle = '';
          let currentSectionContent = [];
          let sectionNumber = '';

          let tempStaticContent = [];
          let foundFirstExpandableSection = false;

          allElements.forEach(element => {
            const elementHtml = element.outerHTML;
            const elementText = element.textContent.trim();

            const isMainHeadingH2 = element.tagName === 'H2';

            const isNewExpandableSectionStart = (
              element.tagName === 'P' &&
              element.firstElementChild &&
              element.firstElementChild.tagName === 'STRONG' &&
              /^[A-Z]\.\s/.test(element.firstElementChild.textContent.trim())
            );

            if (isNewExpandableSectionStart) {
              foundFirstExpandableSection = true;

              if (currentSectionContent.length > 0 || currentSectionTitle !== '') {
                currentSections.push({
                  number: '',
                  title: currentSectionTitle,
                  content: currentSectionContent.join(''),
                  rawContent: currentSectionContent.join(''), // ✨ Simpan konten asli di sini
                  expanded: false
                });
              }

              currentSectionTitle = elementText;
              currentSectionContent = [];

            } else {
              if (!foundFirstExpandableSection) {
                tempStaticContent.push(elementHtml);
              } else {
                currentSectionContent.push(elementHtml);
              }
            }
          });

          if (currentSectionContent.length > 0 || currentSectionTitle !== '') {
            currentSections.push({
              number: '',
              title: currentSectionTitle,
              content: currentSectionContent.join(''),
              rawContent: currentSectionContent.join(''), 
              expanded: false
            });
          }

          this.sections = currentSections;
          this.staticIntroContent = tempStaticContent.join('');

          if (this.sections.length > 0) {
            this.sections[0].expanded = true;
          }
          console.log("Parsed sections from 'detail':", this.sections);
          console.log("Static intro content:", this.staticIntroContent);

        }
        else if (apiData.success === true && apiData.code === 200 && apiData.data && (apiData.data.sections || (apiData.data.content && apiData.data.content.sections))) {
          let tempSections = [];
          if (apiData.data.sections) {
            tempSections = apiData.data.sections;
          } else if (apiData.data.content && apiData.data.content.sections) {
            tempSections = apiData.data.content.sections;
          }
          this.sections = tempSections.map((sec, idx) => ({
            number: sec.sectionNumber || this.convertToRoman(idx + 1),
            title: sec.sectionTitle || 'Bagian Tanpa Judul',
            content: sec.sectionContent || 'Konten tidak tersedia.',
            rawContent: sec.sectionContent || 'Konten tidak tersedia.', 
            expanded: false
          }));
          console.log("Fallback to old 'sections' structure.");
        }
        else { /* ... */ }
      } catch (err) { /* ... */ } finally { this.loading = false; }
    },

    toggleExpand(index) {
      this.sections[index].expanded = !this.sections[index].expanded;
      this.$nextTick(() => {
        if (this.sections[index].expanded) {
        }
      });
    },

    addNumberedContent(containerElement, sectionIndex) {
      if (!containerElement) {
        console.warn("Container element for numbering is null or undefined.");
        return;
      }

      containerElement.innerHTML = this.sections[sectionIndex].content; 
      const childrenToProcess = Array.from(containerElement.children);
      const finalElements = []; 
      let currentNumberingStack = [];
      let lastProcessedTag = '';

      childrenToProcess.forEach(element => {
        if (element.tagName === 'BR' && element.textContent.trim() === '') return;
        if (element.textContent.trim() === '' && element.children.length === 0) return;

        if (element.tagName === 'OL' || element.tagName === 'UL') {
          if (lastProcessedTag !== 'OL' && lastProcessedTag !== 'UL') {
            currentNumberingStack = [0];
          }

          Array.from(element.children).forEach(liElement => {
            if (liElement.tagName === 'LI') {
              const indentLevelMatch = liElement.className.match(/ql-indent-(\d+)/);
              const indentLevel = indentLevelMatch ? parseInt(indentLevelMatch[1], 10) : 0;

              while (currentNumberingStack.length - 1 > indentLevel) {
                currentNumberingStack.pop();
              }
              if (currentNumberingStack.length - 1 < indentLevel) {
                currentNumberingStack.push(0); // Mulai sub-penomoran baru
              }
              currentNumberingStack[currentNumberingStack.length - 1]++; 

              const formattedNumber = currentNumberingStack.join('.') + '.';

              const wrapper = document.createElement('div');
              wrapper.className = 'numbered-paragraph-wrapper';
              wrapper.style.display = 'flex';
              wrapper.style.alignItems = 'flex-start'; 
              wrapper.style.marginBottom = '1em';
              wrapper.style.paddingLeft = `${indentLevel * 2}em`; 

              const numberSpan = document.createElement('span');
              numberSpan.textContent = formattedNumber;
              numberSpan.style.marginRight = '0.5em';
              numberSpan.style.minWidth = '2em'; // Untuk menjaga alignment nomor yang lebih panjang
              numberSpan.style.textAlign = 'right';
              numberSpan.style.fontWeight = 'medium';

              const contentWrapper = document.createElement('div');
              contentWrapper.style.flexGrow = '1';
              while (liElement.firstChild) {
                contentWrapper.appendChild(liElement.firstChild);
              }

              wrapper.appendChild(numberSpan);
              wrapper.appendChild(contentWrapper);
              finalElements.push(wrapper);
            }
          });
          element.style.listStyle = 'none'; // Sembunyikan numbering bawaan browser
          element.style.paddingLeft = '0'; // Hapus padding default
          element.style.margin = '0';
        } else {
          currentNumberingStack = [];
          finalElements.push(element.cloneNode(true));
        }
        lastProcessedTag = element.tagName;
      });

      while (containerElement.firstChild) {
        containerElement.removeChild(containerElement.firstChild);
      }
      finalElements.forEach(el => containerElement.appendChild(el));
    },

  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-out, max-height 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  max-height: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>