export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      icon
      posts {
        items {
          id
          authorId
          content
          postImage
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      username
      icon
      posts {
        items {
          id
          authorId
          content
          postImage
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      username
      icon
      posts {
        items {
          id
          authorId
          content
          postImage
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createPost = /* GraphQL */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
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
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postId
          authorId
          commenterId
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updatePost = /* GraphQL */ `
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
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
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postId
          authorId
          commenterId
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deletePost = /* GraphQL */ `
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input) {
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
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postId
          authorId
          commenterId
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createComment = /* GraphQL */ `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
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
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      commenter {
        id
        username
        icon
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateComment = /* GraphQL */ `
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
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
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      commenter {
        id
        username
        icon
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
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
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      commenter {
        id
        username
        icon
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createPostLike = /* GraphQL */ `
  mutation CreatePostLike($input: CreatePostLikeInput!) {
    createPostLike(input: $input) {
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
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updatePostLike = /* GraphQL */ `
  mutation UpdatePostLike($input: UpdatePostLikeInput!) {
    updatePostLike(input: $input) {
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
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deletePostLike = /* GraphQL */ `
  mutation DeletePostLike($input: DeletePostLikeInput!) {
    deletePostLike(input: $input) {
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
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
