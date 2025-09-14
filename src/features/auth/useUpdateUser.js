import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,

        onSuccess: ({ user }) => {
            queryClient.setQueryData(['user'], user);
            toast.success('User updated successfully');
        },

        onError: (error) => {
            toast.error('There was an error updating the user');
            console.log(error);
        }
    })

    return { updateUser, isUpdating };
};

export default useUpdateUser;