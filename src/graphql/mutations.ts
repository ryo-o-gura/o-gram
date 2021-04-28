/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      icon
      posts {
        items {
          id
          authorId
          content
          postImage
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      icon
      posts {
        items {
          id
          authorId
          content
          postImage
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      icon
      posts {
        items {
          id
          authorId
          content
          postImage
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      authorId
      content
      postImage
      author {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      comments {
        items {
          id
          postId
          authorId
          commenterId
          text
          updatedAt
          createdAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          userId
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      authorId
      content
      postImage
      author {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      comments {
        items {
          id
          postId
          authorId
          commenterId
          text
          updatedAt
          createdAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          userId
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      authorId
      content
      postImage
      author {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      comments {
        items {
          id
          postId
          authorId
          commenterId
          text
          updatedAt
          createdAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          userId
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postId
      authorId
      commenterId
      text
      author {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      posts {
        id
        authorId
        content
        postImage
        author {
          id
          username
          icon
          updatedAt
          createdAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
        createdAt
      }
      commenter {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postId
      authorId
      commenterId
      text
      author {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      posts {
        id
        authorId
        content
        postImage
        author {
          id
          username
          icon
          updatedAt
          createdAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
        createdAt
      }
      commenter {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postId
      authorId
      commenterId
      text
      author {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      posts {
        id
        authorId
        content
        postImage
        author {
          id
          username
          icon
          updatedAt
          createdAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
        createdAt
      }
      commenter {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const createPostLike = /* GraphQL */ `
  mutation CreatePostLike(
    $input: CreatePostLikeInput!
    $condition: ModelPostLikeConditionInput
  ) {
    createPostLike(input: $input, condition: $condition) {
      id
      postId
      userId
      user {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      post {
        id
        authorId
        content
        postImage
        author {
          id
          username
          icon
          updatedAt
          createdAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const updatePostLike = /* GraphQL */ `
  mutation UpdatePostLike(
    $input: UpdatePostLikeInput!
    $condition: ModelPostLikeConditionInput
  ) {
    updatePostLike(input: $input, condition: $condition) {
      id
      postId
      userId
      user {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      post {
        id
        authorId
        content
        postImage
        author {
          id
          username
          icon
          updatedAt
          createdAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const deletePostLike = /* GraphQL */ `
  mutation DeletePostLike(
    $input: DeletePostLikeInput!
    $condition: ModelPostLikeConditionInput
  ) {
    deletePostLike(input: $input, condition: $condition) {
      id
      postId
      userId
      user {
        id
        username
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      post {
        id
        authorId
        content
        postImage
        author {
          id
          username
          icon
          updatedAt
          createdAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
