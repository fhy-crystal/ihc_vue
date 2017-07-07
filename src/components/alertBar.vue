<template>
	<div v-if="show" class="danger alert" transition="fade">
		<button class="close" @click="closeBar()" type="button"><span>&times;</span></button>
		<span class="alert-icon-float-left glyphicon glyphicon-info-sign"></span>
		<strong>提示：</strong>
		<p>{{msg}}</p>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	// import {mapState} from 'vuex'
	export default {
		computed:mapGetters([
			'show',
			'msg'
		]),
		// computed:mapState({
		// 	show: state => state.show,
		// 	msg: state => state.msg
		// }),
		watch: {
			show: function(val) {
				if (val) {
					setTimeout(() =>{
						this.$store.dispatch('closeNotice')
					}, 3000)
				}
			}
		},
		methods:{
			closeBar() {
				this.$store.dispatch('closeNotice');
			}
		}
	}
</script>

<style type="text/css" scoped>
	.fade-transition {
	  transition: opacity .3s ease;
	}
	.fade-enter,
	.fade-leave {
	  height: 0;
	  opacity: 0;
	}
	div.danger {
	  position: fixed;
	  top: 5px;
	  margin: 0 auto;
	  left:0;
	  right:0;
	  width:400px;
	  z-index: 999999;
	  background-color:#f2dede;
	  color:#f34b3f;
	  border-radius: 4px;
	  border-color:#ebccd1;
	}
	.alert-icon-float-left{
		font-size:32px;
		float:left;
		margin-right:5px;
	}
</style>