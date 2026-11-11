// Flips the default theme's CSS for the Arabic (dir="rtl") locale. See VitePress > i18n > RTL support.
import postcssRTLCSS from "postcss-rtlcss";

export default {
  plugins: [
    postcssRTLCSS({
      ltrPrefix: ':where([dir="ltr"])',
      rtlPrefix: ':where([dir="rtl"], [dir="rtl"] *)',
    }),
  ],
};
