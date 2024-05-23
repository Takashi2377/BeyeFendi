import { defineStore } from 'pinia'

import axios from 'axios'
import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0
  }),
  actions: {
    getCart() {
      axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`).then((res) => {
        this.carts = res.data.data.carts
        this.final_total = res.data.data.final_total
        this.total = res.data.data.total
      })
    },
    addToCart(id, qty) {
      const order = {
        product_id: id,
        qty
      }
      axios
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: order })
        .then((res) => {
          this.getCart()
          Swal.fire('成功加入購物車!')
        })
    }
  }
})
