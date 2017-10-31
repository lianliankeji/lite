// import fetch from '../utils/fetch.js';
const ccId = "6574714a89d14f50448ba41ca3db17029523be445bacdbcf3b5d1ee3abe19a5e";
const movieccid = "eb9a1541d67eccba8c576fcdf009b559dedbc629d8ece3a1afb20371255840d9"

//区块链积分查询
export function query(refereeid) {
   return new Promise((resolve, reject) => {
      wx.request({
         url: 'https://store.lianlianchains.com/app/query',
         data: {
            acc: refereeid, //openid
            amt: "",
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: ccId,
            func: "query",//查询积分
         },
         header: { 'content-type': 'application/x-www-form-urlencoded' },
         method: "GET",
         success: function (res) {
            resolve(res.data)
         },
         fail: function (msg) {
            console.log('reqest error', msg)
            reject('fail')
         }
      })
   })
}

//区块链积分充值
export function recharge(refereeid, amt) {
   return new Promise((resolve, reject) => {
      wx.request({
         url: 'https://store.lianlianchains.com/app/invoke',
         data: {
            acc: refereeid, //openid
            // acc:"qqq",
            amt: amt,
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: ccId,
            func: "recharge",//增加积分
         },
         header: { 'content-type': 'application/x-www-form-urlencoded' },
         method: "GET",
         success: function (res) {
            resolve(res.data)
         },
         fail: function (msg) {
            console.log('reqest error', msg)
            reject('fail')
         }
      })
   })
   // fetch({
   //    url: "/app/invoke",
   //    // baseUrl: "http://192.168.50.157:9999",
   //    baseUrl: "https://store.lianlianchains.com",
   //    data: {
   //       acc: refereeid, //openid
   //       // acc:"qqq",
   //       amt: amt,
   //       reacc: "",//对方的openid 转移积分时这个字段才有否则为空
   //       ccId: ccId,
   //       func: "recharge",//增加积分
   //       // func:"transfer",//转移积分
   //       // func: "takeCash",//减少积分
   //    },
   //    noLoading: true,
   //    method: "GET",
   //    header: { 'content-type': 'application/x-www-form-urlencoded' }
   //    // header: { 'content-type': 'application/json' }
   // }).then(result => {
   //    console.log(result);
   //    console.log("充值成功");
   // }).catch(err => {
   //    console.log("出错了")
   //    console.log(err)
   // });
}

//区块链积分减少
export function takeCash(refereeid, amt) {
   fetch({
      url: "/app/invoke",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://store.lianlianchains.com",
      data: {
         acc: refereeid, //openid
         // acc:"qqq",
         amt: amt,
         reacc: "",//对方的openid 转移积分时这个字段才有否则为空
         ccId: ccId,
         // func: "recharge",//增加积分
         // func:"transfer",//转移积分
         func: "takeCash",//减少积分
      },
      noLoading: true,
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
   }).then(result => {
      console.log(result);
      console.log("交易成功");
   }).catch(err => {
      console.log("出错了")
      console.log(err)
   });
}

//区块链积分转移
export function transfer(refereeid1, refereeid2, amt) {
   return new Promise((resolve, reject) => {
      wx.request({
         url: 'https://store.lianlianchains.com/app/invoke',
         data: {
            acc: refereeid1, //openid
            // acc:"qqq",
            amt: amt,
            reacc: refereeid2,//对方的openid 转移积分时这个字段才有否则为空
            ccId: ccId,
            func: "transfer",//转移积分
         },
         header: { 'content-type': 'application/x-www-form-urlencoded' },
         method: "GET",
         success: function (res) {
            resolve(res.data)
         },
         fail: function (msg) {
            console.log('reqest error', msg)
            reject('fail')
         }
      })
   })
   // fetch({
   //    url: "/app/invoke",
   //    // baseUrl: "http://192.168.50.157:9999",
   //    baseUrl: "https://store.lianlianchains.com",
   //    data: {
   //       acc: refereeid1, //openid
   //       // acc:"qqq",
   //       amt: amt,
   //       reacc: refereeid2,//对方的openid 转移积分时这个字段才有否则为空
   //       ccId: ccId,
   //       // func: "recharge",//增加积分
   //       func: "transfer",//转移积分
   //       // func: "takeCash",//减少积分
   //    },
   //    noLoading: true,
   //    method: "GET",
   //    header: { 'content-type': 'application/x-www-form-urlencoded' }
   //    // header: { 'content-type': 'application/json' }
   // }).then(result => {
   //    console.log(result);
   //    console.log("交易成功");
   // }).catch(err => {
   //    console.log("出错了")
   //    console.log(err)
   // });
}

export function moviekaihu(acc, usr) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://192.168.10.100/frt/register',
      // url: 'https://store.lianlianchains.com/frt/register',
      data: {
        acc: acc, //openid
        usr: usr,
        ccId: movieccid,
        func: "account",//转移积分
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "GET",
      success: function (res) {
        resolve(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        reject('fail')
      }
    })
  })
}
export function moviekaihuquery(acc, usr) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://192.168.10.100/frt/query',
      // url: 'https://store.lianlianchains.com/frt/register',
      data: {
        acc: acc, //openid
        usr: usr,
        ccId: movieccid,
        func: "queryAcc",//转移积分
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "GET",
      success: function (res) {
        resolve(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        reject('fail')
      }
    })
  })
}

export function moviequery(acc, usr) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://192.168.10.100/frt/query',
      // url: 'https://store.lianlianchains.com/frt/query',
      data: {
        acc: acc, //openid
        usr: usr,
        ccId: movieccid,
        func: "query",
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "GET",
      success: function (res) {
        resolve(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        reject('fail')
      }
    })
  })
}

export function moviedetails(usr) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://192.168.10.100/frt/query',
      data: {
        usr: usr,
        ccId: movieccid,
        func: "queryTx",
        begSeq: 1,
        endSeq: 5
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "GET",
      success: function (res) {
        resolve(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        reject('fail')
      }
    })
  })
}

