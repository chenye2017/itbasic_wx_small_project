// components/calendar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    number: {
      type:String,
      observer(newVal) {
        let index = newVal
        let time = new Date();
        let year = time.getFullYear()
        let month = time.getMonth()
        month = this.data.monthArr[month]

        if (index < 10) {
          index = '0'+ index
        }

        this.setData({
          _index: index,
          year : year,
          month: month
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    monthArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: '',
    month: '',
    _index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
