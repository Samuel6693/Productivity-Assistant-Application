import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import TopHabits, { translatePriority } from "../components/HabitRanker";
import useTopHabits from "../components/HabitsPriority";

const HomePage = ({ todoList }) => {
    const recentTodos = [...todoList]
    .filter((todo) => !todo.status)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

    // Hämtar top N och totalen via hook i components/HabitsPriority
    const { top: topHabits, total: habitCount } = useTopHabits(3);
    const topHabit = topHabits && topHabits.length > 0 ? topHabits[0] : null;

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
                    <h2>Viktigaste rutiner</h2>

                    {/* Visa en topp-rutin beräknad av rankern */}
                    <div style={{textAlign:'center', marginTop:'6px'}}>
                      {topHabit ? (
                        <p>
                          <strong>Topp:</strong> {topHabit.title} — Repetitioner: {topHabit.repetitions || 0} • Prioritet: {translatePriority(topHabit.priority || 'medium')}
                        </p>
                      ) : (
                        <p>Inga registrerade rutiner än</p>
                      )}
                    </div>

                    <div className="top-habits">
                      <TopHabits count={3} />
                      <br />
                      <Link className="dashboard-link" to="/habits">Gå till alla rutiner</Link>
                    </div>
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