import { Wrapper } from '../../modules/common/components/ui/Wrapper';
import { useParams } from 'react-router-dom';
import { Nothing } from '../../modules/common/components/ui/Nothing';
import { Loader } from '../../modules/common/components/ui/Loader';
import { useGetContainerLogs } from '../../modules/pods/hooks/useGetContainerLogs';
import { useState } from 'react';

export const LogsView = () => {
	const { containerName, podName, namespace } = useParams();

	const [showTags, setShowTags] = useState(false);

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
			<header className=''>
				<h1 className='text-2xl font-bold'><span className='text-black/60'>Logs of</span> <i>{containerName}</i></h1>
				<div className='text-gray-500'>{podName}</div>

				<div className='flex items-center mt-2'>
					<button
						onClick={() => setShowTags(prev => !prev)}
						className='px-2 py-1 text-xs font-mono text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100'
					>
						{showTags ? 'Hide' : 'Show'} tags
					</button>
				</div>
			</header>
			<div className='mt-4'>
				{getContainerLogsQuery.data.map((l, index) => (
					<div key={index} className='hover:bg-gray-100'>
						<div key={index} className='py-1 text-xs font-mono'>
							<DateTag date={l.date} />
							<span className='select-none'> </span>
							{showTags &&
								Object.entries(l.tags ?? []).map(([k, v]) => (
									<span
										style={{ color: getProceduralColor(k) }}
										className='inline text-xs'
									>
										{k}: <span>{v}</span>{' '}
									</span>
								))}
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

// get hex color from string with brightness of 50%
const getProceduralColor = (str: string) => {
	const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);

	const color = `#${Math.floor(
		Math.abs(Math.sin(hash) * 16777215) % 16777215,
	).toString(16)}`;

	return color;
};
