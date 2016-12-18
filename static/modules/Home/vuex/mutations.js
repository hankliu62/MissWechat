import { FETCH_PRODUCTS } from '../constants/types'

export default {
  [FETCH_PRODUCTS] (state, { products }) {
    state.products = products;
  }
}
