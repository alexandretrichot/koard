import { useQuery } from '@tanstack/react-query';
import { podsQueryKeys } from '../keys/pods.keys';
import { getPodDetails } from '../services/pods.service';

export const useGetPodDetails = (namespace?: string, podName?: string) => {
  return useQuery(podsQueryKeys.details(namespace!, podName!), () => getPodDetails(namespace!, podName!), {
    refetchInterval: 1000,
    enabled: !!namespace && !!podName,
  });
};
