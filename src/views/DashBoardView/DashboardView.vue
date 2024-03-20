<template>
    <div class="container">
    <h2>後台管理</h2>
    <nav>
        <router-link to="/admin/products">產品管理</router-link> |
        <router-link to="/admin/order">訂單管理</router-link> |
        <router-link to="/">回到前台</router-link>
    </nav>
    <router-view></router-view>
    </div>
</template>
<script>
import axios from 'axios'

const { VITE_URL } = import.meta.env

export default {
  methods: {
    checkAdmin () {
      const url = `${VITE_URL}/api/user/check`
      axios.post(url)
        .then(() => {
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token

    this.checkAdmin()
  }
}
</script>
