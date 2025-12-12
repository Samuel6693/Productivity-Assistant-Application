import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Events.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !start || !end) return alert("Fyll i alla fält");
    if (new Date(start) >= new Date(end)) return alert("Start måste vara före slut");

    const newEvent = {
      id: editId || crypto.randomUUID(),
      title,
      start,
      end,
    };

    let updated = editId
      ? events.map((ev) => (ev.id === editId ? newEvent : ev))
      : [...events, newEvent];

    updated.sort((a, b) => new Date(a.start) - new Date(b.start));
    setEvents(updated);

    setTitle("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  const startEdit = (ev) => {
    setTitle(ev.title);
    setStart(ev.start);
    setEnd(ev.end);
    setEditId(ev.id);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  const now = new Date();
  const filteredEvents = events.filter((ev) => {
    if (filter === "upcoming") return new Date(ev.start) >= now;
    if (filter === "past") return new Date(ev.end) < now;
    return true;
  });

  return (
    <div className="events-container">
      <h1>Event Planner</h1>

      <nav>
        <Link to="/"><h2>Översikt</h2></Link>
      </nav>

      <form onSubmit={handleSubmit} className="event-form">
        <h2>{editId ? "Redigera händelse" : "Skapa händelse"}</h2>

        <input
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Starttid:</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />

        <label>Sluttid:</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />

        <button type="submit">
          {editId ? "Spara ändringar" : "Lägg till"}
        </button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Alla</button>
        <button onClick={() => setFilter("upcoming")}>Kommande</button>
        <button onClick={() => setFilter("past")}>Tidigare</button>
      </div>

      <ul className="event-list">
        {filteredEvents.map((ev) => {
          const isPast = new Date(ev.end) < now;
          return (
            <li key={ev.id} className={`event-item ${isPast ? "past" : ""}`}>
              <strong>{ev.title}</strong><br />
              Start: {new Date(ev.start).toLocaleString()}<br />
              Slut: {new Date(ev.end).toLocaleString()}<br />
              <button onClick={() => startEdit(ev)}>Redigera</button>
              <button onClick={() => deleteEvent(ev.id)}>Ta bort</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventsPage;