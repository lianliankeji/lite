//request请求封装
export default function (param) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: param.baseUrl + param.url,
            data: param.data,
            header: param.header || { 'content-type': 'application/json' },
            method: param.method || "GET",// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
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