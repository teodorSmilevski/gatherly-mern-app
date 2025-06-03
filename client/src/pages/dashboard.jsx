import { useParams } from "react-router-dom";
import "../styles/UserDashboard.css";
import { useGet } from "../hooks/api/useGet";
import { roleConverter } from "../utils/roleConverter";
import EventCard from "../components/pages/events/EventCard/EventCard";
import { formatDate } from "../utils/dateFormat";
import ByCategoryChart from "../components/pages/dashboard/ByCategoryChart";
import ReservationsByEventChart from "../components/pages/dashboard/ReservationsByEvent";
import AttendedEventsByTime from "../components/pages/dashboard/AttendedByEvent";

const UserDashboard = () => {
  const { username } = useParams();
  const { data, loading } = useGet(`/api/users/${username}`);

  if (loading) {
    return <div className="dashboard-page"></div>;
  }

  const user = data?.user;
  const attendedEvents = user?.attendedEvents.map((event) => ({
    ...event,
    date: formatDate(event.date),
  }));
  const createdEvents = user?.createdEvents.map((event) => ({
    ...event,
    date: formatDate(event.date),
  }));

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <div className="user-info">
          <h2 className="chip">
            Hello, <span className="user-info-name">{user?.username}!</span>
          </h2>
          <span className="chip">
            Email: <span className="chip-text">{user?.email}</span>
          </span>
          <span className="chip">
            Role: <span className="chip-text">{roleConverter[user?.role]}</span>
          </span>
        </div>

        <div className="charts-section">
          {createdEvents.length > 0 && (
            <>
              <div className="chart-placeholder">
                <ByCategoryChart events={createdEvents} />
              </div>
              <div className="chart-placeholder">
                <ReservationsByEventChart events={createdEvents} />
              </div>
            </>
          )}
          {attendedEvents.length > 0 && (
            <div className="chart-placeholder">
              <AttendedEventsByTime events={user?.attendedEvents} />
            </div>
          )}
        </div>

        {createdEvents.length > 0 && (
          <div className="events-grid-wrapper">
            <h2>Created Events</h2>
            <div className="events-grid">
              {createdEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {attendedEvents.length > 0 && (
          <div className="events-grid-wrapper">
            <h2>Attended Events</h2>
            <div className="events-grid">
              {attendedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
