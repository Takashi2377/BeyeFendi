<template>
  <div class="pt-6">
    <NavbarComponent />
    <ToastMessages />
    <router-view />
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
              <a href="#" class="text-white ms-3">
              <i class="bi bi-line"></i></a>
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
          <div class="mb-md-0 mb-1">
            <h5 class="mb-1 fw-bold">訂閱我們的電子報</h5>
            <p>輸入電子郵件以取得最新消息</p>
              <VeeForm
                ref="form"
                v-slot="{ errors }"
                @submit="subscribe"
                >
                  <div class="mb-3 w-md-50 mt-md-0 mt-2">
                    <VeeField
                      id="email"
                      name="email"
                      type="email"
                      class="form-control w-100"
                      :class="{ 'is-invalid': errors['email'] }"
                      placeholder="abc@xxxmail.com"
                      rules="email"
                      v-model="email"
                    />
                    <ErrorMessage name="email" class="invalid-feedback" />
                    <div class="text-end">
                      <button class="btn btn-secondary rounded-1 mt-2" type="button" id="search" @click.prevent="subscribe">
                      訂閱
                    </button></div>
                  </div>
              </VeeForm>
            <hr />
            <p class="mb-0">
            © 2024 <span class="brand">BeyeFendi</span> All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import ToastMessages from '@/components/ToastMessages.vue'

import axios from 'axios'
import Swal from 'sweetalert2'

const { VITE_URL } = import.meta.env

export default {
  data() {
    return {
      user: {
        username: 'aka05068@gmail.com',
        password: 'Zg+1whyha'
      },
      email: ''
    }
  },
  components: {
    NavbarComponent,
    ToastMessages
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
    },
    subscribe() {
      if (this.email) {
        Swal.fire('已成功訂閱!')
      } else {
        alert('請先輸入電子信箱再做訂閱')
      }
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
