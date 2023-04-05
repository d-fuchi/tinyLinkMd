import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: 'TinyLinkMD',
  description: 'TinyLinkMD',
  version: '0.1.0',
  permissions: ['tabs', 'activeTab', 'storage', "scripting", "clipboardWrite"],
  host_permissions: ["<all_urls>"],
  action: {
    default_popup: 'popup.html',
  },
  // content_scripts: [
  //   {
  //     matches: ["<all_urls>"],
  //   }
  // ],
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Alt+L',
      }
    }
  },
  // icons: {
  //   '16': 'images/icon-16.png',
  //   '32': 'images/icon-32.png',
  //   '48': 'images/icon-48.png',
  //   '128': 'images/icon-128.png',
  // },
})

export default defineConfig({
  plugins: [crx({ manifest })],
  resolve: {
    alias: {
      "src/popup.ts": "src/popup.ts",
    }
  }
})
