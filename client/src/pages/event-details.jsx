import { useParams } from "react-router-dom";

import Event from "../components/pages/events/EventDetails/EventDetails";
import LoadingScreen from "../components/ui/LoadingScreen/LoadingScreen";
import { useGet } from "../hooks/api/useGet";

const EventDetails = () => {
  const { eid } = useParams();
  const { data, loading, refetch } = useGet(`/api/events/${eid}`);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <h2>Event not found.</h2>;
  }

  return <Event event={data.event} refetch={refetch} />;
};

export default EventDetails;
