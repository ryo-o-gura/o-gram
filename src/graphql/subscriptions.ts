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
export const onCreatePostLike = /* GraphQL */ `
  subscription OnCreatePostLike {
    onCreatePostLike {
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
export const onUpdatePostLike = /* GraphQL */ `
  subscription OnUpdatePostLike {
    onUpdatePostLike {
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
export const onDeletePostLike = /* GraphQL */ `
  subscription OnDeletePostLike {
    onDeletePostLike {
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
