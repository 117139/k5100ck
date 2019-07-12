//logs.js
const util = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
    array: [],
		goods:[],
		gsidx:0,
		store_house_name:'',
		ordercount:0,
  },
  onLoad: function () {
   
     // console.log(util.formatTime1(new Date()))
			this.setData({
				gsidx:util.formatTime1(new Date())
			})
			this.getOrder(this.data.gsidx)
  },
	bindGsChange(e){
		console.log('picker发送选择改变，携带值为', e)
		console.log('picker发送选择改变，携带值为', e.detail.value)
		let timearr=e.detail.value.split('-')
		console.log(timearr)
		timearr[1]=timearr[1]-1+1
		timearr[2]=timearr[2]-1+1
    this.setData({
      gsidx: timearr[1]+'月'+timearr[2]+'日'
    })
		this.getOrder(timearr[1]+'月'+timearr[2]+'日')
	},
	getOrder(time){
		
			wx.showLoading()
		//http://water5100.800123456.top/WebService.asmx/user_shipper
		let that = this
		wx.request({
			url:  app.IPurl1+'user_shipper',
			data:{
				op:'orderselect',
				key:app.jkkey,
				tokenstr:wx.getStorageSync('tokenstr'),
				delivery_date:time
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
					// that.onLoad()
				}
				if(res.data.error==0){
					let resultd=res.data
					console.log(res.data)
					that.setData({
						store_house_name:resultd.store_house_name,
						ordercount:resultd.ordercount,
						goods:resultd.infolist
					})
					
				}
				wx.hideLoading()
			},
			fail() {
				wx.hideLoading()
			}
		})
	
	}
})
