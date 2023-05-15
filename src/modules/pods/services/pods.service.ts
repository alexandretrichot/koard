import { ApiList } from '../../common/types';
import { ContainerLog, Pod, PodDetails } from '../types';

export const getPodsList = async (
	namespace?: string,
): Promise<ApiList<Pod>> => {
	const url = new URL('http://localhost:3000/api/pods');
	if (namespace) url.searchParams.append('namespace', namespace);

	return fetch(url).then(r => r.json());
};

export const getPodDetails = async (
	namespace: string,
	podName: string,
): Promise<PodDetails | null> => {
	const url = new URL(`http://localhost:3000/api/pods/${namespace}/${podName}`);

	return fetch(url).then(r => r.json());
};

export const getContainerLogs = async (
	namespace: string,
	podName: string,
	containerName: string,
	params: {
		tailLines?: number;
		sinceSeconds?: number;
		sinceTime?: string;
	} = {},
): Promise<ContainerLog[]> => {
	const url = new URL(
		`http://localhost:3000/api/pods/${namespace}/${podName}/${containerName}/logs`,
	);
	if (params.tailLines)
		url.searchParams.append('tailLines', params.tailLines.toString());
	if (params.sinceSeconds)
		url.searchParams.append('sinceSeconds', params.sinceSeconds.toString());
	if (params.sinceTime) url.searchParams.append('sinceTime', params.sinceTime);

	return fetch(url).then(r => r.json());
};
