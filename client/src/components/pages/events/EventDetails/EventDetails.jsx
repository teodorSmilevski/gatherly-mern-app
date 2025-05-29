import "./EventDetails.css";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import EventComments from "./components/EventComments";
import { formatDate } from "../../../../utils/dateFormat";
import EventDetailsCard from "./components/EventDetailsCard";

const Event = ({
  event: {
    title = "",
    description = "",
    date = "",
    location = "",
    image = "",
    category = "",
    rsvps = [],
    createdAt = "",
    comments = [],
  } = {},
}) => {
  const navigate = useNavigate();

  const reserveSpot = () => {
    console.log("Spot reserved for the event:", title);
  };

  const postComment = (e) => {
    e.preventDefault();

    const commentText = e.target.querySelector("textarea").value.trim();
    if (commentText) {
      console.log("Comment posted:", commentText);
      e.target.reset();
    } else {
      console.log("Comment cannot be empty.");
    }
  };

  return (
    <div className="event-details">
      <div className="event-details-header">
        <button className="go-back-btn" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          Go back
        </button>
        <p className="posted-date">Posted on {formatDate(createdAt)}</p>
      </div>

      <EventDetailsCard
        image={image}
        title={title}
        category={category}
        description={description}
        location={location}
        date={date}
        rsvps={rsvps}
        reserveSpot={reserveSpot}
      />

      <EventComments comments={comments} postComment={postComment} />
    </div>
  );
};

export default Event;
