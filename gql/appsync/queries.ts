import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import * as gqlQueries from '~/gql/queries'
import {
  ListUsersQuery,
  ListPostsQuery,
  GetPostQuery,
} from '../../types/gqlResult'
import {
  GetPostInput,
  GetUserInput,
  GetUserByUsernameInput,
} from '../../types/schema'
import { GetUserQuery, GetUserByUsernameQuery } from '../../types/gqlResult'
export const listUsersGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listUsers)
  )) as GraphQLResult<ListUsersQuery>
  return data?.listUsers.items!
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
export const getUserGql = async (getUserInput: GetUserInput) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.getUser, getUserInput)
  )) as GraphQLResult<GetUserQuery>
  return data?.getUser!
}
export const getUserByUsernameGql = async (
  getUserByUsernameInput: GetUserByUsernameInput
) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.getUserByUsername, getUserByUsernameInput)
  )) as GraphQLResult<GetUserByUsernameQuery>
  return data?.getUserByUsername.items[0]!
}
