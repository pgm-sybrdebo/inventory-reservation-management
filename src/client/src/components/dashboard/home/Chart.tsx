import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

const Container = styled.div`
  margin: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

  h2 {
    margin-bottom: 1.5rem;
  }
`;

const Chart = ({ dataReserv, title, dataKey, xData }: any) => {
  return (
    <Container>
      <h2>{title}</h2>

      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
          data={dataReserv}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xData} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#F58732"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
