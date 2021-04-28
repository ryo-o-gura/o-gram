<template>
  <v-dialog
    :value="isOpened"
    persistent
    class="pa-4 login-dialog"
    width="400"
    @input="$emit('toggle', $event)"
  >
    <v-card class="pa-8">
      <p class="text-center text-h3 font-weight-bold title-font pb-4">Login</p>
      <div class="input-wrapper">
        <v-text-field
          v-model="userInput.username"
          label="username"
          outlined
          color="rgb(158, 113, 72)"
        />
      </div>
      <div class="input-wrapper">
        <v-text-field
          v-model="userInput.password"
          :type="inputType"
          :append-icon="passwordIcon"
          label="password"
          color="rgb(158, 113, 72)"
          outlined
          @click:append="isShowPassword = !isShowPassword"
        />
      </div>
      <div>
        <v-btn
          :loading="isLoading"
          text
          class="text-body-1 font-weight-bold mb-2"
          color="rgb(158, 113, 72)"
          @click="guestLogin"
        >
          ゲストユーザーでログイン
        </v-btn>
      </div>
      <div class="text-center">
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold mr-2"
          width="150px"
          max-width="45%"
          height="40px"
          tile
          elevation="0"
          color="black"
          @click="login"
        >
          ログイン
        </v-btn>
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold ml-2"
          width="150px"
          max-width="45%"
          height="40px"
          tile
          elevation="0"
          color="black"
          @click="$emit('update:isOpened', false)"
        >
          キャンセル
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Auth from '@aws-amplify/auth'
import { computed, defineComponent, ref, watch } from 'nuxt-composition-api'
import {
  getUserByUsernameGql,
  getUserGql,
  listUsersGql,
} from '~/gql/appsync/queries'
import { getUserByUsername } from '~/gql/queries'
import { User } from '~/types/schema'
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
    })
    const guestLogin = async () => {
      const id = {
        id: '589dfc63-f336-4b89-833d-f7e0aeb7e728',
      }
      isLoading.value = true
      try {
        const guest = await getUserGql(id)
        if (!guest) return
        emit('update', guest)
        window.localStorage.setItem('loginUser', guest.id)
        emit('snackbar', 'ゲストユーザーでログインしました')
      } catch (e) {
        console.error(e)
        emit('snackbar', 'ログインできませんでした')
      } finally {
        emit('update:isOpened', false)
        isLoading.value = false
      }
    }
    const login = async () => {
      if (!userInput.value.username || !userInput.value.password) return
      isLoading.value = true
      try {
        await Auth.signIn(userInput.value.username, userInput.value.password)
        const input = {
          username: userInput.value.username,
        }
        const gotUser = await getUserByUsernameGql(input)
        if (!gotUser) return
        emit('update', gotUser)
        // ローカルストレージにセット
        window.localStorage.setItem('loginUser', gotUser.id)
        emit('snackbar', 'ログインしました')
        emit('update:isOpened', false)
        userInput.value = {
          username: '',
          password: '',
        }
      } catch (e) {
        console.error(e)
        emit('snackbar', 'ログインできませんでした')
      } finally {
        isLoading.value = false
      }
    }
    /** init */
    watch(
      () => props.isOpened,
      async (event) => {
        if (event) {
          try {
            console.debug(allUsers.value)
          } catch (e) {
            console.error(e)
          }
        } else {
          userInput.value = {
            username: '',
            password: '',
          }
        }
      }
    )
    return {
      isLoading,
      isShowPassword,
      inputType,
      passwordIcon,
      userInput,
      guestLogin,
      login,
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
.input-wrapper >>> .v-text-field__details {
  display: none;
}
</style>
