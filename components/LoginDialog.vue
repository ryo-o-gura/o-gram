<template>
  <v-dialog
    :value="isOpened"
    persistent
    class="mx-a px-8 py-4 login-dialog"
    width="500"
  >
    <p class="text-center text-h3 font-weight-bold">Login</p>
    <div><v-text-field label="mail" /></div>
    <div><v-text-field label="password" /></div>
    <div>
      <v-btn @click="$emit('close')">Login</v-btn>
      <v-btn @click="$emit('close')">Cancel</v-btn>
    </div>
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
<style scoped></style>
