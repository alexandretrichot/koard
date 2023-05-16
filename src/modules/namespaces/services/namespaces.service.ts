import { API_URL } from '../../../api';
import { ApiList } from '../../common/types';
import { Namespace } from '../types';

export const getNamespacesList = async (): Promise<ApiList<Namespace>> => {
	return fetch(`${API_URL}/namespaces`).then(r => r.json());
};
