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
        <v-text-field label="mail" prepend-inner-icon="mdi-account-circle" />
      </div>
      <div class="input-wrapper">
        <v-text-field
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
        <v-btn class="ml-2" text @click="$emit('close')">Cancel</v-btn>
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
  setup(_, { root }) {
    const isShowPassword = ref(false)
    const inputType = computed(() => {
      return isShowPassword.value ? 'text' : 'password'
    })
    const passwordIcon = computed(() => {
      return isShowPassword.value ? 'mdi-eye' : 'mdi-eye-off'
    })
    const guestLogin = async () => {
      const id = {
        id: 'da74a514-dd6b-4f01-884c-0bde23a41801',
      }
      await root.$store.dispatch('user/signIn', id)
    }
    return {
      isShowPassword,
      inputType,
      passwordIcon,
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
