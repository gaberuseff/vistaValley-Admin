import { useQuery } from "@tanstack/react-query";
import { getCurrenUser } from "../../services/apiAuth";

function useUser() {
    const { data: user, isPending: isUserLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getCurrenUser()
    })

    return { user, isUserLoading, isAuthenticated: user?.role === 'authenticated' }
}

export default useUser;