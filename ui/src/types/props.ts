import * as History from "history";

export interface RouteComponentProps<Params> {
	match: Match<Params>;
	location: History.Location;
	history: History.History;
	staticContext?: any;
}

export interface Match<Params> {
	params: Params;
	isExact: boolean;
	path: string;
	url: string;
}
