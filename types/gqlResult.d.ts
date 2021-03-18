declare interface ListUsersQuery {
  listUsers: User[]
}
declare interface CreatePostMutation {
  createPost: Post
}
declare interface DeletePostMutation {
  deletePost: Post
}
declare interface ListPostsQuery {
  listPosts: PostItems
}
declare interface GetPostQuery {
  getPost: Post
}
declare interface CreatePostLikeMutation {
  createPostLike: PostLike
}
declare interface DeletePostLikeMutation {
  deletePostLike: PostLike
}
declare interface CreateCommentMutation {
  createComment: Comment
}
