//index.js
//获取应用实例
import fetch from '../../utils/fetch'
import { recharge, query, transfer, moviequery, moviekaihuquery, moviekaihu } from '../../utils/score'
var app = getApp()
Page({
   data: {
      hiddenLoading: true,
      integralQRCode: "../../image/404.png",
      patentQRCode: "../../image/404.png",
      userInfo: {},
      balance: 0,
      store: 0,
      total: 0,
      patent: 0,
      patentB: 0,
      prolist:[
        {
          img_url: "../../image/store.png",
          title: "智能新零售",
          score: "0 SCT",
          desc: "零售+AI,助力零售业健康转型"
        },
        {
          img_url: "../../image/movie.png",
          title: "影业新金融",
          score: "0 FRT",
          desc: "影业+金融,助力影视业持续发展"
        },
        
        {
          img_url: "../../image/exchange.png",
          title: "二手物交换",
          score: "0 EST",
          desc: "交换+社交，基于附近的物物交换"
        },
      ]
   },
   bindPageView(e) {
     console.log(e.currentTarget.dataset.index);
     let index = e.currentTarget.dataset.index;
     let unionId = wx.getStorageSync('unionId');
    //  if (!unionId) {
    //    wx.navigateTo({
    //      url: '../bind/bind'
    //    });
    //    return;
    //  }
     if(index === 1) {
      wx.navigateTo({
        url: '../moviedetail/moviedetail',
      })
     }

   },
   //分享模块
   onShareAppMessage: function () {
      return {
         title: '小链Lite',
         path: '/pages/index/index',
         success: function (res) {
            // 分享成功
         },
         fail: function (res) {
            // 分享失败
         }
      }
   },
   //事件处理函数
   bindViewTap: function () {
      wx.navigateTo({
         url: '../logs/logs'
      })
   },
   //跳转区块列表页
   bindBlockTap: function () {
      wx.navigateTo({
         url: '../peer/peer'
      })
   },
   //跳转用户注册页
   bindBindTap: function () {
      wx.navigateTo({
         url: '../bind/bind'
      });
   },
   //点击扫码触发的函数
   bindScanTap: function () {
      var that = this;
      let mobile = wx.getStorageSync('mobile');
      if (mobile == '') {
         wx.navigateTo({
            url: '../bind/bind'
         });
      }
      if (mobile !== '') {
         wx.scanCode({
            success: (res) => {
               var scoreArr = res.result.split("_");
               
               if (scoreArr[1] == 'health') {
                  wx.showToast({
                     title: '暂未开通',
                     icon: 'success',
                     image: '../../image/toast.png',
                     duration: 2000
                  })
                  return
               }
               if (mobile == scoreArr[0]){
                  wx.showModal({
                     showCancel:false,
                     content: '交易对象不能是自己',
                     success: function (res) {
                        if (res.confirm) { 
                           
                        } 
                     }
                  })
                  return
               }
               
               wx.setStorageSync('scoreArr', scoreArr);
               wx.navigateTo({
                  url: '../score/score'
               })

            }
         })
      }

   },
   //二维码图片预览 => jzf
   bindPreviewTap: function () {
      var that = this;
      var onoff = true;
      if (wx.getStorageSync('mobile') !== '') {
         wx.previewImage({
            current: that.data.integralQRCode, // 当前图片的http链接
            urls: [
               that.data.integralQRCode
            ] // 需要预览的图片http链接列表
         })
      } else if (wx.getStorageSync('mobile') == '') {
         wx.navigateTo({
            url: '../bind/bind'
         });
      }

   },
   bindPatentTap: function () {
      wx.showToast({
         title: '暂未开通',
         icon: 'success',
         image: '../../image/toast.png',
         duration: 2000
      })
   },
   _scoreQuery(unionId) {
     var that = this;
     //获取资产余额
     query(unionId).then(result => {
       console.log(result);
       console.log(unionId);
       console.log("快点查询成功",result);

       if (result == 'tx error') {
         that.data.prolist.setData({
           store: 0
         })
         return
       }
       that.data.prolist[0].score = result + " SCT";
       that.setData({
         prolist: that.data.prolist
       })
       wx.setStorageSync('total', result)
     }).catch(err => {
       console.log("出错了")
       console.log(err)
     });


    //  moviequery(unionId, unionId).then(result => {
    //    console.log(result);
    //    console.log("查询成功");
    //    that.data.prolist[0].score = result.msg + " FRT";
    //    that.setData({
    //      prolist: that.data.prolist
    //    })
    //  }).catch(err => {
    //    console.log("出错了")
    //    console.log(err)
    //  });
   },
   onCommenTap() {
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
         //更新数据
         that.setData({
            userInfo: userInfo
         })
      })
      var unionId = wx.getStorageSync('unionId');
      console.log(unionId)
      // if (unionId) {
        recharge(unionId, 0)
        this._scoreQuery(unionId)
        moviekaihuquery(unionId, unionId).then(kaihu => {
          console.log(kaihu)
          if (kaihu.msg == "0") {
            moviekaihu(unionId, unionId).then(() => {
              this._scoreQuery(unionId)
            })
          }
          if (kaihu.msg == "1") {
            this._scoreQuery(unionId)
          }
        }) 
      // }
      

      //测试数据
      // wx.setStorageSync('mobile', '18611426275');
      //获取数字资产 积分
      

      


      //获取智能合约二维码
      // if (mobile != '') {
      //    that.setData({
      //       integralQRCode: "https://store.lianlianchains.com/qrcode/?data=" + mobile + "_" + "stores&width=100&height=100",
      //       patentQRCode: "https://store.lianlianchains.com/qrcode/?data=" + mobile + "_" + "health&width=100&height=100"
      //    })
      // }
      //关闭下拉刷新
      var timer = setTimeout(function () {
         wx.stopPullDownRefresh();
         clearTimeout(timer)
      }, 2000)

   },
   onLoad: function () {


   },
   onShow() {
      this.onCommenTap();
   },
   onPullDownRefresh(){
      this.onCommenTap();
   }

})
