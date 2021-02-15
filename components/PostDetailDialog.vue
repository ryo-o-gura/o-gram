<template>
  <v-dialog
    :value="isOpened"
    activator="#activator"
    class="pa-4 login-dialog"
    width="800"
  >
    <v-card flat tile class="mx-auto" height="600">
      <!-- プロフィール -->
      <v-row no-gutters>
        <!-- 画像 -->
        <v-col cols="7">
          <v-carousel
            delimiter-icon="mdi-circle-small"
            :continuous="false"
            height="600"
          >
            <v-carousel-item v-for="picture in pictures" :key="picture">
              <v-sheet height="100%" tile>
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  no-gutters
                >
                  <!-- TODO:写真の表示方法 -->
                  <img :src="picture" />
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="5">
          <v-row class="post-nav py-4 px-3 justify-space-between" no-gutters>
            <v-col>
              <v-btn text icon>
                <v-icon class="text-h4">mdi-account-circle</v-icon>
              </v-btn>
              <span>Unknown</span>
            </v-col>
            <v-col align-self="center" class="text-right">
              <v-btn text icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
            </v-col>
          </v-row>
          <!-- 投稿テキスト -->
          <v-row no-gutters class="post-row px-4 flex-column flex-nowrap">
            <v-col>
              <p class="mb-0">
                <span class="font-weight-bold">Unknown</span>
                <span style="white-space: pre-wrap"
                  >テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                </span>
              </p>
            </v-col>
            <v-col class="mb-4">
              <p class="mb-0">
                <v-btn class="tag pa-1" text @click="openDialog">#tag</v-btn>
                <v-btn class="tag pa-1" text>#tag</v-btn>
                <v-btn class="tag pa-1" text>#tag</v-btn>
                <v-btn class="tag pa-1" text>#tag</v-btn>
                <v-btn class="tag pa-1" text>#tag</v-btn>
                <v-btn class="tag pa-1" text>#tag</v-btn>
              </p>
            </v-col>
            <v-col v-for="n in 8" :key="n">
              <span class="font-weight-bold">Unknown</span>
              <span style="white-space: pre-wrap"
                >コメントコメントコメント
              </span>
            </v-col>
          </v-row>
          <!-- アイコン -->
          <v-row
            class="post-icon-row ma-0 px-3 pt-1 justify-space-between"
            no-gutters
          >
            <v-col>
              <span>
                <v-btn v-if="isLikePost" text icon @click="dislikePost">
                  <v-icon color="red" large>mdi-heart</v-icon>
                </v-btn>
                <v-btn v-else text icon @click="likePost">
                  <v-icon large>mdi-heart-outline</v-icon>
                </v-btn>
              </span>
              <v-btn text icon>
                <v-icon large>mdi-chat-processing-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn v-if="isMarkedPost" text icon @click="removeMark">
                <v-icon large>mdi-bookmark</v-icon>
              </v-btn>
              <v-btn v-else text icon @click="addMark">
                <v-icon large>mdi-bookmark-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- いいね -->
          <v-row no-gutters class="px-4 text-caption">
            <v-col cols="12">
              <v-icon>mdi-account-circle</v-icon>
              <span class="font-weight-bold">Unknown</span>
              <span class="font-weight-bold">、他30人</span>
              <span>が「いいね！」しました</span>
            </v-col>
            <v-col cols="12" class="mt-2">
              <p class="text-caption grey--text">2日前</p>
            </v-col>
          </v-row>
          <v-row no-gutters class="comment-row px-4 py-2">
            <v-col cols="10">
              <v-text-field dense label="コメントを追加" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'
export default defineComponent({
  name: 'PostDetailDialog',
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    /** data ***********************************************************/
    const isOpenedLoginDialog = ref(false)
    const isLikePost = ref(false)
    const isMarkedPost = ref(false)
    const pictures = [
      require('@/assets/image/image1.jpg'),
      require('@/assets/image/image2.jpg'),
      require('@/assets/image/image3.jpg'),
      require('@/assets/image/image4.jpg'),
    ]
    /** computed ***********************************************************/
    /** method ***********************************************************/
    const openDialog = () => {
      isOpenedLoginDialog.value = true
    }
    const closeDialog = () => {
      isOpenedLoginDialog.value = false
    }
    const likePost = () => {
      isLikePost.value = true
    }
    const dislikePost = () => {
      isLikePost.value = false
    }
    const addMark = () => {
      isMarkedPost.value = true
    }
    const removeMark = () => {
      isMarkedPost.value = false
    }
    return {
      /** data */
      isOpenedLoginDialog,
      isLikePost,
      isMarkedPost,
      pictures,
      /** computed */
      /** method */
      openDialog,
      closeDialog,
      likePost,
      dislikePost,
      addMark,
      removeMark,
    }
  },
})
</script>
<style scoped>
.v-dialog__content >>> .v-dialog {
  overflow: hidden;
}
.v-window.v-carousel {
  overflow: visible;
}
.v-carousel >>> .v-carousel__controls {
  background: none;
}
.v-carousel >>> .v-btn--icon.v-size--small {
  width: 15px;
  height: 10px;
  margin: 0;
  pointer-events: none;
}
.v-carousel >>> .v-carousel__controls .v-btn--icon .v-icon {
  transform: scale(2.5);
  color: #ccc;
  opacity: 1;
}
.v-carousel >>> .v-btn--icon.v-btn--active .v-icon {
  color: #0095f6;
}
.post-row {
  height: 333px;
  overflow-y: scroll;
}
.post-nav {
  border-bottom: 1px solid #ddd;
}
.post-icon-row,
.comment-row {
  border-top: 1px solid #ddd;
}
.post-icon-row >>> .v-btn--icon {
  z-index: 2;
}
.tag {
  text-transform: none;
  font-weight: normal;
  color: #00376b;
}
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0;
  min-width: 0;
  height: auto;
}
</style>
