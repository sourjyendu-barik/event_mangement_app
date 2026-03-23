import { useMemo } from "react";

const useFilteredEvents = ({
  events,
  search,
  category,
  sort,
  selectedDate,
}) => {
  const filteredEvents = useMemo(() => {
    let eventList = [...events]; // copy to avoid mutating original

    if (search) {
      eventList = eventList.filter((event) => {
        return (
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (category) {
      eventList = eventList.filter((event) => {
        return event.category === category;
      });
    }

    if (selectedDate) {
      eventList = eventList.filter((event) => {
        return event.date.slice(0, 10) === selectedDate;
      });
    }

    if (sort) {
      eventList.sort((a, b) => {
        if (sort === "priceLowHigh") return a.price - b.price;
        if (sort === "priceHighLow") return b.price - a.price;
        if (sort === "date") return new Date(a.date) - new Date(b.date);
        return 0;
      });
    }

    return eventList;
  }, [events, search, category, selectedDate, sort]);

  return filteredEvents;
};

export default useFilteredEvents;
