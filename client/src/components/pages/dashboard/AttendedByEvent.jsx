import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AttendedEventsByTime = ({ events }) => {
  const dateCounts = events.reduce((acc, event) => {
    const date = new Date(event.date).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(dateCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="chart-card">
      <h3>Attended Events by Date</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendedEventsByTime;
