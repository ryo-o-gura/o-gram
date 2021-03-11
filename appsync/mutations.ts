import * as gqlMutations from '~/src/graphql/mutations' // create, update, delete
import { API, graphqlOperation } from 'aws-amplify';
import { CreatePostInput } from '~/src/API';
export const createPostGql = (CreatePostInput : CreatePostInput) => {
  API.graphql(graphqlOperation(gqlMutations.createPost, {
    input: CreatePostInput
  }))
}