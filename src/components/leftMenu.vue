<template>
	<div class="lnavbar clearfix">
		<ul class="list-unstyled listactive">
			<li>{{menuInfo.name}}</li>
			<li>
				<router-link :to="menu.path" v-for="menu in menuInfo.list" key="menu.path">{{menu.name}}</router-link>
		</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data () {
			return {
				menuInfo: this.$parent.menuInfo
			}
		}
	}
</script>

<style type="text/css" scoped>
	/*--左边菜单栏*/
	.lnavbar{
		display: inline-block;
		float: left;
		width: 13%;
		min-height: 1080px;
		min-width: 120px;
	}
	.lnavbar ul{
		list-style: none;
	}
	.lnavbar > ul{
		list-style: none;
		margin-top: 7px;
		padding-bottom: 20px; 
	}
	.lnavbar ul > li{
		min-height: 45px;
		line-height: 45px;
		padding-left: 30px ;
		text-align: left;
	}
	.lnavbar > ul > li:first-child{
		border-bottom: 1px solid #dedee1;
		font-weight: bold;
		margin-bottom: 10px;
		font-size: 15px;
	}
	.lnavbar > ul > li:first-child a{
		font-size: 15px;
	}
	.lnavbar ul > li > a{
		color: #333333;
		display: block;
	}
	.sublist-unstyled {
		padding-left: 30px;
	}
	
	.lnavbar a.router-link-active{
		color: #009fe0;
		cursor: pointer;
	}
	li > .submenu{
		padding-left: 20px;
	}
	.lnavbar li > .submenu.router-link-active{
		background-color:#00a0e1;
		color:#fff;
	}
</style>