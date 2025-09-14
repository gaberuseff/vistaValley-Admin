import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking successfully deleted");
        },
        onError: () => {
            toast.error("Booking could not be deleted");
        },
    });

    return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
