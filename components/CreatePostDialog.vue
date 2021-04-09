<template>
  <v-dialog v-model="isOpened" class="pa-4 login-dialog" width="800" persistent>
    <v-card flat tile class="mx-auto pa-10" height="600">
      <p class="text-center text-h3 font-weight-bold title-font">Post</p>
      <v-row no-gutters class="my-5">
        <!-- 画像 -->
        <v-col
          cols="3"
          v-for="(img, index) in previewImgs"
          :key="index"
          class="img-wrapper"
        >
          <img :src="img" width="200px" />
        </v-col>
        <v-col cols="3" class="img-wrapper">
          <v-file-input
            class="pa-0 file-input"
            @change="uploadFile($event)"
            prepend-icon="mdi-camera"
            hide-input
            accept="image/png, image/jpeg"
          />
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-4">
        <v-textarea
          v-model="postContent"
          no-resize
          outlined
          label="テキストを追加"
        />
      </v-row>
      <v-row no-gutters class="justify-center">
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold mr-2"
          width="200px"
          height="40px"
          tile
          elevation="0"
          color="black"
          @click="createPost"
          >投稿する</v-btn
        >
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold ml-2"
          width="200px"
          height="40px"
          tile
          elevation="0"
          color="black"
          @click="$emit('close', false)"
        >
          キャンセル
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'nuxt-composition-api'
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
  setup(props, { root, emit }) {
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
        const filePath = `${loginUser.value.username}/post/${
          file.name
        }/${Math.floor(Math.random() * 101)}`
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
    /** init */
    watch(
      () => props.isOpened,
      (arg) => {
        if (!arg) {
          postImgs.value = []
          postContent.value = ''
        }
      }
    )
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
.title-font {
  font-family: 'Kaushan Script', cursive !important;
}
.img-wrapper {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid #ddd;
}
.file-input {
  justify-content: center;
  width: 100%;
}
.file-input >>> .v-icon--link {
  font-size: 50px;
}
.file-input >>> .v-icon--link:hover {
  opacity: 0.7;
}
</style>
