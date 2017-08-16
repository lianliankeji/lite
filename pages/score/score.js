// pages/score/score.js
var utils = require('../../utils/util');
import { transfer } from '../../utils/score'
var app = getApp();
Page({
   data: {
      hiddenLoading: true,
      chaincodeID: '',
      tomobile: '',
      tip: '',
      tipflag: false,
      integralQRCode: "../../image/qr.404.png"
   },
   onLoad: function (options) {
      // 页面初始化 options为页面跳转所带来的参数
      var that = this;
      var scoreArr = wx.getStorageSync('scoreArr');
      if (scoreArr) {
         that.setData({
            integralQRCode: "https://store.lianlianchains.com/qrcode/?data=" + scoreArr[0] + "_" + app.globalData[scoreArr[1]] + "&width=202&height=202",
            tomobile: scoreArr[0],
            chaincodeID: app.globalData[scoreArr[1]]
         })
      }

   },
   bindSubmitTap: function (event) {
      var that = this
      var scoreArr = wx.getStorageSync('scoreArr');
      var mobile = wx.getStorageSync('mobile');
      var score = event.detail.value.score;
      var pw = event.detail.value.pw

      if (score == '' || pw == '') {
         that.setData({
            tipflag: true,
            tip: '请填写完整信息'
         })

         setTimeout(function () {
            that.setData({
               'tipflag': false
            })
         }
            , 3000)

         return
      }

      if (score <= 0) {
         that.setData({
            tipflag: true,
            tip: '交易积分必须大于0'
         })

         setTimeout(function () {
            that.setData({
               'tipflag': false
            })
         }
            , 3000)

         return
      }

      if (score > wx.getStorageSync('total')) {
         that.setData({
            tipflag: true,
            tip: '积分余额不足'
         })

         setTimeout(function () {
            that.setData({
               'tipflag': false
            })
         }
            , 3000)

         return
      }

      if (pw != wx.getStorageSync('pw')) {
         that.setData({
            tipflag: true,
            tip: '交易密码错误'
         })

         setTimeout(function () {
            that.setData({
               'tipflag': false
            })
         }
            , 3000)

         return
      }
      that.setData({
         hiddenLoading: false
      });

      transfer(mobile, this.data.tomobile, score).then(result => {
         console.log(result)

         if (result.code !== 0){
            that.setData({
               hiddenLoading: true
            })
            return
         }
         if (result.code == 0) {
            this._sendTemplate(event.detail.formId, score, result.msg);
         }
      }).catch(error => {
         console.log(error)
      })

   },
   _sendTemplate(formId, score, transactionID){
      let that = this;
      console.log('准备发送模板消息')
      
      wx.request({
         // url:'http://192.168.50.186:9888/wx/litesend',
         url: 'https://store.lianlianchains.com/wx/litesend',
         data: {
            "openid": wx.getStorageSync('user').openid,
            "templateid": "y6FU6brbCL-oo7yfJCi55Cxb5LIWV-LhLZ_66feKrJ8",
            "page": "pages/index/index",
            "formid": formId,
            "data": {
               "keyword1": {
                  "value": score + " BAE",
                  "color": "#000000"
               },
               "keyword2": {
                  "value": utils.formatTime(new Date()),
                  "color": "#333333"
               },
               "keyword3": {
                  "value": "积分交易",
                  "color": "#333333"
               },
               "keyword4": {
                  "value": transactionID,
                  "color": "#333333"
               }
            },
            "emphasis_keyword": "keyword1.DATA"
         },
         method: 'GET',
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log(res)
            console.log('发送模板消息')
            that.setData({
               hiddenLoading: true
            })
            wx.navigateTo({
               url: '../pay/pay?score=' + score
            })
         },
         fail:function(err){
            console.log(err)
         }
      })
   }

})