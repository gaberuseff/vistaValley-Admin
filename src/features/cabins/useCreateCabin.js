import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: (newCabin) => createCabinApi(newCabin),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            })
            toast.success('Cabin successfully created')
        },

        onError: (err) => {
            console.log(err)
            toast.error('There was an error creating the cabin')
        }
    })

    return { isCreating, createCabin }
}

export default useCreateCabin;