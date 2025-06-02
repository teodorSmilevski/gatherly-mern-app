import placeholderImage from "../../../../../assets/images/events/placeholder-image.png";
import { useDelete } from "../../../../../hooks/api/useDelete";
import { formatDate, formatTime } from "../../../../../utils/dateFormat";
import { IoPerson } from "react-icons/io5";

const EventDetailsCard = ({
  event,
  reserveSpot,
  isMyEvent,
  isReserved,
  deleteReservation,
}) => {
  const { deleteData } = useDelete();

  const handleDelete = async () => {
    await deleteData(`/api/events/${event._id}`);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="event-details-card">
      <div className="event-header">
        <img
          className="event-details-image"
          src={event.image || placeholderImage}
          alt={event.title}
        />

        <div className="event-header-right">
          <h1 className="event-details-title">{event.title}</h1>
          <div className="event-details-meta">
            <span>
              <strong>Date:</strong> {formatDate(event.date)} at{" "}
              {formatTime(event.date)}
            </span>
            <span>
              <strong>Location:</strong> {event.location}
            </span>
            <span>
              <strong>Host:</strong> {event.creator.username}
            </span>
          </div>
          <div className="event-details-category">
            <span className="chip">{event.category}</span>
          </div>
        </div>
      </div>

      <div className="event-description-section">{event.description}</div>

      <div className="event-bottom-row">
        <div className="event-bottom-left">
          <IoPerson color="var(--color-text-secondary)" />
          {event.rsvps.length} / {event.maxCapacity}
        </div>
        {isMyEvent ? (
          <button
            className="delete-rsvp-button"
            onClick={handleDelete}
            title="This event will be permanently deleted"
          >
            Delete Event
          </button>
        ) : (
          <button
            className="rsvp-button"
            onClick={!isReserved ? reserveSpot : deleteReservation}
            title={
              isReserved
                ? "Click to delete your reservation"
                : "Reserve your spot for this event"
            }
          >
            {isReserved ? "Delete reservation" : "Reserve Spot"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetailsCard;
