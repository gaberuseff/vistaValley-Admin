import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get("status") || "all";
    const filter = filterValue === "all" ? null : { field: "status", value: filterValue };

    // Sort
    const sortValue = searchParams.get("sortby") || "startDate-desc";
    const [field, direction] = sortValue.split("-");
    const sort = { field, direction };

    // pagination
    const page = Number(searchParams.get("page")) || 1;

    const { data: { data: bookings, count } = {}, isPending: isBookingsLoading } = useQuery({
        queryKey: ['bookings', filter, sort, page],
        queryFn: () => getBookings(filter, sort, page)
    })

    // PRE-FETCHING
    const pageCount = Math.ceil(((count ?? 0)) / PAGE_SIZE);

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sort, page + 1],
            queryFn: () => getBookings(filter, sort, page + 1)
        })
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sort, page - 1],
            queryFn: () => getBookings(filter, sort, page - 1)
        })
    }

    return { bookings, count, isBookingsLoading }
}

export default useBookings;