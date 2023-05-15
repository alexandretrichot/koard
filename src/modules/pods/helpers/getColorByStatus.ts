import { PodStatus } from '../types';

export const colors: Record<PodStatus, string> = {
	[PodStatus.Running]: '#00b9e4',
	[PodStatus.Succeeded]: '#92d400',
	[PodStatus.Failed]: '#cc0000',
	[PodStatus.Pending]: '#beedf9',
	[PodStatus.Unknown]: '#f39d3c',
};

export const getColorByStatus = (status: PodStatus): string => {
	return colors[status];
};
