import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteCount } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVoteCount(id))
    console.log('vote', id)
  }

  return (
    <>
    <h2>Anecdotes</h2>
    {anecdotes
      .sort((a, b) => { return b.votes - a.votes })
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList