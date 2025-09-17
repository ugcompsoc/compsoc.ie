import { useQuery } from "@tanstack/react-query";
import {
	CommitteeYears,
	DefaultBio,
	DefaultPhoto,
	NumberOfCommitteeMembers,
} from "@/services/committee";

export const committeeQueryKeys = {
	all: ["committee"] as const,
	years: () => [...committeeQueryKeys.all, "years"] as const,
	defaults: () => [...committeeQueryKeys.all, "defaults"] as const,
	members: (year: string) =>
		[...committeeQueryKeys.all, "members", year] as const,
};

export function useCommitteeYears() {
	return useQuery({
		queryKey: committeeQueryKeys.years(),
		queryFn: () => CommitteeYears,
		staleTime: 10 * 60 * 1000, // 10 minutes - committee data rarely changes
		gcTime: 30 * 60 * 1000, // 30 minutes
	});
}

export function useCommitteeDefaults() {
	return useQuery({
		queryKey: committeeQueryKeys.defaults(),
		queryFn: () => ({
			bio: DefaultBio,
			photo: DefaultPhoto,
			memberCount: NumberOfCommitteeMembers,
		}),
		staleTime: 10 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
	});
}

export function useCommitteeMembers(year: string) {
	return useQuery({
		queryKey: committeeQueryKeys.members(year),
		queryFn: () => {
			const yearData = CommitteeYears.find((y) => y.year === year);
			return yearData?.committee || [];
		},
		staleTime: 10 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
	});
}

export function useCommitteeData() {
	const {
		data: years,
		isLoading: yearsLoading,
		isError: yearsError,
	} = useCommitteeYears();
	const {
		data: defaults,
		isLoading: defaultsLoading,
		isError: defaultsError,
	} = useCommitteeDefaults();

	return {
		years: years || [],
		defaults: defaults || { bio: "", photo: "", memberCount: "0" },
		isLoading: yearsLoading || defaultsLoading,
		isError: yearsError || defaultsError,
		error: yearsError || defaultsError,
	};
}
