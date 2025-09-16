import data from "./committee.json";

export interface CommitteeYear {
	year: string;
	default_bio: string;
	default_photo: string;
	committee?: Person[];
}

export interface Person {
	name: string;
	position: string;
	bio: string;
	photo: string;
	social_links?: SocialLink[];
}

export interface SocialLink {
	[key: string]: string;
}

export const NumberOfCommitteeMembers: string =
	data.committee_years[0].committee.length.toString();

export const DefaultBio: string = data.default_bio;

export const DefaultPhoto: string = data.default_photo;

export const CommitteeYears: CommitteeYear[] = JSON.parse(
	JSON.stringify(data.committee_years),
) as CommitteeYear[];
