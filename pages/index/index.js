//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    },
	sys:function(){
		// wx.navigateTo({
		// 	url:'/pages/systip/systip?code=1309391988'
		// })
		// 只允许从相机扫码
		wx.scanCode({
			onlyFromCamera: true,
			success(res) {
				console.log(res)
				console.log(res.rawData)
				console.log(res.result)
				wx.navigateTo({
					url:'/pages/systip/systip?code='+res.result
				})
			}
		})
	},
	order:function(){
		wx.navigateTo({
			url:'/pages/order/order'
		})
	}
})
