export interface User {
  __typename: 'User'
  id: string
  username: string
  password: string
  icon: string
  posts: PostItems
  createdAt: number
  updatedAt: number
}
export interface UserItems {
  items: User[]
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
  updatedAt: number
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
  updatedAt: number
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
  updatedAt: number
}

/* user系 *******************************************************************/
export interface CreateUserInput {
  username: string
  password: string
  icon?: string
  createdAt: number
}
export interface UpdateUserInput {
  id: string
  username: string
  password: string
  icon?: string
  updatedAt: number
}


/* post系 *******************************************************************/
export interface CreatePostInput {
  authorId: string
  content: string
  postImage: string[]
  createdAt: string
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
export interface GetUserByUsernameInput {
  username: string
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
  createdAt?: string
}
