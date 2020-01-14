const INITIAL_STATE = {
    data: {}
  }
  
  const reducerKey = 'AUTH';
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case `${reducerKey}_SET_STATE`:
        return {...state, data: action.payload}
      case `${reducerKey}_RESET`:
        return INITIAL_STATE;
      default:
        return state;
    }
  }
  
  export const setState = payload => {
    return {
      type: `${reducerKey}_SET_STATE`,
      payload
    }
  }
  export const resetAuth = () => {
    return {
      type: `${reducerKey}_RESET`,
    }
  }

  