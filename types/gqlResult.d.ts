import { User, Post, PostItems, PostLike, Comment, UserItems } from './schema';
export interface ListUsersQuery {
  listUsers: UserItems
}
export interface CreateUserMutation {
  createUser: User
}
export interface CreatePostMutation {
  createPost: Post
}
export interface DeletePostMutation {
  deletePost: Post
}
export interface ListPostsQuery {
  listPosts: PostItems
}
export interface GetPostQuery {
  getPost: Post
}
export interface GetUserQuery {
  getUser: User
}
export interface CreatePostLikeMutation {
  createPostLike: PostLike
}
export interface DeletePostLikeMutation {
  deletePostLike: PostLike
}
export interface CreateCommentMutation {
  createComment: Comment
}
export interface UpdateUserMutation {
  updateUser: User
}
