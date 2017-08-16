// pages/peer/peer.js
Page({
  data: {
     num:0,
    peers: [],
    height: 0,
    blocks: [],
    loadMoreMsg:'加载更多',
    isBlockShow: false  //区块显示
    // hiddenLoading:false
  },
  loadMore(){
     let that = this;
     this.data.num++;
     for (var i = this.data.height - 1 - this.data.num * 4, index = 0; i > this.data.height - 5- this.data.num*4; i-- , index++) {
         if(i < 0){
            this.setData({
               loadMoreMsg: '没有更多了'
            })
            return
         }
        wx.request({
           url: 'https://store.lianlianchains.com/chain/blocks/' + i,
           data: {
           },
           header: {
              'content-type': 'application/json'
           },
           success: function (res) {
                 if (res.data.stateHash) {
                    that.data.blocks.push(res.data.stateHash)
                 }

                 that.setData({
                    'blocks': that.data.blocks,
                    hiddenLoading: true
                 })

           }
        })
     }
  },
  //分享模块
  onShareAppMessage: function () {
    return {
      title: '链信息',
      path: "pages/peer/peer",
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  onCommenEvent: function () {
    var that = this
    // hiddenLoading:false;
    
    // 节点信息
    wx.request({
       url: 'https://store.lianlianchains.com/network/peers',
      data: {
         
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        that.setData({
          'peers': res.data.peers,
        })
      }
    })

    // 区块信息
    wx.request({
       url: 'https://store.lianlianchains.com/chain',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        that.setData({
          'height': res.data.height - 1
        })

        for (var i = res.data.height - 1, index = 0; i > res.data.height - 5; i-- , index++) {

          wx.request({
             url: 'https://store.lianlianchains.com/chain/blocks/' + i,
            data: {
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (that.data.blocks.length <= 3) {
                 if (res.data.stateHash){
                    that.data.blocks.push(res.data.stateHash)
                 }
                 
                that.setData({
                  'blocks': that.data.blocks,
                  hiddenLoading: true
                })
              }
            //   if (that.data.blocks.length > 3) {
            //     wx.stopPullDownRefresh();
            //   }

            }
          })
        }
      }
    })
   //关闭下拉刷新
    var timer = setTimeout(function () {
       wx.stopPullDownRefresh();
       wx.hideNavigationBarLoading()
       clearTimeout(timer)
    }, 2000)
    
  },
  onLoad: function (options) {
    
  },
  onShow(){
      // 页面初始化 options为页面跳转所带来的参数
      var that = this;
      that.onCommenEvent();
  },
  // 事件处理
  bindBlockTap: function (event) {
    var index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '../block/block?index=' + index
    })
  },
  //显示区块内容隐藏节点内容
  bindBlockNavTap(event) {
    this.setData({
      isBlockShow: true
    })
  },
  //显示节点内容隐藏区块内容
  bindNodeNavTap(event) {
    this.setData({
      isBlockShow: false
    })
  },
  onPullDownRefresh() {
     wx.showNavigationBarLoading()
     this.setData({
        num:0
     })
     this.onCommenEvent();
  }
})