<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { data } from "../../../meta.data";

const { lang } = useData();
const isAr = computed(() => lang.value.startsWith("ar"));

const items = computed(() => {
  const ar = isAr.value;
  return [
    { value: String(data.codeCount), label: ar ? "رمز خطأ مترجَم" : "error codes translated" },
    { value: String(data.pluginCount), label: ar ? "إضافة مغطّاة" : "plugins covered" },
    { value: data.betterAuthVersion, label: ar ? "إصدار Better Auth المتزامن" : "synced Better Auth version" },
    { value: "0", label: ar ? "اعتماديات وقت التشغيل" : "runtime dependencies" },
  ];
});
</script>

<template>
  <dl class="stats">
    <div v-for="item in items" :key="item.label" class="stat">
      <dt>{{ item.label }}</dt>
      <dd>{{ item.value }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  margin: 8px 0 0;
}
.stat {
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
  padding: 18px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
dd { margin: 0; font-size: 28px; font-weight: 700; line-height: 1.2; color: var(--vp-c-brand-1); font-variant-numeric: tabular-nums; /* rtl:ignore */ direction: ltr; text-align: start; }
dt { font-size: 13px; color: var(--vp-c-text-2); }
</style>
