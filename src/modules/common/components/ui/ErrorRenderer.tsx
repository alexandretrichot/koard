import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export type ErrorRendererProps = {
	error?: unknown;
};

export const ErrorRenderer: React.FC<ErrorRendererProps> = ({ error }) => {
	const name = error instanceof Error ? error.name : 'Oops!';
	const message =
		error instanceof Error ? error.message : 'Something went wrong';

	return (
		<div className='flex flex-col items-center p-8'>
			<ExclamationCircleIcon className='h-12 text-red-500' />
			<div className='font-bold text-lg mt-4'>{name}</div>
			<div className='text-center mt-2'>{message}</div>
		</div>
	);
};
