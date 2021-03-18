declare interface User {
  __typename: 'User'
  id: string
  username: string
  password: string
  icon: number | null
  posts: Post[]
  createdAt: number | null
  updatedAt: string
}
declare interface Post {
  __typename: 'Post'
  id: string
  authorId: string
  content: string
  postImage: string[]
  author: User
  comments: CommentItems
  likes: PostLikeItems
  createdAt: number
  updatedAt: string
}
declare interface PostItems {
  items: Post[]
}
declare interface PostLikeItems {
  items: PostLike[]
}
declare interface PostLike {
  __typename: 'PostLike'
  id: string
  postId: string
  userId: string
  user: User
  post: Post
  createdAt: number
  updatedAt: string
}
declare interface CommentItems {
  items: Comment[]
}
declare interface Comment {
  __typename: 'Comment'
  id: string
  postId: string
  authorId: string
  commenterId: string
  text: string
  author: User
  posts: Post
  commenter: User
  createdAt: number
  updatedAt: string
}

/* user系 *******************************************************************/

/* post系 *******************************************************************/
declare interface CreatePostInput {
  authorId: string
  content: string
  postImage: string[]
}
declare interface DeletePostInput {
  id: string
}
declare interface GetPostInput {
  id: string
}
/* postLike系 *******************************************************************/
declare interface CreatePostLikeInput {
  postId: string
  userId: string
}
declare interface DeletePostLikeInput {
  id: string
}

/* comment系 *******************************************************************/
declare interface CreateCommentInput {
  postId: string
  authorId: string
  commenterId: string
  text: string
}
