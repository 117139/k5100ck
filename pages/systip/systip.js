//logs.js
var pageState = require('../../utils/pageState/index.js')
const util = require('../../utils/util.js')
const app =getApp()
Page({
  data: {
    sysres: [],
		oid:'',
		ycl:false
  },
  onLoad: function (option) {
		// wx.showLoading()
    if(option.code){
			this.getorderxq(option.code)
		}
		// this.getorderxq(option.code)

  },
	onReady(){
		// wx.hideLoading()
	},
	back:function(){
		wx.navigateBack()
	},
	sub:function(){
		let that= this
		console.log(1)
		wx.request({
			url: app.IPurl1+'user_shipper',
			data:{
				op:'setorder',
				key:app.jkkey,
				tokenstr:wx.getStorageSync('tokenstr'),
				order_info_id:that.data.oid
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				console.log(res)
				
				if(res.data.error==-2){
					app.checktoken(res.data.error)
					that.onLoad()
				}
				if(res.data.error==0){
					let resultd=res.data
					console.log(res.data)
					that.setData({
						ycl:true
					})
					wx.showToast({
						title:res.data.returnstr
					})
					// that.setData({
					// 	sysres:resultd.list,
					// 	oid:res.data.info.order_info_id
					// })
				}else{
					wx.showToast({
						icon:'none',
						title:res.data.returnstr
					})
				}
			}
		})
	},
	getorderxq(code){
		const pageState1 = pageState.default(this)
		pageState1.loading()    // 切换为loading状态
		// http://water5100.800123456.top/WebService.asmx/user_shipper
		let that = this 
		wx.request({
			url:  app.IPurl1+'user_shipper',
			data:{
				op:'orderinfo',
				key:app.jkkey,
				tokenstr:wx.getStorageSync('tokenstr'),
				delivery_code:code
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				console.log(res)
				
				if(res.data.error==-2){
					app.checktoken(res.data.error)
					that.onLoad()
				}
				if(res.data.error==0){
					let resultd=res.data
					console.log(res.data)
					that.setData({
						sysres:resultd.list,
						oid:res.data.info.order_info_id
					})
				}
				if(res.data.error==1){
					let resultd=res.data
					console.log(res.data)
					that.setData({
						sysres:resultd.list,
						ycl:true
					})
				}
				if(res.data.error==2){
					let resultd=res.data
					console.log(res.data)
					// that.setData({
					// 	sysres:resultd.list,
					// 	ycl:true
					// })
					
					wx.navigateBack()
					wx.showToast({
						icon:'none',
						title:'无已支付订单'
					})
				}
				pageState1.finish()    // 切换为finish状态
				  // pageState1.error()    // 切换为error状态
			},
			fail() {
				 pageState1.error()    // 切换为error状态
			}
		})
	},
	onRetry(){
		this.onLoad()
	}
})
