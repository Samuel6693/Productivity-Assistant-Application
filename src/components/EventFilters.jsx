const EventFilters = ({ filter, setFilter }) => {
  return (
    <section className="event-filters">
      <button onClick={() => setFilter("all")}>Alla</button>
      <button onClick={() => setFilter("upcoming")}>Kommande</button>
      <button onClick={() => setFilter("past")}>Tidigare</button>
    </section>
  );
};

export default EventFilters;
