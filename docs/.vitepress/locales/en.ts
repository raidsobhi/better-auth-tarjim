import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";
import { npmUrl, repoUrl, version } from "../shared";

const sidebar: DefaultTheme.Sidebar = [
  {
    text: "Introduction",
    items: [
      { text: "Getting started", link: "/guide/getting-started" },
      { text: "Usage", link: "/guide/usage" },
      { text: "Recipes", link: "/guide/recipes" },
      { text: "FAQ", link: "/guide/faq" },
    ],
  },
  {
    text: "Reference",
    items: [
      { text: "API reference", link: "/reference/api" },
      { text: "Error codes", link: "/reference/error-codes" },
      { text: "Architecture", link: "/reference/architecture" },
    ],
  },
  {
    text: "Project",
    items: [
      { text: "Contributing", link: `${repoUrl}/blob/main/CONTRIBUTING.md` },
      { text: "Changelog", link: `${repoUrl}/blob/main/CHANGELOG.md` },
    ],
  },
];

export const en: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: "en-US",
  description:
    "Arabic error messages and toasts for Better Auth, built for shadcn/ui. Every error code, kept in sync with each Better Auth release.",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started", activeMatch: "/guide/" },
      { text: "Reference", link: "/reference/api", activeMatch: "/reference/" },
      {
        text: `v${version}`,
        items: [
          { text: "Changelog", link: `${repoUrl}/blob/main/CHANGELOG.md` },
          { text: "Contributing", link: `${repoUrl}/blob/main/CONTRIBUTING.md` },
          { text: "npm", link: npmUrl },
        ],
      },
    ],
    sidebar: { "/guide/": sidebar, "/reference/": sidebar },
    editLink: {
      pattern: `${repoUrl}/edit/main/docs/:path`,
      text: "Edit this page on GitHub",
    },
    lastUpdated: { text: "Last updated", formatOptions: { dateStyle: "medium" } },
    footer: {
      message: "Released under the MIT License. An unofficial community package, not affiliated with Better Auth.",
      copyright: "Copyright © 2026 better-auth-tarjim contributors",
    },
  },
};
