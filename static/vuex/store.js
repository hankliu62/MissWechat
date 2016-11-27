import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from './plugins/Logger'
import CommonMainState from '../modules/Common/vuex'

Vue.use(Vuex)

const isDebug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    commonMain: CommonMainState
  },
  strict: isDebug,
  plugins: isDebug ? [createLogger()] : []
})
