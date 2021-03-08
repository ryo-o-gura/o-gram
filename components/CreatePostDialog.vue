<template>
  <v-dialog
    :value="isOpened"
    class="pa-4 login-dialog"
    width="800"
    @input="$emit('toggle', $event)"
  >
    <v-card flat tile class="mx-auto" height="600">
      <v-row no-gutters>
        <!-- 画像 -->
        <v-col class="img-wrapper">
          <v-file-input
            label="テスト"
            @change="uploadFile($event, 1)"
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg"
            clearable
          />
          <img class="img" :src="imgs" width="200px" />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, useFetch } from 'nuxt-composition-api'
import { Storage } from 'aws-amplify'
export default defineComponent({
  name: 'PostDetailDialog',
  model: {
    prop: 'isOpened',
    event: 'toggle',
  },
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
    },
  },
  setup() {
    /** data ***********************************************************/
    // TODO:sroreで管理
    const loginUser = ref({
      id: '372dc9f5-d06b-4cba-bf1a-011c671ef053',
      username: 'admin0000',
      icon: '1',
      posts: {
        items: [],
      },
    })
    const imgs = ref<string[]>()
    /** computed ***********************************************************/
    /** method ***********************************************************/
    const uploadFile = async (file: any, index: number) => {
      console.debug(file, index)
      const filePath = `${loginUser.value.id}/${loginUser.value.posts.items.length}/${file.name}`
      await Storage.put(filePath, file)
      const newImg = await Storage.get(filePath)
      if (typeof newImg === 'string') {
        imgs.value![index] = newImg
      }
      console.debug(imgs.value)
    }
    return {
      /** data */
      loginUser,
      uploadFile,
      imgs,
      /** computed */
      /** method */
    }
  },
})
</script>
<style scoped>
.img-wrapper {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.img {
  z-index: 999px;
}
.v-file-input >>> .v-input__control > .v-input__slot > .v-text-field__slot {
  display: none;
}
</style>
