<template>
  <select class="form-select" @change="switchLanguage">
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="locale === sLocale"
    >
      {{ t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import Tr from "../../i18n/translation";
const { t, locale } = useI18n();
const supportedLocales = Tr.supportedLocales;

// switchlanguage
const switchLanguage = async (event: Event) => {
  // <--- 1
  const newLocale = event.target.value; // <--- 2
  await Tr.switchLanguage(newLocale); // <--- 3
};

// watch changes of locale
watch(
  () => locale,
  (oldValue, newValue) => {}
);
</script>
<style scoped></style>
