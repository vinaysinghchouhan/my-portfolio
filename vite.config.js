import { defineConfig } from 'vite'
import pug from 'pug'
import fs from 'node:fs'

function pugPlugin() {
  return {
    name: 'vite-plugin-pug',
    transformIndexHtml: {
      order: 'pre',
      handler(_html, ctx) {
        const pugPath = ctx.filename.replace(/\.html$/, '.pug')
        if (fs.existsSync(pugPath)) {
          return pug.renderFile(pugPath, {
            filename: pugPath,
            pretty: true,
          })
        }
      },
    },
  }
}

export default defineConfig({
  plugins: [pugPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
