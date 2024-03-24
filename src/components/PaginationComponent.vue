<template>
    <nav aria-label="Page navigation example" class="d-flex justify-content-center text-dark">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{'disabled': pages.current_page === 1}"
          >
            <a
              class="page-link"
              aria-label="Previous"
              @click.prevent="emitPages(pages.current_page - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            v-for="(item, index) in pages.total_pages"
            :key="index"
            class="page-item"
            :class="{'active': item === pages.current_page}"
          >
            <span
              class="page-link"
              v-if="item === pages.current_page"
            >{{ item }}</span>
            <a
              class="page-link"
              v-else
              @click.prevent="emitPages(item)"
            >{{ item }}</a>
          </li>
          <li
            class="page-item"
            :class="{'disabled': pages.current_page === pages.total_pages}"
          >
            <a
              class="page-link"
              aria-label="Next"
              @click.prevent="emitPages(pages.current_page + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
</template>

<style>
.pagination .page-item .page-link {
  color: #000000;
  background-color: #fff;
  border-color: #000000;
}
.pagination .page-item.active .page-link {
  /* 當前分頁 */
  color: #ffffff;
  background-color: #000000;
  border-color: #000000;
}
</style>

<script>
export default {
  props: ['pages'],
  methods: {
    emitPages (item) {
      this.$emit('emit-pages', item)
    }
  }
}
</script>
