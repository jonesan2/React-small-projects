// unicafe project

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css"

const Statistic = ({ title, value }) => {
  return (
    <tr>
      <th>{title}</th>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total * 100;

  if (total === 0) {
    return (<p>No feedback given</p>);
  } else {
    return (
      <table>
        <tbody>
          <Statistic title="good" value={good} />
          <Statistic title="neutral" value={neutral} />
          <Statistic title="bad" value={bad} />
          <Statistic title="all" value={total} />
          <Statistic title="average" value={average} />
          <Statistic title="positive" value={positive} />
        </tbody>
      </table>
    );
  }
}

const Button = ({ feedback, handler }) => {
  return (
    <button onClick={handler(feedback)}>{feedback}</button>
  );

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (feedback) => () => {
    switch (feedback) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button feedback="good" handler={handleClick} />
      <Button feedback="neutral" handler={handleClick} />
      <Button feedback="bad" handler={handleClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)