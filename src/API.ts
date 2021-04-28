/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  icon?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelUserConditionInput = {
  username?: ModelIDInput | null,
  icon?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id?: string,
  username?: string,
  icon?: string | null,
  posts?: ModelPostConnection,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  id?: string,
  authorId?: string,
  content?: string,
  postImage?: Array< string | null >,
  author?: User,
  comments?: ModelCommentConnection,
  likes?: ModelPostLikeConnection,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items?:  Array<Comment | null > | null,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id?: string,
  postId?: string,
  authorId?: string,
  commenterId?: string,
  text?: string,
  author?: User,
  posts?: Post,
  commenter?: User,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelPostLikeConnection = {
  __typename: "ModelPostLikeConnection",
  items?:  Array<PostLike | null > | null,
  nextToken?: string | null,
};

export type PostLike = {
  __typename: "PostLike",
  id?: string,
  postId?: string,
  userId?: string,
  user?: User,
  post?: Post,
  updatedAt?: number | null,
  createdAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  icon?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  authorId: string,
  content: string,
  postImage: Array< string | null >,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelPostConditionInput = {
  authorId?: ModelIDInput | null,
  content?: ModelStringInput | null,
  postImage?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type UpdatePostInput = {
  id: string,
  authorId?: string | null,
  content?: string | null,
  postImage?: Array< string | null > | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  postId: string,
  authorId: string,
  commenterId: string,
  text: string,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelCommentConditionInput = {
  postId?: ModelIDInput | null,
  authorId?: ModelIDInput | null,
  commenterId?: ModelIDInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  postId?: string | null,
  authorId?: string | null,
  commenterId?: string | null,
  text?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type CreatePostLikeInput = {
  id?: string | null,
  postId: string,
  userId: string,
  updatedAt?: number | null,
  createdAt?: number | null,
};

export type ModelPostLikeConditionInput = {
  postId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  updatedAt?: ModelIntInput | null,
  createdAt?: ModelIntInput | null,
  and?: Array< ModelPostLikeConditionInput | null > | null,
  or?: Array< ModelPostLikeConditionInput | null > | null,
  not?: ModelPostLikeConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePostLikeInput = {
  id: string,
  postId?: string | null,
  userId?: string | null,
  updatedAt?: number | null,
  createdAt?: number | null,
};

export type DeletePostLikeInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelIDInput | null,
  icon?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  authorId?: ModelIDInput | null,
  content?: ModelStringInput | null,
  postImage?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  authorId?: ModelIDInput | null,
  commenterId?: ModelIDInput | null,
  text?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelPostLikeFilterInput = {
  id?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  updatedAt?: ModelIntInput | null,
  createdAt?: ModelIntInput | null,
  and?: Array< ModelPostLikeFilterInput | null > | null,
  or?: Array< ModelPostLikeFilterInput | null > | null,
  not?: ModelPostLikeFilterInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    icon?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        authorId: string,
        content: string,
        postImage: Array< string | null >,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    icon?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        authorId: string,
        content: string,
        postImage: Array< string | null >,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    icon?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        authorId: string,
        content: string,
        postImage: Array< string | null >,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input?: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    authorId: string,
    content: string,
    postImage: Array< string | null >,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postId: string,
        authorId: string,
        commenterId: string,
        text: string,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    likes?:  {
      __typename: "ModelPostLikeConnection",
      items?:  Array< {
        __typename: "PostLike",
        id: string,
        postId: string,
        userId: string,
        updatedAt?: number | null,
        createdAt?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input?: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    authorId: string,
    content: string,
    postImage: Array< string | null >,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postId: string,
        authorId: string,
        commenterId: string,
        text: string,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    likes?:  {
      __typename: "ModelPostLikeConnection",
      items?:  Array< {
        __typename: "PostLike",
        id: string,
        postId: string,
        userId: string,
        updatedAt?: number | null,
        createdAt?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input?: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    authorId: string,
    content: string,
    postImage: Array< string | null >,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postId: string,
        authorId: string,
        commenterId: string,
        text: string,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    likes?:  {
      __typename: "ModelPostLikeConnection",
      items?:  Array< {
        __typename: "PostLike",
        id: string,
        postId: string,
        userId: string,
        updatedAt?: number | null,
        createdAt?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input?: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    postId: string,
    authorId: string,
    commenterId: string,
    text: string,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    posts?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    commenter?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input?: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    postId: string,
    authorId: string,
    commenterId: string,
    text: string,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    posts?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    commenter?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input?: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    postId: string,
    authorId: string,
    commenterId: string,
    text: string,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    posts?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    commenter?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type CreatePostLikeMutationVariables = {
  input?: CreatePostLikeInput,
  condition?: ModelPostLikeConditionInput | null,
};

export type CreatePostLikeMutation = {
  createPostLike?:  {
    __typename: "PostLike",
    id: string,
    postId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: number | null,
    createdAt?: number | null,
  } | null,
};

export type UpdatePostLikeMutationVariables = {
  input?: UpdatePostLikeInput,
  condition?: ModelPostLikeConditionInput | null,
};

export type UpdatePostLikeMutation = {
  updatePostLike?:  {
    __typename: "PostLike",
    id: string,
    postId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: number | null,
    createdAt?: number | null,
  } | null,
};

export type DeletePostLikeMutationVariables = {
  input?: DeletePostLikeInput,
  condition?: ModelPostLikeConditionInput | null,
};

export type DeletePostLikeMutation = {
  deletePostLike?:  {
    __typename: "PostLike",
    id: string,
    postId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: number | null,
    createdAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    icon?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        authorId: string,
        content: string,
        postImage: Array< string | null >,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id?: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    authorId: string,
    content: string,
    postImage: Array< string | null >,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postId: string,
        authorId: string,
        commenterId: string,
        text: string,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    likes?:  {
      __typename: "ModelPostLikeConnection",
      items?:  Array< {
        __typename: "PostLike",
        id: string,
        postId: string,
        userId: string,
        updatedAt?: number | null,
        createdAt?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id?: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    postId: string,
    authorId: string,
    commenterId: string,
    text: string,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    posts?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    commenter?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items?:  Array< {
      __typename: "Comment",
      id: string,
      postId: string,
      authorId: string,
      commenterId: string,
      text: string,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      posts?:  {
        __typename: "Post",
        id: string,
        authorId: string,
        content: string,
        postImage: Array< string | null >,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      commenter?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPostLikeQueryVariables = {
  id?: string,
};

export type GetPostLikeQuery = {
  getPostLike?:  {
    __typename: "PostLike",
    id: string,
    postId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: number | null,
    createdAt?: number | null,
  } | null,
};

export type ListPostLikesQueryVariables = {
  filter?: ModelPostLikeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostLikesQuery = {
  listPostLikes?:  {
    __typename: "ModelPostLikeConnection",
    items?:  Array< {
      __typename: "PostLike",
      id: string,
      postId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      post?:  {
        __typename: "Post",
        id: string,
        authorId: string,
        content: string,
        postImage: Array< string | null >,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      updatedAt?: number | null,
      createdAt?: number | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserByUsernameQueryVariables = {
  username?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserByUsernameQuery = {
  getUserByUsername?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type LikesByUserQueryVariables = {
  userId?: string | null,
  createdAt?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostLikeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LikesByUserQuery = {
  likesByUser?:  {
    __typename: "ModelPostLikeConnection",
    items?:  Array< {
      __typename: "PostLike",
      id: string,
      postId: string,
      userId: string,
      user?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      post?:  {
        __typename: "Post",
        id: string,
        authorId: string,
        content: string,
        postImage: Array< string | null >,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      updatedAt?: number | null,
      createdAt?: number | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    authorId: string,
    content: string,
    postImage: Array< string | null >,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postId: string,
        authorId: string,
        commenterId: string,
        text: string,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    likes?:  {
      __typename: "ModelPostLikeConnection",
      items?:  Array< {
        __typename: "PostLike",
        id: string,
        postId: string,
        userId: string,
        updatedAt?: number | null,
        createdAt?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    authorId: string,
    content: string,
    postImage: Array< string | null >,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postId: string,
        authorId: string,
        commenterId: string,
        text: string,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    likes?:  {
      __typename: "ModelPostLikeConnection",
      items?:  Array< {
        __typename: "PostLike",
        id: string,
        postId: string,
        userId: string,
        updatedAt?: number | null,
        createdAt?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    authorId: string,
    content: string,
    postImage: Array< string | null >,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        postId: string,
        authorId: string,
        commenterId: string,
        text: string,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    likes?:  {
      __typename: "ModelPostLikeConnection",
      items?:  Array< {
        __typename: "PostLike",
        id: string,
        postId: string,
        userId: string,
        updatedAt?: number | null,
        createdAt?: number | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    postId: string,
    authorId: string,
    commenterId: string,
    text: string,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    posts?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    commenter?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    postId: string,
    authorId: string,
    commenterId: string,
    text: string,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    posts?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    commenter?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    postId: string,
    authorId: string,
    commenterId: string,
    text: string,
    author?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    posts?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    commenter?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnCreatePostLikeSubscription = {
  onCreatePostLike?:  {
    __typename: "PostLike",
    id: string,
    postId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: number | null,
    createdAt?: number | null,
  } | null,
};

export type OnUpdatePostLikeSubscription = {
  onUpdatePostLike?:  {
    __typename: "PostLike",
    id: string,
    postId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: number | null,
    createdAt?: number | null,
  } | null,
};

export type OnDeletePostLikeSubscription = {
  onDeletePostLike?:  {
    __typename: "PostLike",
    id: string,
    postId: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      icon?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    post?:  {
      __typename: "Post",
      id: string,
      authorId: string,
      content: string,
      postImage: Array< string | null >,
      author?:  {
        __typename: "User",
        id: string,
        username: string,
        icon?: string | null,
        updatedAt?: string | null,
        createdAt?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?:  {
        __typename: "ModelPostLikeConnection",
        nextToken?: string | null,
      } | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null,
    updatedAt?: number | null,
    createdAt?: number | null,
  } | null,
};
