<template>
  <nav
    class="navbar navbar-expand-lg navbar-light position-fixed w-100 z-3 bg-light top-0"
  >
    <div class="container">
      <RouterLink class="navbar-brand" to="/">BeyeFendi</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup"  ref="navbar"
      >
        <ul class="navbar-nav align-items-start">
          <li class="nav-item">
            <RouterLink class="nav-link me-4" dataToggle to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link me-4" dataToggle to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link me-4" dataToggle to="/products"
              >Products</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link btn btn-secondary position-relative cart"
              to="/cart"
            >
              <i class="bi bi-cart"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ this.carts?.length }}
                <span class="visually-hidden">unread messages</span>
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { Collapse } from 'bootstrap'

import cartStore from '../stores/cartStore'

export default {
  data() {
    return {
      cart: {},
      collapse: '',
      show: false
    }
  },
  computed: {
    ...mapState(cartStore, ['carts'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    toggleNavbar () {
      if (this.$refs.navbar.classList.contains('show')) {
        this.collapse.hide()
      } else {
        this.collapse.show()
      }
    }
  },
  mounted() {
    this.getCart()
    this.collapse = new Collapse(this.$refs.navbar, { toggle: false })
    this.$router.beforeEach((to, from) => {
      this.collapse.hide()
    })
  }
}
</script>

<style>
  .active i  {
    color: aliceblue;
  }
</style>
