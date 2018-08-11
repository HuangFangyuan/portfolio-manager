import { SET_LOG_FLAG, SET_USER_ID, SET_USER_ROLE } from "./mutation-types"

export default {
  [SET_LOG_FLAG](state, flag){
    state.login = flag
  },
  [SET_USER_ID](state, id){
    state.userId = id
  },
  [SET_USER_ROLE](state, id){
    state.role = id
  },
}
