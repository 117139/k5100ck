//app.js
App({
	IPurl1:'http://water5100.800123456.top/WebService.asmx/',
	jkkey:'server_mima',
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
		this.checkSession_1()
		this.getusersetting()
		let login=wx.getStorageSync('login')
		if(login!=='login'){
			wx.reLaunch({
				url:'/pages/login/login'
			})
		}
  },
	// 获取用户信息
	getusersetting(){
		wx.getSetting({
		  success: res => {
		    console.log('16app'+JSON.stringify(res))
		    if (res.authSetting['scope.userInfo']==true) {
		      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					var login = wx.getStorageSync('login')
					// if(login!='login'){
					// 	wx.reLaunch({
					// 		url:'/pages/login/login'
					// 	})
					// }else{
					// 	wx.reLaunch({
					// 	  url: '/pages/index/index',
					// 		fail(err) {
					// 			console.log("失败: " + JSON.stringify(err));
					// 		}
					// 	})
					// }
		      wx.getUserInfo({
		        success: res => {
		          
		          // 可以将 res 发送给后台解码出 unionId
		          this.globalData.userInfo = res.userInfo
							console.log(res)
		          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		          // 所以此处加入 callback 以防止这种情况
		          // if (this.userInfoReadyCallback) {
		          //   this.userInfoReadyCallback(res)
		          // }
		        }
		      })
		    }else{
		      wx.reLaunch({
		        url: '/pages/shouquan/shouquan',
		        fail: (err) => {
		          console.log("失败: " + JSON.stringify(err));
		        }
					})
		    }
		  }
		})
	},
	//检查session_key
	checkSession_1(){
		let that =this
	  wx.checkSession({
	    success(res) {
				console.log(res)
	      // session_key 未过期，并且在本生命周期一直有效
	      console.log("session_key 未过期，并且在本生命周期一直有效")
	    },
	    fail() {
	      // session_key 已经失效，需要重新执行登录流程
	      console.log("session_key 已经失效")
	      // 重新登录
	     that.dologin()
	    }
	  })
	},
	checktoken(res){
		if(res==-2){
			
			this.dologin()
			wx.showToast({
				icon:'none',
				title:'登录过期请重新登录!'
			})
		}
	},
	//登录
	dologin(){
		
		console.log('dologin')
		 wx.reLaunch({
			url:'/pages/login/login'
		})
		// let that =this
		/*wx.login({
		  success: function (res) {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				
				console.log(that.IPurl1)
		    // const url =   
		    let data = {
					key:'server_mima',
					code:res.code
		    }
				let rcode=res.code
				console.log(res.code)
				wx.request({
					url:  that.IPurl1+'user_shipper_login',
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'POST',
					success(res) {
						console.log(res.data)
						if(res.data.error==2){
							wx.setStorageSync('tokenstr', res.data.tokenstr)
							wx.setStorageSync('appcode', rcode)
							wx.reLaunch({
								url:'/pages/login/login'
							})
						}
					}
				})
		  }
		})*/
	},
  globalData: {
    userInfo: null
  }
})