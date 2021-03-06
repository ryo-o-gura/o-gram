import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import * as gqlQueries from '~/src/graphql/queries'
import * as type from '~/src/API'
// import * as gqlMutations from '~/src/graphql/mutations'
export const listUsersGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(gqlQueries.listUsers)
  )) as GraphQLResult<type.ListUsersQuery>
  return data?.listUsers?.items
}
