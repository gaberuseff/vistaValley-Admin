import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import styled from "styled-components";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
  grid-area: stats;
`;

function Stats({bookings, confirmedStays, numDays, cabinCount}) {
  // 1.
  const numBookings = bookings?.length || 0;

  // 2.
  const sales =
    bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;

  // 3.
  const checkIns = confirmedStays?.length || 0;

  // 4. num checkins nights / all available nights
  const occupancyRate =
    confirmedStays?.reduce((acc, stay) => acc + stay.numNights, 0) /
      (cabinCount * numDays) || 0;

  return (
    <StyledStats>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        color="blue"
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={sales}
        color="green"
      />
      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
        color="indigo"
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
        color="yellow"
      />
    </StyledStats>
  );
}

export default Stats;
