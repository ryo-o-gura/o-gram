<template>
  <v-dialog
    :value="isOpened"
    persistent
    class="pa-4 login-dialog"
    width="400"
    @input="$emit('toggle', $event)"
  >
    <v-card class="pa-8">
      <p class="text-center text-h3 font-weight-bold title-font">Sign Up</p>
      <div class="input-wrapper">
        <v-text-field
          v-model="userInput.username"
          label="username"
          prepend-inner-icon="mdi-account-circle"
        />
      </div>
      <div class="input-wrapper">
        <v-text-field
          v-model="userInput.password"
          :type="inputType"
          :append-icon="passwordIcon"
          label="password"
          prepend-inner-icon="mdi-lock"
          @click:append="isShowPassword = !isShowPassword"
        />
      </div>
      <div class="input-wrapper">
        <img v-if="previewImgs" :src="previewImgs" alt="アイコン画像" />
        <v-file-input
          v-else
          label="テスト"
          @change="uploadFile($event)"
          prepend-icon="mdi-camera"
          hide-input
          accept="image/png, image/jpeg"
        />
      </div>
      <div>
        <v-btn
          text
          color="#0095f6"
          class="text-body-1 font-weight-bold"
          :loading="isLoading"
          @click="guestLogin"
        >
          ゲストユーザーでログイン
        </v-btn>
      </div>
      <div class="text-center">
        <v-btn class="mr-2" text :loading="isLoading" @click="createUser">
          SIGN UP
        </v-btn>
        <v-btn
          class="ml-2"
          text
          :loading="isLoading"
          @click="$emit('update:isOpened', false)"
        >
          Cancel
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'nuxt-composition-api'
import { Storage } from 'aws-amplify'
import { listUsersGql } from '~/appsync/queries'
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
    const previewImgs = ref<string | Object>()
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
      createdAt: String(Date.now()),
    })
    const guestLogin = async () => {
      const id = {
        id: '589dfc63-f336-4b89-833d-f7e0aeb7e728',
      }
      isLoading.value = true
      try {
        await root.$store.dispatch('user/signIn', id)
        emit('update', root.$store.state.user.loginUser)
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
        previewImgs.value = newImg
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
            createdAt: String(Date.now()),
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
        if (!event) return
        allUsers.value = await listUsersGql()
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
      previewImgs,
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
</style>
