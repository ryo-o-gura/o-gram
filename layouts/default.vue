<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Amplify from 'aws-amplify'
import awsconfig from '~/src/aws-exports'
import { defineComponent } from 'nuxt-composition-api'

Amplify.configure(awsconfig)

export default defineComponent({
  setup() {},
})
</script>
<style>
html,
body {
  overscroll-behavior-y: none;
}
.v-main {
  background: url('~/assets/image/bg.jpg');
}
</style>
