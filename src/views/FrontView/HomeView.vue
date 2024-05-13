<template>
  <div class="position-relative">
    <div
      class="position-absolute z-n1"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(https://images.unsplash.com/photo-1495704907664-81f74a7efd9b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
        background-position: center center;
        opacity: 0.2;
      "
    ></div>
    <div class="container d-flex flex-column" style="min-height: 100vh">
      <div class="row justify-content-center my-auto">
        <div class="col-md-4 text-center">
          <h2 class="pb-3 title">The Watch Collections</h2>
          <p class="text-muted mb-0">
            尊崇悠久傳統，祟尚精巧工藝，助您成為更加優雅的紳士。
          </p>
          <RouterLink
            type="button"
            class="btn btn-outline-dark rounded-2 mt-6"
            to="/about"
            >前往了解</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-5">
      <h2 class="text-center py-2">Recommended Goods</h2>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            :src="products[7]?.imageUrl"
            class="card-img-top rounded-0"
            alt="..."
            height="258"
          />
          <div class="card-body text-center">
            <h4>{{ this.products[7]?.title }}</h4>
            <div class="d-flex justify-content-center">
              <p class="card-text text-muted mb-0">
                年度限量，擁抱時尚奢華魅力。
              </p>
            </div>
            <RouterLink
              type="button"
              class="btn btn-outline-dark rounded-2 mt-3"
              to="/product/-NtiddYRZGHZKd2zIZme"
              >立即選購</RouterLink
            >
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            :src="products[0]?.imageUrl"
            class="card-img-top rounded-0"
            alt="..."
            height="258"
          />
          <div class="card-body text-center">
            <h4>{{ this.products[0]?.title }}</h4>
            <div class="d-flex justify-content-center">
              <p class="card-text text-muted mb-0">
                探險精神，上山下海無所不能。
              </p>
            </div>
            <RouterLink
              type="button"
              class="btn btn-outline-dark rounded-2 mt-3"
              to="/product/-NnTk5olgZotge7lBeki"
              >立即選購</RouterLink
            >
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            :src="products[4]?.imageUrl"
            class="card-img-top rounded-0"
            alt="..."
            height="258"
          />
          <div class="card-body text-center">
            <h4>{{ this.products[4]?.title }}</h4>
            <div class="d-flex justify-content-center">
              <p class="card-text text-muted mb-0">
                平價、時尚、實用，輕鬆入手。
              </p>
            </div>
            <RouterLink
              type="button"
              class="btn btn-outline-dark rounded-2 mt-3"
              to="/product/-Ntib9p5dqOp-wm24bs9"
              >立即選購</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light mt-7 quote">
    <div class="container">
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row justify-content-center py-7">
              <div class="col-md-6 text-center">
                <p class="my-5 h5">“ 完美，是時間的孩子。 ”</p>
                <p>
                  <small class="text-muted"
                    >— Recep, the founder of BeyeFendi —</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-7">
    <div class="row">
      <div class="col-md-6">
        <img
          src="https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blazer系列產品形象照"
          class="img-fluid"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="my-4">Blazer</h4>
        <p class="text-muted text-start lh-lg" style="text-indent: 2rem">
          Blazer系列融合了經典與時尚的設計元素，適合配戴於正式或商務場合。精選高品質的錶殼與錶帶材質，
          展現出品味與品質的完美結合，讓您隨時掌握時間，展現紳士風範。
        </p>
        <RouterLink
          type="button"
          class="btn btn-outline-dark rounded-2 mt-2"
          to="/products?category=Blazer"
          >系列總覽</RouterLink
        >
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-between mt-4">
      <div class="col-md-6">
        <img
          src="https://images.unsplash.com/photo-1704782625031-7e26bdf2e0fb?q=80&w=650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Wild-Conqueror系列產品形象照"
          class="img-fluid"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="my-4">Wild-Conqueror</h4>
        <p class="text-muted text-start lh-lg" style="text-indent: 2rem">
          Wild-Conqueror系列是專為潛水、戶外愛好者而設計的錶款，具有優異的防水性能和耐用性，讓您在外出探險時無憂無慮。
          此系列擁有清晰的夜間顯示、計時功能等，讓您在戶外探險的過程中輕鬆掌握各項數據、享受樂趣。
        </p>
        <RouterLink
          type="button"
          class="btn btn-outline-dark rounded-2 mt-2"
          to="/products?category=Wild-Conqueror"
          >系列總覽</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      user: {
        username: 'aka05068@gmail.com',
        password: 'Zg+1whyha'
      }
    }
  },
  methods: {
    getData() {
      const url = `${VITE_URL}/api/${VITE_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
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

<style scoped>
.title {
  opacity: 0.85;
  font-weight: 400;
}
.quote {
  background: rgb(242, 242, 242);
  background: radial-gradient(
    circle,
    rgba(242, 242, 242, 0.9304096638655462) 34%,
    rgba(166, 166, 166, 0.5886729691876751) 73%,
    rgba(115, 115, 115, 0.5606617647058824) 100%
  );
}
</style>
