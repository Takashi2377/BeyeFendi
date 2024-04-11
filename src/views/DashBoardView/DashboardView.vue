<template>
  <DashBoardNavbarLayout />
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages />
    <RouterView v-if="status" />
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useToastMessageStore } from '@/stores/toastMessage'

import ToastMessages from '@/components/ToastMessages.vue'
import DashBoardNavbarLayout from '@/components/DashBoardNavbarLayout.vue'

const { VITE_URL } = import.meta.env

export default {
  components: { DashBoardNavbarLayout, ToastMessages },
  data() {
    return {
      status: false
    }
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage'])
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = `${token}`
    const url = `${VITE_URL}/api/user/check`
    this.$http
      .post(url)
      .then((response) => {
        this.pushMessage({
          style: 'success',
          title: '成功登入',
          content: response.data.message
        })
        this.status = true
      })
      .catch((error) => {
        this.pushMessage({
          style: 'danger',
          title: '錯誤訊息',
          content: error.response.data.message
        })
        this.$router.push('/')
      })
  }
}
</script>
