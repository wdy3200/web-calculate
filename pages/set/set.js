// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numerical:[
      { size: "10", text: "10以内",check:true},
      { size: "20", text: "20以内" },
      { size: "100", text: "100以内"}
    ],
    algorithm:[
      {rule:"0",text:"+",check:true},
      { rule: "1", text: "-", check: false },
      { rule: "2", text: "×", check: false },
      { rule: "3", text: "÷", check: false }
    ],
    numberCount: [
      {num: "2", text: "2位",check: true },
      { num: "3", text: "3位"}
    ],
    count:['10',"20","50","100"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取前一次设置的值
    var _this = this;
    wx.getStorage({
      key: "problemType",
      success: function (res) {
        // console.log(res.data);
        // console.log(_this.data);
        //单选框的值--数值
        var temp = _this.data.numerical;
        for (var i = 0; i < temp.length;i++){
          if (temp[i].size == res.data.numerical){
            temp[i].check = true;
          }else{
            temp[i].check = false;
          }
        }
        _this.setData({
          numerical:temp
        })
        //复选框的值
        var temp = _this.data.algorithm;
        for(var i = 0; i<temp.length;i++){
          for (var j = 0; j < res.data.algorithm.length;j++){
            if (temp[i].rule == res.data.algorithm[j]) {
              temp[i].check = true;
              break;
            } else {
              temp[i].check = false;
            }
          }
        }
        _this.setData({
          algorithm: temp
        })
        //题目数量
        var temp = _this.data.count;
        for (var i = 0; i < temp.length;i++){
          if (temp[i] == res.data.count){
            _this.setData({
              index: i
            })
          }
        }
        //单选框的值--题目数量
        var temp = _this.data.numberCount;
        console.log(temp);
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].num == res.data.numCount) {
            temp[i].check = true;
          } else {
            temp[i].check = false;
          }
        }
        _this.setData({
          numberCount: temp
        })
      }
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
    var _this = this;
    wx.getStorage({
      key: "problemType",
      success: function (res) {
        // console.log(res.data);
        // console.log(_this.data);
        //单选框的值--数值
        var temp = _this.data.numerical;
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].size == res.data.numerical) {
            temp[i].check = true;
          } else {
            temp[i].check = false;
          }
        }
        _this.setData({
          numerical: temp
        })
        //复选框的值
        var temp = _this.data.algorithm;
        for (var i = 0; i < temp.length; i++) {
          for (var j = 0; j < res.data.algorithm.length; j++) {
            if (temp[i].rule == res.data.algorithm[j]) {
              temp[i].check = true;
              break;
            } else {
              temp[i].check = false;
            }
          }
        }
        _this.setData({
          algorithm: temp
        })
        //题目数量
        var temp = _this.data.count;
        for (var i = 0; i < temp.length; i++) {
          if (temp[i] == res.data.count) {
            _this.setData({
              index: i
            })
          }
        }
        //单选框的值--题目数量
        var temp = _this.data.numberCount;
        console.log(temp);
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].num == res.data.numCount) {
            temp[i].check = true;
          } else {
            temp[i].check = false;
          }
        }
        _this.setData({
          numberCount: temp
        })
      }
    })
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
  
  },
  // 单选框
  radioChange: function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  radioNumConChange:function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  // 复选框
  bindCheckboxChange: function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
  },
  // 滚动选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 提交表单
   */
  formSubmit: function (e) {
    // console.log(e.detail.value);
    // 设置复选框默认值
    var tempAlgo=["0"];
    if (e.detail.value.algo.length>0){
      tempAlgo = e.detail.value.algo;
    }
    // 设置值存储为对象
    var tempData = {
      numerical: e.detail.value.num,
      numCount: e.detail.value.numCon,
      algorithm: tempAlgo,
      count: this.data.count[e.detail.value.con] ? this.data.count[e.detail.value.con] : 10
    };
    // 改变全局变量的设置值
    getApp().globalData.problem = tempData;
    wx.setStorage({
      key: 'problemType',
      data: tempData,
    })
    wx.showToast({
      title:"设置成功",
      icon:"success",
      duration:2000,
      complete:function(){
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/index/index'
          })
        },1000)
      }
    })
   },
})