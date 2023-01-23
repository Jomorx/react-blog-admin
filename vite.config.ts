import { defineConfig } from "vite"
import viteBaseConfig from "./config/vite.base.config"
import viteProdConfig from "./config/vite.prod.config"
import viteDevConfig from "./config/vite.dev.config"

const envResolver = {
  build: () => {
    console.log("生产环境")
    return { ...viteBaseConfig, ...viteProdConfig }
  },
  serve: () => {
    console.log("开发环境")
    return { ...viteBaseConfig, ...viteDevConfig } // 新配置里是可能会被配置envDir .envA
  }
}
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // 是build 还是serve主要取决于我们敲的命令是开启开发环境还是生产环境
  // console.log("process", process.cwd());
  // 当前env文件所在的目录
  // 第二个参数不是必须要使用process.cwd(),
  // const env = loadEnv(mode, process.cwd(), "");
  return envResolver[command]()
})
