import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import * as gqlQueries from '~/src/graphql/queries'
export const listUsersGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listUsers)
  )) as GraphQLResult<ListUsersQuery>
  return data?.listUsers
}
export const listPostsGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listPosts)
  )) as GraphQLResult<ListPostsQuery>
  return data?.listPosts.items
}
export const getPostGql = async (getPostInput: GetPostInput) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.getPost, getPostInput)
  )) as GraphQLResult<GetPostQuery>
  return data?.getPost
}
