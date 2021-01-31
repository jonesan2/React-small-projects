import React from 'react';

const AddForm = ({ handleSubmit, newName, handleTyping, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>add a new</h2>
      <div>
        name: <input value={newName} onChange={handleTyping(setNewName)}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleTyping(setNewNumber)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default AddForm;