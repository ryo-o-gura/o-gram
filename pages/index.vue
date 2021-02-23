<template>
  <div>
    <LoginDialog :is-opened="isOpenedLoginDialog" @close="closeLoginDialog" />
    <PostDetailDialog v-model="isOpenedPostDetailDialog" :post="selectedPost" />
    <h1 class="text-h1 font-weight-bold text-center">O-gram</h1>
    <div class="posts-wrapper">
      <!--投稿 -------------------------------------------------------->
      <v-card
        v-for="post in allPosts"
        :key="post.postId"
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
            <span>{{ post.userName }}</span>
          </v-col>
          <v-col align-self="center" class="text-right">
            <v-btn text icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
          </v-col>
        </v-row>
        <!-- 画像 -->
        <v-carousel delimiter-icon="mdi-circle-small" :continuous="false">
          <v-carousel-item v-for="picture in post.pictures" :key="picture">
            <v-sheet height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <img :src="picture" />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <!-- アイコン -->
        <v-row class="post-icon-row px-3 justify-space-between" no-gutters>
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
        <v-row no-gutters class="px-4 text-body-2">
          <v-col>
            <span class="font-weight-bold">{{ post.favoriteCount }}人</span>
            <span>が「いいね！」しました</span>
          </v-col>
        </v-row>
        <!-- 投稿テキスト -->
        <v-row no-gutters class="px-4">
          <p class="mb-0">
            <span class="font-weight-bold">{{ post.userName }}</span>
            <span style="white-space: pre-wrap">{{ post.postText }} </span>
          </p>
          <p class="mb-0">
            <v-btn
              v-for="(tag, index) in post.tags"
              :key="index"
              class="tag pa-1"
              text
              >#{{ tag }}</v-btn
            >
          </p>
        </v-row>
        <v-row class="px-4" no-gutters>
          <v-btn v-if="true" text @click="openPostDetailDialog">
            <p class="text-body-2 text--secondary mb-0">
              コメント{{ post.comments.length }}件をすべて見る
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
import { Post } from 'types/appsyncSchema'
export default defineComponent({
  setup() {
    /** data ***********************************************************/
    const isOpenedLoginDialog = ref(false)
    const isOpenedPostDetailDialog = ref(false)
    const isLikePost = ref(false)
    const isMarkedPost = ref(false)
    const selectedPost = ref<Post>()
    const allPosts = ref<Post[]>([
      {
        userName: 'user1',
        userId: 1,
        postId: 1,
        favoriteCount: 20,
        favoriteFlag: true,
        bookmarkFlag: true,
        postText: '投稿内容です投稿内容です',
        updateDate: '2021:01:21:14:21',
        pictures: [
          require('@/assets/image/image1.jpg'),
          require('@/assets/image/image2.jpg'),
          require('@/assets/image/image3.jpg'),
          require('@/assets/image/image4.jpg'),
        ],
        tags: ['tag1', 'tag2', 'tag3'],
        comments: [
          {
            userName: 'commenter1',
            userId: 102,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
          {
            userName: 'commenter2',
            userId: 10,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
        ],
      },
      {
        userName: 'user2',
        userId: 2,
        postId: 2,
        favoriteCount: 20,
        favoriteFlag: true,
        bookmarkFlag: true,
        postText: '投稿内容です投稿内容です',
        updateDate: '2021:01:21:14:21',
        pictures: [
          require('@/assets/image/image1.jpg'),
          require('@/assets/image/image2.jpg'),
          require('@/assets/image/image3.jpg'),
          require('@/assets/image/image4.jpg'),
        ],
        tags: ['tag1', 'tag2', 'tag3'],
        comments: [
          {
            userName: 'commenter1',
            userId: 102,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
          {
            userName: 'commenter2',
            userId: 10,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
        ],
      },
      {
        userName: 'user3',
        userId: 3,
        postId: 3,
        favoriteCount: 20,
        favoriteFlag: true,
        bookmarkFlag: true,
        postText: '投稿内容です投稿内容です',
        updateDate: '2021:01:21:14:21',
        pictures: [
          require('@/assets/image/image1.jpg'),
          require('@/assets/image/image2.jpg'),
          require('@/assets/image/image3.jpg'),
          require('@/assets/image/image4.jpg'),
        ],
        tags: ['tag1', 'tag2', 'tag3'],
        comments: [
          {
            userName: 'commenter1',
            userId: 102,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
          {
            userName: 'commenter2',
            userId: 10,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
        ],
      },
      {
        userName: 'user1',
        userId: 4,
        postId: 4,
        favoriteCount: 20,
        favoriteFlag: true,
        bookmarkFlag: true,
        postText: '投稿内容です投稿内容です',
        updateDate: '2021:01:21:14:21',
        pictures: [
          require('@/assets/image/image1.jpg'),
          require('@/assets/image/image2.jpg'),
          require('@/assets/image/image3.jpg'),
          require('@/assets/image/image4.jpg'),
        ],
        tags: ['tag1', 'tag2', 'tag3'],
        comments: [
          {
            userName: 'commenter1',
            userId: 102,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
          {
            userName: 'commenter2',
            userId: 10,
            commentText: 'コメントですコメントです',
            updateDate: '2021:01:21:14:21',
          },
        ],
      },
    ])
    /** computed ***********************************************************/
    /** method ***********************************************************/
    const openLoginDialog = () => {
      isOpenedLoginDialog.value = true
    }
    const closeLoginDialog = () => {
      isOpenedLoginDialog.value = false
    }
    const openPostDetailDialog = (item: Post) => {
      console.debug(item)
      selectedPost.value = item
      isOpenedPostDetailDialog.value = true
    }
    const toggleFavoriteFlag = (item: Post) => {
      console.debug(item)
      isLikePost.value = true
    }
    const toggleBookmarkFlag = (item: Post) => {
      console.debug(item)
      isLikePost.value = false
    }
    /** init */

    return {
      /** data */
      isOpenedLoginDialog,
      isOpenedPostDetailDialog,
      isLikePost,
      isMarkedPost,
      selectedPost,
      allPosts,
      /** computed */
      /** method */
      openLoginDialog,
      closeLoginDialog,
      openPostDetailDialog,
      toggleFavoriteFlag,
      toggleBookmarkFlag,
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
