import { useQuery } from '@tanstack/react-query';
import { namespacesQueryKeys } from '../keys/namespaces.keys';
import { getNamespacesList } from '../services/namespaces.service';

export const useGetNamespacesList = () => {
  return useQuery(namespacesQueryKeys.list, () => getNamespacesList(), {
    refetchInterval: 5000,
  });
};
