<template>
  <v-dialog v-model="isOpened" class="pa-4 login-dialog" width="800" persistent>
    <v-card flat tile class="mx-auto pa-10" height="600">
      <p class="text-center text-h3 font-weight-bold">投稿作成</p>
      <v-row no-gutters>
        <!-- 画像 -->
        <v-col
          cols="4"
          v-for="(img, index) in previewImgs"
          :key="index"
          class="img-wrapper"
        >
          <img :src="img" width="200px" />
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
        <v-btn @click="createPost">投稿する</v-btn>
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
import { createPostGql } from '../appsync/mutations'
import { CreatePostInput, User } from '~/types/schema'
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
  },
  setup(prop, { root, emit }) {
    /** data ***********************************************************/
    const loginUser = computed(() => {
      return root.$store.state.user.loginUser
    })
    const previewImgs = computed(() => {
      return postImgs.value.map((img) => {
        return window.URL.createObjectURL(img)
      })
    })
    const postImgs = ref<string[]>([])
    const postContent = ref('')
    const selectedFile = ref()
    /** computed ***********************************************************/
    /** method ***********`************************************************/
    // TODO:ファイルアップロード
    const uploadFile = async (file: File) => {
      selectedFile.value = file
      // postImgs.value.push(file)
      previewImgs.value.push(window.URL.createObjectURL(file))
    }
    const createPost = async () => {
      const createInput: CreatePostInput = {
        authorId: loginUser.value.id!,
        content: postContent.value,
        postImage: postImgs.value,
      }
      try {
        // 投稿作成
        const newPost = await createPostGql(createInput)
        // ストレージにアップロード
        postImgs.value.forEach(async (img) => {
          await Storage.put(img, selectedFile.value)
        })
        emit('create', newPost)
        emit('close', false)
      } catch (e) {
        console.error(e)
      }
    }
    return {
      /** data */
      loginUser,
      uploadFile,
      previewImgs,
      postImgs,
      postContent,
      /** computed */
      createPost,
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
