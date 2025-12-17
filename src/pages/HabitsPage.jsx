import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Habits.css";

const HabitsPage = () => {
    const [habit, setHabit] = useState({
        title: "",
        category: "",
        frequency: "",
        selectedDays: [],
    });

    const [habitList, setHabitList] = useState([]);
    const [editHabit, setEditHabit] = useState(null);



    const handleSubmit = (e) => {
        e.preventDefault();

        if (editHabit !== null) {
            setHabitList((prev) =>
                prev.map((h) =>
                    h.id === editHabit ? { ...h, ...habit } : h
                )
            );
            setEditHabit(null);
        } else {
            const newHabit = {
                id: Date.now(),
                title: habit.title,
                category: habit.category,
                frequency: habit.frequency,
                selectedDays: habit.selectedDays || [],
                active: true,
            };
            setHabitList((prev) => [...prev, newHabit]);
        }

        setHabit({ title: "", category: "", frequency: "", selectedDays: [] });
    };

    const handleCancel = () => {
        setHabit({ title: "", category: "", frequency: "", selectedDays: [] });
        setEditHabit(null);
    };   

    const deleteHabit = (id) => {
        setHabitList((prev) => prev.filter((h) => h.id !== id));
    };

    const toggleActive = (id) => {
        setHabitList((prev) => prev.map((h) => h.id === id ? { ...h, active: !h.active } : h));
    };

    const handleEdit = (id) => {
        const h = habitList.find((item) => item.id === id);
        if (!h) return;
        setHabit({ title: h.title, category: h.category || "", frequency: h.frequency, selectedDays: h.selectedDays || [] });
        setEditHabit(id);
    };

    // Växla markerad veckodag i den vana som redigeras/skapats i formuläret
    const toggleDay = (day) => {
        setHabit((prev) => ({
            ...prev,
            selectedDays: prev.selectedDays.includes(day) ? prev.selectedDays.filter((d) => d !== day) : [...prev.selectedDays, day],
        }));
    };   

    // Läs in sparade vanor från localStorage när komponenten monteras
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("habits")) || [];
            setHabitList(saved);
        } catch (e) {
            setHabitList([]);
        }
    }, []);

    // Spara vanor till localStorage varje gång listan ändras
    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habitList));
    }, [habitList]);

    const upcomingTitles = habitList.map((h) => h.title).join(", ");

    return (
        <div className="habits-container">
            <section>
                <h1>Rutiner {habitList.length > 0 }</h1>
                <nav>
                    <Link to="/"><h2>Översikt</h2></Link>
                </nav>
            </section>

            <section>
                <h2>{editHabit !== null ? "Redigera vana" : "Ny Rutin"}</h2>

                <form onSubmit={handleSubmit} className="habit-form">
                    Titel: {" "}
                    <input
                        type="text"
                        placeholder="Titel"
                        required
                        value={habit.title}
                        onChange={(e) => setHabit({ ...habit, title: e.target.value })}
                    />
                    <br />

                    Kategori: {" "}
                    <input
                        list="categoryOptions"
                        placeholder="Skriv eller välj kategori"
                        required
                        value={habit.category}
                        onChange={(e) => setHabit({ ...habit, category: e.target.value })}
                    />

                    <datalist id="categoryOptions">
                        <option value="Sport" />
                        <option value="Hushåll" />
                        <option value="Måltid" />
                        <option value="Arbete" />
                        <option value="Studier" />
                        <option value="Hälsa" />
                        <option value="Personlig" />
                        <option value="Övrigt" />
                    </datalist>
                    <br />

                    Frekvens: {" "}
                    <select
                        required
                        value={habit.frequency}
                        onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
                    >
                        <option value="">Välj återkommande frekvens</option>
                        <option value="veckovis">Veckovis</option>
                        <option value="månadsvis">Månadsvis</option>
                        <option value="kvartalsvis">Kvartalsvis</option>
                    </select>
                    <br />

                    <div>
                      <label style={{display:'block',marginTop:'8px'}}>Välj vilka dagar:</label>
                      <div className="days-grid">
                        <label><input type="checkbox" checked={habit.selectedDays.includes('Måndag')} onChange={() => toggleDay('Måndag')} /> Mån</label>
                        <label><input type="checkbox" checked={habit.selectedDays.includes('Tisdag')} onChange={() => toggleDay('Tisdag')} /> Tis</label>
                        <label><input type="checkbox" checked={habit.selectedDays.includes('Onsdag')} onChange={() => toggleDay('Onsdag')} /> Ons</label>
                        <label><input type="checkbox" checked={habit.selectedDays.includes('Torsdag')} onChange={() => toggleDay('Torsdag')} /> Tor</label>
                        <label><input type="checkbox" checked={habit.selectedDays.includes('Fredag')} onChange={() => toggleDay('Fredag')} /> Fre</label>
                        <label><input type="checkbox" checked={habit.selectedDays.includes('Lördag')} onChange={() => toggleDay('Lördag')} /> Lör</label>
                        <label><input type="checkbox" checked={habit.selectedDays.includes('Söndag')} onChange={() => toggleDay('Söndag')} /> Sön</label>
                      </div>
                    </div>
                    <br />

                    <button type="submit">{editHabit !== null ? "Spara ändringar" : "Lägg till"}</button>
                    <button type="button" onClick={handleCancel}>Avbryt</button>
                </form>
            </section>

            <section>
                <h1>Alla vanor</h1>
                {habitList.length === 0 && <p>Inga vanor tillgängliga ännu.</p>}
                <div className="habit-list">
                  {habitList.map((h) => (
                    <div key={h.id} className="habit-item">
                        <h2> Titel: {h.title}</h2>
                        <p className="meta">Kategori: {h.category || '—'}</p>
                        <p className="meta">Frekvens: {h.frequency}</p>
                        <p className="meta">Valda dagar: {(h.selectedDays && h.selectedDays.length) ? h.selectedDays.join(', ') : '—'}</p>
                        <p className="meta">Status: {h.active ? "Aktiv" : "Inaktiv"}</p>

                        <div style={{marginTop: '10px'}}>
                          <button onClick={() => toggleActive(h.id)}>
                              {h.active ? "Markera som inaktiv" : "Markera som aktiv"}
                          </button>

                          <button onClick={() => deleteHabit(h.id)}>Ta bort</button>

                          <button onClick={() => handleEdit(h.id)}>Redigera</button>
                        </div>
                    </div>
                  ))}
                </div>
            </section>
        </div>
    )
}

export default HabitsPage;