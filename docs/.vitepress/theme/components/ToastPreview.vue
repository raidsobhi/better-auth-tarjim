<script setup lang="ts">
import { data } from "../../../meta.data";
</script>

<template>
  <div class="preview" aria-hidden="false">
    <figure v-for="s in data.samples" :key="s.code" class="item">
      <div class="toast" dir="rtl" lang="ar" role="img" :aria-label="s.message">
        <svg class="icon" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.28 10.22a.75.75 0 1 1-1.06 1.06L10 11.06l-2.22 2.22a.75.75 0 0 1-1.06-1.06L8.94 10 6.72 7.78a.75.75 0 0 1 1.06-1.06L10 8.94l2.22-2.22a.75.75 0 0 1 1.06 1.06L11.06 10l2.22 2.22Z"
          />
        </svg>
        <span>{{ s.message }}</span>
      </div>
      <figcaption><code>error.code === "{{ s.code }}"</code></figcaption>
    </figure>
  </div>
</template>

<style scoped>
.preview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px 24px;
  margin: 24px 0 8px;
  padding: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.item { margin: 0; }

/* Mirrors Sonner's `richColors` error toast */
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border: 1px solid hsl(359, 100%, 94%);
  border-radius: 8px;
  background: hsl(359, 100%, 97%);
  color: hsl(360, 100%, 45%);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.dark .toast {
  border-color: hsl(357, 89%, 16%);
  background: hsl(358, 76%, 10%);
  color: hsl(358, 100%, 81%);
}
.icon { flex: none; }

figcaption { margin-top: 8px; font-size: 12px; color: var(--vp-c-text-2); /* rtl:ignore */ direction: ltr; text-align: start; }
figcaption code { font-size: 12px; unicode-bidi: isolate; }
</style>
