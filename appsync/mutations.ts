import * as gqlMutations from '~/src/graphql/mutations' // create, update, delete
import { API, graphqlOperation } from 'aws-amplify'
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostLikeInput,
  DeletePostMutation,
  DeletePostInput,
} from '~/types/API'
import { GraphQLResult } from '@aws-amplify/api'
import {
  CreatePostLikeMutation,
  DeletePostLikeInput,
  DeletePostLikeMutation,
} from '../types/API'
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
