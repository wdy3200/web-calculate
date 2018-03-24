// pages/game/game.js
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      count:10,              //题目总数量
      numerical:10,          //数值范围
      allType: ['+', '-', '×','÷'],         //设置中包括的算数符号
      currentNum:1,         //第几题
      calType:['+'],         //设置中包括的算数符号
      equationText:'',        //随机生成的算式信息
      preEquation:'',       //上一道题的算式及答案
      currentTime:'00:00',  //所用时间
      flag:"",             //上一题对错，显示背景色
      result:'',          //输入的算式结果
      trueNum:0             //正确的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var problemData = getApp().globalData.problem;
    // console.log(problemData);
    var tempType = [];
    for (var i = 0; i < problemData.algorithm.length;i++){
      tempType.push(_this.data.allType[problemData.algorithm[i]]);
    }
    // console.log(tempType);
    
    // 初始化数据
    _this.setData({
      count: problemData.count,                                   //题目总数
      numerical: problemData.numerical,                           //数值范围
      calType: tempType,                                          //算数符号
    })
    // 随机生成算式
    if (problemData.numCount==2){ //生成2位数的题
      _this.setData({
        equationText: getEquation(problemData.numerical, tempType), //随机生成算式--对象
      })
    } else if (problemData.numCount == 3){  //生成3位数的题
      _this.setData({
        equationText: getEquationThree(problemData.numerical, tempType), //随机生成算式--对象
      })
    }
    console.log();
  //  计时器
    var i = 0;
    var j = 0;
    var timer = setInterval(function () {
      i++;
      var temp = '';
      if(i<60){
        temp = i < 10 ? "00:0" + i : "00:" + i;
      }else if(i>=60 && i<3600){
        j = parseInt(i/60);
        temp = j < 10 ? "0" + j : "" + j;
        j = i%60;
        temp += ":" + (j < 10 ? "0" + j : "" + j);
      } else if (i >= 3600){
          temp = "慢羊羊"
      }
      // 设置当前所用时间
      _this.setData({
        currentTime: temp   
      })
    }, 1000);
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
  
  },

  /**
   * 按下数字,改变计算结果
   */
  numBtn:function(e){
    var temp = parseInt(this.data.result ? this.data.result : 0)*10 + parseInt(e.target.dataset.num);
    // 最大值为999999999
    if(temp<=9999999999){
      this.setData({
        result: temp
      })
    }
  },

  /**
   * 清除计算结果
   */
  clearBtn:function(e){
    this.setData({
      result: ''
    })
  },

  /**
   * 提交 开始下一题
   */
  nextBtn: function(e){
     var _this = this;
     var temp;
    //  console.log(_this.data.result);
     //没有填入答案
     console.log(parseInt(_this.data.result));
     if (isNaN(parseInt(_this.data.result))) {
       wx.showToast({
         title: "答案为空",
         icon: "none",
         duration: 1000,
       })
       return;
     }
    //  console.log(_this.data);
    // 1.判断答案是否正确 正确+1，错误-1
    if(_this.data.result == _this.data.equationText.result){
      // 答案正确 背景色为绿色
      _this.setData({
        trueNum: ++_this.data.trueNum,
        flag: "#09bb07",
        preEquation: _this.data.equationText.allEquation
      })
    }else{
      // 答案错误 背景色为红色
      _this.setData({
        flag: "#e64340",
        preEquation: _this.data.equationText.allEquation
      })
    }
    // 2.试题数量是否等于试题总数
    if (_this.data.currentNum >= _this.data.count){ // 2.1 题做完了---显示测试结果
      var scores = parseInt(_this.data.trueNum * 100 / _this.data.count);
      var scoreObj = {
        time: util.formatTime(new Date()),
        scores: scores
      };
      var record;
      // 将成绩存储
      try{
        if (wx.getStorageSync('record')){
          record = wx.getStorageSync('record');
        }else{
          record = {
            recordArr:[]
          };
        }
        record.recordArr.push(scoreObj);
        // console.log(record);
        wx.setStorageSync("record",{
          recordArr: record.recordArr
        })
      }catch(e){

      }
      wx.redirectTo({
        url: '/pages/result/result?id=' + scores
      }) 
    } else {  // 2.2题没做完----试题数量+1  继续下一题
      var tempType = _this.data.calType;
      var problemData = getApp().globalData.problem;
      // 随机生成算式
      if (problemData.numCount == 2) { //生成2位数的题
        _this.setData({
          equationText: getEquation(problemData.numerical, tempType), //随机生成算式--对象
        })
      } else if (problemData.numCount == 3) {  //生成3位数的题
        _this.setData({
          equationText: getEquationThree(problemData.numerical, tempType), //随机生成算式--对象
        })
      }

      _this.setData({
        currentNum: ++ _this.data.currentNum,
        result: ''
      })
    }
  }
})
  /**
   * 随机生成算式  + *不限制数字   2个数参与运算
   * maxNum:数值最大值
   * typeArr：算式符号数组
   */
