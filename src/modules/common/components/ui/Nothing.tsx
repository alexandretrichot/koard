import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
//import { useCurrentNamespace } from '../../../namespaces/hooks/useCurrentNamespace';

export type NothingProps = {
	name?: string;
	namespaced?: boolean;
};

export const Nothing: React.FC<NothingProps> = ({
	name,
	namespaced = false,
}) => {
	//const [ns] = useCurrentNamespace();

	return (
		<div className='flex flex-col items-center p-4 shadow-md rounded-lg'>
			<DocumentMagnifyingGlassIcon className='h-12 text-black/80' />
			<div className='text-center mt-4'>
				{name ? `No ${name}` : 'Nothing to show'}
				{namespaced && (
					<>
						{' '}
						{/* in namespace <i>{ns}</i> */}
					</>
				)}
			</div>
		</div>
	);
};
