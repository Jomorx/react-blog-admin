import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
// import postcssPresetEnv from 'postcss-preset-env'
import path from "path"
import viteCompression from "vite-plugin-compression"

// import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      threshold: 1024 * 20 // 对大于 1mb 的文件进行压缩
    })
  ],
  resolve: {
    alias: {
      "@var": path.resolve(__dirname, "../src/base"),
      "@": path.resolve(__dirname, "../src")
    }
  },

  server: {
    port: 7070
  },
  // optimizeDeps: {
  //   exclude: [] // 将指定数组中的依赖不进行依赖预构建
  // },
  envPrefix: "ENV_",
  envDir: "env"
  // css:{
  //     preprocessorOptions:{
  //         less:{

  //         }
  //     },
  //     postcss:{
  //         plugins:[postcssPresetEnv({
  //             importFrom: path.resolve(__dirname,"../src/base/variable.css")
  //         })],
  //     },
  //     devSourcemap:true
  // },
  // base: "./"
  // root:path.resolve(__dirname,"../public"),
})
