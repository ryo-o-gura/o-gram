<template>
  <v-dialog
    :value="isOpened"
    persistent
    class="pa-4 login-dialog"
    width="400"
    @input="$emit('toggle', $event)"
  >
    <v-card class="pa-8">
      <p class="text-center text-h3 font-weight-bold">Login</p>
      <div class="input-wrapper">
        <v-text-field
          v-model="userInput.id"
          label="id"
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
      <div>
        <v-btn
          text
          color="#0095f6"
          class="text-body-1 font-weight-bold"
          @click="guestLogin"
        >
          ゲストユーザーでログイン
        </v-btn>
      </div>
      <div class="text-center">
        <v-btn class="mr-2" text>Login</v-btn>
        <v-btn
          class="ml-2"
          text
          @click="$emit('update:isOpened', false)"
          >Cancel</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'nuxt-composition-api'
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
  setup(_, { root, emit }) {
    const isShowPassword = ref(false)
    const inputType = computed(() => {
      return isShowPassword.value ? 'text' : 'password'
    })
    const passwordIcon = computed(() => {
      return isShowPassword.value ? 'mdi-eye' : 'mdi-eye-off'
    })
    const userInput = ref({
      id: '',
      password: '',
    })
    const guestLogin = async () => {
      const id = {
        id: '589dfc63-f336-4b89-833d-f7e0aeb7e728',
      }
      try {
        await root.$store.dispatch('user/signIn', id)
        emit('update', root.$store.state.user.loginUser)
      } catch (e) {
        console.error(e)
      } finally {
        emit('update:isOpened', false)
      }
    }
    return {
      isShowPassword,
      inputType,
      passwordIcon,
      userInput,
      guestLogin,
    }
  },
})
</script>
<style scoped>
.input-wrapper {
  max-width: 300px;
  margin: 0 auto;
}
</style>
