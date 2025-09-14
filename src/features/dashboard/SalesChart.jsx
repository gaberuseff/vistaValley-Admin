import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {useDarkMode} from "../../context/DarkModeContext";
import {eachDayOfInterval, format, isSameDay, subDays} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-area: sales;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({bookings, numDays}) {
  const {isDarkMode} = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((data) => {
    return {
      label: format(data, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), data))
        .reduce((total, booking) => total + booking.totalPrice, 0),

      extrasSales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), data))
        .reduce((total, booking) => total + booking.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: {stroke: "#4f46e5", fill: "#4f46e5"},
        extrasSales: {stroke: "#22c55e", fill: "#22c55e"},
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: {stroke: "#4f46e5", fill: "#c7d2fe"},
        extrasSales: {stroke: "#16a34a", fill: "#dcfce7"},
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MMM dd")} to{" "}
        {format(allDates[allDates.length - 1], "MMM dd")}
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{fill: colors.text}}
            tickLine={{stroke: colors.text}}
          />
          <YAxis
            unit=" $"
            tick={{fill: colors.text}}
            tickLine={{stroke: colors.text}}
          />
          <CartesianGrid
            strokeDasharray="4"
            contentStyle={{backgroundColor: colors.background}}
          />
          <Tooltip contentStyle={{backgroundColor: colors.background}} />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            unit=" $"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
