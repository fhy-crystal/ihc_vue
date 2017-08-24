<template>
	<div>
		<sub-menu></sub-menu>
		<router-view></router-view>
	</div>
</template>

<script>
	import subMenu from '../../../components/subMenu.vue'		
	import configMenu from '../../../config/menu'

	export default {
		name: 'ircodeManage',
		components: {
			subMenu
		},
		data () {
			return {
				menuInfo: configMenu.ircodeManage
			}
		}
	}
</script>

<style type="text/css" scope>

</style>