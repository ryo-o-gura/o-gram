<template>
  <v-dialog
    :value="isOpened"
    persistent
    class="pa-4 login-dialog"
    width="800"
    @input="$emit('toggle', $event)"
  >
    <v-card class="card-wrapper pa-10">
      <p class="text-center text-h3 font-weight-bold title-font">Sign Up</p>
      <v-row no-gutters class="my-10 align-center">
        <v-col v-if="previewImg" cols="3" class="text-center">
          <div class="img-wrapper">
            <img class="icon" :src="previewImg" width="200px" />
          </div>
          <v-btn
            class="white--text font-weight-bold mt-2 text-caption"
            tile
            height="30px"
            elevation="0"
            color="black"
            @click="previewImg = ''"
            >削除する</v-btn
          >
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
            v-model="userInput.username"
            class="mb-2"
            color="rgb(158, 113, 72)"
            outlined
            label="username"
          />
          <v-text-field
            v-model="userInput.password"
            outlined
            color="rgb(158, 113, 72)"
            class="mt-2"
            label="password"
          />
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold mr-2"
          width="200px"
          height="40px"
          tile
          elevation="0"
          color="black"
          @click="createUser"
        >
          登録する
        </v-btn>
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold mx-2"
          width="200px"
          height="40px"
          tile
          elevation="0"
          color="black"
          @click="$emit('update:isOpened', false)"
        >
          キャンセル
        </v-btn>
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold ml-2"
          width="200px"
          height="40px"
          tile
          elevation="0"
          color="rgb(158, 113, 72)"
          @click="guestLogin"
        >
          ゲストユーザーでログイン
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'nuxt-composition-api'
import { Storage } from 'aws-amplify'
import { getUserGql, listUsersGql } from '~/appsync/queries'
import { User } from '~/types/schema'
import { createUserGql } from '../appsync/mutations'
export default defineComponent({
  name: 'LoginDialog',
  model: {
    prop: 'isOpened',
    event: 'toggle',
  },
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root, emit }) {
    const isLoading = ref(false)
    const isShowPassword = ref(false)
    const previewImg = ref<string | Object>()
    const allUsers = ref<User[]>([])
    const inputType = computed(() => {
      return isShowPassword.value ? 'text' : 'password'
    })
    const passwordIcon = computed(() => {
      return isShowPassword.value ? 'mdi-eye' : 'mdi-eye-off'
    })
    const userInput = ref({
      username: '',
      password: '',
      icon: '',
      createdAt: Date.now(),
    })
    const guestLogin = async () => {
      const id = {
        id: '589dfc63-f336-4b89-833d-f7e0aeb7e728',
      }
      isLoading.value = true
      try {
        const guest = await getUserGql(id)
        emit('update', guest)
        emit('snackbar', 'ゲストユーザーでログインしました')
      } catch (e) {
        console.error(e)
        emit('snackbar', 'ログインできませんでした')
      } finally {
        emit('update:isOpened', false)
        isLoading.value = false
      }
    }

    const uploadFile = async (file: File) => {
      try {
        // ストレージにアップロード
        const filePath = `${userInput.value.username}/icon/${
          file.name
        }/${Math.floor(Math.random() * 101)}`
        userInput.value.icon = filePath
        await Storage.put(filePath, file)
        const newImg = await Storage.get(filePath)
        previewImg.value = newImg
      } catch (e) {
        console.error(e)
      }
    }

    const createUser = async () => {
      // 入力されたusernameのユーザがいるか
      const findedUser = allUsers.value.find((user: User) => {
        return user.username === userInput.value.username
      })
      isLoading.value = false
      if (!userInput.value.username || !userInput.value.password) return
      if (!findedUser) {
        try {
          await createUserGql(userInput.value)
          emit('snackbar', 'アカウントを作成しました！')
          userInput.value = {
            username: '',
            password: '',
            icon: '',
            createdAt: Date.now(),
          }
        } catch (e) {
          console.error(e)
          emit('snackbar', 'アカウントを作成できませんでした')
        } finally {
          emit('update:isOpened', false)
          isLoading.value = false
        }
      } else {
        emit('snackbar', 'そのユーザー名はすでに使用されています。')
      }
    }
    /** init */
    watch(
      () => props.isOpened,
      async (event) => {
        if (event) {
          allUsers.value = await listUsersGql()
        } else {
          previewImg.value = ''
          userInput.value = {
            username: '',
            password: '',
            icon: '',
            createdAt: Date.now(),
          }
        }
      }
    )
    return {
      isLoading,
      isShowPassword,
      inputType,
      allUsers,
      passwordIcon,
      userInput,
      guestLogin,
      uploadFile,
      createUser,
      previewImg,
    }
  },
})
</script>
<style scoped>
.title-font {
  font-family: 'Londrina Solid', cursive !important;
}
.input-wrapper {
  max-width: 300px;
  margin: 0 auto;
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
</style>
