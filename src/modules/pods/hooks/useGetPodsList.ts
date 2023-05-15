import { useQuery } from '@tanstack/react-query';
import { getPodsList } from '../services/pods.service';
import { podsQueryKeys } from '../keys/pods.keys';
import { useCurrentNamespace } from '../../namespaces/hooks/useCurrentNamespace';

export const useGetPodsList = () => {
  const [ns] = useCurrentNamespace();

  return useQuery(podsQueryKeys.list(ns), () => getPodsList(ns), {
    refetchInterval: 1000,
  });
};
