import { defineConfig } from "vitepress";
import { en } from "./locales/en";
import { ar } from "./locales/ar";
import { base, brandColor, repo, repoUrl, siteUrl, npmUrl } from "./shared";

export default defineConfig({
  title: repo,
  base,
  cleanUrls: true,
  lastUpdated: true,
  // The generated table is for GitHub readers; the site renders the same data as an interactive page.
  srcExclude: ["CODES.md"],

  locales: {
    root: { label: "English", ...en },
    ar: { label: "العربية", ...ar },
  },

  sitemap: { hostname: siteUrl },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: `${base}logo.svg` }],
    ["meta", { name: "theme-color", content: brandColor }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: repo }],
    ["meta", { name: "twitter:card", content: "summary" }],
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: repo,
        programmingLanguage: "TypeScript",
        codeRepository: repoUrl,
        url: npmUrl,
        license: "https://opensource.org/licenses/MIT",
        inLanguage: ["en", "ar"],
      }),
    ],
  ],

  // Canonical + hreflang alternates, so search engines serve the right language.
  transformHead({ pageData }) {
    const rel = pageData.relativePath.replace(/\.md$/, "").replace(/(^|\/)index$/, "$1");
    const isAr = rel === "ar" || rel.startsWith("ar/");
    const enPath = isAr ? rel.replace(/^ar\/?/, "") : rel;
    const arPath = isAr ? rel : `ar/${rel}`.replace(/\/$/, "/");
    const href = (p: string) => new URL(p, siteUrl).href;
    const self = href(isAr ? arPath : enPath);
    const title = pageData.title || repo;
    const description = pageData.description || "";
    return [
      ["link", { rel: "canonical", href: self }],
      ["link", { rel: "alternate", hreflang: "en", href: href(enPath) }],
      ["link", { rel: "alternate", hreflang: "ar", href: href(arPath) }],
      ["link", { rel: "alternate", hreflang: "x-default", href: href(enPath) }],
      ["meta", { property: "og:url", content: self }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:locale", content: isAr ? "ar" : "en_US" }],
      ...(description ? ([["meta", { property: "og:description", content: description }]] as [string, Record<string, string>][]) : []),
    ];
  },

  themeConfig: {
    logo: { src: "/logo.svg", alt: repo },
    siteTitle: repo,
    socialLinks: [{ icon: "github", link: repoUrl }],
    search: {
      provider: "local",
      options: {
        locales: {
          ar: {
            translations: {
              button: { buttonText: "بحث", buttonAriaLabel: "بحث" },
              modal: {
                displayDetails: "عرض التفاصيل",
                resetButtonTitle: "مسح البحث",
                backButtonTitle: "إغلاق البحث",
                noResultsText: "لا توجد نتائج لـ",
                footer: {
                  selectText: "اختيار",
                  selectKeyAriaLabel: "إدخال",
                  navigateText: "تنقّل",
                  navigateUpKeyAriaLabel: "السهم لأعلى",
                  navigateDownKeyAriaLabel: "السهم لأسفل",
                  closeText: "إغلاق",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
        },
      },
    },
    outline: { level: [2, 3] },
  },
});
