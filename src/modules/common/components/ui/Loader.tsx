import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { LoaderIcon } from 'react-hot-toast';
//import { useCurrentNamespace } from '../../../namespaces/hooks/useCurrentNamespace';

export type LoaderProps = {
	message?: string;
};

export const Loader: React.FC<LoaderProps> = ({
	message = 'Loading...',
}) => {
	//const [ns] = useCurrentNamespace();

	return (
		<div className='flex flex-col items-center p-4 shadow-md rounded-lg'>
			<LoaderIcon className='h-12 text-black/80' />
			<div className='text-center mt-4'>
				{message}
			</div>
		</div>
	);
};
