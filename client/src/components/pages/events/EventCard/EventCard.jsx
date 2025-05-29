import "./EventCard.css";
import placeholderImage from "../../../../assets/images/events/placeholder-image.png";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event?.image || placeholderImage} alt="Event" />
      </div>
      <div className="event-content">
        <h3 className="event-title">{event?.title}</h3>
        <div className="event-meta">
          <span className="event-date">{event?.date}</span>
          <span className="event-category">{event?.category}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
