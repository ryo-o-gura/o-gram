import { User, Post, PostItems, PostLike, Comment } from './schema';
export interface ListUsersQuery {
  listUsers: User[]
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
