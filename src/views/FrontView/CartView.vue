<template>
  <div class="container" v-if="carts.length">
    <VueLoading :active="isLoading" :z-index="1060" />
    <!-- 購物車列表 -->
    <div class="row">
      <div class="col-md-8 offset-md-2 mt-4">
        <div class="text-end" v-if="carts.length >= 1">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="deleteAllCarts"
          >
            清空購物車
          </button>
        </div>
        <div class="text-end" v-else>
          <button class="btn btn-outline-danger" type="button" disabled>
            清空購物車
          </button>
        </div>
        <table class="table align-middle mt-2">
          <thead>
            <tr>
              <th></th>
              <th class="w-25">圖片</th>
              <th style="width: 10rem"  class="text-center">品名</th>
              <th class="text-center" style="width: 10rem">數量</th>
              <th class="text-end">單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="carts">
              <tr v-for="item in carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    :disabled="status.loadingItem === item.id"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </td>
                <td>
                  <div
                    style="
                      height: 6rem;
                      min-width: 6rem;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                    class="object-fit-cover"
                  ></div>
                </td>
                <td  class="text-center">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td>
                  <div class="input-group my-3 bg-light rounded">
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-outline-dark border-0 py-2"
                        type="button"
                        id="button-addon1"
                        :disabled="item.qty === 1"
                        @click="item.qty--"
                        @blur="updateCart(item)"
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
                      v-model.number="item.qty"
                      disabled
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-dark border-0 py-2"
                        type="button"
                        id="button-addon2"
                        @click="item.qty++"
                        @blur="updateCart(item)"
                      >
                        <i class="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <small
                    v-if="final_total !== total"
                    class="text-success"
                    >折扣價：</small
                  >
                  $ {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5" class="text-end">總計 : NT$ {{ $filters.currency(total) }}</td>
            </tr>
            <tr v-if="final_total !== total">
              <td colspan="5" class="text-end text-success">折扣價 : NT$ {{ $filters.currency(final_total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="col-md-4 offset-md-6">
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="輸入優惠碼 'FB777' ，即享線上首購優惠77折"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="addCouponCode(coupon_code)"
          >
            套用優惠碼
          </button>
      </div>
      </div>
    </div>
    <div class="row">
      <hr class="col-md-10 offset-md-1 mt-3">
    </div>
    <!-- 表單驗證 -->
    <div class="my-4 row justify-content-center">
      <VeeForm
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="createOrder(form, router, refsForm)"
      >
        <div class="mb-3">
          <label for="email" class="form-label">*Email</label>
          <VeeField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">*收件人姓名</label>
          <VeeField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          />
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">*收件人電話</label>
          <VeeField
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10"
            v-model="form.user.tel"
          />
          <ErrorMessage name="電話" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">*收件人地址</label>
          <VeeField
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          />
          <ErrorMessage name="地址" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">備註 (選填)</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </VeeForm>
    </div>
  </div>
  <div class="container" v-else>
    <div class="d-flex flex-column align-items-center non-cart">
      <i class="bi bi-cart2 text-black-50"></i>
      <h5 class="my-3 text-black-50">您的購物車中目前沒有商品</h5>
      <RouterLink type="button" class="btn btn-secondary my-3 px-5 py-2" to="/products">
        前往購物
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useToastMessageStore } from '@/stores/toastMessage'
import cartStore from '@/stores/cartStore'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false,
      coupon_code: '',
      router: this.$router,
      refsForm: this.$refs.form
    }
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    ...mapActions(cartStore, ['deleteAllCarts', 'removeCartItem', 'updateCart', 'addCouponCode', 'getCart', 'createOrder']),
    getProducts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/products`
      this.isLoading = true
      this.$http
        .get(url)
        .then((response) => {
          this.products = response.data.products
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.pushMessage({
            style: 'danger',
            title: '取得產品資訊失敗',
            content: error.response.data.message
          })
        })
    }
  },
  computed: {
    ...mapState(cartStore, ['carts', 'final_total', 'total', 'isLoadingP'])
  },
  watch: {
    isLoadingP() {
      this.isLoading = this.isLoadingP
    }
  },
  created() {
    this.getProducts()
    this.getCart()
  }
}
</script>

<style>
.non-cart {
  margin-top: 2rem;
  margin-bottom: 5rem;
}
.bi-cart2 {
  font-size: 8rem;
}
</style>
