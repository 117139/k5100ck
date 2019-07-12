//logs.js
const app = getApp()

Page({
  data: {
    array: ['公司1','公司2','公司3'],
		tel:'',
		gsidx:0,
		setstate:0,
		time:60,
		wxcode:'',
		tokenstr:''
  },
  onLoad: function (option) {
		console.log(1)
			// this.setData({
			// 	wxcode:wx.getStorageSync('appcode'),
			// 	tokenstr: wx.getStorageSync('tokenstr')
			// })
  },
	//提交表单
	formSubmit(e) {
		let that =this
	  console.log('form发生了submit事件，携带数据为：', e.detail.value)
		let formresult=e.detail.value
		if(formresult.tel==''){
			wx.showToast({
				title: '账号不能为空',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if (formresult.pwd=='') {
			wx.showToast({
				title: '密码不能为空',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		//http://water5100.800123456.top/WebService.asmx/user_shipper_login
    wx.showLoading({
      title: '正在登陆',
      mask:true
    })
		wx.request({
			url:  app.IPurl1+'user_shipper_login',
			data:  {
					key:'server_mima',
					// code:res.code,
					// tokenstr:that.data.tokenstr,
					// nickname:uinfo.nickName,
					// headpicurl:uinfo.avatarUrl,
					user_name :formresult.tel,
					password:formresult.pwd,
		    },
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
        wx.hideLoading()
				console.log(res.data)
				if(res.data.error==0){
					wx.reLaunch({
						url:'/pages/index/index'
					})
					wx.setStorageSync('login', 'login')
					wx.setStorageSync('tokenstr', res.data.tokenstr)
				}else{
					wx.showToast({
						icon:'none',
						title:res.data.returnstr
					})
				}
			},
      fail(err){
        wx.hideLoading()
        console.log(res.data)
				wx.showToast({
					icon:'none',
					title:'操作失败'
				})
      }
		})
		// wx.showModal({
		// 	title:JSON.stringify(e.detail.value)
		// })
		// wx.setStorageSync('login', 'login')
		// wx.reLaunch({
		// 	url:'/pages/index/index'
		// })
	}
	
})
