import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import * as gqlQueries from '~/gql/queries'
import {
  ListUsersQuery,
  ListPostsQuery,
  GetPostQuery,
} from '../types/gqlResult'
import { GetPostInput } from '../types/schema'
export const listUsersGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listUsers)
  )) as GraphQLResult<ListUsersQuery>
  return data?.listUsers!
}
export const listPostsGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listPosts)
  )) as GraphQLResult<ListPostsQuery>
  return data?.listPosts.items!
}
export const getPostGql = async (getPostInput: GetPostInput) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.getPost, getPostInput)
  )) as GraphQLResult<GetPostQuery>
  return data?.getPost!
}
