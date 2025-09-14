import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
    const { data: cabins, isPending: isCabinsLoading, error: isCabinsError } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    })

    return { cabins, isCabinsLoading, isCabinsError }
}

export default useCabins;