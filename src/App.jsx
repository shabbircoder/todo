import './App.css';
import { Plus, Trash, CheckCircle } from 'react-feather';
import { useState, useEffect } from 'react';

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  // Retrieve todos from local storage when the app loads
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    let todoitem = {
      name: todo,
      check: false
    }
    if (todo !== "") {
      setTodos([...todos, todoitem]);
      setTodo("");
    }
  }

  const deleteTodo = (index) => {
    const newTodos = todos.filter((todo, ind) => {
      return ind !== index;
    });
    setTodos(newTodos);
  }

  const markTodo = (index) => {
    const newTodos = todos.map((todo, ind) => {
      if (ind === index) {
        todo.check = !todo.check;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div className='brand'>
        <CheckCircle color='#666' size={24}></CheckCircle>
        <h1>TODO APP</h1>
      </div>
      <h3>Friday, 19 September</h3>

      <div className='input-wrapper'>
        <input
          type='text'
          name='todo'
          value={todo}
          placeholder='Create a new todo'
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        >
        </input>

        <button className='add-button' onClick={addTodo}>
          <Plus></Plus>
        </button>
      </div>

      <div>
        {todos?.length > 0 ? (
          <ul className='todo-list'>
            {
              todos.map((entry, index) => {
                return <li key={index}>
                  <input
                    type='checkbox'
                    name='todocheck'
                    checked={entry.check}
                    onChange={() => {
                      markTodo(index);
                    }}
                  ></input>
                  <p className={entry.check ? 'check' : ''}>{entry.name}</p>
                  <button onClick={() => { deleteTodo(index) }}>
                    <Trash size={14}></Trash>
                  </button>
                </li>
              })
            }
          </ul>
        ) : (
          <div className='empty'>
            <p>No todo's found !</p>
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
