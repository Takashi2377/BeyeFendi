<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-7 pt-3">
        <img
          :src="product.imageUrl"
          class="d-block w-100 rounded-1"
          alt="當前單一產品圖片"
        />
      </div>
      <div class="col-md-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0 mb-0 py-3">
            <li class="breadcrumb-item">
              <router-link class="text-muted" :to="`/`">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-muted" :to="`/products`"
                >Products</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">Detail</li>
          </ol>
        </nav>
        <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
        <p class="mb-0 text-muted text-end">
          <del>NT$ {{ product.origin_price }}</del>
        </p>
        <p class="h4 fw-bold text-end">NT$ {{ product.price }}</p>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon1"
                  :disabled="qty === 1"
                  @click="qty--"
                >
                  <i class="bi bi-dash-lg"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center my-auto shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                v-model="qty"
                disabled
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                  @click="qty++"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <a
              class="text-nowrap btn btn-dark w-100 py-2"
              @click.prevent="addToCart(product.id, qty), (qty = 1)"
              >加入購物車</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-md-4 offset-md-1">
        <p class="text-muted text-start lh-lg" style="text-indent: 2rem">
          {{ product.description }}
        </p>
      </div>
    </div>
  </div>
  <div class="container">
    <hr />
    <div class="row mt-5" v-if="recommendProducts.length > 0">
      <h2 class="text-center py-2">其他商品</h2>
      <div
        class="col-md-4 mt-md-4"
        v-for="item in recommendProducts"
        :key="item.id"
      >
        <div class="card border-0 mb-4">
          <img
            :src="item.imageUrl"
            class="card-img-top rounded-0"
            alt="其他推薦商品圖片"
            height="258"
          />
          <div class="card-body text-center">
            <h4>{{ item.title }}</h4>
            <RouterLink
              type="button"
              class="btn btn-outline-dark rounded-2 mt-3"
              :to="`/product/${item.id}`"
              >立即選購</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'

import cartStore from '@/stores/cartStore' // @ = src/

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      product: {},
      qty: 1,
      products: []
    }
  },
  watch: {
    '$route.query': {
      async handler() {
        this.getProduct()
      },
      deep: true
    }
  },
  computed: {
    recommendProducts() {
      return this.products
        .filter((item) => {
          return item.id !== this.product?.id
        })
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    }
  },
  methods: {
    async getProduct() {
      const { id } = this.$route.params
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
    },
    async getProducts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    ...mapActions(cartStore, ['addToCart'])
  },
  mounted() {
    this.getProduct()
    this.getProducts()
  }
}
</script>
