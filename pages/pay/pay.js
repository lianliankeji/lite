// pages/pay/pay.js
Page({
  data: {
    integralQRCode: "../image/qr.404.png",
    scoreResult: 0,
    hiddenLoading: true
  },
  bindHomeViewTap: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  onLoad: function (options) {
     console.log("交易积分", options)
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      hiddenLoading: false
    });
    var scoreArr = wx.getStorageSync('scoreArr');
    var scoreResult = wx.getStorageSync('scoreResult');
    if (scoreArr) {
      that.setData({
         scoreResult: options.score,
        hiddenLoading: true
      })
    }
  }

})