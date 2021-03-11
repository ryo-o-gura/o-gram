<template>
  <v-dialog v-model="isOpened" class="pa-4 login-dialog" width="800" persistent>
    <v-card flat tile class="mx-auto" height="600">
      <v-row no-gutters>
        <!-- 画像 -->
        <v-col
          cols="4"
          v-for="(img, index) in postImgs"
          :key="index"
          class="img-wrapper"
        >
          <img class="img" :src="img" width="200px" />
        </v-col>
        <v-file-input
          label="テスト"
          @change="uploadFile($event, 0)"
          prepend-icon="mdi-camera"
          hide-input
          accept="image/png, image/jpeg"
        />
      </v-row>
      <v-row>
        <v-textarea v-model="postContent" />
      </v-row>
      <v-row>
        <v-btn @click="$emit('close', false)">投稿する</v-btn>
        <v-btn @click="$emit('close', false)">キャンセル</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  useFetch,
  computed,
} from 'nuxt-composition-api'
import { Storage } from 'aws-amplify'
import { createPost } from '../src/graphql/mutations'
import { CreatePostInput } from '~/src/API'
export default defineComponent({
  name: 'PostDetailDialog',
  model: {
    prop: 'isOpened',
    event: 'close',
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
    const postImgs = ref<string[]>([])
    const postContent = ref('')
    /** computed ***********************************************************/
    /** method ***********************************************************/
    const uploadFile = async (file: any) => {
      const filePath = `${loginUser.value.id}/${loginUser.value.posts.items.length}/${file.name}`
      await Storage.put(filePath, file)
      const newImg = await Storage.get(filePath)
      if (typeof newImg == 'string') {
        postImgs.value.push(newImg)
      }
    }
    const createPost = async () => {
      const createInput: CreatePostInput = {
        authorId: loginUser.value.id,
        content: postContent.value,
        postImage: postImgs.value,
      }
    }
    return {
      /** data */
      loginUser,
      uploadFile,
      postImgs,
      postContent,
      /** computed */
      /** method */
    }
  },
})
</script>
<style scoped>
.img-wrapper {
  height: 200px;
  overflow: hidden;
  border: 1px solid #ddd;
}
</style>
