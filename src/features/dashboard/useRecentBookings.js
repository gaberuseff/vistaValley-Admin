import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const numDays = Number(searchParams?.get("last")) || 7;

    const queryData = subDays(new Date(), numDays).toISOString();

    const { data: bookings, isPending: isRecentBookingsLoading, isError: isRecentBookingsError } = useQuery({
        queryKey: ['bookings', `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryData)
    })

    return { bookings, isRecentBookingsLoading, isRecentBookingsError }
}

export default useRecentBookings;