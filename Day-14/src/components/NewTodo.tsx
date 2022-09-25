import React, { useRef } from 'react';

import './NewTodo.css'

// interface for onAdd todo
interface onAddTodoProps {
  onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<onAddTodoProps> = (props) => {
  // useRef is generic type
  const textInputref = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // we will use refs in input taking
    const enteredText = textInputref.current!.value;
    props.onAddTodo(enteredText);
    console.log(enteredText);
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">
          TodoText:
          <input type="text" id="todo-text" ref={textInputref} />
        </label>
      </div>
      <button type="submit">Add ToDo</button>
    </form>
  );
};

export default NewTodo;
