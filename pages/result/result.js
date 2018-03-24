// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameResult:0,
    resultImport:"不错不错"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var rText = "";
    if (options.id==100){
      rText = "天啊！这是我见过最完美的答案。"
    } else if (options.id < 100 && options.id>=90){
      rText = "厉害厉害，你真是太聪明了！"
    } else if (options.id < 90 && options.id >= 80) {
      rText = "你离学霸只差一次测试啦！"
    } else if (options.id < 80 && options.id >=70) {
      rText = "还有很大的上升空间哦，赶紧再练一次吧！"
    } else if (options.id < 70 && options.id >= 60) {
      rText = "小样儿，我看好你啦，加油练吧！"
    } else{
      rText = "偷偷告诉你，拿高分的同学都是练出来的！"
    }
    this.setData({
      gameResult: options.id,
      resultImport:rText
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
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '算数充电宝',
      path: '/page/result/result?id=' + this.data.gameResult,
      success: function (res) {
        console.log("转发成功");
        // 转发成功
      },
      fail: function (res) {
        console.log("转发失败");
        // 转发失败
      }
    }
  },
  bindFocus:function(){
    wx.redirectTo({
      url: '/pages/game/game'
    }) 
  }
})