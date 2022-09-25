// doing react in type way
import { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { Todo } from './todo.model';

// React.FC means that the App should be function type in react
const App: React.FC = () => {
  // FC can also be replaced by FunctionaComponent
  // code  for todo starts here
  // const todos = [{ id: 't1', text: 'Finished' }];
  // todos using sates
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    console.log(text);
    // can we done like this.
    // setTodos([...todos, { id: Math.random().toString(), text: text }]);
    // OR
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      // filter is builtin method wjich return array data which is old array - anything that is filtered
      // filter applies on function and check wheter the output is true or false
      // if output if true item is kept else removed
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      {/*A component that adds todos */}
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
