import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { TodoContext } from "@/context";
import { ITodo } from "@/interfaces";
import { TodoItem } from "@/components";


const initialState = {
  _id: '',
  title: '',
  status: false,
  createdAt: 0
}

const HomePage = () => {
  const { todos ,addTodo } = useContext(TodoContext);

  const [inputValue, setInputValue] = useState<ITodo>(initialState);
  const [toggleTheme, setToggleTheme] = useState(false);

  const { title } = inputValue;

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({
      ...prevState,
      [target.id]: target.value
    }));
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '' || title.trim().length < 3) return;
    
    addTodo(title)
    setInputValue(initialState);
  }

  const toggleMenu = () => {
    if (toggleTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setToggleTheme(!toggleTheme);
  }
  return (
    <main className="min-h-screen bg-slate-200 dark:bg-slate-700">
      <div className="w-full p-2 flex justify-between md:justify-between bg-violet-500">
        <h1 className="text-3xl font-semibold text-white">TODO APP</h1>
        <button
          onClick={toggleMenu}
          className=" bg-slate-700 dark:bg-violet-900 w-10 p-2 rounded-full shadow-md fadeIn"
        >
          {toggleTheme ? (<FontAwesomeIcon className="text-cyan-400 text-lg" icon={faMoon} />) : (<FontAwesomeIcon className="text-orange-200" icon={faSun} />)}
        </button>
      </div>
      <div className="w-full p-2 dark:bg-slate-500 bg-violet-300">
        <form className="w-full grid gap-2" onSubmit={onSubmit}>
          <input
            id='title'
            type='text'
            className="p-2 rounded-md flex-1"
            placeholder="Add a new task"
            maxLength={ 50 }
            value={title}
            onChange={onInputChange}
          />

          <button
            type="submit"
            className="p-2 border-2 text-white font-semibold bg-violet-600 rounded-md"
          >
            Add
          </button>
        </form>
      </div>

      {/* TODO LIST */}
      <div className="grid gap-1 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-3">
        {
          todos.map( ({ _id ,title, status, createdAt }) => (
            <TodoItem key={ _id } _id={ _id } title={ title } status={ status } createdAt={ createdAt } />
          ))
        }
      </div>
    </main>
  )
}

export default HomePage;