import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "stats stats donut donut"
    "stats stats donut donut"
    "sales sales sales sales";
  gap: 2.4rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "stats"
      "donut"
      "sales";
  }
`;

function DashboardLayout() {
  const {bookings, isRecentBookingsLoading, isRecentBookingsError} =
    useRecentBookings();
  const {
    stays,
    confirmedStays,
    numDays,
    isRecentStaysLoading,
    isRecentStaysError,
  } = useRecentStays();
  const {cabins, isCabinsLoading, isCabinsError} = useCabins();

  if (isRecentBookingsLoading || isRecentStaysLoading || isCabinsLoading)
    return <Spinner />;

  if (isRecentBookingsError || isRecentStaysError || isCabinsError)
    return <Error message="Recent bookings could not be loaded" />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />

      <DurationChart confirmedStays={confirmedStays} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
