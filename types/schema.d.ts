export interface User {
  __typename: 'User'
  id: string
  username: string
  password: string
  icon: number
  posts: PostItems
  createdAt: number
  updatedAt: string
}
export interface Post {
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
export interface PostItems {
  items: Post[]
}
export interface PostLikeItems {
  items: PostLike[]
}
export interface PostLike {
  __typename: 'PostLike'
  id: string
  postId: string
  userId: string
  user: User
  post: Post
  createdAt: number
  updatedAt: string
}
export interface CommentItems {
  items: Comment[]
}
export interface Comment {
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
export interface CreatePostInput {
  authorId: string
  content: string
  postImage: string[]
}
export interface DeletePostInput {
  id: string
}
export interface GetPostInput {
  id: string
}
export interface GetUserInput {
  id: string
}
/* postLike系 *******************************************************************/
export interface CreatePostLikeInput {
  postId: string
  userId: string
}
export interface DeletePostLikeInput {
  id: string
}

/* comment系 *******************************************************************/
export interface CreateCommentInput {
  postId: string
  authorId: string
  commenterId: string
  text: string
}
