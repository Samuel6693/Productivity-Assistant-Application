import { useState } from "react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  // State för formulärfält
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div>
      <h1>Event Planner</h1>
      <nav>
        <Link to="/"><h2>Översikt</h2></Link>
      </nav>

      {/* Formulär för att lägga till händelse */}
      <form>
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
        />
        <label>Sluttid:</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button type="button">Lägg till</button>
      </form>
    </div>
  );
};

export default EventsPage;
