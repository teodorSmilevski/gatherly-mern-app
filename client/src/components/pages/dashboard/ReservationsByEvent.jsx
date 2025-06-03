import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const ReservationsByEventChart = ({ events }) => {
  const data = events.map((event) => ({
    name:
      event.title.length > 15 ? event.title.slice(0, 15) + "…" : event.title,
    reservations: event.reservationCount || 0,
  }));

  return (
    <div>
      <h3>Reservations by Event</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="reservations" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservationsByEventChart;
