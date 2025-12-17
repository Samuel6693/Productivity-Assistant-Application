import { useState } from "react";
import { Link } from "react-router-dom";

const HabitsPage = () => {
    const [habit, setHabit] = useState({
        title: "",
        category: "",
        frequency: "",
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
                active: true,
            };
            setHabitList((prev) => [...prev, newHabit]);
        }

        setHabit({ title: "", category: "", frequency: "" });
    };

    const handleCancel = () => {
        setHabit({ title: "", category: "", frequency: "" });
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
        const categoryValue = h.category || (h.mainCategory ? `${h.mainCategory}${h.subCategory ? ' - ' + h.subCategory : ''}` : "");
        setHabit({ title: h.title, category: categoryValue, frequency: h.frequency });
        setEditHabit(id);
    };  

    const upcomingTitles = habitList.map((h) => h.title).join(", ");

    return (
        <>
            <section> 
                <h1>Habits {habitList.length > 0 && `[${upcomingTitles}]`}</h1>
                <nav>
                    <Link to="/"><h2>Översikt</h2></Link>
                </nav>
            </section>
            <section>
                <h2>{editHabit !== null ? "Redigera vana" : "Ny vana"}</h2>

                <form onSubmit={handleSubmit}>
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
                        <option value="">Välj frekvens</option>
                        <option value="dagligen">Dagligen</option>
                        <option value="veckovis">Veckovis</option>
                        <option value="månadsvis">Månadsvis</option>
                    </select>
                    <br />

                    <button type="submit">{editHabit !== null ? "Spara ändringar" : "Lägg till"}</button>
                    <button type="button" onClick={handleCancel}>Avbryt</button>
                </form>
            </section>

            <section>
                <h1>Alla vanor</h1>
                {habitList.length === 0 && <p>Inga vanor tillgängliga ännu.</p>}
                {habitList.map((h) => (
                    <div key={h.id}>
                        <h2> Titel: {h.title}</h2>
                        <p>Kategori: {h.category || (h.mainCategory ? `${h.mainCategory}${h.subCategory ? ' - ' + h.subCategory : ''}` : "")}</p>
                        <p>Frekvens: {h.frequency}</p>
                        <p>Status: {h.active ? "Aktiv" : "Inaktiv"}</p>

                        <button onClick={() => toggleActive(h.id)}>
                            {h.active ? "Markera som inaktiv" : "Markera som aktiv"}
                        </button>

                        <button onClick={() => deleteHabit(h.id)}>Ta bort</button>

                        <button onClick={() => handleEdit(h.id)}>Redigera</button>
                    </div>
                ))}
            </section>
        </>
    )
}

export default HabitsPage;