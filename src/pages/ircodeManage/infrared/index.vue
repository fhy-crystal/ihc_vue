<template>
  	<div class="content clearfix">
		<left-menu></left-menu>
		<router-view></router-view>
  	</div>
</template>

<script>
  	import LeftMenu from '../../../components/leftMenu.vue'
	import configMenu from '../../../config/menu'

	export default {
		name: 'ircodeManage',
		components: {
			LeftMenu
		},
		data () {
			return {
				menuInfo: configMenu.ircodeManage
			}
		}
	}
</script>

<style type="text/css">
	.pull-right>.form-control{
		display: inline-block;
		width:400px;
		margin-right: 30px;
	}
	.panel-heading>.little{
		line-height: 30px;
	}
	.panel-heading>.little>span{
		margin-right:30px;
		color:#999;
	}
	.danger{
		color:red !important;
	}
	.el-table{
		font-size:13px !important;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>