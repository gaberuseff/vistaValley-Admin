import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUpdateCabin } from "../../services/apiCabins"
import toast from "react-hot-toast"

function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { mutate: updateCabin, isPending: isUpdating } = useMutation({
        mutationFn: ({ newCabin, id }) => {
            return;
            // createUpdateCabin(newCabin, id)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            })
            toast.success('Cabin successfully updated');
        },

        onError: (err) => {
            console.log(err)
            toast.error('There was an error updating the cabin')
        }
    })

    return { updateCabin, isUpdating }
}

export default useUpdateCabin;