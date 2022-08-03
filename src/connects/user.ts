import {connect} from "../store";

const useStates = (state) => {
  return {userInfo: state.info}
}

const useDispatches = (dispatch) => {
  return {update: (payload) => dispatch({type: 'updateUserName',payload}), dispatch}
}

export const connectToUser = connect(useStates, useDispatches)