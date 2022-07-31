import {connect} from "../store";

const useStates = (state) => {
  return {userInfo: state.info}
}

const useDispatches = (dispatch) => {
  return {update: (value) => dispatch({type: 'updateUserName',value})}
}

export const connectToUser = connect(useStates, useDispatches)