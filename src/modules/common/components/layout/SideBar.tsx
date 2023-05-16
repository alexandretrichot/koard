import { ChartPieIcon } from '@heroicons/react/24/outline';
import { CubeTransparentIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export type SideBarProps = {};

export const SideBar: React.FC<SideBarProps> = () => {
	const [isOpen] = useDrawerContext();

	return (
		<div className='h-full w-16 md:w-auto z-10'>
			<aside
				className={clsx(
					isOpen ? 'w-64 shadow md:shadow-none' : 'w-16',
					'h-full bg-white transition-all',
				)}
				aria-label='Sidebar'
			>
				<div className='overflow-y-auto py-4 px-3 sticky top-[106px] sm:top-[60px]'>
					<ul className='space-y-2'>
						<li>
							<SideBarLink
								pathname='/'
								exact
								icon={<ChartPieIcon />}
								namespaced
							>
								Dashboard
							</SideBarLink>
						</li>
						<li>
							<SideBarLink
								pathname='/pods'
								icon={<CubeTransparentIcon />}
								namespaced
							>
								Pods
							</SideBarLink>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export type SideBarLinkProps = {
	pathname: string;
	exact?: boolean;
	icon: React.ReactElement<SVGAElement>;
	children: React.ReactNode;
	namespaced?: boolean;
};

export const SideBarLink: React.FC<SideBarLinkProps> = ({
	pathname,
	exact = false,
	children,
	namespaced = false,
	icon,
}) => {
	const { pathname: currentPath } = useLocation();
	const [searchParams] = useSearchParams();

	const isActive = useMemo(() => {
		if (exact) return currentPath === pathname;

		return currentPath.startsWith(pathname);
	}, [exact, currentPath, pathname]);

	return (
		<Link
			to={{ pathname, search: searchParams.toString() }}
			className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 overflow-hidden'
		>
			{React.cloneElement(icon, {
				className: clsx(
					'flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-900',
					isActive ? 'text-primary' : 'text-gray-500',
				),
			})}
			<span
				className={clsx(
					'flex-1 ml-3 whitespace-nowrap',
					isActive && 'font-bold',
				)}
			>
				{children}
			</span>
			{namespaced && (
				<span className='inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full'>
					N
				</span>
			)}
		</Link>
	);
};
