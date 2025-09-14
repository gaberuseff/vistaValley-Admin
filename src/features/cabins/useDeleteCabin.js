import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { mutate: deletedCabin, isPending: isDeleting } = useMutation({
        mutationFn: (id) => deleteCabin(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            })
            toast.success('Cabin successfully deleted')
        },

        onError: (err) => {
            console.log(err)
            toast.error('There was an error deleting the cabin')
        }
    })

    return { isDeleting, deletedCabin }
}

export default useDeleteCabin;