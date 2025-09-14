import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (user) => {
            toast.success('Login successful'),
                queryClient.setQueryData(['user'], user.user),
                navigate('/dashboard', { replace: true })
        },

        onError: () => {
            toast.error('Email or password is incorrect')
        }
    })

    return { login, isLoggingIn }
}

export default useLogin;