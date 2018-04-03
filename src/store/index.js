import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    carPanelData: [],
    maxOff: false,
    carShow: false,
    carTimer: null
  },
  getters: {
    totleCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    totlePrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.price * goods.count
      })
      return price
    }
  },
  mutations: {
    delCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
          return
        }
      })
    },
    addCarPanelData (state, data) {
      let bOff = true
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.sku_id) {
          goods.count++
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count--
            state.maxOff = true
            return
          }
          state.carShow = true
        }
      })
      if (bOff) {
        let goodsData = data
        Vue.set(goodsData, 'count', 1)
        state.carPanelData.push(goodsData)
        state.carShow = true
      }
    },
    closePrompt (state) {
      state.maxOff = false
    },
    carShow (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    carHind (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      }, 500)
    }
  }
})

export default store
