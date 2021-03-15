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
            <v-carousel-item v-for="image in post.postImage" :key="image">
              <v-sheet height="100%" tile>
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  no-gutters
                >
                  <img :src="image" />
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="5">
          <!-- プロフィール -->
          <v-row class="post-nav py-4 px-3 justify-space-between" no-gutters>
            <v-col class="d-flex align-center font-weight-bold">
              <div class="icon-wrapper">
                <img
                  :src="ICONS[post.author.icon]"
                  alt="アイコン"
                  width="100%"
                />
              </div>
              <p class="mb-0 ml-2">{{ post.author.username }}</p>
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
                <span class="font-weight-bold">{{ post.author.username }}</span>
                <span style="white-space: pre-wrap">{{ post.content }} </span>
              </p>
            </v-col>
            <v-col
              cols="auto"
              v-for="(comment, index) in post.comments.items"
              :key="index"
            >
              <span class="font-weight-bold">{{
                comment.commenter.username
              }}</span>
              <span>{{ comment.text }} </span>
            </v-col>
          </v-row>
          <!-- アイコン -->
          <v-row
            class="post-icon-row ma-0 px-3 pt-1 justify-space-between"
            no-gutters
          >
            <v-col>
              <span>
                <v-btn text icon>
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
              <v-btn text icon>
                <v-icon v-if="post.bookmarkFlag" large>mdi-bookmark</v-icon>
                <v-icon v-else large>mdi-bookmark-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- いいね -->
          <v-row no-gutters class="px-4 text-caption">
            <v-col cols="12">
              <span v-if="post.likes.items" class="font-weight-bold">
                {{ post.likes.items.length }}人
              </span>
              <span v-else class="font-weight-bold"> 0人 </span>
              <span>が「いいね！」しました</span>
            </v-col>
            <v-col cols="12" class="mt-2">
              <p class="text-caption grey--text mb-0">{{ post.updatedAt }}</p>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="align-content-center comment-row px-4 mt-0 py-1"
          >
            <v-col cols="9" class="align-self-center">
              <v-text-field
                v-model="newCommentText"
                placeholder="コメントを追加"
                dense
                solo
                flat
              />
            </v-col>
            <v-col cols="3" class="align-self-center">
              <v-btn
                class="font-weight-bold"
                color="#0095f6"
                text
                :loading="isLoading"
                :disabled="!newCommentText.trim()"
                @click="createComment(post)"
              >
                投稿する
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, useFetch } from 'nuxt-composition-api'
import { createCommentGql } from '~/appsync/mutations'
import { getPostGql } from '~/appsync/queries'
import { CreateCommentInput, Post, User } from '~/types/API'
const ICONS = [
  require('~/assets/image/icon/01.png'),
  require('~/assets/image/icon/02.png'),
  require('~/assets/image/icon/03.png'),
  require('~/assets/image/icon/04.png'),
  require('~/assets/image/icon/05.png'),
  require('~/assets/image/icon/06.png'),
  require('~/assets/image/icon/07.png'),
  require('~/assets/image/icon/08.png'),
  require('~/assets/image/icon/09.png'),
]
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
      type: Object as PropType<Post>,
    },
    loginUser: {
      type: Object as PropType<User>,
    },
  },
  setup(props, { emit }) {
    /** data ***********************************************************/
    const newCommentText = ref('')
    const isLoading = ref(false)
    /** computed ***********************************************************/
    /** method ***********************************************************/
    // TODO:update方法
    const createComment = async (post: Post) => {
      isLoading.value = true
      const input: CreateCommentInput = {
        postId: post.id!,
        authorId: post.authorId!,
        commenterId: props.loginUser?.id!,
        text: newCommentText.value,
      }
      try {
        const createdReturn = await createCommentGql(input)
        // emit('update:post', updatedPost)
        const getPostInput = {
          id: createdReturn?.postId!,
        }
        console.debug('dsfasdfa', getPostInput)
        const updatedPost = await getPostGql(getPostInput)
        console.debug('dsfasdfa', updatedPost)
        emit('update:post', updatedPost)
      } catch (e) {
        console.error(e)
      } finally {
        newCommentText.value = ''
      }
      isLoading.value = false
    }
    return {
      /** data */
      ICONS,
      newCommentText,
      isLoading,
      /** computed */
      /** method */
      createComment,
    }
  },
})
</script>
<style scoped>
.v-dialog__content >>> .v-dialog {
  overflow: hidden;
}
.icon-wrapper {
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 50%;
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
.comment-row {
  height: 55px;
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
