/**
 * Size of the current committee, injected at build time from committee.json
 * (see `define` in vite.config.ts).
 *
 * The home page infographic only needs this one number. Importing it from
 * `./committee` instead would pull the entire committee dataset — every year,
 * every bio, every social link — into the home page bundle.
 */
export const NumberOfCommitteeMembers: string =
	__COMMITTEE_SIZE__
