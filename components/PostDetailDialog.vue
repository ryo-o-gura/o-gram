<template>
  <v-dialog
    :value="isOpened"
    class="pa-4 login-dialog"
    width="800"
    @input="$emit('toggle', $event)"
  >
    <v-card flat tile class="mx-auto" height="600">
      <v-row no-gutters>
        <!-- 画像 -->
        <v-col cols="7">
          <v-carousel
            delimiter-icon="mdi-circle-small"
            :continuous="false"
            height="600"
          >
            <v-carousel-item v-for="picture in post.pictures" :key="picture">
              <v-sheet height="100%" tile>
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  no-gutters
                >
                  <img :src="picture" />
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="5">
          <!-- プロフィール -->
          <v-row class="post-nav py-4 px-3 justify-space-between" no-gutters>
            <v-col cols="auto">
              <v-btn text icon>
                <v-icon class="text-h4">mdi-account-circle</v-icon>
              </v-btn>
              <span>{{ post.userName }}</span>
            </v-col>
            <v-col align-self="center" class="text-right">
              <v-btn text icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
            </v-col>
          </v-row>
          <!-- 投稿テキスト -->
          <v-row
            no-gutters
            class="post-row px-4 flex-column flex-start flex-nowrap"
          >
            <v-col cols="auto">
              <p class="mb-0">
                <span class="font-weight-bold">{{ post.userName }}</span>
                <span style="white-space: pre-wrap">{{ post.postText }} </span>
              </p>
            </v-col>
            <v-col cols="auto" class="mb-10">
              <p class="mb-0">
                <v-btn
                  v-for="(tag, index) in post.tags"
                  :key="index"
                  class="tag pa-1"
                  text
                  >#{{ tag }}</v-btn
                >
              </p>
            </v-col>
            <v-col
              cols="auto"
              v-for="(comment, index) in post.comments"
              :key="index"
            >
              <span class="font-weight-bold">{{ comment.userName }}</span>
              <span>{{ comment.commentText }} </span>
            </v-col>
          </v-row>
          <!-- アイコン -->
          <v-row
            class="post-icon-row ma-0 px-3 pt-1 justify-space-between"
            no-gutters
          >
            <v-col>
              <span>
                <v-btn text icon @click="toggleFavoriteFlag">
                  <v-icon v-if="post.favoriteFlag" color="red" large>
                    mdi-heart
                  </v-icon>
                  <v-icon v-else large>mdi-heart-outline</v-icon>
                </v-btn>
              </span>
              <v-btn text icon>
                <v-icon large>mdi-chat-processing-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn text icon @click="toggleBookmarkFlag">
                <v-icon v-if="post.bookmarkFlag" large>mdi-bookmark</v-icon>
                <v-icon v-else large>mdi-bookmark-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- いいね -->
          <v-row no-gutters class="px-4 text-caption">
            <v-col cols="12">
              <span class="font-weight-bold">{{ post.favoriteCount }}人</span>
              <span>が「いいね！」しました</span>
            </v-col>
            <v-col cols="12" class="mt-2">
              <p class="text-caption grey--text mb-0">{{ post.updateDate }}</p>
            </v-col>
          </v-row>
          <v-row no-gutters class="comment-row px-4 py-1">
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
import { defineComponent, ref, PropType, useFetch } from 'nuxt-composition-api'
export default defineComponent({
  name: 'PostDetailDialog',
  model: {
    prop: 'isOpened',
    event: 'toggle',
  },
  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
    },
  },
  setup() {
    /** data ***********************************************************/
    const isLikePost = ref(false)
    const isMarkedPost = ref(false)
    /** computed ***********************************************************/
    /** method ***********************************************************/
    // TODO:update方法
    const toggleFavoriteFlag = () => {}
    const toggleBookmarkFlag = () => {}
    return {
      /** data */
      isLikePost,
      isMarkedPost,
      /** computed */
      /** method */
      toggleFavoriteFlag,
      toggleBookmarkFlag,
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
  height: 349px;
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
