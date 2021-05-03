<template>
  <v-dialog v-model="isOpened" class="pa-4 login-dialog" width="800" persistent>
    <v-card flat tile class="mx-auto pa-6 pa-sm-10">
      <p class="text-center text-h3 font-weight-bold title-font">Post</p>
      <v-row no-gutters class="my-5">
        <!-- 画像 -->
        <v-col
          cols="6"
          sm="3"
          v-for="(img, index) in previewImgs"
          :key="index"
          class="text-center"
        >
          <div class="img-wrapper">
            <img :src="img" width="200px" />
          </div>
          <v-btn
            class="white--text font-weight-bold my-2 text-caption"
            tile
            height="30px"
            elevation="0"
            color="black"
            @click="deletePreviewImage(index)"
            >削除する
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3" class="img-wrapper">
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
          color="rgb(158, 113, 72)"
          outlined
          label="テキストを追加"
        />
      </v-row>
      <v-row no-gutters class="justify-center">
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold mr-2"
          width="200px"
          max-width="45%"
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
          max-width="45%"
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
import {
  defineComponent,
  ref,
  computed,
  watch,
  PropType,
} from 'nuxt-composition-api'
import { Storage } from 'aws-amplify'
import { createPostGql } from '../gql/appsync/mutations'
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
    loginUser: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(props, { root, emit }) {
    /** data ***********************************************************/
    const previewImgs = ref<string[]>([])
    const postImgs = ref<string[]>([])
    const isLoading = ref(false)
    const postContent = ref('')
    /** computed ***********************************************************/
    /** method ***********`************************************************/
    const uploadFile = async (file: File) => {
      isLoading.value = true
      try {
        // ストレージにアップロード
        const filePath = `${props.loginUser.username}/post/${
          file.name
        }/${Math.floor(Math.random() * 101)}`
        await Storage.put(filePath, file)
        const newImg = await Storage.get(filePath)
        previewImgs.value.push(newImg as string)
        postImgs.value.push(filePath)
      } catch (e) {
        console.error(e)
      } finally {
        isLoading.value = false
      }
    }
    const deletePreviewImage = (index: number) => {
      console.debug(index)
      previewImgs.value.splice(index, 1)
      postImgs.value.splice(index, 1)
    }
    const createPost = async () => {
      if (!postImgs.value.length) {
        emit('snackbar', '写真は最低一枚は選択してください')
        return
      }

      const createInput: CreatePostInput = {
        authorId: props.loginUser.id,
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
      isLoading,
      uploadFile,
      deletePreviewImage,
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
  font-family: 'Londrina Solid', cursive !important;
}
.img-wrapper {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid #aaa;
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
.file-input >>> .v-input__prepend-outer {
  margin: 0;
}
.v-textarea >>> .v-input__slot {
  border-radius: 0;
}

/* xsの時 */
@media screen and (max-width: 599px) {
  .img-wrapper {
    height: 120px;
  }
  .file-input >>> .v-icon--link {
    font-size: 40px;
  }
}
</style>
