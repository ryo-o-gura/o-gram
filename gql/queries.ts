export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const getUserByUsername = /* GraphQL */ `
  query GetUserByUsername($username: ID) {
    getUserByUsername(username: $username) {
      items {
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
  }
`
export const listUsers = /* GraphQL */ `
  query ListUsers {
    listUsers {
      items {
        id
        username
        icon
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
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
          commenter {
            id
            username
            icon
          }
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
export const listPosts = /* GraphQL */ `
  query ListPosts {
    listPosts {
      items {
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
          items {
            id
            postId
            authorId
            commenterId
            text
            commenter {
              id
              username
              icon
            }
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
      nextToken
    }
  }
`
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
export const listComments = /* GraphQL */ `
  query ListComments {
    listComments {
      items {
        id
        postId
        authorId
        commenterId
        text
        author {
          id
          username
          icon
          createdAt
          updatedAt
        }
        posts {
          id
          authorId
          content
          postImage
          createdAt
          updatedAt
        }
        commenter {
          id
          username
          icon
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getPostLike = /* GraphQL */ `
  query GetPostLike($id: ID!) {
    getPostLike(id: $id) {
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
export const listPostLikes = /* GraphQL */ `
  query ListPostLikes {
    listPostLikes {
      items {
        id
        postId
        userId
        user {
          id
          username
          icon
          createdAt
          updatedAt
        }
        post {
          id
          authorId
          content
          postImage
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const likesByUser = /* GraphQL */ `
  query LikesByUser($userId: ID) {
    likesByUser(userId: $userId) {
      items {
        id
        postId
        userId
        user {
          id
          username
          icon
          createdAt
          updatedAt
        }
        post {
          id
          authorId
          content
          postImage
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
