import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useCurrentNamespace = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const current = searchParams.get('namespace');

	const changeNamespaceHandler = useCallback(
		(namespace?: string) => {
			if (namespace) {
				searchParams.set('namespace', namespace);

				setSearchParams(searchParams);
			} else {
				searchParams.delete('namespace');

				setSearchParams(searchParams);
			}
		},
		[searchParams, setSearchParams],
	);

	return [current || undefined, changeNamespaceHandler] as const;
};
