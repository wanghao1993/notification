// rollup.config.ts
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolvejs from '@rollup/plugin-node-resolve'
import eslint from '@rollup/plugin-eslint'
import teser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' }
import swc from '@rollup/plugin-swc'
import os from 'os'
const env = process.env.NODE_ENV // 当前运行环境，可通过 cross-env 命令行设置
const { name } = pkg
const config = {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      // umd 导出文件的全局变量
      name,
      file: pkg.umd,
      format: 'umd'
    }
  ],
  plugins: [typescript(), commonjs(), resolvejs()]
}

if (env === 'production') {
  config.plugins.push(
    ...[
      teser({
        compress: true,
        maxWorkers: os.cpus().length,
        mangle: {
          toplevel: true
        }
      }),
      swc({
        jsc: {
          target: 'es5'
        },
        env: {
          // 编译结果相关配置
          targets: {
            // 编译结果需要适配的浏览器
            ie: '11' // 只兼容到 ie 11
          },
          corejs: '3' // corejs 的版本
        }
        // minify: true, // 此处不开启，teser更快
      })
    ]
  )
}

export default config
