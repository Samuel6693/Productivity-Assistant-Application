import { useState } from "react";
import { Link } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoFilters from "../components/TodoFilters";

const TodosPage = () => {
  const [todos, setTodos] = useState({
    title: "",
    description: "",
    timeEstimate: "",
    category: "",
    deadline: "",
  });

  const [todoList, setTodoList] = useState([]); // List av todos
  const [editTodo, setEditTodo] = useState(null); // Editering state
  // Filter states
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Edit existing todo
    if (editTodo !== null) {
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === editTodo
            ? {
                ...todo,
                title: todos.title,
                description: todos.description,
                timeEstimate: todos.timeEstimate,
                category: todos.category,
                deadline: todos.deadline,
              }
            : todo
        )
      );

      // lämna redigeringsläget
      setEditTodo(null);
    } else {
      // Lägg till nytt todo
      const newTodo = {
        id: Date.now(),
        title: todos.title,
        description: todos.description,
        timeEstimate: todos.timeEstimate,
        category: todos.category,
        deadline: todos.deadline,
        status: false,
      };

      setTodoList((prevTodos) => [...prevTodos, newTodo]);
    }

    // Rensa formuläret (gäller både add och edit)
    setTodos({
      title: "",
      description: "",
      timeEstimate: "",
      category: "",
      deadline: "",
    });
  };

  const handleCancel = () => {
    setTodos({
      title: "",
      description: "",
      timeEstimate: "",
      category: "",
      deadline: "",
    });
    setEditTodo(null);
  };

  const toggleStatus = (id) => {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todoToEdit = todoList.find((todo) => todo.id === id);
    if (!todoToEdit) return;

    setTodos({
      title: todoToEdit.title,
      description: todoToEdit.description,
      timeEstimate: todoToEdit.timeEstimate,
      category: todoToEdit.category,
      deadline: todoToEdit.deadline,
    });

    setEditTodo(id);
  };

  const visibleTodos = todoList.filter((todo) => {
    let statusMatch =
      statusFilter === "all" ||
      (statusFilter === "done" && todo.status) ||
      (statusFilter === "undone" && !todo.status);
      
    let categoryMatch =
      categoryFilter === "all" || todo.category === categoryFilter;
    return statusMatch && categoryMatch;
  });


  return (
    <>
      <section>
        <h1>Todo Page</h1>

        <nav>
          <Link to="/">
            <h2>Översikt</h2>
          </Link>
        </nav>
      </section>

      <section>
       <TodoFilters
       showFilter ={showFilter}
       setShowFilter={setShowFilter}
       statusFilter={statusFilter}
       setStatusFilter={setStatusFilter}
       categoryFilter={categoryFilter}
       setCategoryFilter={setCategoryFilter}
       
       />
      </section>

      <section>
        <h2>{editTodo !== null ? "Redigera ärende" : "Nytt Todo"}</h2>

        <TodoForm
          todos={todos}
          setTodos={setTodos}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          editTodo={editTodo}
        />
      </section>

      <section>
        <h1>Alla ärenden</h1>

        <TodoList
          todoList={visibleTodos}
          toggleStatus={toggleStatus}
          deleteTodo={deleteTodo}
          handleEdit={handleEdit}
        />
      </section>
    </>
  );
};

export default TodosPage;
