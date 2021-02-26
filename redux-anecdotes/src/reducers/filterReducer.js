const filterReducer = (state = null, action) => {
  if (action.type === 'FILTER') {
    return action.filter
  }
  return state
}

export const filterAnecdotes = (filterString = "") => {
  return {
    type: 'FILTER',
    filter: filterString
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR',
    message: null
  }
}

export default filterReducer