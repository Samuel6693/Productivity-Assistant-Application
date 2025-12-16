const TodoList = ({ todoList, toggleStatus, deleteTodo, handleEdit }) => {
  if (todoList.length === 0) {
    return <p>Inga ärenden tillgängliga ännu.</p>;
  }

  return (
    <>
      {todoList.map((todo) => (
        <div key={todo.id}>
          <h2> Titel: {todo.title}</h2>
          <p>Beskrivning: {todo.description}</p>
          <p>Tidsestimat: {todo.timeEstimate}</p>
          <p>Kategori: {todo.category}</p>
          <p>Deadline: {todo.deadline}</p>
          <p>Status: {todo.status ? "Slutförd" : "Ej slutförd"}</p>

          <button onClick={() => toggleStatus(todo.id)}>
            {todo.status ? "Markera som ej slutförd" : "Markera som slutförd"}
          </button>

          <button onClick={() => deleteTodo(todo.id)}> Ta bort </button>

          <button onClick={() => handleEdit(todo.id)}>Redigera</button>
        </div>
      ))}
    </>
  );
};

export default TodoList;
