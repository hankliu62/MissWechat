import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from './plugins/Logger'
import CommonMainState from '../modules/Common/vuex'
import HomeMainState from '../modules/Home/vuex'
import GenerateIdMainState from '../modules/Tools/modules/GenerateObjectId/vuex'

Vue.use(Vuex)

const isDebug = !process || !process.env || process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    commonMain: CommonMainState,
    homeMain: HomeMainState,
    generateIdMain: GenerateIdMainState
  },
  strict: isDebug,
  plugins: isDebug ? [createLogger()] : []
})

// if (module.hot) {
//   module.hot.accept(['./modules'], () => {
//     const newMutations = require('./modules').default

//     store.hotUpdate({
//       mutations: newMutations
//     })
//   })
// }

export default store
