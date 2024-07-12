// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure you are using css-loader

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      defaultTheme: "dark",
    },
    icons: {
      defaultSet: "fa",
      aliases,
      sets: {
        fa,
        mdi,
      },
    },
  });
  app.vueApp.use(vuetify);
});
