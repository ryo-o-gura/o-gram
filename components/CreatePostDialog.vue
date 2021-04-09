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
          @change="uploadFile($event)"
          prepend-icon="mdi-camera"
          hide-input
          accept="image/png, image/jpeg"
        />
      </v-row>
      <v-row>
        <v-textarea v-model="postContent" />
      </v-row>
      <v-row>
        <v-btn :loading="isLoading" @click="createPost">投稿する</v-btn>
        <v-btn :loading="isLoading" @click="$emit('close', false)">
          キャンセル
        </v-btn>
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
    const previewImgs = ref<string[]>([])
    const postImgs = ref<string[]>([])
    const isLoading = ref(false)
    const postContent = ref('')
    /** computed ***********************************************************/
    /** method ***********`************************************************/
    const uploadFile = async (file: File) => {
      try {
        // ストレージにアップロード
        const filePath = `${loginUser.value.username}/post/${file.name}/${Math.floor(Math.random() * 101)}`
        await Storage.put(filePath, file)
        const newImg = await Storage.get(filePath)
        previewImgs.value.push(newImg as string)
        postImgs.value.push(filePath)
      } catch (e) {
        console.error(e)
      }
    }
    const createPost = async () => {
      if (!postImgs.value.length) {
        emit('snackbar', '写真は最低一枚は選択してください')
        return
      }

      const createInput: CreatePostInput = {
        authorId: loginUser.value.id!,
        content: postContent.value,
        postImage: postImgs.value,
        createdAt: String(Date.now()),
      }
      try {
        isLoading.value = true
        // 投稿作成
        const newPost = await createPostGql(createInput)
        emit('create', newPost)
        emit('close', false)
        postContent.value = ''
        postImgs.value = []
        previewImgs.value = []
        emit('snackbar', '投稿を作成しました！')
      } catch (e) {
        console.error(e)
        emit('snackbar', '投稿を作成できませんでした。')
      } finally {
        isLoading.value = false
      }
    }
    return {
      /** data */
      loginUser,
      isLoading,
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
