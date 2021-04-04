/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      password
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        username
        password
        icon
        posts {
          nextToken
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      authorId
      content
      postImage
      author {
        id
        username
        password
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorId
        content
        postImage
        author {
          id
          username
          password
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postId
      authorId
      commenterId
      text
      author {
        id
        username
        password
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
          password
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
        password
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        authorId
        commenterId
        text
        author {
          id
          username
          password
          icon
          updatedAt
          createdAt
        }
        posts {
          id
          authorId
          content
          postImage
          updatedAt
          createdAt
        }
        commenter {
          id
          username
          password
          icon
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getPostLike = /* GraphQL */ `
  query GetPostLike($id: ID!) {
    getPostLike(id: $id) {
      id
      postId
      userId
      user {
        id
        username
        password
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
          password
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
export const listPostLikes = /* GraphQL */ `
  query ListPostLikes(
    $filter: ModelPostLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        userId
        user {
          id
          username
          password
          icon
          updatedAt
          createdAt
        }
        post {
          id
          authorId
          content
          postImage
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const likesByUser = /* GraphQL */ `
  query LikesByUser(
    $userId: ID
    $createdAt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByUser(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        userId
        user {
          id
          username
          password
          icon
          updatedAt
          createdAt
        }
        post {
          id
          authorId
          content
          postImage
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
