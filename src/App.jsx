import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TodosPage from './pages/TodosPage'
import HabitsPage from './pages/HabitsPage'
import EventsPage from './pages/EventsPage'
import Error from './pages/ErrorPage'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/todos" element={<TodosPage />}/>
        <Route path="/habits" element={<HabitsPage />}/>
        <Route path="/events" element={<EventsPage />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
