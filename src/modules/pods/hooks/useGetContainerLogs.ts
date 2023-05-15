import { useQuery } from '@tanstack/react-query';
import { podsQueryKeys } from '../keys/pods.keys';
import { getContainerLogs, getPodDetails } from '../services/pods.service';

export const useGetContainerLogs = (
	namespace?: string,
	podName?: string,
	containerName?: string,
  params?: {
		tailLines?: number;
		sinceSeconds?: number;
		sinceTime?: string;
	}
) => {
	return useQuery(
		podsQueryKeys.logs(namespace!, podName!, containerName!, params),
		() => getContainerLogs(namespace!, podName!, containerName!, params),
		{
			refetchInterval: 1000,
			enabled: !!namespace && !!podName && !!containerName,
		},
	);
};
