import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate('/login', { replace: true })
        },
        onError: () => {
            toast.error('Logout failed')
        }
    })

    return { logout, isLoggingOut }
}

export default useLogout
