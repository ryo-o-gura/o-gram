import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import * as gqlQueries from '~/src/graphql/queries'
import { ListUsersQuery, ListPostsQuery } from '~/types/API'
import { GetPostQuery, GetPostQueryVariables } from '../types/API'
export const listUsersGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listUsers)
  )) as GraphQLResult<ListUsersQuery>
  return data?.listUsers?.items
}
export const listPostsGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listPosts)
  )) as GraphQLResult<ListPostsQuery>
  return data?.listPosts?.items
}
export const getPostGql = async (id: string) => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.getPost, {
      id,
    })
  )) as GraphQLResult<GetPostQuery>
  return data?.getPost
}
