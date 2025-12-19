import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import TodosPage from './pages/TodosPage'
import HabitsPage from './pages/HabitsPage'
import EventsPage from './pages/EventsPage'
import Error from './pages/ErrorPage'


const TODOS_STORAGE_KEY = "todos";

function App() {
// Läs in TodoList från localStorage vid första renderingen
  const [todoList, setTodoList] = useState(() => {
    try {
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (err) {
      console.error("Kunde inte läsa todos från localStorage:", err);
      return [];
    }
  });

// Spara till localStorage varje gång TodoList ändras
useEffect(() => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todoList));
  } catch (err) {
    console.error("Kunde inte spara todos till localStorage:", err);
  }
}, [todoList]);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage todoList={todoList} />}/>
        <Route path="/todos" element={<TodosPage todoList={todoList} setTodoList={setTodoList}/>}/>
        <Route path="/habits" element={<HabitsPage />}/>
        <Route path="/events" element={<EventsPage />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
