const notificationReducer = (state = "", action) => {
  if (action.type === 'SET_ALERT') {
    return action.message
  } else if (action.type === 'CLEAR') {
    return action.message 
  }
  return state
}

export const displayNotification = message => {
  return {
    type: 'SET_ALERT',
    message
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR',
    message: null
  }
}

export default notificationReducer