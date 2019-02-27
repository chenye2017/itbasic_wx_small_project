import {LeaveModel} from '../../model/leaveModel.js'

import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

let leave = new LeaveModel()

let asktype = ["事假", "病假", "婚假", "丧假", "公假", "工伤", "产假", "护理假", "其他", "年假", '陪产假', 'homeworking', '产检']


Date.prototype.Format = function (fmt) { //author: meizz  
  var o = {
    "M+": this.getMonth() + 1,                 //月份  
    "d+": this.getDate(),                    //日  
    "h+": this.getHours(),                   //小时  
    "m+": this.getMinutes(),                 //分  
    "s+": this.getSeconds(),                 //秒  
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
    "S": this.getMilliseconds()             //毫秒  
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}





Page({
  data: {
    placeShow: false,
    show: false,
    typeShow: false,
    type: [{text:'请假'}, {text:'调休', disabled:true}],
    asktype: '请假',
    asktypeindex: 0,
    typetypeShow: false,
    asktypetype:asktype[0],
    asktypetypeindex:1,
    array: [],
    typetype: asktype,
    startShow: false,
    minDate: new Date('2017-01-01 00:00:00').getTime(),
    maxDate: new Date('2030-01-01 00:00:00').getTime(),
    currentDate: new Date().getTime(),
    start: new Date().Format("yyyy-MM-dd hh:mm:ss"),
    end: new Date().Format("yyyy-MM-dd hh:mm:ss"),
    textarea:"textarea"
  },
  onLoad: function () {
    var that = this;
   

    wx.getStorage({
      key: 'token',
      success: (res) => {
        
        let token = res.data
        this.setData({
          token
        })
      // 获取我的请假记录
        let mP = leave.getMyLeave(1, 3, token)
        let aP = leave.getAllLeave({token,page:1})
        let pP = leave.getWaitMeLeave({token, page:1, status:0})
        let oP = leave.getOrgListForLeave({token})

        mP.then((res) => {
          that.setData({
            myCount: res.data.count,
            myLeave: res.data.result
          })
        })

        aP.then((res)=> {
          console.log(res)
          that.setData({
            allCount: res.data.all_leave_count,
            allLeave: res.data.all_leave
          })
        })

        pP.then((res) => {
          that.setData({
            approvalCount: res.data.count || 0,
            approvalLeave: res.data.result || []
          })
        })

        oP.then((res) => {
            console.log(res.data)
            that.setData({
              array:res.data,
              askplace: res.data[0].orgname,
              askname: res.data[0].name,
              askid:res.data[0].manage
            })
        })


      },
    })
    

  },
  placeChange: function(event) {
      let data = event.detail.value
      this.setData({
        askname:data.name,
        askid: data.manage,
        askplace: data.orgname
      })
  },
  placeConfirm: function(event) {
    
    this.setData({
      placeShow:false
    })
  },
  placeCancel: function(event) {
    this.setData({
      placeShow:false
    })
  },
  placeList:function(event) {
    this.setData({
      placeShow:true
    })
  },
  typeList:function(event) {
    this.setData({
      typeShow: true
    })
  },
  typeChange:function(event) {
    let data = event.detail.value
    
    this.setData({
      asktype:data.text,
      asktypeindex:data.index
    })
  },
  typeCancel:function(event) {
    this.setData({
      typeShow:false
    })
  },
  typeConfirm:function(event) {
    this.setData({
      typeShow:false
    })
  },
  typetypeList: function(event) {
    this.setData({
      typetypeShow: true
    })
  },
  typetypeConfirm: function(evnet) {
    this.setData({
      typetypeShow: false
    })
  },
 typetypeCancel: function(event) {
   this.setData({
     typetypeShow: false
   })
 },
 typetypeChange: function(event) {
   let data = event.detail.value
   let index = event.detail.index * 1 + 1
  
   this.setData({
     asktypetype:data,
     asktypetypeindex:index
   })
 },
 startList: function(event) {
   this.setData({
     startShow:true
   })
 },
 startConfirm: function(event) {
   this.setData({
     startShow: false
   })
 },
 startCancel: function(event) {
   this.setData({
     startShow: false
   })
 },
 startChange: function(event) {
   // event.detail 就是组件实例
   let array = event.detail.getValues();
   let start = array[0]+'-'+array[1]+'-'+array[2]+' '+ array[3]+':'+array[4]+':00'
    this.setData({
    start
  })
 },
 endList: function(event) {
   this.setData({
     endShow:true
   })
 },
 endConfirm: function(event) {
   this.setData({
     endShow: false
   })
 },
 endCancel: function(event) {
   this.setData({
     endShow:false
   })
 },
 endChange: function(event) {
   let array = event.detail.getValues()
   let end = array[0]+'-'+array[1]+'-'+array[2]+' ' + array[3]+':'+array[4]+':00'
   console.log(end)
   this.setData({
     end
   })
 },
lengthConfirm: function(event) {
  let length = event.detail
  this.setData({
    length
  })
},
reasonConfirm: function(event) {
  let reason = event.detail
  this.setData({
    reason
  })
}

 ,leaveSubmit: function(event) {
   let token = this.data.token
   let leaveType = this.data.asktypeindex
   let reasontype = this.data.asktypetypeindex
   let reason = this.data.reason || '测试的呢'
   let timelength = this.data.length || 1
   let starttime = this.data.start
   let endtime = this.data.end
   let askid= this.data.askid

   let params = {
     token,
     leave_type:leaveType,
     reasontype:reasontype,
     reason,
     starttime,
     endtime,
     timelength,
     askid
   }


   
   let aP = leave.addLeave(params)
   aP.then((res) => {
     if(res.data.code === 0) {
       Toast.success('新增成功');
     } else {
       Toast.fail(res.data.msg);
     }
   })
 },
  onPullDownRefresh: function () {
    console.log('ss')
    let token = wx.getStorageSync('token')
    let mP = leave.getMyLeave(1, 3, token)
    mP.then((res) => {
      
      this.setData({
        myLeave: res.data.result,
        myCount: res.data.count
      })
      wx.stopPullDownRefresh();
    })
    
  }

});