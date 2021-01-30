import React from 'react';

const Total = (props) => {
  let total = props.parts.reduce((tot, part) => tot + part.exercises, 0);
  return (
    <p class="total">total of {total} exercises</p>
  )
}

export default Total