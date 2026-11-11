<script setup lang="ts">
import { computed, ref } from "vue";
import { useData } from "vitepress";
import { data } from "../../../codes.data";

const { lang } = useData();
const isAr = computed(() => lang.value.startsWith("ar"));

const labels = {
  en: {
    search: "Search by code or message",
    allGroups: "All groups",
    code: "Code",
    group: "Group",
    arabic: "Arabic message",
    english: "English message (Better Auth)",
    copy: "Copy code",
    copied: "Copied",
    none: "No error codes match your search.",
    shown: (n: number, total: number) => `Showing ${n} of ${total} codes`,
    synced: (v: string) => `Generated from Better Auth ${v}`,
  },
  ar: {
    search: "ابحث بالرمز أو بنص الرسالة",
    allGroups: "كل المجموعات",
    code: "الرمز",
    group: "المجموعة",
    arabic: "الرسالة العربية",
    english: "الرسالة الإنجليزية (Better Auth)",
    copy: "نسخ الرمز",
    copied: "تم النسخ",
    none: "لا توجد رموز مطابقة لبحثك.",
    shown: (n: number, total: number) => `عرض ${n} من ${total} رمزاً`,
    synced: (v: string) => `مُولَّد من Better Auth ${v}`,
  },
};
const t = computed(() => (isAr.value ? labels.ar : labels.en));

const query = ref("");
const group = ref("all");
const copied = ref("");

const rows = computed(() => {
  const q = query.value.trim().toLowerCase();
  return data.rows.filter(
    (r) =>
      (group.value === "all" || r.group === group.value) &&
      (!q || r.code.toLowerCase().includes(q) || r.en.toLowerCase().includes(q) || r.ar.includes(q)),
  );
});

let timer: ReturnType<typeof setTimeout> | undefined;
async function copy(code: string) {
  try {
    await navigator.clipboard.writeText(code);
    copied.value = code;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = ""), 1400);
  } catch {
    /* clipboard unavailable (insecure context): the code stays selectable */
  }
}
</script>

<template>
  <div class="codes">
    <div class="controls">
      <input v-model="query" class="search" type="search" :placeholder="t.search" :aria-label="t.search" />
      <select v-model="group" class="select" :aria-label="t.group">
        <option value="all">{{ t.allGroups }} ({{ data.rows.length }})</option>
        <option v-for="g in data.groups" :key="g.name" :value="g.name">{{ g.name }} ({{ g.count }})</option>
      </select>
    </div>

    <p class="meta" aria-live="polite">
      {{ t.shown(rows.length, data.rows.length) }} · {{ t.synced(data.betterAuthVersion) }}
    </p>

    <div class="wrap">
      <table v-if="rows.length">
        <thead>
          <tr>
            <th>{{ t.code }}</th>
            <th>{{ t.group }}</th>
            <th>{{ t.arabic }}</th>
            <th>{{ t.english }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.code">
            <td class="code-cell">
              <button type="button" class="code" :title="t.copy" :aria-label="`${t.copy}: ${r.code}`" @click="copy(r.code)">
                <code>{{ r.code }}</code>
                <span v-if="copied === r.code" class="ok" role="status">{{ t.copied }}</span>
              </button>
            </td>
            <td class="group-cell"><span class="badge">{{ r.group }}</span></td>
            <td class="ar" lang="ar" dir="rtl">{{ r.ar }}</td>
            <td class="en" lang="en" dir="ltr">{{ r.en }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty">{{ t.none }}</p>
    </div>
  </div>
</template>

<style scoped>
.codes {
  --code-col-width: 280px;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0 8px;
}
.search,
.select {
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 14px;
}
.search { flex: 1 1 260px; min-width: 0; }
.select { flex: 0 1 240px; }
.search:focus,
.select:focus { outline: 2px solid var(--vp-c-brand-1); outline-offset: 1px; }

.meta { margin: 0 0 12px; font-size: 13px; color: var(--vp-c-text-2); }

.wrap { overflow-x: auto; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
table { display: table; width: 100%; margin: 0; border-collapse: collapse; font-size: 14px; }
th, td { padding: 10px 14px; border: none; border-bottom: 1px solid var(--vp-c-divider); vertical-align: top; text-align: start; }
tr:last-child td { border-bottom: none; }
th { position: sticky; top: 0; background: var(--vp-c-bg-soft); font-weight: 600; white-space: nowrap; }
tbody tr:nth-child(even) td { background: transparent; }
tbody tr:hover td { background: var(--vp-c-bg-soft); }

.code-cell { min-width: var(--code-col-width); }
.code { display: inline-flex; align-items: center; gap: 8px; padding: 0; border: 0; background: none; cursor: pointer; text-align: start; /* rtl:ignore */ direction: ltr; }
.code code { font-size: 12.5px; word-break: break-all; color: var(--vp-c-brand-1); }
.code:hover code { text-decoration: underline; }
.code:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; border-radius: 4px; }
.ok { font-size: 11px; font-weight: 600; color: var(--vp-c-brand-1); white-space: nowrap; }

.badge { display: inline-block; padding: 1px 8px; border-radius: 999px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); font-size: 12px; white-space: nowrap; }
.ar { min-width: 220px; font-weight: 500; }
.en { min-width: 220px; color: var(--vp-c-text-2); }
.empty { padding: 32px; text-align: center; color: var(--vp-c-text-2); }
</style>
