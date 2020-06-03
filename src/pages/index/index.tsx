import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleShouquan = () => {
    Taro.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          Taro.getUserInfo({
            success: function (res) {
              console.log(res)
              /**
               * 之后再使用 Taro.login()方法获取code再结合微信信息上传后台获取openid, sessionKey, unionId等
               */
            }
          })
        }
      }
    })
  }

  handlePay = () => {
    /**
     * 调起支付 而且跟AppID有关系的(报错 requestPayment:fail no permission)
     */
    Taro.requestPayment({
      timeStamp: '1591168438',
      nonceStr: 'RFUhd54YZqSKn1PG',
      package: 'prepay_id=wx03151359132481b6dbc6272d1624921700',
      signType: 'MD5',
      paySign: '228AC5C95AFBE4C01D3C81FB6AA3E794',
      success: function (res) { },
      fail: function (res) { }
    })
  }

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Tracy Mcgrady',
      path: 'https://www.baidu.com'
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render() {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Button onGetUserInfo={this.handleShouquan} openType="getUserInfo">
          微信登录
        </Button>

        <Button onClick={this.handlePay}>
          微信支付
        </Button>

        <Button openType="share">
          微信分享
        </Button>
      </View>
    )
  }
}
