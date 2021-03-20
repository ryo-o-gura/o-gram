import { User, GetUserInput } from '../types/schema'
import { getUserGql } from '../appsync/queries'
export const state = () => ({
  loginUser: {},
})

export const mutations = {
  setUser(state: any, user: User) {
    state.loginUser = user
  },
}

export const actions = {
  async signIn({ commit }: any, getUserInput: GetUserInput) {
    const loginUser = await getUserGql(getUserInput)
    commit('setUser', loginUser)
  },
  async signOut({ commit }: any) {
    commit('setUser', {})
  },
}
