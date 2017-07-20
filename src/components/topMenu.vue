<template>
	<div>
		<div class="navbar navbar-gray">
			<img src="../assets/logo.png" class="pull-left">	
			<h3 class="pull-left">智慧星运维平台</h3>
			<ul class="pull-right nav">
				<li class="navbar-txt">您好！<span>{{nickname}}</span></li>
				<li class="navbar-line">|</li>
				<li><a @click="logout" class="pointer">退出</a></li>
			</ul>
		</div>
		<div class="subnav">
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
	/*header nav*/
	.navbar {
	  min-height: 45px;
	  margin-bottom: 0;
	  padding:0 30px;
	  border: 0;
	  border-radius: 0;
	}
	.navbar-gray {
		background-color: #ebeef0;
		height: 43px;
	}
	.navbar img{
		margin: 0 10px;
		padding: 8px;
	}
	.navbar h3{
		display: inline-block;
		margin:0 5px;
		font-family: "宋体";
		font-weight: bolder;
		line-height: 43px;
		font-size:24px;
	}
	.nav{
		margin:0;
	}
	.navbar-txt{
		line-height: 45px;
		padding: 0 10px;
	}
	.navbar-line{
		color: #bfc2c2;
		line-height: 44px;
	}
	.nav>li{
		display: inline-block;
	}
	.nav>li>a {
	  display: block;
	  line-height: 45px;
	  padding: 0 10px;
	}
	.nav>li>a:focus, .nav>li>a:hover {
	  background-color: transparent;
	}

	/*菜单栏*/
	.subnav{
		background: #00a0e1;
		height: 34px;
	}
	.navol{
		display: block;
		list-style: none;
		padding: 0;
		margin:0;
	}
	.navol > li{
		margin: 0;
		padding: 0;
		float: left;
		height: 34px;
		text-align: center;	
		letter-spacing: 0.05em;
		border-right: 1px solid #1583af;
	}
	.navol > li.active,
	.navol > li:hover,
	.navol > li:focus{
		background: #1583af;
	}
	.navol > li > a {
		color: #ffffff;
		line-height: 32px;
		padding: 0 20px;
		height: 34px;
		display: block;
	}
	.navol > li > a > img{
		position: relative;
		top: -1px;
	}
	.subnav li.router-link-active{
		background-color:#1583af;
	}
	.pointer{
		cursor:pointer;
	}
</style>