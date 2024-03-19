<template>
    <nav class="navbar navbar-expand-lg navbar-light position-fixed w-100 z-3 bg-light top-0">
    <div class="container">
        <RouterLink class="navbar-brand" to="/">BeyeFendi</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <RouterLink class="nav-item nav-link me-4" to="/">Home</RouterLink>
                <RouterLink class="nav-item nav-link me-4" to="/about">About</RouterLink>
                <RouterLink class="nav-item nav-link me-4" to="/products">Products</RouterLink>
                <RouterLink class="nav-item btn btn-secondary position-relative" to="/"><i class="bi bi-cart"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {{ this.carts?.length }}
                <span class="visually-hidden">unread messages</span>
                </span></RouterLink>
            </div>
        </div>
    </div>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import cartStore from '../stores/cartStore'

export default {
  data () {
    return {
      cart: {}
    }
  },
  computed: {
    ...mapState(cartStore, ['carts'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart'])
  },
  mounted () {
    this.getCart()
  }
}
</script>
