import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

export type NothingProps = {
	name?: string;
	namespaced?: boolean;
};

export const Nothing: React.FC<NothingProps> = ({
	name,
	namespaced = false,
}) => {
	return (
		<div className='flex flex-col items-center'>
			<DocumentMagnifyingGlassIcon className='h-12 text-black/80' />
			<div className='text-center mt-4'>
				{name ? `No ${name}` : 'Nothing to show'}
			</div>
		</div>
	);
};
