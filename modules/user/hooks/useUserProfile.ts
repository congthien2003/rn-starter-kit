import { useApiCall } from "@/hooks/useApiCall";
import { useCallback, useEffect, useState } from "react";
import { UpdateUserRequest, User, userService } from "../services/api";

export const useUserProfile = () => {
	const [profile, setProfile] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { call: apiCall } = useApiCall<User>({
		showLoading: true,
		loadingText: "Đang tải...",
		showError: true,
	});

	const fetchProfile = useCallback(async () => {
		try {
			const data = await apiCall(() => userService.getProfile());
			setProfile(data);
			return data;
		} catch (error) {
			// Error already handled by useApiCall
			return null;
		}
	}, [apiCall]);

	const updateProfile = useCallback(
		async (data: UpdateUserRequest): Promise<boolean> => {
			try {
				const updated = await apiCall(() =>
					userService.updateProfile(data)
				);
				setProfile(updated);
				return true;
			} catch (error) {
				return false;
			}
		},
		[apiCall]
	);

	// Auto fetch profile on mount
	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	return {
		profile,
		isLoading,
		fetchProfile,
		updateProfile,
	};
};
