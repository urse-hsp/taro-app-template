import type { UserConfigExport } from '@tarojs/cli'

import prodConfig from './prod'
import devConfig from './dev'

export default {
  ...prodConfig,
  env: {
    ...devConfig.env,
  },
} satisfies UserConfigExport<'webpack5'>
