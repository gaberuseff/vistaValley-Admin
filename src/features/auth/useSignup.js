import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

function useSignup() {
    const { mutateAsync: signup, isPending: isSigningUp } = useMutation({
        mutationFn: signupApi,

        onSuccess: () => {
            toast.success('Account created successfully, please verify the new email address');
        },

        onError: () => {
            toast.error('Account could not be created');
        },
    })

    return { signup, isSigningUp };
}

export default useSignup;
