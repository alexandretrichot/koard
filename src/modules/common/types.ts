export type ApiList<T> = {
	items: T[];
	total: number;
	limit: number;
	skip: number;
};
