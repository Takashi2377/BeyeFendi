<template>
  <div class="pt-6">
    <NavbarComponent />
    <router-view />
    <div class="bg-light py-4">
      <div class="container">
        <div
          class="d-flex flex-md-row justify-content-between align-items-md-center align-items-start"
        >
          <!-- <p class="mb-0 fw-bold">訂閱我們的電子報</p> -->
          <div class="input-group w-md-50 mt-md-0 mt-3">
            <span class="input-group-text">訂閱我們的電子報</span>
            <input
              type="text"
              class="form-control rounded-0"
              placeholder="請輸入您的email"
            />
            <div class="input-group-append">
              <button class="btn btn-dark rounded-0" type="button" id="search">
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-dark py-5">
      <div class="container">
        <div
          class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4"
        >
          <router-link class="text-white h4 navbar-brand" to="/"
            >BeyeFendi</router-link
          >
          <ul class="d-flex list-unstyled mb-0 h4">
            <li>
              <a href="#" class="text-white mx-3"
                ><i class="bi bi-facebook"></i
              ></a>
            </li>
            <li>
              <a href="#" class="text-white mx-3"
                ><i class="bi bi-instagram"></i
              ></a>
            </li>
            <li>
              <a href="#" class="text-white ms-3"><i class="bi bi-line"></i></a>
            </li>
          </ul>
        </div>
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white"
        >
          <div class="mb-md-0 mb-1">
            <p class="mb-0">02-3456-7890</p>
            <p class="mb-0">aka05068@gmail.com</p>
            <hr />
            <RouterLink class="mb-0" to="/login">Dashboard Login</RouterLink>
          </div>
          <p class="mb-0">
            © 2024 <span class="brand">BeyeFendi</span> All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import axios from 'axios'

const { VITE_URL } = import.meta.env

export default {
  data() {
    return {
      user: {
        username: 'aka05068@gmail.com',
        password: 'Zg+1whyha'
      }
    }
  },
  components: {
    NavbarComponent
  },
  methods: {
    login() {
      const api = `${VITE_URL}/admin/signin`

      axios
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted() {
    this.login()
  }
}
</script>

<style>
.navbar-brand {
  font-style: italic;
  font-weight: 600;
  font-size: 1.7rem;
}
.brand {
  font-style: italic;
  font-weight: 600;
}
a {
  text-decoration: none;
  color: #ffffff8c;
}
</style>
