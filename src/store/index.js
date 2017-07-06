import Vue from 'vue'
import Vuex from 'vuex'

import notice from './modules/notice'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		notice
	}
})