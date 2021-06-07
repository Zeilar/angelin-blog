import { Location, History } from "history";

export interface RouteComponentProps<Params> {
	match: Match<Params>;
	location: Location;
	history: History;
	staticContext?: any;
}

export interface Match<Params> {
	params: Params;
	isExact: boolean;
	path: string;
	url: string;
}
