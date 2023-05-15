import { EyeIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';

export type ContainerCardProps = {
	container: any;
	status?: any;
};

export const ContainerCard: React.FC<ContainerCardProps> = ({
	container,
	status,
}) => {
	return (
		<div className='my-4 shadow border rounded-md border-slate-200'>
			<header className='border-b border-b-slate-200 p-4'>
				<div className='flex justify-between'>
					<div>
						<h3 className='font-bold text-xl'>{container.name}</h3>
					</div>
					<div className='flex'>
						<Link to={'#'}>
							<a className='h-8 w-8 rounded flex justify-center items-center hover:bg-slate-200'>
								<EyeIcon className='h-4 text text-slate-800' />
							</a>
						</Link>
						<button className='h-8 w-8 rounded flex justify-center items-center hover:bg-slate-200'></button>
					</div>
				</div>
			</header>
			<div className='p-4'></div>
		</div>
	);
};
