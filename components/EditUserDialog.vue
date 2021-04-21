<template>
  <v-dialog v-model="isOpened" class="pa-4 login-dialog" width="800" persistent>
    <v-card flat tile class="card-wrapper mx-auto pa-6 pa-sm-10">
      <p class="text-center text-h3 mb-0 font-weight-bold title-font">User Edit</p>
      <v-row no-gutters class="my-10 align-center">
        <!-- 画像 -->
        <v-col v-if="previewImg" cols="12" sm="3" class="text-center mb-2 mb-sm-0">
          <div class="img-wrapper">
            <img class="icon" :src="previewImg" width="200px" />
          </div>
          <v-btn
            class="white--text font-weight-bold my-2 text-caption"
            tile
            height="30px"
            elevation="0"
            color="black"
            @click="previewImg = ''"
            >削除する</v-btn
          >
        </v-col>
        <v-col v-else cols="12" sm="3" class="text-center mb-2 mb-sm-0">
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
        <v-col class="ml-sm-8">
          <v-text-field
            v-model="userInfo.username"
            class="mb-2"
            color="rgb(158, 113, 72)"
            outlined
            label="username"
          />
          <v-text-field
            v-model="userInfo.password"
            outlined
            class="mt-2"
            color="rgb(158, 113, 72)"
            label="password"
          />
        </v-col>
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
          @click="updateUser"
        >
          変更する
        </v-btn>
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
      isLoading.value = true
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
      } finally {
        isLoading.value = false
      }
    }
    const updateUser = async () => {
      isLoading.value = true
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
        previewImg.value = ''
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
      async (arg) => {
        if (arg) {
          userInfo.value.id = props.loginUser.id
          userInfo.value.username = props.loginUser.username
          userInfo.value.password = props.loginUser.password
          userInfo.value.icon = props.loginUser.icon
          if (props.loginUser.icon) {
            previewImg.value = (await Storage.get(
              props.loginUser.icon
            )) as string
          }
        } else {
          userInfo.value = {
            id: '',
            username: '',
            icon: '',
            password: '',
            updatedAt: Date.now(),
          }
          previewImg.value = ''
        }
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
  border: 5px solid rgb(158, 113, 72);
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.img-wrapper .icon {
  height: 100%;
  object-fit: cover;
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

.card-wrapper >>> .v-text-field__details {
  display: none;
}

/* xsの時 */
@media screen and (max-width: 599px) {
  .img-wrapper {
    margin: 0 auto;
    width: 150px;
    height: 150px;
  }
  .file-input >>> .v-icon--link {
    font-size: 40px;
  }
}
</style>
