import { Link } from "react-router-dom";

const TodosPage = () => {
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
                Titel: <input type="text" placeholder="Title" required/> 
                <br/>
                Beskrivning: <input type="text" placeholder="Beskriv ditt ärende"/>
                <br/>
                Tidsestimat: <input type="time" placeholder="Tidsestimat"/>
                <br />
                <label> Kategori: 
                    <select name="kategori" >
                        <option value="hälsa">Hälsa</option>
                        <option value="hushåll">Hushåll</option>
                        <option value="jobbrelaterat">Jobbrelaterat</option>
                        <option value="nöje ">Nöje</option>
                    </select>
                </label>
                <br />
                Deadline: <input type="date" placeholder="Deadline"/>
                <br />
                <button>Lägg till</button>
                <button>Avbryt</button>
            </section>

            <section>
                <h2>Alla ärenden</h2>
                {/* lista med todos kommer här */}
            </section>
        
        </>
    
    )
}

export default TodosPage;
