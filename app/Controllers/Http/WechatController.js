'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Config = use('Config')

const appid = Config.get('wechat.appid')
const redirectUri = Config.get('wechat.redirectUri')

class WechatController {
  oauth ({ request, response }) {
    const all = request.all();

    const  url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +'&redirect_uri='+ redirectUri +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    response.redirect(url)
  }
}

module.exports = WechatController
