// pages/moviedetail/moviedetail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scan:true,
    movielist: [
      {
        image: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=21932990,1087475642&fm=58",
        title: "无证之罪",
        desc: "主演：秦昊 邓家佳 姚橹 代旭 王真儿",
        id: 1
      },
      {
        image: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=154885729,169490224&fm=58&u_exp_0=3882819410,4131152110&fm_exp_0=86&bpow=800&bpoh=1174",
        title: "第七子",
        desc: "主演：杰夫·布里吉斯 本·巴恩斯 朱丽安·摩尔 基特·哈灵顿",
        id:2
      }
      
    ]
  },
  scoreView(e) {
    let mobile = wx.getStorageSync('mobile');
    if (mobile == '') {
      wx.navigateTo({
        url: '../bind/bind'
      });
    }
    if (mobile !== '') {
      wx.navigateTo({
        url: '../score/score',
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
          if (mobile == scoreArr[0]) {
            wx.showModal({
              showCancel: false,
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
  dataView() {
    wx.navigateTo({
      url: '../data/data',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})