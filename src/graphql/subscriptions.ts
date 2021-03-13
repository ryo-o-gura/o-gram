/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
          password
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
        password
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
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
          password
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
        password
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
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
          password
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
        password
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
`;
export const onCreatePostLike = /* GraphQL */ `
  subscription OnCreatePostLike {
    onCreatePostLike {
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
          password
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
`;
export const onUpdatePostLike = /* GraphQL */ `
  subscription OnUpdatePostLike {
    onUpdatePostLike {
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
          password
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
`;
export const onDeletePostLike = /* GraphQL */ `
  subscription OnDeletePostLike {
    onDeletePostLike {
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
          password
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
`;
