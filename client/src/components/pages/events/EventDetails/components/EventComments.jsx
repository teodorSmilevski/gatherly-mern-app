import { formatDate, formatTime } from "../../../../../utils/dateFormat";

const EventComments = ({ comments, postComment }) => {
  return (
    <div className="event-details-comments">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment.</p>
      ) : (
        <ul>
          {comments.map((comment, idx) => (
            <li key={idx}>
              <p>
                <strong>{comment.userId.username}</strong>
              </p>
              <p>{comment.text}</p>
              <span className="comment-date">
                {formatDate(comment.createdAt)} at{" "}
                {formatTime(comment.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <form className="comment-form" onSubmit={postComment}>
        <textarea placeholder="Write a comment..." rows="3" />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default EventComments;
