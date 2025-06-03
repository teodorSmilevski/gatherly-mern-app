import "./EventCard.css";
import placeholderImage from "../../../../assets/images/events/placeholder-image.png";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const shortenTitle = (text, maxLength = 18) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Link to={`/events/${event?._id}`} className="event-card-link">
      <div className="event-card">
        <div className="event-image">
          <img src={event?.image || placeholderImage} alt="Event" />
        </div>
        <div className="event-content">
          <h3 className="event-title">{shortenTitle(event?.title)}</h3>
          <div className="event-meta">
            <span className="event-date">{event?.date}</span>
            <span className="event-category">{event?.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
