import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
    const queryClient = useQueryClient();

    const { mutate: updateSettings, isPending: isUpdating } = useMutation({
        mutationFn: (newSetting) => {
            return;
            // updateSettingApi(newSetting)
        },

        onSuccess: () => {
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({
                queryKey: ['settings']
            })
        },

        onError: () => {
            toast.error("There was an error updating the settings")
        }
    })

    return { updateSettings, isUpdating }
}

export default useUpdateSettings;