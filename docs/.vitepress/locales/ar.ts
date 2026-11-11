import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";
import { npmUrl, repoUrl, version } from "../shared";

const sidebar: DefaultTheme.Sidebar = [
  {
    text: "المقدمة",
    items: [
      { text: "البدء السريع", link: "/ar/guide/getting-started" },
      { text: "الاستخدام", link: "/ar/guide/usage" },
      { text: "وصفات جاهزة", link: "/ar/guide/recipes" },
      { text: "الأسئلة الشائعة", link: "/ar/guide/faq" },
    ],
  },
  {
    text: "المرجع",
    items: [
      { text: "مرجع الواجهة البرمجية", link: "/ar/reference/api" },
      { text: "رموز الأخطاء", link: "/ar/reference/error-codes" },
      { text: "البنية التقنية", link: "/ar/reference/architecture" },
    ],
  },
  {
    text: "المشروع",
    items: [
      { text: "المساهمة في المشروع", link: `${repoUrl}/blob/main/CONTRIBUTING.md` },
      { text: "سجل التغييرات", link: `${repoUrl}/blob/main/CHANGELOG.md` },
    ],
  },
];

export const ar: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: "ar",
  dir: "rtl",
  description:
    "رسائل أخطاء وإشعارات (Toast) عربية لمكتبة Better Auth، مصممة لـ shadcn/ui. تغطي كل رموز الأخطاء وتبقى متزامنة مع كل إصدار من Better Auth.",
  themeConfig: {
    nav: [
      { text: "الدليل", link: "/ar/guide/getting-started", activeMatch: "/ar/guide/" },
      { text: "المرجع", link: "/ar/reference/api", activeMatch: "/ar/reference/" },
      {
        text: `v${version}`,
        items: [
          { text: "سجل التغييرات", link: `${repoUrl}/blob/main/CHANGELOG.md` },
          { text: "المساهمة في المشروع", link: `${repoUrl}/blob/main/CONTRIBUTING.md` },
          { text: "npm", link: npmUrl },
        ],
      },
    ],
    sidebar: { "/ar/guide/": sidebar, "/ar/reference/": sidebar },
    editLink: {
      pattern: `${repoUrl}/edit/main/docs/:path`,
      text: "عدّل هذه الصفحة على GitHub",
    },
    lastUpdated: { text: "آخر تحديث", formatOptions: { dateStyle: "medium" } },
    docFooter: { prev: "الصفحة السابقة", next: "الصفحة التالية" },
    outline: { label: "في هذه الصفحة" },
    returnToTopLabel: "العودة إلى الأعلى",
    sidebarMenuLabel: "القائمة",
    darkModeSwitchLabel: "المظهر",
    lightModeSwitchTitle: "التبديل إلى المظهر الفاتح",
    darkModeSwitchTitle: "التبديل إلى المظهر الداكن",
    langMenuLabel: "تغيير اللغة",
    skipToContentLabel: "تخطَّ إلى المحتوى",
    footer: {
      message: "منشورة بموجب رخصة MIT. حزمة مجتمعية غير رسمية وغير تابعة لـ Better Auth.",
      copyright: "جميع الحقوق © 2026 مساهمو better-auth-tarjim",
    },
    notFound: {
      title: "الصفحة غير موجودة",
      quote: "ربما تغيّر الرابط أو نُقلت الصفحة إلى مكان آخر.",
      linkLabel: "العودة إلى الصفحة الرئيسية",
      linkText: "العودة إلى الرئيسية",
    },
  },
};
