import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteCount } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { clearNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter == null) {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => {
        return anecdote.content.includes(filter)
      })
    }
  })

  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch(incrementVoteCount(id))
    dispatch(displayNotification(`You voted for "${content}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
    {anecdotes
      .sort((a, b) => { return b.votes - a.votes })
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList