<template>
  <div>
    <LoginDialog :is-opened="isOpenedLoginDialog" @close="closeLoginDialog" />
    <PostDetailDialog :is-opened="isOpenedPostDetailDialog" />
    <h1 class="text-h1 font-weight-bold text-center">O-gram</h1>
    <div class="posts-wrapper">
      <!--投稿 -------------------------------------------------------->
      <v-card
        v-for="n in 5"
        :key="n"
        flat
        tile
        class="mx-auto pb-5 my-10"
        width="600"
      >
        <!-- プロフィール -->
        <v-row class="post-nav py-2 px-3 justify-space-between" no-gutters>
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
        <!-- 画像 -->
        <v-carousel delimiter-icon="mdi-circle-small" :continuous="false">
          <v-carousel-item v-for="picture in pictures" :key="picture">
            <v-sheet height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <!-- TODO:写真の表示方法 -->
                <img :src="picture" />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <!-- アイコン -->
        <v-row class="post-icon-row px-3 justify-space-between" no-gutters>
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
        <v-row no-gutters class="px-4 text-body-2">
          <v-col>
            <v-icon>mdi-account-circle</v-icon>
            <span class="font-weight-bold">Unknown</span>
            <span class="font-weight-bold">、他30人</span>
            <span>が「いいね！」しました</span>
          </v-col>
        </v-row>
        <!-- 投稿テキスト -->
        <v-row no-gutters class="px-4">
          <p class="mb-0">
            <span class="font-weight-bold">Unknown</span>
            <span style="white-space: pre-wrap"
              >テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </span>
          </p>
          <p class="mb-0">
            <v-btn class="tag pa-1" text @click="openLoginDialog">#tag</v-btn>
            <v-btn class="tag pa-1" text>#tag</v-btn>
            <v-btn class="tag pa-1" text>#tag</v-btn>
            <v-btn class="tag pa-1" text>#tag</v-btn>
            <v-btn class="tag pa-1" text>#tag</v-btn>
            <v-btn class="tag pa-1" text>#tag</v-btn>
          </p>
        </v-row>
        <v-row class="px-4" no-gutters>
          <v-btn v-if="true" text @click="openPostDetailDialog">
            <p class="text-body-2 text--secondary mb-0">
              コメント２０件をすべて見る
            </p>
          </v-btn>
          <p v-else class="text-body-2 text--secondary mb-0">コメントなし</p>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'nuxt-composition-api'
export default defineComponent({
  setup() {
    /** data ***********************************************************/
    const isOpenedLoginDialog = ref(false)
    const isOpenedPostDetailDialog = ref(true)
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
    const openLoginDialog = () => {
      isOpenedLoginDialog.value = true
    }
    const closeLoginDialog = () => {
      isOpenedLoginDialog.value = false
    }
    const openPostDetailDialog = () => {
      isOpenedPostDetailDialog.value = true
    }
    const closePostDetailDialog = () => {
      isOpenedPostDetailDialog.value = false
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
      isOpenedPostDetailDialog,
      isLikePost,
      isMarkedPost,
      pictures,
      /** computed */
      /** method */
      openLoginDialog,
      closeLoginDialog,
      openPostDetailDialog,
      closePostDetailDialog,
      likePost,
      dislikePost,
      addMark,
      removeMark,
    }
  },
})
</script>
<style scoped>
.v-card--flat {
  border: 1px solid #ddd;
}
.v-window.v-carousel {
  overflow: visible;
}
.v-carousel >>> .v-carousel__controls {
  background: none;
  height: 20px;
  transform: translateY(20px);
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
