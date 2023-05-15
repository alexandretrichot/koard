import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';

export type LoaderProps = {
	message?: string;
};

export const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
	return (
		<div className='flex flex-col items-center p-4'>
			<ArrowPathRoundedSquareIcon className='h-8 text-black/80 animate-spin' style={{ animation: 'spin 1s cubic-bezier(0,.96,1,.53) infinite' }} />
			<div className='text-center mt-4'>{message}</div>
		</div>
	);
};
