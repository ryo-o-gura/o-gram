<template>
  <v-dialog :value="isOpened" persistent class="pa-4 login-dialog" width="400">
    <v-card class="py-4 px-8">
      <p class="text-center text-h3 font-weight-bold">Login</p>
      <div class="input-wrapper">
        <v-text-field label="mail" prepend-inner-icon="mdi-account-circle" />
      </div>
      <div class="input-wrapper">
        <v-text-field label="password" prepend-inner-icon="mdi-lock" />
      </div>
      <div>
        <v-btn text color="#0095f6" class="text-body-1 font-weight-bold">
          ゲストモードで使う
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
import { defineComponent } from 'nuxt-composition-api'
export default defineComponent({
  name: 'LoginDialog',
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
<style scoped>
.input-wrapper {
  max-width: 300px;
  margin: 0 auto;
}
</style>
