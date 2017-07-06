import {NEW_NOTICE, CLOSE_NOTICE} from '../mutationType'

const state = {
	show: false,
	msg: ''
};

const getters = {
	show: state => state.show,
	msg: state => state.msg
}

const mutations = {
	[NEW_NOTICE](state, message) {
		state.show = true;
		state.msg = message;
	},
	[CLOSE_NOTICE](state) {
		state.show = false;
		state.msg = '';
	}
};

const actions = {
	newNotice({commit}, message) {
		commit(NEW_NOTICE, message);
	},
	closeNotice({commit}) {
		commit(CLOSE_NOTICE);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}