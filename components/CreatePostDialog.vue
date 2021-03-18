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
    const loginUser = ref<User>(root.$store.state.user.loginUser)
    const postImgs = ref<string[]>([])
    const postContent = ref('')
    /** computed ***********************************************************/
    /** method ***********************************************************/
    const uploadFile = async (file: any) => {
      const filePath = `${loginUser.value.id}/${
        loginUser.value.posts?.items?.length! + 1
      }/${file.name}/${Math.floor(Math.random() * 101)}`
      await Storage.put(filePath, file)
      const newImg = await Storage.get(filePath)
      if (typeof newImg == 'string') {
        postImgs.value.push(newImg)
      }
    }
    const createPost = async () => {
      const createInput: CreatePostInput = {
        authorId: loginUser.value.id!,
        content: postContent.value,
        postImage: postImgs.value,
      }
      try {
        const newPost = await createPostGql(createInput)
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
