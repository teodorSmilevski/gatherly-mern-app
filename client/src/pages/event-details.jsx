import { useParams } from "react-router-dom";

import Event from "../components/pages/events/EventDetails/EventDetails";
import LoadingScreen from "../components/ui/LoadingScreen/LoadingScreen";
import { useFetch } from "../hooks/useEvents";

const EventDetails = () => {
  const { id } = useParams();
  const { data, loading } = useFetch("/data/event.json");

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <h2>Event not found.</h2>;
  }

  return <Event event={data} />;
};

export default EventDetails;
