import { useState } from "react";
import { useFetch } from "../../../../hooks/useEvents";
import EventCard from "../EventCard/EventCard";
import "./EventsListing.css";

const ITEMS_PER_PAGE = 12;

const EventsListing = () => {
  const { data: eventsData, loading } = useFetch("/data/events.json");
  const [currentPage, setCurrentPage] = useState(1);

  const events = Array.isArray(eventsData) ? eventsData : [];
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visibleEvents = events.slice(start, end);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="events-listing">
      <div className="listing-header">
        <h2 className="header-title">Upcoming Events</h2>
      </div>

      {loading && (
        <div className="spinner-wrap ">
          <div className="spinner"></div>
        </div>
      )}
      <div className="events-grid">
        {visibleEvents ? (
          visibleEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <h3 className="no-events">No events available...</h3>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EventsListing;
