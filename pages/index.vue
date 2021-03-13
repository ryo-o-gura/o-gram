<template>
  <div>
    <LoginDialog :is-opened="isOpenedLoginDialog" @close="closeLoginDialog" />
    <PostDetailDialog v-model="isOpenedPostDetailDialog" :post="selectedPost" />
    <CreatePostDialog
      v-model="isOpenedCreatePostDialog"
      @create="updatePosts"
    />
    <h1
      class="text-h1 font-weight-bold text-center"
      @click="openCreatePostDialog"
    >
      O-gram
    </h1>
    <div class="posts-wrapper">
      <!--投稿 -------------------------------------------------------->
      <v-card
        v-for="post in allPosts"
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
          <v-carousel-item v-for="image in post.postImage" :key="image">
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
            <v-btn text icon>
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
            <span class="font-weight-bold">
              {{ post.likes.items.length }}人
            </span>
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
            v-if="post.comments.items"
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
import { defineComponent, ref, useFetch } from 'nuxt-composition-api'
import { listPostsGql } from '~/appsync/queries'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '~/src/aws-exports'
import {
  deletePostLikeGql,
  deletePostGql,
  createPostLikeGql,
} from '../appsync/mutations'
import {
  CreatePostInput,
  CreatePostLikeInput,
  DeletePostLikeInput,
  Post,
  PostLike,
  User,
} from '~/types/API'
Amplify.configure(awsconfig)
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
    const selectedPost = ref<any>({
      userName: '',
      userId: 0,
      postId: 0,
      favoriteCount: 0,
      favoriteFlag: false,
      bookmarkFlag: false,
      postText: '',
      updateDate: '',
      pictures: [],
      tags: [''],
      comments: [
        {
          userName: '',
          userId: 0,
          commentText: '',
          updateDate: '',
        },
      ],
    })
    const allPosts = ref<any>([])
    const loginUser = ref<User>(root.$store.state.user.loginUser)
    /** computed ***********************************************************/
    /** method ***********************************************************/
    const openLoginDialog = () => {
      isOpenedLoginDialog.value = true
    }
    const closeLoginDialog = () => {
      isOpenedLoginDialog.value = false
    }
    const openPostDetailDialog = (post: any) => {
      isOpenedPostDetailDialog.value = true
    }
    const openCreatePostDialog = (post: any) => {
      isOpenedCreatePostDialog.value = true
    }

    // 自分がいいねしているかのチェック
    const isLikedThePost = (post: Post) => {
      const likesItems = post.likes?.items
      const findItem = likesItems?.findIndex((item: PostLike | null) => {
        return item?.userId === loginUser.value.id
      })
      return findItem !== -1
    }

    // postLikeのtoggle
    const togglePostLike = async (post: Post) => {
      isLoading.value = true
      if (isLikedThePost(post)) {
        const likesItems = post.likes?.items
        const findItem = likesItems?.find((item: PostLike | null) => {
          return item?.userId === loginUser.value.id
        })
        const input: DeletePostLikeInput = {
          id: findItem?.id,
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
          userId: loginUser.value.id!,
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
    const updatePosts = (post: Post) => {
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
        // 自動サインイン（仮）
        await Auth.signIn('admin0000', 'admin-pass')
        allPosts.value = await listPostsGql()
        console.debug(allPosts.value)
      } catch (e) {
        console.debug(e)
      }
    })
    return {
      /** data */
      ICONS,
      isOpenedLoginDialog,
      isOpenedPostDetailDialog,
      isOpenedCreatePostDialog,
      isLikePost,
      isMarkedPost,
      selectedPost,
      allPosts,
      isLoading,
      /** computed */
      /** method */
      openLoginDialog,
      closeLoginDialog,
      openPostDetailDialog,
      openCreatePostDialog,
      togglePostLike,
      updatePosts,
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
