export const podsQueryKeys = {
	list: (ns?: string) => [ns, 'pods'],
	details: (ns: string, podName: string) => [ns, 'pods', podName],
	logs: (
		ns: string,
		podName: string,
		containerName: string,
		params?: {
			tailLines?: number;
			sinceSeconds?: number;
			sinceTime?: string;
		},
	) => [ns, 'pods', podName, containerName, 'logs', params],
};
