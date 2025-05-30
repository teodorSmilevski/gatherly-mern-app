import placeholderImage from "../../../../../assets/images/events/placeholder-image.png";
import { formatDate, formatTime } from "../../../../../utils/dateFormat";

const EventDetailsCard = ({
  image,
  title,
  date,
  category,
  description,
  rsvps,
  location,
  creatorName,
  reserveSpot,
}) => {
  return (
    <div className="event-details-card">
      <div className="event-header">
        <img
          className="event-details-image"
          src={image || placeholderImage}
          alt={title}
        />

        <div className="event-header-right">
          <h1 className="event-details-title">{title}</h1>
          <div className="event-details-meta">
            <span>
              <strong>Date:</strong> {formatDate(date)} at {formatTime(date)}
            </span>
            <span>
              <strong>Location:</strong> {location}
            </span>
            <span>
              <strong>Host:</strong> {creatorName}
            </span>
          </div>
          <div className="event-details-category">
            <span className="chip">{category}</span>
          </div>
        </div>
      </div>

      <div className="event-description-section">{description}</div>

      <div className="event-bottom-row">
        <div className="event-bottom-left">{rsvps.length} people are going</div>
        <button className="rsvp-button" onClick={reserveSpot}>
          Reserve Spot
        </button>
      </div>
    </div>
  );
};

export default EventDetailsCard;
