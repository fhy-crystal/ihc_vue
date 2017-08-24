<template>
	<div class="container">
		<div class="form-signin">
			<h2 class="form-signin-heading">登录</h2>
			<div class="login-wrap">
				<input type="text" class="form-control uname" placeholder="用户名" v-model="userInfo.phone" autofocus/>
				<input type="password" class="form-control psw" placeholder="密码" v-model="userInfo.password"/>
				<button class="btn btn-lg btn-login btn-block" id="submit" @click="doLogin()">登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import SHA1 from 'crypto-js/sha1'
	import MD5 from 'crypto-js/md5'
	import * as Cookies from 'js-cookie'

	import API from '../config/api'
	import key from '../config/key'


	export default {
		name: 'hello',
		data () {
			return {
				userInfo: {
					phone: '',
					password: ''
				},
				timestamp: ''
			}
		},
		watch: {
			// 监视timestamp，得到后再执行登录操作
			timestamp(val) {
				let postBody = {
					'phone' : this.userInfo.phone,
					'password' : SHA1(this.userInfo.password + key.password).toString()
				};
				let header = {
					'timestamp': this.timestamp
				};
				API.login.login(postBody, header).then((data) => {
					if (data.status == 0) {
						Cookies.set('userName', data.nickname);
						Cookies.set('ReqUserId', data.userid);
						Cookies.set('ReqUserSession', data.loginsession);
						this.$router.push('/ircodeTvManage/ircodeManage');
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			} 
		},
		methods: {
			// 获取timestamp
			doLogin() {
				API.login.getTimeStamp().then((data) => {
					if (data.status == 0) {
						this.timestamp = data.timestamp;
					} else {
						this.$store.dispatch('newNotice', data.msg)
					}
				}, (data) => {
					this.$store.dispatch('newNotice', data.msg)
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login-body {
		background-color: #f1f2f7;
	}

	.form-signin {
		max-width: 330px;
		margin: 100px auto 0;
		background: #fff;
		border-radius: 5px;
		-webkit-border-radius: 5px;
	}

	.form-signin h2.form-signin-heading {
		margin: 0;
		padding:20px 15px;
		text-align: center;
		background: #20a0ff;
		border-radius: 5px 5px 0 0;
		-webkit-border-radius: 5px 5px 0 0;
		color: #fff;
		font-size: 18px;
		text-transform: uppercase;
		font-weight: 300;
		font-family: 'Open Sans', sans-serif;
	}

	.form-signin .form-control {
		position: relative;
		font-size: 16px;
		height: auto;
		padding: 10px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.form-signin .form-control:focus {
		z-index: 2;
	}
	.form-signin input[type="text"], .form-signin input[type="password"] {
		margin-bottom: 15px;
		border-radius: 5px;
		-webkit-border-radius: 5px;
		border: 1px solid #eaeaea;
		box-shadow: none;
		font-size: 12px;
	}

	.form-signin .btn-login {
		background: #20A0FF;
		color: #fff;
		text-transform: uppercase;
		font-weight: 300;
		font-family: 'Open Sans', sans-serif;
		box-shadow: 0 4px #1D8CE0;
		margin-bottom: 20px;
	}

	.login-wrap {
		padding: 20px;
	}
</style>
