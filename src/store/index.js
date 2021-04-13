import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  cart: {}
};

const loadingPromise = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const actions = {
  async addToCart({ commit }, payload) {
    await loadingPromise();
    const matchingItem = state.cart[payload.sku];
    matchingItem
      ? commit("updateItem", {
          ...payload,
          quantity: payload.quantity + matchingItem.quantity
        })
      : commit("addItem", payload);
  },
  async updateCartQuantity({ state, commit }, { sku, quantity }) {
    await loadingPromise();
    commit("updateItem", { ...state.cart[sku], quantity });
  },
  async removeFromCart({ commit }, payload) {
    await loadingPromise();
    commit("removeItem", payload);
  }
};

const getters = {
  totalItems: ({ cart }) =>
    Object.values(cart).reduce((total, item) => total + item.quantity, 0),
  totalPrice: ({ cart }) =>
    Object.values(cart).reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )
};

const mutations = {
  addItem(state, payload) {
    Vue.set(state.cart, payload.sku, payload);
  },
  updateItem(state, payload) {
    state.cart[payload.sku] = payload;
  },
  removeItem(state, payload) {
    Vue.delete(state.cart, payload);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
