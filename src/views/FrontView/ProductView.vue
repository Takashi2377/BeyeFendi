<template>
  <div class="container py-4">
    <VueLoading :active="isLoading" :z-index="1060" />
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
              <router-link class="navItem" :to="`/`">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="navItem" :to="`/products`"
                >Products</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">Detail</li>
          </ol>
        </nav>
        <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
        <p class="mb-0 text-muted text-end">
          <del>NT$ {{ $filters.currency(product.origin_price) }}</del>
        </p>
        <p class="h4 fw-bold text-end">NT$ {{ $filters.currency(product.price) }}</p>
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
          <div>
            <p class="text-secondary text-start lh-lg col-10 offset-1 mt-5 fs-6" style="text-indent: 2rem">
              {{ product.description }}
            </p>
          </div>
          <div>
            <p class="text-black-50 text-start lh-lg col-10 offset-1 mt-2 fs-6 fst-italic" >
              *所有產品皆提供一年內非人為損壞保固、免費到府收件。
              <br>
              *所有產品皆可於出貨前客製化調整錶帶長度，請於訂單資料備註手腕測量結果。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <hr />
    <div class="row my-3" v-if="recommendProducts.length > 0">
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
      products: [],
      isLoading: false
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
      this.isLoading = true
      const { id } = this.$route.params
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          this.isLoading = false
        })
    },
    async getProducts() {
      this.isLoading = true
      const url = `${VITE_URL}/api/${VITE_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
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

<style>
.navItem {
  color: grey;
}
.navItem:hover {
  color: black;
}
</style>
