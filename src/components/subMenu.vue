<template>
	<div>
		<div class="nav">
			<ol class="navol clearfix">
				<router-link :to="menu.path" tag="li" v-for="menu in menus.subMenu" key="menu.path"><a>{{menu.name}}</a></router-link>
				<!-- <router-link :to="menu.path" v-for="menu in menuInfo.ircodeList" key="menu.path">{{menu.name}}</router-link> -->
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
				menus : this.$parent.menuInfo
			}
		}
	}

</script>

<style type="text/css" scoped>

	/*菜单栏*/
	.nav {
		height: 34px;
		background: #1D8CE0;
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
		border-right: 1px solid #0078d2;
	}
	.navol > li.active,
	.navol > li:hover,
	.navol > li:focus {
		background: #0078d2;
	}
	.navol > li > a {
		display: block;
		padding: 0 20px;
		height: 34px;
		line-height: 32px;
		color: #ffffff;
	}
	.nav li.router-link-active {
		background-color: #0078d2;
	}
</style>