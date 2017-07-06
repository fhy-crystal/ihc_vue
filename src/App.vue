<template>
	<div id="app">
		<alert-bar></alert-bar>
		<router-view></router-view>
	</div>
</template>

<script>
	import AlertBar from './components/alertBar.vue'
	export default {
		name: 'app',
		components: {
			AlertBar
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
#app {
	
}
</style>
