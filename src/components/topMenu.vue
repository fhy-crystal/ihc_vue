<template>
	<div>
		<div class="top top-gray">
			<img src="../assets/logo.png" class="pull-left">	
			<h3 class="pull-left">智慧星运维平台</h3>
			<ul class="pull-right top-content">
				<li class="top-txt">您好！<span>{{nickname}}</span></li>
				<li class="top-line">|</li>
				<li><a @click="logout">退出</a></li>
			</ul>
		</div>
		<div class="nav">
			<ol class="navol clearfix">
				<router-link :to="menu.path" tag="li" v-for="menu in menus" key="menu.path"><a>{{menu.name}}</a></router-link>
			</ol>
		</div>
	</div>
</template>

<script type="text/javascript">
	import menuConfig from "../config/menu.js"
	import Cookies from 'js-cookie'

	export default {
		data () {
			return {
				menus : menuConfig.top
			}
		},
		computed:{
			nickname() {
				let userName = Cookies.get('userName')
				if (userName) {
					return userName;
				} else {
					this.logout();
				}
			}
		},
		methods:{
			logout() {
				Cookies.remove('userName');
				Cookies.remove('ReqUserId');
				Cookies.remove('ReqUserSession');
				this.$router.push('/login');
			}
		}
	}

</script>

<style type="text/css" scoped>
	/*头部logo部分*/
	.top {
		margin-bottom: 0;
		padding: 0 30px;
		min-height: 45px;
		border: 0;
		border-radius: 0;
	}
	.top-gray {
		height: 43px;
		background-color: #ebeef0;
	}
	.top img{
		margin: 0 10px;
		padding: 8px;
		width: 109px;
	}
	.top h3{
		display: inline-block;
		margin:0 5px;
		font-family: "宋体";
		font-weight: bolder;
		line-height: 43px;
		font-size:24px;
	}

	.top-txt{
		padding: 0 10px;
		line-height: 45px;
	}
	.top-line{
		line-height: 44px;
		color: #bfc2c2;
	}
	.top-content > li{
		display: inline-block;
	}
	.top-content > li > a {
		display: block;
		padding: 0 10px;
		line-height: 45px;
		cursor: pointer;
	}
	.top-content > li > a:focus, .top-content > li > a:hover {
		background-color: transparent;
	}

	/*菜单栏*/
	.nav {
		height: 34px;
		background: #20A0FF;
	}
	.navol {
		display: block;
		margin:0;
		padding: 0;
		list-style: none;
	}
	.navol > li {
		float: left;
		margin: 0;
		padding: 0;
		height: 34px;
		text-align: center;	
		letter-spacing: 0.05em;
		border-right: 1px solid #1D8CE0;
	}
	.navol > li.active,
	.navol > li:hover,
	.navol > li:focus {
		background: #1D8CE0;
	}
	.navol > li > a {
		display: block;
		padding: 0 20px;
		height: 34px;
		line-height: 32px;
		color: #ffffff;
	}
	.nav li.router-link-active {
		background-color: #1D8CE0;
	}
</style>