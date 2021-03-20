<template>
  <div>
    <LoginDialog :is-opened="isOpenedLoginDialog" @close="closeLoginDialog" />
    <PostDetailDialog
      v-model="isOpenedPostDetailDialog"
      :post.sync="selectedPost"
      :loginUser="loginUser"
    />

    <CreatePostDialog
      v-model="isOpenedCreatePostDialog"
      @create="createPosts"
    />
    <v-app-bar>
      <v-row no-gutters class="mx-10">
        <v-col class="text-h3 font-weight-bold" @click="openCreatePostDialog">
          O-gram
        </v-col>
        <v-col class="d-flex">
          <v-spacer />
          <v-btn class="d-block font-weight-bold" text @click="guestLogin">
            ゲストユーザーとしてログイン
          </v-btn>
          <v-btn class="d-block font-weight-bold" text @click="openLoginDialog">
            ログイン・アカウント作成
          </v-btn>
          <p class="mb-0">{{ loginUser.username }}</p>
        </v-col>
      </v-row>
    </v-app-bar>
    <div class="posts-wrapper">
      <!--投稿 -------------------------------------------------------->
      <v-card
        v-for="(post, postIndex) in allPosts"
        :key="post.id"
        flat
        tile
        class="mx-auto pb-5 my-10"
        width="600"
      >
        <!-- プロフィール -->
        <v-row class="post-nav py-2 px-3 justify-space-between" no-gutters>
          <v-col class="d-flex align-center font-weight-bold">
            <div class="icon-wrapper">
              <img :src="ICONS[post.author.icon]" alt="アイコン" width="100%" />
            </div>
            <p class="mb-0 ml-2">{{ post.author.username }}</p>
          </v-col>
          <v-col align-self="center" class="text-right">
            <v-btn text icon @click="deletePost(post)"
              ><v-icon>mdi-dots-horizontal</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <!-- 画像 -->
        <v-carousel delimiter-icon="mdi-circle-small" :continuous="false">
          <v-carousel-item
            v-for="(image, imageIndex) in postImagesUrls[postIndex]"
            :key="imageIndex"
          >
            <v-sheet height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <img :src="image" />
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
            <v-btn text icon @click="openPostDetailDialog(post)">
              <v-icon large>mdi-chat-processing-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn text icon>
              <!-- <v-icon v-if="post.bookmarkFlag" large>mdi-bookmark</v-icon> -->
              <v-icon large>mdi-bookmark-outline</v-icon>
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
            @click="openPostDetailDialog(post)"
          >
            <p class="text-body-2 text--secondary mb-0">
              コメント{{ post.comments.items.length }}件をすべて見る
            </p>
          </v-btn>
          <p v-else class="text-body-2 text--secondary mb-0">コメントなし</p>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useFetch } from 'nuxt-composition-api'
import { listPostsGql } from '~/appsync/queries'
import { Storage } from 'aws-amplify'
import {
  deletePostLikeGql,
  deletePostGql,
  createPostLikeGql,
} from '../appsync/mutations'
import {
  CreatePostLikeInput,
  DeletePostLikeInput,
  Post,
  PostLike,
  User,
} from '~/types/schema'
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
  setup(_, { root }) {
    /** data ***********************************************************/
    const isOpenedLoginDialog = ref(false)
    const isOpenedPostDetailDialog = ref(false)
    const isOpenedCreatePostDialog = ref(false)
    const isLikePost = ref(false)
    const isLoading = ref(false)
    const isMarkedPost = ref(false)
    const selectedPost = ref<Post>()
    const allPosts = ref<Post[]>([])
    const postImagesUrls = ref<any[]>([])
    const loginUser = computed(() => {
      return root.$store.state.user.loginUser
    })
    /** computed ***********************************************************/
    /** method ***********************************************************/
    const openLoginDialog = () => {
      isOpenedLoginDialog.value = true
    }
    const closeLoginDialog = () => {
      isOpenedLoginDialog.value = false
    }
    const guestLogin = async () => {
      const id = {
        id: 'da74a514-dd6b-4f01-884c-0bde23a41801',
      }
      await root.$store.dispatch('user/signIn', id)
    }
    const openPostDetailDialog = (post: Post) => {
      selectedPost.value = post
      console.debug(selectedPost.value)
      isOpenedPostDetailDialog.value = true
    }
    const openCreatePostDialog = (post: Post) => {
      isOpenedCreatePostDialog.value = true
    }

    const getPostUrl = async (postImgs: string[]) => {
      return Promise.all(
        postImgs.map((img) => {
          return Storage.get(img)
        })
      ).then((arg) => {
        return arg
      })
    }
    const getPostImgsArray = async (postList: Post[]) => {
      return Promise.all(
        postList.map((post: Post) => {
          return getPostUrl(post.postImage)
        })
      ).then((arg) => {
        console.debug('terer', arg)
        return arg
      })
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
        } catch (e) {
          console.error(e)
        }
      } else {
        const input: CreatePostLikeInput = {
          postId: post.id!,
          userId: loginUser.value?.id!,
        }
        try {
          await createPostLikeGql(input)
          allPosts.value = await listPostsGql()
        } catch (e) {
          console.error(e)
        }
      }
      isLoading.value = false
    }
    const createPosts = (post: Post) => {
      allPosts.value.push(post)
    }
    const deletePost = async (post: Post) => {
      try {
        const input = {
          id: post.id,
        }
        const deletedPost = await deletePostGql(input)
        console.debug(deletedPost)
        allPosts.value = await listPostsGql()
      } catch (e) {
        console.error(e)
      }
      console.debug(post)
    }
    /** init */
    useFetch(async () => {
      try {
        const id = {
          id: 'da74a514-dd6b-4f01-884c-0bde23a41801',
        }
        await root.$store.dispatch('user/signIn', id)
        allPosts.value = await listPostsGql()
        postImagesUrls.value = await getPostImgsArray(allPosts.value)
        console.debug('fdsaf', postImagesUrls.value[0])
      } catch (e) {
        console.debug(e)
      } finally {
        console.debug('allpost', allPosts.value)
        console.debug('loginUser', loginUser.value)
      }
    })
    return {
      /** data */
      ICONS,
      loginUser,
      isOpenedLoginDialog,
      isOpenedPostDetailDialog,
      isOpenedCreatePostDialog,
      isLikePost,
      isMarkedPost,
      selectedPost,
      allPosts,
      postImagesUrls,
      isLoading,
      /** computed */
      /** method */
      openLoginDialog,
      closeLoginDialog,
      guestLogin,
      openPostDetailDialog,
      openCreatePostDialog,
      getPostUrl,
      togglePostLike,
      createPosts,
      isLikedThePost,
      deletePost,
    }
  },
})
</script>
<style scoped>
.v-card--flat {
  border: 1px solid #ddd;
}
.icon-wrapper {
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 50%;
  overflow: hidden;
}
/* カルーセル */
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
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0;
  min-width: 0;
  height: auto;
}
</style>
