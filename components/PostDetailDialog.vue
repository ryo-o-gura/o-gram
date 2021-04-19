<template>
  <v-dialog
    v-if="post"
    :value="isOpened"
    class="pa-4 login-dialog"
    width="800"
    @input="$emit('toggle', $event)"
  >
    <v-card flat tile class="mx-auto" height="600">
      <v-row no-gutters>
        <!-- 画像 -->
        <v-col cols="7" class="image-wrapper">
          <v-carousel
            delimiter-icon="mdi-circle-small"
            :continuous="false"
            height="600"
          >
            <v-carousel-item
              v-for="(image, index) in postImageList"
              :key="index"
            >
              <v-sheet height="100%" tile>
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  no-gutters
                >
                  <img class="post-image" :src="image" />
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
                  v-if="userIcon"
                  class="icon"
                  :src="userIcon"
                  alt="アイコン"
                  width="100%"
                />
                <img
                  v-else
                  class="icon"
                  src="~/assets/image/icon.jpg"
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
          <v-row
            no-gutters
            class="post-row px-4 flex-column flex-start flex-nowrap"
          >
            <!-- 投稿テキスト -->
            <v-col cols="auto" class="pb-10">
              <p class="mb-0">
                <span class="font-weight-bold text-h6">{{
                  post.author.username
                }}</span>
                <span style="white-space: pre-wrap">{{ post.content }} </span>
              </p>
            </v-col>
            <!-- コメント -->
            <v-col
              cols="auto"
              class="mb-1"
              v-for="(comment, index) in sortedAllComments"
              :key="index"
            >
              <p class="mb-0">
                <span v-if="comment.commenter" class="font-weight-bold">{{
                  comment.commenter.username
                }}</span>
                <span v-else class="font-weight-bold">unknown</span>
                <span>{{ comment.text }} </span>
              </p>
              <p class="mb-0 pl-1 comment-date grey--text">
                {{ getDate(Number(comment.createdAt)) }}
              </p>
            </v-col>
          </v-row>
          <!-- アイコン -->
          <v-row
            class="post-icon-row ma-0 px-3 pt-1 justify-space-between"
            no-gutters
          >
            <v-col>
              <span>
                <v-btn
                  text
                  icon
                  :loading="isLoading"
                  @click="togglePostLike(post)"
                >
                  <v-icon v-if="isLikedThePost(post)" color="red" large>
                    mdi-heart
                  </v-icon>
                  <v-icon v-else large>mdi-heart-outline</v-icon>
                </v-btn>
              </span>
            </v-col>
            <v-col class="text-right">
              <v-btn text icon>
                <v-icon v-if="post.bookmarkFlag" large>mdi-bookmark</v-icon>
                <v-icon v-else large>mdi-bookmark-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- いいね -->
          <v-row no-gutters class="px-4 mt-1 text-body-2">
            <v-col cols="12">
              <span v-if="post.likes.items" class="font-weight-bold">
                {{ post.likes.items.length }}人
              </span>
              <span v-else class="font-weight-bold"> 0人 </span>
              <span>が「いいね！」しました</span>
            </v-col>
            <v-col cols="12" class="mt-2">
              <p class="text-caption grey--text mb-0">
                {{ getDate(Number(post.createdAt)) }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters class="align-content-center comment-row px-4 mt-2">
            <v-col cols="9" class="align-self-center">
              <v-text-field
                v-model="newCommentText"
                placeholder="コメントを追加"
                dense
                color="rgb(158, 113, 72)"
                flat
                @keypress.enter="createComment(post)"
              />
            </v-col>
            <v-col cols="3" class="align-self-center pl-2">
              <v-btn
                class="font-weight-bold"
                color="rgb(158, 113, 72)"
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
import {
  defineComponent,
  ref,
  PropType,
  useFetch,
  computed,
  watch,
} from 'nuxt-composition-api'
import {
  createCommentGql,
  createPostLikeGql,
  deletePostLikeGql,
} from '~/appsync/mutations'
import { getPostGql } from '~/appsync/queries'
import { Storage } from 'aws-amplify'
import { getDate } from '~/modules/getDate'
import {
  CreateCommentInput,
  CreatePostLikeInput,
  DeletePostLikeInput,
  GetPostInput,
  Post,
  PostLike,
  User,
} from '~/types/schema'
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
      required: true,
    },
  },
  setup(props, { emit }) {
    /** data ***********************************************************/
    const newCommentText = ref('')
    const isLoading = ref(false)
    const userIcon = ref('')
    const postImageList = ref<any>([])
    /** computed ***********************************************************/
    const sortedAllComments = computed(() => {
      if (props.post)
        return props.post.comments.items.sort(function (a, b) {
          if (a.createdAt < b.createdAt) return -1
          if (a.createdAt > b.createdAt) return 1
          return 0
        })
    })

    /** method ***********************************************************/
    // 自分がいいねしているかのチェック
    const isLikedThePost = (post: Post) => {
      const likesItems = post.likes?.items
      const findItem = likesItems?.findIndex((item: PostLike) => {
        return item?.userId === props.loginUser?.id
      })
      return findItem !== -1
    }

    // postLikeのtoggle
    const togglePostLike = async (post: Post) => {
      isLoading.value = true
      if (props.loginUser.id) {
        if (isLikedThePost(post)) {
          const likesItems = post.likes.items
          const findItem = likesItems?.find((item: PostLike | null) => {
            return item?.userId === props.loginUser.id
          })
          const deletePostLikeInput: DeletePostLikeInput = {
            id: findItem?.id!,
          }
          try {
            await deletePostLikeGql(deletePostLikeInput)
            const getPostInput: DeletePostLikeInput = {
              id: post?.id!,
            }
            const updatedPost = await getPostGql(getPostInput)
            emit('update:post', updatedPost)
            emit('snackbar', 'いいねを取り消しました')
          } catch (e) {
            console.error(e)
            emit('snackbar', 'いいねを取り消せませんでした')
          }
        } else {
          const createPostLikeInput: CreatePostLikeInput = {
            postId: post.id!,
            userId: props.loginUser?.id!,
          }
          try {
            await createPostLikeGql(createPostLikeInput)
            const getPostInput: DeletePostLikeInput = {
              id: post?.id!,
            }
            const updatedPost = await getPostGql(getPostInput)
            emit('update:post', updatedPost)
            emit('snackbar', 'いいねしました')
          } catch (e) {
            console.error(e)
            emit('snackbar', 'いいねできませんでした')
          }
        }
      } else {
        emit('snackbar', 'ログインしてください')
      }
      isLoading.value = false
    }

    const createComment = async (post: Post) => {
      if (props.loginUser.id) {
        if (!newCommentText.value.trim()) return
        isLoading.value = true
        const input: CreateCommentInput = {
          postId: post.id!,
          authorId: post.authorId!,
          commenterId: props.loginUser.id!,
          text: newCommentText.value,
          createdAt: String(Date.now()),
        }
        try {
          const createdReturn = await createCommentGql(input)
          const getPostInput: GetPostInput = {
            id: createdReturn?.postId!,
          }
          const updatedPost = await getPostGql(getPostInput)
          emit('update:post', updatedPost)
          emit('snackbar', 'コメントしました')
        } catch (e) {
          emit('snackbar', 'コメントできませんでした')
          console.error(e)
        } finally {
          newCommentText.value = ''
        }
        isLoading.value = false
      } else {
        emit('snackbar', 'ログインしてください')
      }
    }

    /** init */
    const getPostImage = async () => {
      if (!props.post) return
      const getOnePostImages = props.post.postImage.map(async (image) => {
        return await Storage.get(image)
      })
      return await Promise.all(getOnePostImages)
        .then((result) => {
          return result
        })
        .catch((e) => {
          console.error(e)
        })
    }

    watch(
      () => props.isOpened,
      async (arg) => {
        if (arg) {
          try {
            if (userIcon.value) {
              userIcon.value = (await Storage.get(
                props.post?.author.icon!
              )) as string
            }
            const images = await getPostImage()
            postImageList.value = images
          } catch (e) {
            console.error(e)
          }
        } else {
          postImageList.value = []
          emit('update')
        }
      }
    )

    return {
      /** data */
      newCommentText,
      isLoading,
      userIcon,
      postImageList,
      /** computed */
      sortedAllComments,
      /** method */
      isLikedThePost,
      togglePostLike,
      getDate,
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
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgb(158, 113, 72);
}
.icon-wrapper .icon {
  height: 100%;
  object-fit: cover;
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
  color: rgb(158, 113, 72);
}
.v-carousel >>> .v-btn--icon.v-btn--active::before {
  display: none;
}
.post-row {
  height: 349px;
  overflow-y: scroll;
}
.post-nav {
  border-bottom: 1px solid #ddd;
}
.image-wrapper {
  border-right: 1px solid #ddd;
}
.post-image {
  width: 100%;
}
.post-icon-row,
.comment-row {
  border-top: 1px solid #ddd;
}
.comment-row {
  height: 55px;
}
.comment-row >>> .v-text-field__details {
  display: none;
}
.comment-date {
  font-size: 10px;
  line-height: 1;
}
.post-icon-row >>> .v-btn--icon {
  z-index: 2;
}
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0;
  min-width: 0;
  height: auto;
}
</style>
