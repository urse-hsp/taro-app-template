import {Component, PropsWithChildren} from 'react';
import {View, Text} from '@tarojs/components';

import style from './index.module.scss'
// import './index.scss'

export default class Index extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // console.log('🔍 STYLE OBJECT:', JSON.stringify(style)); // ← 加这一行

    return (
      <View className={style['index']}>
        <Text className={style['index-text']}>Hello world!</Text>
      </View>
    );
  }
}
