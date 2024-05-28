import { defineStore } from 'pinia'

import axios from 'axios'
import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0,
    isLoading: false
  }),
  actions: {
    getCart() {
      this.isLoading = true
      axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`).then((res) => {
        this.carts = res.data.data.carts
        this.final_total = res.data.data.final_total
        this.total = res.data.data.total
        this.isLoading = false
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
    },
    deleteAllCarts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/carts`
      Swal.fire({
        title: '你確定嗎?',
        text: '購物車清空後無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定清空!',
        cancelButtonText: '再想一下...'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true
          this.$http
            .delete(url)
            .then((response) => {
              this.getCart()
              this.isLoading = false
            })
            .catch((error) => {
              this.isLoading = false
              this.pushMessage({
                style: 'danger',
                title: '清除購物車',
                content: error.response.data.message
              })
            })
          Swal.fire({
            title: 'Clear!',
            text: '購物車空空如也',
            icon: 'success'
          })
        }
      })
    }
  }
})