function getEquation(maxNum,typeArr){
  var currentType = typeArr[Math.floor(Math.random() * typeArr.length)];
  // console.log(currentType);
  var x = Math.floor(Math.random() * maxNum);  //  x：数字1
  var y = Math.floor(Math.random() * maxNum);  //  y：数字2
  var r;  //运算结果
  if (currentType == '-'){
    while (x < y) {    //'-' ：必须满足第一个数大于等于第二个数
      x = Math.floor(Math.random() * maxNum);
      y = Math.floor(Math.random() * maxNum);
    }
    r = x - y;
    // console.log(x + "-" + y);
  } else if (currentType == '÷'){
    while (x%y!=0 || y==0) {    //'/' ：必须满足除数不为0且能整除（针对小学数学）
      x = Math.floor(Math.random() * maxNum);
      y = Math.floor(Math.random() * maxNum);
    }
    r = x/y;
    // console.log(x+"/"+y);
  } else if (currentType == '+'){
    r = x + y;
  } else if (currentType == '×') {
    r = x * y;
  }
  var temp = {
    firstNum:x,
    secondNum:y,
    calType: currentType,
    equation:x + " " + currentType+" "+y+" = ",
    allEquation: x + " " + currentType + " " + y + " = "+r,
    result: r
  }
  return temp;
}
/**
   * 随机生成算式  + *不限制数字   3个数参与运算
   * maxNum:数值最大值
   * typeArr：算式符号数组
   */
function getEquationThree(maxNum, typeArr){
  var typeOne = typeArr[Math.floor(Math.random() * typeArr.length)];  //第一个运算符号
  var typeTwo = typeArr[Math.floor(Math.random() * typeArr.length)];  //第二个运算符号
  // console.log(currentType);
  var x = Math.floor(Math.random() * maxNum);  //  x：数字1
  var y = Math.floor(Math.random() * maxNum);  //  y：数字2
  var z = Math.floor(Math.random() * maxNum);  //  y：数字2
  var r;  //运算结果
  var tempResult; //计算了两个数字后的中间结果
  if ((typeOne == '+' || typeOne == '-') && (typeTwo == '×' || typeTwo == '÷')){  //计算顺序，从右到左
    if (typeTwo == '×'){  //1.判断第二个算数符号
      tempResult = y * z;
    } else if (typeTwo == '÷'){
      while (y % z  != 0 || z == 0) {    //'/' ：必须满足除数不为0且能整除（针对小学数学）
        y = Math.floor(Math.random() * maxNum);
        z = Math.floor(Math.random() * maxNum);
      }
      tempResult = y / z;
    }
    if (typeOne == '+'){  //2.判断第一个算数符号
      r = x + tempResult;
    } else if (typeOne == '-'){
      while (x < tempResult) {    //'-' ：必须满足第一个数大于等于第二个数
        x = Math.floor(Math.random() * maxNum);
      }
      r = x - tempResult;
    } 
  } else if ((typeOne == '×' || typeOne == '÷') || ((typeOne == '+' || typeOne == '-') && (typeTwo == '+' || typeTwo == '-'))) {//计算顺序，从左到右
    if (typeOne == '×'){    //判断第一个算式符号
      tempResult = x * y;
    } else if (typeOne == '÷'){
      while (x % y != 0 || y == 0) {    //'/' ：必须满足除数不为0且能整除（针对小学数学）
        x = Math.floor(Math.random() * maxNum);
        y = Math.floor(Math.random() * maxNum);
      }
      tempResult = x / y;
    } else if (typeOne == '+'){
      tempResult = x + y;
    } else if (typeOne == '-'){
      while (x < y) {    //'-' ：必须满足第一个数大于等于第二个数
        x = Math.floor(Math.random() * maxNum);
        y = Math.floor(Math.random() * maxNum);
      }
      tempResult = x - y;
    }
    if (typeTwo == '×'){//判断第二个算式符号
      r = tempResult * z;
    } else if (typeTwo == '÷'){
      while (tempResult % z != 0 || z == 0) {    //'/' ：必须满足除数不为0且能整除（针对小学数学）
        z = Math.floor(Math.random() * maxNum);
      }
      r = tempResult / z;
    } else if (typeTwo == '+') {
      r = tempResult + z;
    } else if (typeTwo == '-') {
      while (tempResult < z) {    //'-' ：必须满足第一个数大于等于第二个数
        z = Math.floor(Math.random() * maxNum);
      }
      r = tempResult - z;
    }
  }
  var temp = {
    firstNum: x,
    secondNum: y,
    thirdNum:z,
    typeOne: typeOne,
    typeTwo:typeTwo,
    equation: x + " " + typeOne + " " + y + " " + typeTwo + " " + z + " = ",
    allEquation: x + " " + typeOne + " " + y + " " + typeTwo + " " + z + " = " + r,
    result: r
  }
  return temp;
}