import React from 'react';
/* import { NamespaceSelector } from '../../../namespaces/components/NamespaceSelector'; */
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { Link } from 'react-router-dom';
import { NamespaceSelector } from '../../../namespaces/components/NamespaceSelector';

export type AppBarProps = {};

export const AppBar: React.FC<AppBarProps> = () => {
	const [_, toggleDrawer] = useDrawerContext();

	return (
		<div className='sm:flex bg-white items-center justify-between p-2 shadow-sm sticky top-0 z-20'>
			<div className='flex items-center'>
				<button
					onClick={toggleDrawer}
					className='h-8 w-8 flex rounded justify-center items-center hover:bg-slate-200 transition-colors'
				>
					<Bars3Icon className='h-6' />
				</button>
				<div className='font-bold text-xl m-2 sm:mr-8'>
					<Link to='/'>k8s-dashboard</Link>
				</div>
			</div>
			<div className='w-full sm:w-64'>
				<NamespaceSelector />
			</div>
		</div>
	);
};
