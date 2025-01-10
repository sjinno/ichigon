import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src', // default: "."
  outDir: 'dist', // default: ".output",

  manifest: {
    permissions: ['storage'],
  },

  transformManifest(manifest) {
    manifest.name = 'Ichigon';
  },
});
