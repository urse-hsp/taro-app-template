import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import preConfig from './pre'
import prodConfig from './prod'

const path = require('path')

const envMap = {
  development: devConfig,
  pre: preConfig,
  production: prodConfig,
}
// 获取当前环境变量
const currentEnv = process.env.NODE_ENV || 'development'
console.info(`当前环境变量:${currentEnv}`)

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'template-app',
    date: '2026-7-10',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`, // 多端同步调试/各个平台使用独立的目录互不影响
    plugins: ['@tarojs/plugin-platform-xhs'],
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false // 👈 关键：关闭预编译以绕过该错误
      }
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    // alias 目录别名，从而方便书写代码引用路径
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '~@': path.resolve(__dirname, './'),
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource', // 适用于 Webpack 5+
        },
      ],
    },
    mini: {
      // 开启智能提取分包依赖
      optimizeMainPackage: {
        enable: true,
        exclude: [
          path.resolve(__dirname, '../src/utils/moduleName.js'),
          (module) => module.resource?.indexOf('moduleName') >= 0,
        ],
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true, // 💥 忽略 CSS 顺序冲突
      },

      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
      }
    },
    rn: {
      appName: 'taroDemo',
      entry: 'app',
      output: {
        ios: './ios/main.jsbundle',
        iosAssetsDest: './ios',
        android: './android/app/src/main/assets/index.android.bundle',
        androidAssetsDest: './android/app/src/main/res',
        // iosSourceMapUrl: '',
        iosSourcemapOutput: './ios/main.map',
        // iosSourcemapSourcesRoot: '',
        // androidSourceMapUrl: '',
        androidSourcemapOutput: './android/app/src/main/assets/index.android.map',
        // androidSourcemapSourcesRoot: '',
      },
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }

  // if (process.env.NODE_ENV === 'development') {
  //   // 本地开发构建配置（不混淆压缩）
  //   return merge({}, baseConfig, devConfig)
  // }
  // 生产构建配置（默认开启压缩混淆等）
  // return merge({}, baseConfig, prodConfig)

  // dev本地开发构建配置（不混淆压缩）
  // pre/pro生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, envMap[currentEnv])
})
