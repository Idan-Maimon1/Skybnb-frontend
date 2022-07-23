import { userService } from '../../services/user-service.js'

export default {
  state: {
    wishList: [],
  },
  getters: {
    wishList({ wishList }) {
      return wishList
    },
  },
  mutations: {
    setWishList(state, {wishList}){
        state.wishList = wishList
    },
    addWishStay(state, {stay}){
        state.wishList.push(stay)
    },
    removeStay(state,{stayId}){
        state.wishList = state.wishList.filter(stay => stay._id !==stayId)
    },
    // getById(state,{stayId}){
    //     var isWish = state.wishList.some(function(stay) {
    //         return stay._id === stayId;
    //     })
    // }
  },
  actions: {
    async loadWishList({ commit, state }) {
        var wishList = await userService.query()
        commit({ type: 'setWishList', wishList })
      },
      async addWishStay({commit }, { stay }) {
        await userService.update(stay)
        commit({ type: 'addWishStay', stay})
      },
      async removeWishStay({commit},{stayId}){
        await userService.remove(stayId)
        commit({ type: 'removeStay', stayId})
      },
      async getById({commit},{stayId}){
        let isWish = await userService.getById(stayId)
        return isWish
      }
    },
}
