import { defineStore } from 'pinia'

import axios from 'axios'
import Swal from 'sweetalert2'

import { useToastMessageStore } from '@/stores/toastMessage'

const { VITE_URL, VITE_PATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0,
    isLoadingP: false,
    orderP: {
      user: {}
    }
  }),
  actions: {
    getCart() {
      this.isLoadingP = true
      axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`).then((res) => {
        this.carts = res.data.data.carts
        this.final_total = res.data.data.final_total
        this.total = res.data.data.total
        this.isLoadingP = false
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
      const { pushMessage } = useToastMessageStore()
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
          this.isLoadingP = true
          axios
            .delete(url)
            .then((response) => {
              this.getCart()
              this.isLoadingP = false
            })
            .catch((error) => {
              this.isLoadingP = false
              pushMessage({
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
    },
    removeCartItem(id) {
      // this.status.loadingItem = id
      const { pushMessage } = useToastMessageStore()
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`
      this.isLoadingP = true
      axios
        .delete(url)
        .then((response) => {
          pushMessage({
            style: 'success',
            title: '移除購物車品項',
            content: response.data.message
          })
          // this.status.loadingItem = ''
          this.isLoadingP = false
          this.getCart()
        })
        .catch((error) => {
          this.isLoadingP = false
          pushMessage({
            style: 'danger',
            title: '移除購物車品項',
            content: error
          })
        })
    },
    updateCart(data) {
      const { pushMessage } = useToastMessageStore()
      this.isLoadingP = true
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${data.id}`
      const cart = {
        product_id: data.product_id,
        qty: data.qty
      }
      axios
        .put(url, { data: cart })
        .then((response) => {
          pushMessage({
            style: 'success',
            title: '更新購物車',
            content: response.data.message
          })
          this.isLoadingP = false
          this.getCart()
        })
        .catch((error) => {
          this.isLoadingP = false
          pushMessage({
            style: 'danger',
            title: '更新購物車',
            content: error.response.data.message
          })
        })
    },
    addCouponCode(couponCode) {
      const { pushMessage } = useToastMessageStore()
      const url = `${VITE_URL}/api/${VITE_PATH}/coupon`
      const coupon = {
        code: couponCode
      }
      this.isLoadingP = true
      axios
        .post(url, { data: coupon })
        .then((response) => {
          pushMessage({
            style: 'success',
            title: '加入優惠券',
            content: response.data.message
          })
          this.getCart()
          this.isLoadingP = false
        })
        .catch((error) => {
          this.isLoadingP = false
          pushMessage({
            style: 'danger',
            title: '優惠碼加入失敗',
            content: error.response.data.message
          })
        })
    },
    createOrder() {
      Swal.fire({
        title: '確定送出訂單?',
        text: '即將進入付款頁面',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '前往付款',
        cancelButtonText: '再去逛逛'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true
          const url = `${VITE_URL}/api/${VITE_PATH}/order`
          const order = this.form
          this.$http
            .post(url, { data: order })
            .then((response) => {
              this.$router.push(`checkout/${response.data.orderId}`)
              this.$refs.form.resetForm()
              this.isLoading = false
            })
            .catch((error) => {
              this.isLoading = false
              this.pushMessage({
                style: 'danger',
                title: '建立訂單',
                content: error.response.data.message
              })
            })
        }
      })
    },
    getOrder(orderId) {
      const { pushMessage } = useToastMessageStore()
      const url = `${VITE_URL}/api/${VITE_PATH}/order/${orderId}`
      this.isLoadingP = true
      axios
        .get(url)
        .then((response) => {
          this.orderP = response.data.order
          this.isLoadingP = false
        })
        .catch((error) => {
          this.isLoadingP = false
          pushMessage({
            style: 'danger',
            title: '取得訂單失敗',
            content: error.response.data.message
          })
        })
    },
    payOrder(orderId) {
      const { pushMessage } = useToastMessageStore()
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${orderId}`
      Swal.fire({
        title: '確認付款?',
        text: '請再次確認訂單及收件人資料無誤',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認付款',
        cancelButtonText: '先等等'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoadingP = true
          axios
            .post(url)
            .then(() => {
              this.isLoadingP = false
              this.getOrder(orderId)
              this.getCart()
            })
            .catch((error) => {
              this.isLoadingP = false
              pushMessage({
                style: 'danger',
                title: '付款失敗',
                content: error.response.data.message
              })
            })
        }
      })
    }
  }
})
