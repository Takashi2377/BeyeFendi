<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text">
            {{ item.origin_price }}
          </td>
          <td class="text">
            {{ item.price }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <PaginationComponent
      :pages="pagination"
      @emit-pages="getData"
    ></PaginationComponent>
    <!-- 分頁元件 -->
  </div>
  <!-- Modal -->
  <ProductModalComponent
    ref="product"
    :product="tempProduct"
    :is-new="isNew"
    @update-product="updateProduct"
  ></ProductModalComponent>
  <DelProductModalComponent
    ref="delProduct"
    :item="tempProduct"
    @del-item="delProduct"
  ></DelProductModalComponent>
</template>

<script>
import { mapActions } from 'pinia'
import { useToastMessageStore } from '@/stores/toastMessage'

import PaginationComponent from '@/components/PaginationComponent.vue'
import ProductModalComponent from '@/components/ProductModalComponent.vue'
import DelProductModalComponent from '@/components/DelProductModalComponent.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      modal: {
        editModal: '',
        delModal: ''
      },
      currentPage: 1
    }
  },
  components: {
    PaginationComponent,
    ProductModalComponent,
    DelProductModalComponent
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token
    this.checkAdmin()
  },
  methods: {
    ...mapActions(useToastMessageStore, ['pushMessage']),
    checkAdmin() {
      const url = `${VITE_URL}/api/user/check`
      this.$http
        .post(url)
        .then(() => {
          this.getData()
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.$router.push('/login')
        })
    },
    getData(page = 1) {
      this.currentPage = page
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http
        .get(url)
        .then((response) => {
          const { products, pagination } = response.data
          this.products = products
          this.pagination = pagination
          this.isLoading = false
          this.pushMessage({
            style: 'success',
            title: '成功取得產品資訊',
            content: response.data.message
          })
        })
        .catch((err) => {
          this.isLoading = false
          this.pushMessage({
            style: 'danger',
            title: '取得產品資訊失敗',
            content: err.response.data.message
          })
        })
    },
    updateProduct(item) {
      this.tempProduct = item
      // 新增商品
      let api = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      this.isLoading = true
      let httpMethod = 'post'
      let status = '新增產品'
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
        status = '更新產品'
      }
      const productComponent = this.$refs.product
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          this.isLoading = false
          this.pushMessage({
            style: 'success',
            title: status,
            content: response.data.message
          })
          productComponent.hideModal()
          this.getData(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.pushMessage({
            style: 'danger',
            title: status,
            content: err.response.data.message
          })
        })
    },
    delProduct() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      this.$http
        .delete(url)
        .then((response) => {
          this.isLoading = false
          this.pushMessage({
            style: 'success',
            title: '刪除產品',
            content: response.data.message
          })
          const delComponent = this.$refs.delProduct
          delComponent.hideModal()
          this.getData(this.currentPage)
        })
        .catch((error) => {
          this.isLoading = false
          this.pushMessage({
            style: 'danger',
            title: '刪除產品',
            content: error.response.data.message
          })
        })
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.product.openModal()
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item }
        this.isNew = false
        this.$refs.product.openModal()
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item }
        this.$refs.delProduct.openModal()
      }
    }
  }
}
</script>
