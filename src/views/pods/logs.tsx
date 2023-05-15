import { Wrapper } from '../../modules/common/components/ui/Wrapper';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useGetPodDetails } from '../../modules/pods/hooks/useGetPodDetails';
import { Nothing } from '../../modules/common/components/ui/Nothing';
import { Loader } from '../../modules/common/components/ui/Loader';
import clsx from 'clsx';
import {
	Bars4Icon,
	ArrowPathIcon,
	InformationCircleIcon,
	CheckBadgeIcon,
	CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { useGetContainerLogs } from '../../modules/pods/hooks/useGetContainerLogs';

export const LogsView = () => {
	const { containerName, podName, namespace } = useParams();
	const [searchParams] = useSearchParams();

	const getContainerLogsQuery = useGetContainerLogs(
		namespace,
		podName,
		containerName,
	);
	if (getContainerLogsQuery.error) throw getContainerLogsQuery.error;

	if (getContainerLogsQuery.isLoading) return <Loader />;

	if (!getContainerLogsQuery.data)
		return (
			<Wrapper>
				<Nothing name={containerName} />
			</Wrapper>
		);

	return (
		<Wrapper>
			<div>
				{getContainerLogsQuery.data.map((l, index) => (
					<div key={index} className='hover:bg-gray-100'>
						<div key={index} className='py-1 text-xs font-mono'>
							<DateTag date={l.date} />
							<span className='select-none'> </span>
							{/* {Object.entries(l.tags ?? []).map(([k, v]) => (
								<span className='inline-block mb-1 mr-1 text-xs bg-gray-200 rounded-full px-2 py-0.5'>
									{k}: <span>{v}</span>
								</span>
							))} */}
							{/* <div className='text-sm font-bold'>{l.message}</div> */}
							<span className='inline-block text-xs'>{l.message}</span>
						</div>
					</div>
				))}
			</div>
		</Wrapper>
	);
};

export const DateTag: React.FC<{ date: string | null }> = ({ date }) => {
	if (!date) return null;

	return (
		<span className='inline-block text-gray-500 select-none'>
			{new Date(date).toLocaleString('en', {
				month: '2-digit',
				day: '2-digit',
				year: '2-digit',
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			})}
		</span>
	);
};
