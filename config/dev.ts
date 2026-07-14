import type { UserConfigExport } from "@tarojs/cli";

export default {
   logger: {
    quiet: false,
    stats: true
  },
   env: {
    // NODE_ENV: 'development',
    APP_ENV: JSON.stringify('development'),
    APP_BASE_URL: JSON.stringify(''),
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport<'webpack5'>
