<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { lang } = useData();
const isAr = computed(() => lang.value.startsWith("ar"));

const text = computed(() =>
  isAr.value
    ? {
        title: "مخطط تدفق البيانات في better-auth-tarjim",
        gen: "التوليد (وقت التطوير فقط)",
        run: "وقت التشغيل (ما يُنشر على npm)",
        packages: "حزم Better Auth",
        input: "خطأ من Better Auth",
        typed: "يُقيِّد نوع القاموس",
        optional: "اعتمادية اختيارية",
      }
    : {
        title: "Data flow in better-auth-tarjim",
        gen: "Generation (dev time only)",
        run: "Runtime (what is published to npm)",
        packages: "Better Auth packages",
        input: "Better Auth error",
        typed: "types the dictionary",
        optional: "optional peer dependency",
      },
);
</script>

<template>
  <div class="diagram" role="group" :aria-label="text.title">
    <svg viewBox="0 0 880 440" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="text.title">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" class="arrowhead" />
        </marker>
      </defs>

      <!-- Lanes -->
      <rect x="8" y="8" width="864" height="142" rx="12" class="lane" />
      <rect x="8" y="186" width="864" height="246" rx="12" class="lane" />
      <text x="852" y="34" class="lane-title">{{ text.gen }}</text>
      <text x="852" y="212" class="lane-title">{{ text.run }}</text>

      <!-- Generation -->
      <g class="node"><rect x="30" y="72" width="200" height="60" rx="8" /><text x="130" y="98" class="t">{{ text.packages }}</text><text x="130" y="116" class="s">better-auth, @better-auth/*</text></g>
      <g class="node"><rect x="340" y="72" width="200" height="60" rx="8" /><text x="440" y="98" class="t">sync-codes.mjs</text><text x="440" y="116" class="s">scripts/</text></g>
      <g class="node key"><rect x="650" y="72" width="200" height="60" rx="8" /><text x="750" y="98" class="t">codes.generated.ts</text><text x="750" y="116" class="s">ErrorCode union</text></g>
      <path d="M230 102H336" class="edge" marker-end="url(#arrow)" />
      <path d="M540 102H646" class="edge" marker-end="url(#arrow)" />

      <!-- Runtime -->
      <g class="node"><rect x="30" y="240" width="200" height="60" rx="8" /><text x="130" y="266" class="t">ar.ts</text><text x="130" y="284" class="s">Record&lt;ErrorCode, string&gt;</text></g>
      <g class="node"><rect x="30" y="340" width="200" height="60" rx="8" /><text x="130" y="366" class="t">extras.ts</text><text x="130" y="384" class="s">429 · network · 5xx · fallback</text></g>

      <g class="node pill"><rect x="340" y="216" width="200" height="40" rx="20" /><text x="440" y="241" class="t">{{ text.input }}</text></g>
      <g class="node key"><rect x="340" y="296" width="200" height="60" rx="8" /><text x="440" y="322" class="t">translate.ts</text><text x="440" y="340" class="s">translate(error, options)</text></g>
      <g class="node"><rect x="650" y="296" width="200" height="60" rx="8" /><text x="750" y="322" class="t">index.ts</text><text x="750" y="340" class="s">authToast · withAuthToast</text></g>
      <g class="node pill dashed"><rect x="650" y="384" width="200" height="40" rx="20" /><text x="750" y="409" class="t">sonner</text></g>

      <path d="M230 270L336 314" class="edge" marker-end="url(#arrow)" />
      <path d="M230 370L336 338" class="edge" marker-end="url(#arrow)" />
      <path d="M440 256V292" class="edge" marker-end="url(#arrow)" />
      <path d="M540 326H646" class="edge" marker-end="url(#arrow)" />
      <path d="M750 384V360" class="edge dashed" marker-end="url(#arrow)" />
      <text x="738" y="376" class="note end">{{ text.optional }}</text>

      <!-- The contract between the two lanes -->
      <path d="M750 132V178H130V236" class="edge accent dashed" marker-end="url(#arrow)" />
      <text x="440" y="168" class="note accent-text">{{ text.typed }}</text>
    </svg>
  </div>
</template>

<style scoped>
.diagram {
  margin: 24px 0;
  padding: 12px;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  /* rtl:ignore */ direction: ltr; /* data flows left to right in both languages */
}
svg { display: block; min-width: 680px; width: 100%; height: auto; font-family: var(--vp-font-family-base); unicode-bidi: plaintext; }

.lane { fill: var(--vp-c-bg); stroke: var(--vp-c-divider); stroke-dasharray: 4 4; }
.lane-title { fill: var(--vp-c-text-2); font-size: 13px; font-weight: 600; text-anchor: end; }

.node rect { fill: var(--vp-c-bg-soft); stroke: var(--vp-c-divider); stroke-width: 1.2; }
.node.key rect { stroke: var(--vp-c-brand-1); stroke-width: 1.8; }
.node.pill rect { fill: var(--vp-c-bg); }
.node.dashed rect { stroke-dasharray: 4 3; }
.node text { text-anchor: middle; }
.t { fill: var(--vp-c-text-1); font-size: 14px; font-weight: 600; }
.s { fill: var(--vp-c-text-2); font-size: 11.5px; font-family: var(--vp-font-family-mono); }

.edge { fill: none; stroke: var(--vp-c-text-3); stroke-width: 1.6; }
.edge.dashed { stroke-dasharray: 5 4; }
.edge.accent { stroke: var(--vp-c-brand-1); }
.arrowhead { fill: var(--vp-c-text-3); }
.note { fill: var(--vp-c-text-2); font-size: 11.5px; }
.note.end { text-anchor: end; }
.accent-text { fill: var(--vp-c-brand-1); text-anchor: middle; font-weight: 600; }
</style>
