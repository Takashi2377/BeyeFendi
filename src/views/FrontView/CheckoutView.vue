<template>
  <div class="container" v-if="!orderP.is_paid">
    <VueLoading :active="isLoading" :z-index="1060" />
    <div class="my-6 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder(orderId)">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>品名</th>
            <th>數量</th>
            <th class="text-end">單價</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="text-end">NT$ {{ Math.floor(item.final_total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計 : NT$ {{ Math.floor(order.total) }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!orderP.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-end" v-if="!orderP.is_paid">
          <button type="submit" class="btn btn-danger">確認付款</button>
        </div>
      </form>
    </div>
  </div>
  <div class="container" v-else-if="orderP.is_paid">
    <div class="d-flex flex-column align-items-center is-paid">
      <i class="bi bi-check-circle"></i>
      <h5 class="my-3 text-dark">付款完成!</h5>
      <RouterLink type="button" class="btn btn-secondary my-3 px-5 py-2" to="/products">
        繼續選購
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useToastMessageStore } from '@/stores/toastMessage'
import cartStore from '@/stores/cartStore'

// import Swal from 'sweetalert2'

// const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      orderId: '',
      isLoading: false,
      order: {
        user: {}
      }
    }
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    ...mapActions(cartStore, ['payOrder', 'getOrder'])
  },
  computed: {
    ...mapState(cartStore, ['isLoadingP', 'orderP'])
  },
  watch: {
    isLoadingP() {
      this.isLoading = this.isLoadingP
    },
    orderP() {
      this.order = this.orderP
      this.order.is_paid = this.orderP.is_paid
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.getOrder(this.orderId)
    this.order = this.orderP
  }
}
</script>

<style>
.is-paid {
  margin-top: 2rem;
  margin-bottom: 5rem;
}
.bi-check-circle {
  font-size: 8rem;
  color: rgb(72, 189, 150);
}
</style>
