import "./EventDetails.css";

import EventComments from "./components/EventComments";
import { formatDate } from "../../../../utils/dateFormat";
import EventDetailsCard from "./components/EventDetailsCard";
import GoBackButton from "../../../ui/GoBackButton/GoBackButton";
import { useAuth } from "../../../../hooks/useAuth";
import { usePost } from "../../../../hooks/api/usePost";
import { useDelete } from "../../../../hooks/api/useDelete";

const Event = ({ event, refetch }) => {
  const { user } = useAuth();
  const { postData } = usePost();
  const { deleteData } = useDelete();

  const reserveSpot = async () => {
    await postData("/api/rsvps/new", {
      eventId: event._id,
    });
    refetch();
  };

  const deleteReservation = async () => {
    const reservation = event.rsvps.find(
      (rsvp) => rsvp.userId._id && rsvp.userId._id === user?._id
    );

    await deleteData(`/api/rsvps/${reservation._id}`);
    refetch();
  };

  const postComment = async (e) => {
    e.preventDefault();

    const commentText = e.target.querySelector("textarea").value.trim();
    if (commentText) {
      await postData("/api/comments/new", {
        text: commentText,
        eventId: event._id,
      });
      refetch();

      e.target.reset();
    } else {
      console.log("Comment cannot be empty.");
    }
  };

  const isMyEvent = user && event.creator && user._id === event.creator._id;
  const isReserved = event.rsvps.some(
    (rsvp) => rsvp.userId._id && rsvp.userId._id === user?._id
  );

  return (
    <div className="event-details">
      <div className="event-details-header">
        <GoBackButton />
        <p className="posted-date">Posted on {formatDate(event.createdAt)}</p>
      </div>

      <EventDetailsCard
        reserveSpot={reserveSpot}
        isReserved={isReserved}
        deleteReservation={deleteReservation}
        isMyEvent={isMyEvent}
        event={event}
      />

      <EventComments comments={event.comments} postComment={postComment} />
    </div>
  );
};

export default Event;
