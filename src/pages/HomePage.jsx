import { Link } from "react-router-dom"

const HomePage = ({ todoList }) => {
    const recentTodos = [...todoList]
    .filter((todo) => !todo.status)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <nav>
                <section className="dashboard-section">
                    <h2> Senaste ej utförda ärenden</h2>
                    {recentTodos.length === 0 ? (
                        <p>Inga ej utförda ärenden</p>) : (
                            <ul>
                                {recentTodos.map((todo) => (
                                    <li key={todo.id}>{todo.title} - deadline: {todo.deadline}</li>
                                ))}
                            </ul>
                        )}

                    <br />
                    <Link className="dashboard-link" to="/todos">
                        Gå till alla ärenden
                    </Link>

                </section>  
                
                <section className="dashboard-section">
                    <h2> Viktigaste rutiner {/* De tre rutiner med högst antal repetitioner visas här. */}
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <br />
                        <Link className="dashboard-link" to="/habits">Gå till alla rutiner</Link>
                    </h2>
                </section>  

                <section className="dashboard-section">
                    <h2> Kommande händelser {/* De tre nästkommande händelserna visas här. */}
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <br />
                        <Link className="dashboard-link" to="/events">Gå till alla händelser</Link>
                    </h2>
                </section>  
            </nav>
        </div>

    )
}

export default HomePage