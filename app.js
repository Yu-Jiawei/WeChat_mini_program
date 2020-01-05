//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'course-demo-f3iik',
        traceUser: true,
      })}
    this.getFavorNote()
    this.getSupportNote()
    
  
   
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    favorNote: {},
    supportNote:{},
    notes: null,
  },
  getFavorNote: function () {
    console.log("getFavorNote")
    const db = wx.cloud.database()
    db.collection('note_favor').field({
      sid: true,
      _id: true
    }).get({
      success: res => {
        let notes = new Array(res.data.length + 1);
        let counterIds = new Array(res.data.length + 1);
        res.data.forEach(function (item, index) {
          notes[item.sid] = true
          counterIds[item.sid] = item._id
        })
        console.log(notes, counterIds)
        this.globalData.favorNote = {
          notes: notes,
          counterIds: counterIds
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error(' [数据库] [查询记录] 失败:', err)
      }
    })

  },
   getSupportNote: function () {
    console.log("getSupportNote")
    const db = wx.cloud.database()
    db.collection('note_support').field({
      sid: true,
      _id: true
    }).get({
      success: res => {
        let notes = new Array(res.data.length + 1);
        let supportIds = new Array(res.data.length + 1);
        res.data.forEach(function (item, index) {
          notes[item.sid] = true
          supportIds[item.sid] = item._id
        })
        console.log(notes, supportIds)
        this.globalData.supportNote = {
          notes: notes,
          supportIds: supportIds
        }
       
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error(' [数据库] [查询记录] 失败:', err)
      }
    })

  },
})