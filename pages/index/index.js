//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay:'true',
    duration:'500',
    interval:'3000',
    internet:false,
    moive:null,
    swiperImgUrl:[
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2567998580.webp",
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2568577681.webp",
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.webp"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMoive()
  },
  loadMoive(){
    wx.showToast({
      title: '正在加载...',
      icon:'loading',
      duration:10000
    })
    let that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      header:{
        'content-type':'json'
      },
      method:'GET',
      success:function(res){
        console.log(res)
        let subject = res.data.subjects;
        that.setData({moive:subject})
        wx.hideToast()
      },
      fail(err){
        setTimeout(() => {
          that.setData({
            internet: true
          })
        },10000)
      }
    })
  }
})