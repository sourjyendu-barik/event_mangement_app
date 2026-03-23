import "./App.css";
import { useState } from "react";
import Layout from "./components/LayOut/Layout";
import EventCard from "./components/EventCard/EventCard";
import { useDataContext } from "./context/DataContext";
import Loader from "./components/reusableComponents/Loader";
import ErrorState from "./components/reusableComponents/ErrorState";
import useFilteredEvents from "./hooks/useFilteredEvents";
import useDebounce from "./hooks/useDebounce ";
function App() {
  const { events } = useDataContext();
  const { data, loading, error } = events;
  // console.log(user);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const filteredEvents = useFilteredEvents({
    events: data,
    search: debouncedSearch,
    category,
    sort,
    selectedDate,
  });

  return (
    <>
      <Layout>
        <section>
          {loading && <Loader text="Events data are loading...." />}
          {error && <ErrorState />}
          <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Search events..."
              className="form-control"
              style={{ maxWidth: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="form-select"
              style={{ maxWidth: "200px" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
              <option value="Music">Music</option>
              <option value="Food">Food</option>
            </select>

            <input
              type="date"
              className="form-control"
              style={{ maxWidth: "200px" }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <select
              className="form-select"
              style={{ maxWidth: "200px" }}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="date">Date</option>
            </select>
          </div>

          <div className="row">
            {filteredEvents.map((e, i) => {
              return (
                <div className="col-md-4 mb-4" key={`EventCard${i}`}>
                  <EventCard event={e} />
                </div>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}

export default App;
