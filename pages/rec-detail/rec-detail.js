// pages/home-detail/home-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    author:null,
    src: null,
    intro_author: null,
    intro_book: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {name,author,poster,intro_author,intro_book}=options;
    //console.log(poster);
    //console.log(intro_book);
    this.setData({
      name:name,
      author:author,
      src:poster,
      intro_author:intro_author,
      intro_book:intro_book,
    })

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