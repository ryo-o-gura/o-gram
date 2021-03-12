import * as gqlMutations from '~/src/graphql/mutations' // create, update, delete
import { API, graphqlOperation } from 'aws-amplify'
import {
  CreatePostInput,
  CreatePostMutation,
  DeletePostInput,
  DeletePostMutation,
} from '~/types/API'
import { GraphQLResult } from '@aws-amplify/api'
export const createPostGql = async (CreatePostInput: CreatePostInput) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlMutations.createPost, {
      input: CreatePostInput,
    })
  )) as GraphQLResult<CreatePostMutation>
  return data?.createPost
}
export const deletePostGql = async (id: string) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlMutations.deletePost, {
      input: { id },
    })
  )) as GraphQLResult<DeletePostMutation>
  return data?.deletePost
}
