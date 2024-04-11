<template>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 400px"
  >
    <div
      class="position-absolute"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(https://plus.unsplash.com/premium_photo-1661682950521-c84aba0df1f6?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
        background-position: center center;
        opacity: 0.1;
      "
    ></div>
    <h2 class="fw-light fst-italic">時間藝術，機械演繹</h2>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-4">
        <div
          class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample"
        >
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingOne"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">Series</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <router-link
                      class="py-2 d-block text-muted"
                      :to="`/products`"
                      >All</router-link
                    >
                  </li>
                  <li v-for="item in categories" :key="item">
                    <router-link
                      class="py-2 d-block text-muted"
                      :to="`/products?category=${item}`"
                      >{{ item }}</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6" v-for="product in products" :key="product.id">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img
                :src="product.imageUrl"
                class="card-img-top rounded-0 object-fit-cover"
                height="400"
                alt="..."
              />
              <a href="#" class="text-dark">
                <i
                  class="far fa-heart position-absolute"
                  style="right: 16px; top: 16px"
                ></i>
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3">
                  <RouterLink
                    :to="`/product/${product.id}`"
                    class="text-dark"
                    >{{ product.title }}</RouterLink
                  >
                </h4>
                <p class="card-text mb-0">
                  NT$ {{ product.price }}
                  <span class="text-muted"
                    ><del> NT$ {{ product.origin_price }}</del></span
                  >
                </p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="page"></div>
        <PaginationComponent :pages="pagination" @emit-pages="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      categories: ['Blazer', 'Wild-Conqueror'],
      pagination: {},
      currentPage: 1
    }
  },
  components: {
    PaginationComponent
  },
  watch: {
    '$route.query': {
      handler() {
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    getData(page = 1) {
      this.currentPage = page
      const { category = '' } = this.$route.query // 需預設為空, 否則會判斷為undefined, 無法讀到全部產品
      const url = `${VITE_URL}/api/${VITE_PATH}/products?category=${category}&page=${page}`
      this.$http
        .get(url)
        .then((res) => {
          console.log(res.data.products)
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
