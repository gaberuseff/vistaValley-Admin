import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
    const { bookingId } = useParams();

    const { data: booking, isPending: isBookingLoading, isError: isBookingError } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false
    })

    return { booking, isBookingLoading, isBookingError }
}

export default useBooking;