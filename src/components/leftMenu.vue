<template>
	<div class="lnavbar clearfix">
		<ul class="list-unstyled listactive">
			<li>
				<router-link :to="menu.path" v-for="menu in menuInfo.ircodeList" key="menu.path">{{menu.name}}</router-link>
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
	.lnavbar > ul{
		margin-top: 7px;
		padding-bottom: 20px; 
		list-style: none;
	}
	.lnavbar > ul > li{
		min-height: 45px;
		line-height: 45px;
		padding-left: 30px ;
		text-align: left;
	}
	/*.lnavbar > ul > li:first-child{
		margin-bottom: 10px;
		border-bottom: 1px solid #dedee1;
		font-weight: bold;
		font-size: 15px;
	}*/
	.lnavbar ul > li > a{
		color: #333333;
		display: block;
	}
	
	.lnavbar a.router-link-active{
		color: #20A0FF;
		cursor: pointer;
	}
</style>