<template>
  <div>
    <LoginDialog
      :is-opened.sync="isOpenedLoginDialog"
      @update="updateLoginUser"
      @snackbar="updateSnackbar"
    />
    <CreateUserDialog
      :is-opened.sync="isOpenedCreateUserDialog"
      @update="updateLoginUser"
      @snackbar="updateSnackbar"
    />
    <ComfirmDialog
      :is-opened.sync="isOpenedComfirmDialog"
      :post="selectedPost"
      @delete="deletePost"
    />
    <PostDetailDialog
      v-model="isOpenedPostDetailDialog"
      :login-user="loginUser"
      :post.sync="selectedPost"
      @update="updateAll"
      @comfirm-delete="openComfirmDialog"
      @snackbar="updateSnackbar"
    />

    <CreatePostDialog
      v-model="isOpenedCreatePostDialog"
      :login-user="loginUser"
      @create="updateAll"
      @snackbar="updateSnackbar"
    />
    <EditUserDialog
      v-model="isOpenedEditUserDialog"
      :login-user="loginUser"
      @update="updateAll"
      @snackbar="updateSnackbar"
    />
    <v-app-bar fixed dark color="black" height="80px">
      <v-row class="mx-sm-10">
        <v-col class="text-sm-h3 text-h4 font-weight-bold title-font">
          O-gram
        </v-col>
        <v-col v-if="isLogined && loginUser" class="d-flex">
          <v-spacer />
          <v-btn
            class="d-block white--text text-sm-body-1 font-weight-bold mr-2 px-sm-2"
            text
            @click="openEditUserDialog"
          >
            <v-icon>mdi-account-outline</v-icon>
            {{ loginUser.username }}
          </v-btn>
          <v-btn
            class="d-block white--text text-sm-body-1 font-weight-bold px-sm-2"
            text
            @click="logout"
          >
            <v-icon>mdi-logout</v-icon>
            ログアウト
          </v-btn>
          <!-- <p class="mb-0">{{ loginUser.username }}</p> -->
        </v-col>
        <v-col v-else class="d-flex">
          <v-spacer />
          <v-btn
            class="d-block white--text text-sm-body-1 font-weight-bold mr-2 px-sm-2"
            text
            @click="isOpenedLoginDialog = true"
          >
            <v-icon>mdi-login</v-icon>
            ログイン
          </v-btn>
          <v-btn
            class="d-block white--text text-sm-body-1 font-weight-bold px-sm-2"
            text
            @click="isOpenedCreateUserDialog = true"
          >
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
            新規登録
          </v-btn>
          <!-- <p class="mb-0">{{ loginUser.username }}</p> -->
        </v-col>
      </v-row>
    </v-app-bar>

    <div class="posts-wrapper">
      <v-btn
        tile
        class="d-block mx-auto font-weight-bold"
        width="600px"
        max-width="100%"
        elevation="10"
        height="40px"
        @click="openCreatePostDialog"
      >
        <v-icon>mdi-plus</v-icon> 投稿を追加する
      </v-btn>
      <!--投稿 -------------------------------------------------------->
      <v-card
        v-for="(post, postIndex) in sortedAllPosts"
        :key="post.id"
        elevation="10"
        tile
        class="mx-auto pb-2 mt-5 mb-10"
        width="600"
      >
        <!-- プロフィール -->
        <v-row class="post-nav py-2 px-3 justify-space-between" no-gutters>
          <v-col class="d-flex align-center font-weight-bold">
            <div class="icon-wrapper">
              <img
                v-if="postIconList[postIndex]"
                class="icon"
                :src="postIconList[postIndex]"
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
          <v-col
            v-if="isMineThePost(post)"
            align-self="center"
            class="text-right"
          >
            <span class="text-body-2 grey--text">あなたの投稿です</span>
          </v-col>
        </v-row>
        <!-- 画像 -->
        <v-carousel
          :height="carouselHeight"
          delimiter-icon="mdi-circle-small"
          :continuous="false"
        >
          <v-carousel-item
            v-for="(image, imageIndex) in postImageList[postIndex]"
            :key="imageIndex"
          >
            <v-sheet height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <img class="post-image" :src="image" />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <!-- アイコン -->
        <v-row class="post-icon-row px-3 justify-space-between" no-gutters>
          <v-col>
            <span>
              <v-btn
                text
                icon
                @click="togglePostLike(post)"
                :loading="isLoading"
              >
                <v-icon v-if="isLikedThePost(post)" color="red" large>
                  mdi-heart
                </v-icon>
                <v-icon v-else large>mdi-heart-outline</v-icon>
              </v-btn>
            </span>
            <v-btn
              text
              icon
              @click="openPostDetailDialog(post, postImageList[postIndex])"
            >
              <v-icon large>mdi-chat-processing-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn
              v-if="isMineThePost(post)"
              text
              icon
              :loading="isLoading"
              @click="openComfirmDialog(post)"
            >
              <v-icon large>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!-- いいね -->
        <v-row no-gutters class="px-4 text-body-2">
          <v-col>
            <span v-if="post.likes.items.length" class="font-weight-bold">
              {{ post.likes.items.length }}人
            </span>
            <span v-else class="font-weight-bold">0人</span>
            <span>が「いいね！」しました</span>
          </v-col>
        </v-row>
        <!-- 投稿テキスト -->
        <v-row no-gutters class="px-4">
          <p class="mb-0">
            <span class="font-weight-bold">{{ post.author.username }}</span>
            <span style="white-space: pre-wrap">{{ post.content }} </span>
          </p>
          <p class="mb-0"></p>
        </v-row>
        <v-row class="px-4" no-gutters>
          <v-btn
            v-if="post.comments.items.length"
            text
            @click="openPostDetailDialog(post, postIndex)"
          >
            <p class="text-body-2 text--secondary mb-0">
              コメント{{ post.comments.items.length }}件をすべて見る
            </p>
          </v-btn>
          <p v-else class="text-body-2 text--secondary mb-0">コメントなし</p>
        </v-row>
        <v-row class="px-4 grey--text" no-gutters>
          {{ getDate(Number(post.createdAt)) }}
        </v-row>
      </v-card>
    </div>
    <v-snackbar v-model="isOpenedSnackbar" light bottom left>
      <v-row no-gutters>
        <v-col
          class="text-center align-self-center font-weight-bold text-body-1"
        >
          <p class="mb-0">{{ snackbarText }}</p>
        </v-col>
      </v-row>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useFetch,
  watch,
} from 'nuxt-composition-api'
import { getUserGql, listPostsGql } from '~/gql/appsync/queries'
import { Storage } from 'aws-amplify'
import { getDate } from '~/modules/getDate'
import {
  deletePostLikeGql,
  deletePostGql,
  createPostLikeGql,
} from '../gql/appsync/mutations'
import {
  CreatePostLikeInput,
  DeletePostLikeInput,
  Post,
  PostLike,
  User,
} from '~/types/schema'
const DEFAULT_USER: User = {
  __typename: 'User',
  id: '',
  username: '',
  password: '',
  icon: '',
  posts: { items: [] },
  createdAt: 0,
  updatedAt: 0,
}
export default defineComponent({
  setup(_, { root }) {
    /** data ***********************************************************/
    const isOpenedComfirmDialog = ref(false)
    const isOpenedLoginDialog = ref(false)
    const isOpenedCreateUserDialog = ref(false)
    const isOpenedPostDetailDialog = ref(false)
    const isOpenedCreatePostDialog = ref(false)
    const isOpenedEditUserDialog = ref(false)
    const isOpenedSnackbar = ref(false)
    const snackbarText = ref('')
    const isLikePost = ref(false)
    const isLoading = ref(false)
    const isMarkedPost = ref(false)
    const selectedPost = ref<Post>()
    const allPosts = ref<Post[]>([])
    const postImageList = ref<any>([])
    const postIconList = ref<any>('')
    const loginUser = ref<User>(DEFAULT_USER)
    /** computed ***********************************************************/
    const isLogined = computed(() => {
      return loginUser.value.id !== ''
    })

    const carouselHeight = computed(() => {
      return root.$vuetify.breakpoint.xs ? '300' : '600'
    })

    const sortedAllPosts = computed(() => {
      return allPosts.value.sort(function (a, b) {
        if (Number(a.createdAt) < Number(b.createdAt)) return 1
        if (Number(a.createdAt) > Number(b.createdAt)) return -1
        return 0
      })
    })
    /** method ***********************************************************/
    const logout = () => {
      window.localStorage.removeItem('loginUser')
      loginUser.value = DEFAULT_USER
      updateSnackbar('ログアウトしました')
    }
    const updateLoginUser = (user: User) => {
      if (!user) return
      loginUser.value = user
      updateAll()
    }
    const updateSnackbar = (text: string) => {
      snackbarText.value = text
      isOpenedSnackbar.value = true
    }

    const openPostDetailDialog = (post: Post) => {
      selectedPost.value = post
      isOpenedPostDetailDialog.value = true
    }
    const openComfirmDialog = (post: Post) => {
      selectedPost.value = post
      isOpenedComfirmDialog.value = true
    }
    const openEditUserDialog = () => {
      if (loginUser.value.id !== '589dfc63-f336-4b89-833d-f7e0aeb7e728') {
        isOpenedEditUserDialog.value = true
      } else {
        updateSnackbar('ゲストユーザーの情報は変更できません')
      }
    }
    const openCreatePostDialog = (post: Post) => {
      if (isLogined.value) {
        isOpenedCreatePostDialog.value = true
      } else {
        updateSnackbar('ログインしてください')
      }
    }
    // ダイアログでの変更反映
    const updateAll = async () => {
      if (isLogined.value) {
        const id = {
          id: loginUser.value.id,
        }
        loginUser.value = await getUserGql(id)
      }
      allPosts.value = await listPostsGql()
      await getPostIconList()
      await getPostImageList()
    }

    const getPostImageList = async () => {
      postImageList.value = []
      const getPostImage = async (post: Post) => {
        const getOnePostImages = post.postImage.map(async (image) => {
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
      for (const post in sortedAllPosts.value) {
        try {
          const images = await getPostImage(sortedAllPosts.value[post])
          postImageList.value.push(images)
        } catch (e) {
          console.error(e)
        }
      }
    }
    const getPostIconList = async () => {
      const getPostIcons = sortedAllPosts.value.map(async (post) => {
        if (post.author.icon) {
          return await Storage.get(post.author.icon)
        } else {
          return ''
        }
      })
      postIconList.value = await Promise.all(getPostIcons)
        .then((result) => {
          return result
        })
        .catch((e) => {
          console.error(e)
        })
    }
    // 自分の投稿かのチェック
    const isMineThePost = (post: Post) => {
      const author = post.authorId
      if (!loginUser.value) return
      return author === loginUser.value.id
    }

    // 自分がいいねしているかのチェック
    const isLikedThePost = (post: Post) => {
      const likesItems = post.likes?.items
      const findItem = likesItems?.findIndex((item: PostLike) => {
        return item?.userId === loginUser.value?.id
      })
      return findItem !== -1
    }

    // postLikeのtoggle
    const togglePostLike = async (post: Post) => {
      isLoading.value = true
      if (isLogined.value) {
        if (isLikedThePost(post)) {
          const likesItems = post.likes.items
          const findItem = likesItems?.find((item: PostLike | null) => {
            return item?.userId === loginUser.value?.id
          })
          const input: DeletePostLikeInput = {
            id: findItem?.id!,
          }
          try {
            await deletePostLikeGql(input)
            allPosts.value = await listPostsGql()
            updateSnackbar('いいねを取り消しました')
          } catch (e) {
            console.error(e)
            updateSnackbar('いいねを取り消せませんでした')
          }
        } else {
          const input: CreatePostLikeInput = {
            postId: post.id!,
            userId: loginUser.value?.id!,
          }
          try {
            await createPostLikeGql(input)
            allPosts.value = await listPostsGql()
            updateSnackbar('いいねしました')
          } catch (e) {
            console.error(e)
            updateSnackbar('いいねできませんでした')
          }
        }
      } else {
        updateSnackbar('ログインしてください')
      }
      isLoading.value = false
    }

    const deletePost = async (post: Post) => {
      isLoading.value = true
      isOpenedComfirmDialog.value = false
      isOpenedPostDetailDialog.value = false
      try {
        const input = {
          id: post.id,
        }
        await deletePostGql(input)
        await updateAll()
        updateSnackbar('投稿を削除しました')
      } catch (e) {
        console.error(e)
        updateSnackbar('投稿を削除できませんでした')
      } finally {
        isLoading.value = false
      }
    }
    /** init */
    watch(
      () => {
        allPosts.value
      },
      async () => {
        await getPostImageList()
      }
    )
    useFetch(async () => {
      try {
        const localUser = window.localStorage.getItem('loginUser')
        if (localUser) {
          const id = {
            id: localUser,
          }
          loginUser.value = await getUserGql(id)
        }
        allPosts.value = await listPostsGql()
        await getPostImageList()
        await getPostIconList()
      } catch (e) {
        console.error(e)
      }
    })
    return {
      /** data */
      loginUser,
      isOpenedComfirmDialog,
      isOpenedLoginDialog,
      isOpenedCreateUserDialog,
      isOpenedPostDetailDialog,
      isOpenedCreatePostDialog,
      isOpenedEditUserDialog,
      isOpenedSnackbar,
      snackbarText,
      isLogined,
      carouselHeight,
      isLikePost,
      isMarkedPost,
      selectedPost,
      allPosts,
      postImageList,
      postIconList,
      isLoading,
      /** computed */
      sortedAllPosts,
      /** method */
      updateLoginUser,
      updateSnackbar,
      logout,
      getDate,
      openComfirmDialog,
      openPostDetailDialog,
      openEditUserDialog,
      openCreatePostDialog,
      updateAll,
      togglePostLike,
      isMineThePost,
      isLikedThePost,
      deletePost,
    }
  },
})
</script>
<style scoped>
.title-font {
  font-family: 'Londrina Solid', cursive !important;
}
.v-card--flat {
  border: 1px solid #ddd;
}
.v-app-bar >>> .v-toolbar__content {
  max-width: 1000px;
  margin: 0 auto;
}
.posts-wrapper {
  margin-top: 100px;
}
.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid rgb(158, 113, 72);
}
.icon-wrapper .icon {
  height: 100%;
  object-fit: cover;
}
/* カルーセル */
.v-window.v-carousel {
  overflow: visible;
}
/* カルーセル画像 */
.v-carousel >>> .post-image {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
/* 何ページ目かのポッチ */
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
  color: rgb(158, 113, 72);
}
.post-icon-row >>> .v-btn--icon {
  z-index: 2;
}
.v-btn--text >>> .v-btn__content {
  text-transform: none;
}
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0;
  min-width: 0;
  height: auto;
}
/* 白文字ボタンのホバー時 */
.v-btn.white--text:hover {
  transition: 0.3s;
  background-color: rgb(61, 61, 61);
}
.v-btn.theme--light.v-btn.v-btn--has-bg {
  background-color: #fff;
}

/* xsの時 */
@media screen and (max-width: 599px) {
  /* 画像スライドボタン */
  .v-carousel >>> .v-window__next,
  .v-carousel >>> .v-window__prev {
    margin: 0 8px;
  }
  .v-snack >>> .v-snack__wrapper {
    width: 100%;
    margin: 12px;
    border: 8px solid rgb(158, 113, 72);
    padding: 4px 8px;
  }
}
</style>
