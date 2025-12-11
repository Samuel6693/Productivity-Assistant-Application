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


    const handleSubmit = (e) => {
        e.preventDefault();

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
            deadline:"",
        });
    };

    
    return (
        <>
            <section>
                <h1>Todo Page</h1>

                <nav>
                    <Link to="/"><h2>Översikt</h2></Link>
                </nav>
            </section>

            <section>
                <h2>Nytt ärende</h2>

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

                    <button type="submit">Lägg till</button>

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
                    </div>)
                
                    )}
            </section>
        
        </>
    
    )
}

export default TodosPage;
