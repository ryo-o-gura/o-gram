import * as gqlMutations from '~/src/graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'

export const createPostGql = async (createPostInput: CreatePostInput) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlMutations.createPost, {
      input: createPostInput,
    })
  )) as GraphQLResult<CreatePostMutation>
  return data?.createPost
}
export const deletePostGql = async (deletePostInput: DeletePostInput) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlMutations.deletePost, {
      input: deletePostInput,
    })
  )) as GraphQLResult<DeletePostMutation>
  return data?.deletePost
}
export const createPostLikeGql = async (
  createPostLikeInput: CreatePostLikeInput
) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlMutations.createPostLike, {
      input: createPostLikeInput,
    })
  )) as GraphQLResult<CreatePostLikeMutation>
  return data?.createPostLike
}
export const deletePostLikeGql = async (
  deletePostLikeInput: DeletePostLikeInput
) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlMutations.deletePostLike, {
      input: deletePostLikeInput,
    })
  )) as GraphQLResult<DeletePostLikeMutation>
  return data?.deletePostLike
}
export const createCommentGql = async (
  createCommentInput: CreateCommentInput
) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlMutations.createComment, {
      input: createCommentInput,
    })
  )) as GraphQLResult<CreateCommentMutation>
  return data?.createComment
}
