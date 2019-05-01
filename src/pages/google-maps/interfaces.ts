export interface Point {
	latitude: number;
	longitude: number;
}

export interface Marker extends Point {
	label?: string;
}