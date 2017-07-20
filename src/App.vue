<template>
	<div id="app">
		<alert-bar></alert-bar>
		<top-menu v-if="isLogin"></top-menu>
		<router-view></router-view>
	</div>
</template>

<script>
	import AlertBar from './components/alertBar.vue'
	import TopMenu from './components/topMenu.vue'
	export default {
		name: 'app',
		computed: {
			isLogin() {
				return this.$route.path != '/login'
			}
		},
		components: {
			AlertBar,
			TopMenu
		}
	}
</script>

<style>
body {
	color: #797979;
	background: #f1f2f7;
	font-family: 'Microsoft Yahei',arial, sans-serif;
	padding: 0px !important;
	margin: 0px !important;
	font-size: 14px;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-font-smoothing: antialiased;
}
.content {
	background: #ffffff;
	margin: 30px 30px 0 30px;
	margin-bottom: 154px;
	min-width: 888px;
}
.lnavbar{
	text-align: center;
}
.rnavbar{ 
	display: inline-block;
	box-sizing:border-box;
	width: 87%;
	min-width: 688px;
	min-height: 1080px; 
	border-left: 1px solid #dedee1;
}
.pull-left{
	float:left;
}
.pull-right{
	float:right;
}
.clearfix:after{
	content:'.';
	display: block;
	visibility: hidden;
	height:0;
	clear:both;
}

a, a:hover, a:focus{
	text-decoration:none;
}

h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	margin: 0 10px;
}
.title{
	height: 74px; 
	padding: 0 28px;
	margin-bottom: 20px;
	border-bottom: 1px solid #dedee1;
}
.title h4{
	margin:0;
	line-height:73px;
	font-size:16px;
	text-align:left;
}
.rnavbar>.panel-heading{
	padding: 30px 15px;
	border-color: #dedee1;
	line-height: 52px;
}
select.simulate{
	-webkit-appearance:none;
	-moz-appearance:none;
	-o-appearance:none;
	border:0;
	background-color:inherit
}
.el-table .warning-row{
	background-color:#f9c855;
}
.el-select {
	width: 100%;
}
</style>
