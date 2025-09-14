import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
    const [searchParams] = useSearchParams();
    const numDays = Number(searchParams?.get("last")) || 7;

    const queryData = subDays(new Date(), numDays).toISOString();

    const { data: stays, isPending: isRecentStaysLoading, isError: isRecentStaysError } = useQuery({
        queryKey: ['stays', `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryData)
    })

    const confirmedStays = stays?.filter(
        (stay) => stay.status === "checked-in" || stay.status === "checked-out"
    );

    return { stays, confirmedStays, numDays, isRecentStaysLoading, isRecentStaysError }
}

export default useRecentStays;