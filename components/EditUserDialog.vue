<template>
  <v-dialog v-model="isOpened" class="pa-4 login-dialog" width="800" persistent>
    <v-card flat tile class="card-wrapper mx-auto pa-10">
      <p class="text-center text-h3 font-weight-bold title-font">User Edit</p>
      <v-row no-gutters class="my-10 align-center">
        <!-- 画像 -->
        <v-col v-if="previewImg" cols="3" class="text-center">
          <div class="img-wrapper">
            <img :src="previewImg" width="200px" />
          </div>
          <v-btn @click="previewImg = ''">削除する</v-btn>
        </v-col>
        <v-col v-else cols="3" class="text-center">
          <div class="img-wrapper mb-2">
            <v-file-input
              class="pa-0 file-input"
              @change="uploadFile($event)"
              prepend-icon="mdi-camera"
              hide-input
              accept="image/png, image/jpeg"
            />
          </div>
          <p class="grey--text">プロフィール画像を追加</p>
        </v-col>
        <v-col class="ml-8">
          <v-text-field
            v-model="userInfo.username"
            class="mb-2"
            outlined
            label="username"
          />
          <v-text-field
            v-model="userInfo.password"
            outlined
            class="mt-2"
            label="password"
          />
        </v-col>
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
          @click="updateUser"
          >変更する</v-btn
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
import {
  defineComponent,
  ref,
  computed,
  watch,
  PropType,
} from 'nuxt-composition-api'
import { Storage } from 'aws-amplify'
import { User } from '~/types/schema'
import { updateUserGql } from '~/appsync/mutations'
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
    const previewImg = ref('')
    const userInfo = ref({
      id: '',
      username: '',
      icon: '',
      password: '',
      updatedAt: Date.now(),
    })
    const isLoading = ref(false)
    /** computed ***********************************************************/
    /** method ***********`************************************************/
    const uploadFile = async (file: File) => {
      try {
        // ストレージにアップロード
        const filePath = `${props.loginUser.username}/post/${
          file.name
        }/${Math.floor(Math.random() * 101)}`
        await Storage.put(filePath, file)
        userInfo.value.icon = filePath as string
        const newImg = await Storage.get(filePath)
        previewImg.value = newImg as string
      } catch (e) {
        console.error(e)
      }
    }
    const updateUser = async () => {
      isLoading.value = true
      console.debug(props.loginUser)
      console.debug(userInfo.value)
      if (!previewImg.value) {
        userInfo.value.icon = ''
      }
      try {
        await updateUserGql(userInfo.value)
        userInfo.value = {
          id: '',
          username: '',
          icon: '',
          password: '',
          updatedAt: Date.now(),
        }
        emit('snackbar', 'アカウント情報を更新しました！')
        emit('update')
        emit('close', false)
      } catch (e) {
        console.error(e)
        emit('snackbar', 'アカウント情報を更新できませんでした')
      } finally {
        isLoading.value = false
      }
    }
    /** init */
    watch(
      () => props.isOpened,
      async () => {
          userInfo.value.id = props.loginUser.id
          userInfo.value.username = props.loginUser.username
          userInfo.value.password = props.loginUser.password
          userInfo.value.icon = props.loginUser.icon
          previewImg.value = (await Storage.get(props.loginUser.icon)) as string
      }
    )
    return {
      /** data */
      isLoading,
      uploadFile,
      userInfo,
      previewImg,
      /** computed */
      updateUser,
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
  border-radius: 50%;
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
.card-wrapper >>> .v-text-field__details {
  display: none;
}
</style>
