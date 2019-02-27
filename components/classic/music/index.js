// components/classic/music/index.js
const myBehaviors = require('../behavior.js')

const backAudio = wx.getBackgroundAudioManager();



Component({
  /**
   * 组件的属性列表
   */
  behaviors: [myBehaviors],
  properties: {
    play: {
      type:Boolean,
      value: false
    },
    classic_music: {
      type:String,
      value: '',
      observer(newVal) {
        console.log(newVal)
        console.log(backAudio.src)
        if (backAudio.src == newVal) {
          this.setData({
            play: true
          })
        }
      }
    },
    classic_music_title: {
      type:String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type_url: '../music/images/music.png'
  },

  attached(event) {
    
    this._listen()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick: function() {
      
      backAudio.src = this.properties.classic_music
      backAudio.title = this.properties.classic_music_title
      backAudio.epname = this.properties.classic_music_title
      backAudio.singer = this.properties.classic_music_title
      backAudio.coverImgUrl = this.properties.classic_url
      console.log('click')
      let play = this.properties.play;
      console.log(play)
      play = !play;
      this._switch(play)

      if (play) {
        console.log('sss')
        backAudio.play()
      } else {
        console.log('pause')
        backAudio.pause()
        console.log('pause1')
      }
    },

    _listen:function() {
      console.log(backAudio)
      backAudio.onPlay(() => {
        console.log('play')
        this._switch(true)
      }),
      backAudio.onPause(()=>{
        console.log('pasue')
        this._switch(false)
      }),
      backAudio.onStop(()=>{
        this._switch(false)
      }),
      backAudio.onEnded(()=>{
        this._switch(false)
      })
    },

    _switch: function(play) {
      console.log(play)
      this.setData({
        play: play
      })
     
    }
  }
})
