<template>
  <v-dialog
    :value="isOpened"
    persistent
    class="pa-4 login-dialog"
    width="400"
    @input="$emit('toggle', $event)"
  >
    <v-card class="card-wrapper pa-6 pa-sm-10">
      <p class="text-center text-h3 font-weight-bold title-font pb-4">Warning</p>
      <p class="my-10 px-2">投稿を削除します。よろしいですか？</p>
      <v-btn
        class="white--text font-weight-bold mr-2"
        width="150px"
        max-width="45%"
        height="40px"
        tile
        elevation="0"
        color="black"
        @click="$emit('delete', post)"
        >削除する</v-btn
      >
      <v-btn
        class="white--text font-weight-bold ml-2"
        width="150px"
        max-width="45%"
        height="40px"
        tile
        elevation="0"
        color="black"
        @click="$emit('update:isOpened', false)"
        >キャンセル</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'nuxt-composition-api'
import { Post } from '~/types/schema'
export default defineComponent({
  name: 'ComfirmDialog',
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object as PropType<Post>,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
})
</script>
<style scoped>
.title-font {
  font-family: 'Londrina Solid', cursive !important;
}
</style>
