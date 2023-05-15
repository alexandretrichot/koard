import { EyeIcon } from '@heroicons/react/24/outline';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { getColorByStatus } from '../helpers/getColorByStatus';
import { useGetPodsList } from '../hooks/useGetPodsList';
import { ErrorRenderer } from '../../common/components/ui/ErrorRenderer';
import { Nothing } from '../../common/components/ui/Nothing';
import { Link, useSearchParams } from 'react-router-dom';
import { PodStatus } from '../types';

type PodRow = {
	//id: string;
	namespace: string;
	name: string;
	status: string;
	//color: string;
	//restarts: number;
	//startTime: Date;
};

export type PodsTableProps = {};

export const PodsTable: React.FC<PodsTableProps> = ({}) => {
	const [searchParams] = useSearchParams();

	const getPodsListQuery = useGetPodsList();

	const columnHelper = useMemo(() => createColumnHelper<PodRow>(), []);

	const columns = useMemo(
		() => [
			columnHelper.accessor('name', {
				header: 'Name',
				cell: info => (
					<Link
						to={{
							pathname: `/pods/${info.row.original.namespace}/${info.row.original.name}`,
							search: searchParams.toString(),
						}}
						className='decoration-1 decoration-dotted'
					>
						{info.getValue()}
					</Link>
				),
			}),
			columnHelper.accessor('status', {
				header: 'Status',
				cell: info => (
					<div className='flex items-center'>
						<div
							className={clsx(
								'h-2.5 w-2.5 rounded-full mr-2',
								info.row.original.status === PodStatus.Running &&
									'bg-green-400',
								info.row.original.status === PodStatus.Succeeded &&
									'bg-white border-2 border-green-700',
								info.row.original.status === PodStatus.Pending &&
									'bg-yellow-500',
								info.row.original.status === PodStatus.Unknown &&
									'bg-slate-400',
								info.row.original.status === PodStatus.Failed && 'bg-red-500',
							)}
						/>
						{` ${info.getValue()}`}
					</div>
				),
			}),
			/* columnHelper.accessor('restarts', {
				header: 'Restarts',
				cell: info => info.renderValue(),
			}), */
			/* columnHelper.accessor('startTime', {
				header: 'Date',
				cell: info =>
					info.getValue().toLocaleString(undefined, {
						dateStyle: 'short',
						timeStyle: 'short',
					}),
			}), */
		],
		[columnHelper],
	);

	const data = useMemo<PodRow[]>(() => {
		return (
			getPodsListQuery.data?.items.map(p => {
				return {
					id: p.name,
					namespace: p.namespace,
					name: p.name,
					//startTime: new Date(p.status.startTime),
					status: p.status,
					colorStatus: getColorByStatus(p.status),
					//restarts: containerStatus?.restartCount || 0,
				};
			}) || []
		);
	}, [getPodsListQuery.data]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (getPodsListQuery.error)
		return <ErrorRenderer error={getPodsListQuery.error} />;

	if (!getPodsListQuery.data?.items.length)
		return <Nothing name='pods' namespaced />;

	return (
		<div className='overflow-x-auto relative shadow-md rounded-lg'>
			<table className='w-full text-sm text-left text-gray-500'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className='p-4'>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
								</th>
							))}
							<th className='p-4' scope='col'>
								Actions
							</th>
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id} className='bg-white border-b hover:bg-gray-50'>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className='p-4 w-4 whitespace-nowrap'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
							<td className='p-2 w-2 whitespace-nowrap'>
								<div className='flex'>
									<Link
										to={{
											pathname: `/pods/${row.original.namespace}/${row.original.name}`,
											search: searchParams.toString(),
										}}
										className='h-8 w-8 rounded flex justify-center items-center hover:bg-slate-200'
									>
										<EyeIcon className='h-4 text text-slate-800' />
									</Link>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
