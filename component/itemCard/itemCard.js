// component/itemCard/itemCard.js
var app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    favor: false,
    support:false,
    counterId: null,
    supportId:null
  },
  pageLifetimes: {
    show: function () {
      let states = app.globalData.favorNote;
      let index = this.properties.item.id;
      if(states.notes[index]!=null){
        this.setData({
          favor: states.notes[index],
          counterId: states.counterIds[index]
        })
      }
      else{}

      let state = app.globalData.supportNote;
      if (state.notes[index] != null) {
        this.setData({
          support: state.notes[index],
          supportId: state.supportIds[index]
        })
      }
      else { }
    }
    },
  //    shows: function () {
  //     let states = app.globalData.supportNote;
  //     let index = this.properties.item.id;
  //     console.log("s",states)
  //     if (states.notes[index] != null) {
  //       this.setData({
  //        support: states.notes[index],
  //         supportId: states.supportIds[index]
  //       })
  //     }
  //     else { }

  //   }
  // },

  /**
   * 组件的方法列表
   */
  methods: {
  
    handleFavor: function () {
      this.setData({
        favor: !this.data.favor
      })
      console.log(this.data.favor)
      if (this.data.favor) {
        this.favorNote();
      } else {
        this.disfavorNote();
      }
    },
    handleSupport:function(){

      this.setData({
        support:!this.data.support
      })
    if(this.data.support) {
      this.supportNote();
      
    } else {
      this.dissupportNote();
    }
  },


    favorNote: function () {
      const db = wx.cloud.database()
      db.collection('note_favor').add({
        data: {
          sid: this.properties.item.id,
          content:this.properties.item.content,
          writer:this.properties.item.write,

          favor: true
        },
        success: res => {
          this.setData({
            counterId: res._id,
            count: 1
          })
          wx.showToast({
            title: '已收藏',
          })
          console.log(' [数据库] [新增记录] 成功,记录_ id: ', res._id)
          //更新全局变量
          app.globalData.favorNote.notes[this.properties.item.id] = true
          app.globalData.favorNote.counterIds[this.properties.item.id] = this.data.counterId


        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败: ', err)
        }
      })
    },
    //取消收藏句子，从云数据库删除
    disfavorNote: function () {
      if (this.data.counterId) {
        const db = wx.cloud.database()
        db.collection('note_favor').doc(this.data.counterId).remove({
          success: res => {
            wx.showToast({
              title: '已取消收藏',
            })
            this.setData({
              counterId: ' ',
              count: null,
            })
            //更新全局变量
            app.globalData.favorNote.notes[this.properties.item.id] = false
            app.globalData.favorNote.counterIds[this.properties.item.id] = undefined

          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: ' 删除失败',
            })
            console.error('[数据库] [删除记录] 失败: ', err)
          }
        })
      } else {
        wx.showToast({
          title:
            '无counterId,该语句还未收藏',
        })
      }


    },
    //点赞
    supportNote: function () {
      const db = wx.cloud.database()
      db.collection('note_support').add({
        data: {
          sid: this.properties.item.id,
          content: this.properties.item.content,
          writer: this.properties.item.write,
          support: true
        },
        success: res => {
          this.setData({
            supportId: res._id,
            count: 1
          })
          wx.showToast({
            title: '已点赞',
          })
          console.log(' [数据库] [新增记录] 成功,记录_ id: ', res._id)
          //更新全局变量
          app.globalData.supportNote.notes[this.properties.item.id] = true
          app.globalData.supportNote.supportIds[this.properties.item.id] = this.data.supportId


        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败: ', err)
        }
      })
    },
    //取消收藏句子，从云数据库删除
    dissupportNote: function () {
      if (this.data.supportId) {
        const db = wx.cloud.database()
        db.collection('note_support').doc(this.data.supportId).remove({
          success: res => {
            wx.showToast({
              title: '已取消点赞',
            })
            this.setData({
              supportId: ' ',
              count: null,
            })
            //更新全局变量
            app.globalData.supportNote.notes[this.properties.item.id] = false
            app.globalData.supportNote.supportIds[this.properties.item.id] = undefined

          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: ' 删除失败',
            })
            console.error('[数据库] [删除记录] 失败: ', err)
          }
        })
      } else {
        wx.showToast({
          title:
            '无 supportId,该语句还未点赞',
        })
      }




    },
  
   
},


})
