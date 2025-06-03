import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a3e1d4"];

const ByCategoryChart = ({ events }) => {
  const data = Object.values(
    events.reduce((acc, event) => {
      const category = event.category || "Uncategorized";
      acc[category] = acc[category] || { name: category, value: 0 };
      acc[category].value += 1;
      return acc;
    }, {})
  );

  return (
    <div>
      <h3>Created Events by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ByCategoryChart;
