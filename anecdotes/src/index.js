import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const len = props.anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(len).fill(0));
  const mostVotes = Math.max(...votes);
  const mostIndex = votes.findIndex(elem => elem === mostVotes);
  const mostPopular = props.anecdotes[mostIndex];

  const handleVote = () => () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  }

  const handleClick = () => () => {
    const index = Math.floor(Math.random() * len)
    setSelected(index);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote()}>vote</button>
      <button onClick={handleClick()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{mostPopular}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)