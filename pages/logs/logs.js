//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    record: [],
    isRecordNull:true
  },
  onLoad: function () {
    // console.log(this.data.record);
    var record,tempFlag;
    try {
      var res = wx.getStorageSync('record');
      if (res) {
        record = res;
        tempFlag = false;
      } else {
        record = {
          recordArr: []
        };
        tempFlag = true;
      }
      // console.log(res);
    } catch (e) {
      // Do something when catch error
    }
    console.log(record);
    this.setData({
      record: record.recordArr,
      isRecordNull: tempFlag
    })
  },
  onShow: function () {
    var record, tempFlag;
    try {
      var res = wx.getStorageSync('record');
      if (res) {
        record = res;
        tempFlag = false;
      } else {
        record = {
          recordArr: []
        };
        tempFlag = true;
      }
    } catch (e) {
    }
    this.setData({
      record: record.recordArr,
      isRecordNull: tempFlag
    })
  },
})
