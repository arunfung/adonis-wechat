'use strict'

const axios = require('axios');

/** @type {import('@adonisjs/framework/src/Config')} */
const Config = use('Config')
const appId = Config.get('wechat.appId')
const redirectUri = Config.get('wechat.redirectUri')
const appSecret = Config.get('wechat.appSecret')

class WechatController {
  oauth ({ request, response }) {

    // const all = request.all();

    const  url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +'&redirect_uri='+ redirectUri +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    response.redirect(url)
  }

  async oauthCallback({request, response}) {

    const code = request.input('code')
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + appSecret + '&code=' + code + '&grant_type=authorization_code';

    async function getOriginal(data) {

      const accessToken = data.access_token;
      const openid = data.openid;

      const url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN';
      return await axios.get(url)
        .then(function (res) {
          // handle success

          return res.data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }


    const userData = await axios.get(url)
      .then(function (res) {
        // handle success

        return getOriginal(res.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    response.json(userData)
  }

}

module.exports = WechatController
