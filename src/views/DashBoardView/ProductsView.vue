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
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">
              {{ item.origin_price }}
            </td>
            <td class="text-end">
              {{ item.price }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分頁元件 -->
      <PaginationComponent :pages="pagination" @emit-pages="getData"></PaginationComponent>
      <!-- 分頁元件 -->
    </div>
    <!-- Modal -->
    <ProductModalComponent ref="product" :product="tempProduct" :is-new="isNew" @update="getData"></ProductModalComponent>
    <DelProductModalComponent ref="delProduct" :item="tempProduct" @update="getData"></DelProductModalComponent>
</template>

<script>
import axios from 'axios'

import PaginationComponent from '../../components/PaginationComponent.vue'
import ProductModalComponent from '../../components/ProductModalComponent.vue'
import DelProductModalComponent from '../../components/DelProductModalComponent.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},
      isNew: false
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    this.checkAdmin()
  },
  methods: {
    checkAdmin () {
      const url = `${VITE_URL}/api/user/check`
      axios.post(url)
        .then(() => {
          this.getData()
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html'
        })
    },
    getData (page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`

      axios.get(url)
        .then((response) => {
          const { products, pagination } = response.data
          this.products = products
          this.pagination = pagination
        }).catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html'
        })
    },
    openModal (isNew, item) {
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
  },
  components: {
    PaginationComponent,
    ProductModalComponent,
    DelProductModalComponent
  }
}
</script>
