import { ApiList } from '../../common/types';
import { Namespace } from '../types';

export const getNamespacesList = async (): Promise<ApiList<Namespace>> => {
	return fetch(`http://localhost:3000/api/namespaces`).then(r => r.json());
};
