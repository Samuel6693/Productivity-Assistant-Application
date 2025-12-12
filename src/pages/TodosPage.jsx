import { useState } from "react";
import { Link } from "react-router-dom";

const TodosPage = () => {

    const [todos, setTodos] = useState({
        title: "",
        description: "",
        timeEstimate: "",
        category: "",
        deadline: "",
    });

    const [todoList, setTodoList] = useState([]);
    const [editTodo, setEditTodo] = useState(null); 

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
                title:todos.title,
                description:todos.description,
                timeEstimate: todos.timeEstimate,
                category:todos.category,
                deadline:todos.deadline,
                status: false,
            }
    
            setTodoList((prevTodos) => [...prevTodos, newTodo]);


            // Rensa formuläret
            setTodos({
                title: "",
                description: "",
                timeEstimate: "",
                category: "",
                deadline: "",
            });
        }   
    };

    const handleCancel = () => {
        setTodos({
            title: "",
            description: "",
            timeEstimate: "",
            category: "", 
            deadline:"",
        });
        setEditTodo(null);
    };

    const toggleStatus = (id) => {
        setTodoList((prevList) =>
            prevList.map((todo) =>
                todo.id === id ? { ...todo, status: !todo.status} : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodoList((prevList) =>
            prevList.filter((todo) => todo.id !== id)
        ); 
    }; 

    const handleEdit = (id) => {
        const todoToEdit = todoList.find((todo) => todo.id === id);
        if (!todoToEdit) return;

        setTodos({
            title: todoToEdit.title,
            description:todoToEdit.description,
            timeEstimate: todoToEdit.timeEstimate,
            category: todoToEdit.category,
            deadline: todoToEdit.deadline,
        });

        setEditTodo(id);
    }
    
    return (
        <>
            <section>
                <h1>Todo Page</h1>

                <nav>
                    <Link to="/"><h2>Översikt</h2></Link>
                </nav>
            </section>

            <section>
                <h2>{editTodo !== null ? "Redigera ärende" : "Nytt Todo"}</h2>

                <form onSubmit={handleSubmit}>


                    Titel: {" "}
                    <input 
                        type="text" 
                        placeholder="Title" 
                        required 
                        value={todos.title}
                        onChange={(e) => setTodos({...todos, title: e.target.value })
                        }
                    /> 
                    <br/>

                    Beskrivning:{" "}
                    <input
                        type="text"
                        placeholder="Beskriv ditt ärende"
                        required
                        value={todos.description}
                        onChange={(e) =>
                            setTodos({ ...todos, description: e.target.value })
                        }
                    />
                    <br/>

                    Tidsestimat: {" "}
                        <input 
                        type="time" 
                        placeholder="Tidsestimat"
                        required
                        value={todos.timeEstimate}
                        onChange={(e) => setTodos({...todos, timeEstimate: e.target.value})
                        }
                    />
                    <br />

                    <label> Kategori: {" "}
                        <select 
                            name="kategori" 
                            required
                            value={todos.category}
                            onChange={(e) => setTodos({...todos, category: e.target.value})
                            }>
                                <option value="">Välj kategori</option>
                                <option value="hälsa">Hälsa</option>
                                <option value="hushåll">Hushåll</option>
                                <option value="jobbrelaterat">Jobbrelaterat</option>
                                <option value="studier">Studier</option>
                                <option value="ekonomi">Ekonomi</option>
                                <option value="nöje">Nöje</option>
                                <option value="personlig">Personlig</option>
                                <option value="övrigt ">Övrigt</option>
                        </select>
                    </label>
                    <br />
                    Deadline: {""}
                    <input 
                        type="date" 
                        placeholder="Deadline"
                        required
                        value={todos.deadline}
                        onChange={(e) => setTodos({...todos, deadline: e.target.value})}/>
                    <br />

                    <button type="submit">{editTodo !== null ? "Spara ändrongar" : "Lägg till"}</button>

                    <button type="button" onClick={handleCancel}>Avbryt</button>
                </form>

            </section>

            <section>
                <h1>Alla ärenden</h1>
                {todoList.length === 0 && <p>Inga ärenden tillgängliga ännu.</p>}
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
                        
                    </div>)
                
                    )}
            </section>
        
        </>
    
    )
}

export default TodosPage;
