<template>
  <v-dialog
    :value="isOpened"
    persistent
    class="pa-4 login-dialog"
    width="400"
    @input="$emit('toggle', $event)"
  >
    <v-card class="pa-8">
      <p class="text-center text-h3 font-weight-bold title-font pb-4">
        Comfirm
      </p>
      <p class="mt-4 px-4">
        登録されているメールアドレス宛に届いた確認コードを入力してください。
      </p>
      <div class="input-wrapper">
        <v-text-field
          v-model="userInput"
          label="確認コード"
          outlined
          color="rgb(158, 113, 72)"
        />
      </div>
      <div>
        <v-btn
          :loading="isLoading"
          text
          class="text-body-1 font-weight-bold ml-1"
          color="rgb(158, 113, 72)"
          @click="resend"
        >
          コードを再送する
        </v-btn>
      </div>
      <div class="text-center mt-4">
        <v-btn
          :loading="isLoading"
          class="white--text font-weight-bold mr-2"
          width="150px"
          max-width="45%"
          height="40px"
          tile
          elevation="0"
          color="black"
          @click="comfirm"
        >
          確認
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
    username: {
      type: String,
      default: '',
    },
  },
  setup(props, { root, emit }) {
    const isLoading = ref(false)
    const userInput = ref('')
    const resend = async () => {
      try {
        isLoading.value = true
        await Auth.resendSignUp(props.username)
        emit('snackbar', 'コードを再送しました')
      } catch (e) {
        console.error(e)
        emit('snackbar', '再送できませんでした')
      } finally {
        isLoading.value = false
      }
    }
    const comfirm = async () => {
      try {
        isLoading.value = true
        await Auth.confirmSignUp(props.username, userInput.value)
        emit('snackbar', '確認が完了しました！')
        emit('update:isOpened', false)
      } catch (e) {
        console.error(e)
        emit('snackbar', '確認できませんでした')
      } finally {
        isLoading.value = false
      }
    }
    /** init */
    watch(
      () => props.isOpened,
      async (event) => {
        if (!event) {
          userInput.value = ''
        }
      }
    )

    return {
      isLoading,
      userInput,
      resend,
      comfirm,
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
  margin: 20px auto 0;
}
.input-wrapper >>> .v-input__slot {
  margin-bottom: 0;
}
.input-wrapper >>> .v-text-field__details {
  display: none;
}
</style>
