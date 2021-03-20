<template>
  <v-app>
    <v-main style="background: #eee">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '~/src/aws-exports'
import { defineComponent, useFetch } from 'nuxt-composition-api'

Amplify.configure(awsconfig)

export default defineComponent({
  setup() {
    /** init */
    useFetch(async () => {
      try {
        // 自動サインイン（仮）
        await Auth.signIn('admin0000', 'admin-pass')
      } catch (e) {
        console.debug(e)
      }
    })
  },
})
</script>
