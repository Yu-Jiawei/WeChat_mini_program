// component/bookcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickin:function(e){
      console.log("success!")
      wx.navigateTo({
        url:`../rec-detail/rec-detail?name=${this.data.item.name}&author=${this.data.item.author}
        &poster=${this.data.item.src}&intro_author=${this.data.item.intro_author}&intro_book=${this.data.item.intro_book}`,
      })
    }

  }
})
