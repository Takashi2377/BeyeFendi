<template>
    <div id="delProductModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ item.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap'
import axios from 'axios'

const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  props: ['item'],
  data () {
    return {
      delProductModal: null
    }
  },
  mounted () {
    this.delProductModal = new Modal(document.getElementById('delProductModal'), {
      keyboard: false,
      backdrop: 'static'
    })
  },
  methods: {
    delProduct () {
      axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${this.item.id}`).then((response) => {
        this.hideModal()
        this.$emit('update')
      }).catch((err) => {
        alert(err.response.data.message)
      })
    },
    openModal () {
      this.delProductModal.show()
    },
    hideModal () {
      this.delProductModal.hide()
    }
  }
}
</script>
