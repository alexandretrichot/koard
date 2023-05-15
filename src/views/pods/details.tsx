// import { JSONTree } from 'react-json-tree';
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
import { useMemo } from 'react';
import { PodStatus } from '../../modules/pods/types';

export const PodDetailsView = () => {
	const { podName, namespace } = useParams();
	const [searchParams] = useSearchParams();

	const getPodDetailsQuery = useGetPodDetails(namespace, podName);
	const podStatus = useMemo<{ class: string; text: string }>(() => {
		if (getPodDetailsQuery.data?.status === PodStatus.Pending)
			return {
				class: 'bg-yellow-500',
				text: 'Pending',
			};

		if (getPodDetailsQuery.data?.status === PodStatus.Failed)
			return {
				class: 'bg-red-500',
				text: 'Failed',
			};

		if (getPodDetailsQuery.data?.status === PodStatus.Running)
			return { class: 'bg-green-500', text: 'Running' };

		if (getPodDetailsQuery.data?.status === PodStatus.Succeeded)
			return {
				class: 'border border-green-600 bg-white',
				text: 'Running',
			};

		return {
			class: 'bg-gray-500',
			text: 'Unknown',
		};
	}, [getPodDetailsQuery.data?.status]);

	if (getPodDetailsQuery.error) throw getPodDetailsQuery.error;

	if (getPodDetailsQuery.isLoading) return <Loader />;

	if (!getPodDetailsQuery.data)
		return (
			<Wrapper>
				<Nothing name={podName} namespaced />
			</Wrapper>
		);

	return (
		<Wrapper>
			<div>
				<div className='flex justify-between items-start'>
					<div>
						<div className='flex items-center gap-2'>
							<div
								className={clsx(
									'rounded-full h-4 w-4 flex-none',
									podStatus.class,
								)}
							/>{' '}
							<h1 className='font-bold text-2xl truncate flex-shrink'>
								{getPodDetailsQuery.data.name}
							</h1>
						</div>
						<div className='text-sm text-gray-700'>{podStatus.text}</div>
					</div>
				</div>
				<div className='my-4 flex flex-wrap gap-2'>
					{Object.entries(getPodDetailsQuery.data.labels).map(([key, text]) => (
						<div
							key={key}
							className='rounded-full px-2 py-0.5 text-xs bg-gray-200'
						>
							{key}: <span className='font-bold'>{text}</span>
						</div>
					))}
				</div>
				<div className='my-4'>TODO: Ports</div>

				<div className='my-8'>
					<h2 className='font-bold text-xl'>Containers</h2>
					{getPodDetailsQuery.data.containers.map(container => {
						return (
							<div
								key={container.name}
								className='my-4 -mx-4 p-4 border border-transparent hover:border-gray-200 rounded-lg hover:shadow-sm'
							>
								<div className='flex justify-between items-start'>
									<div>
										<div className='flex items-center gap-2'>
											<div
												className={clsx(
													'rounded-full h-3 w-3 flex-none',
													container.state.running
														? 'bg-green-500'
														: container.state.waiting
														? 'bg-yellow-500'
														: container.state.terminated
														? container.state.terminated.exitCode === 0
															? 'border border-green-600 bg-white'
															: 'bg-red-500'
														: 'bg-gray-500',
												)}
											/>{' '}
											<h3 className='font-bold text-lg truncate flex-shrink'>
												{container.name}
											</h3>
										</div>
										<div className='text-sm text-gray-700'>
											{container.state.running ? (
												<div>
													Running{' '}
													<span>
														(from{' '}
														{new Date(
															container.state.running.startedAt,
														).toLocaleString('en')}
														)
													</span>
												</div>
											) : container.state.waiting ? (
												<div>
													Waiting{' '}
													<span>({container.state.waiting.reason})</span>
												</div>
											) : container.state.terminated ? (
												container.state.terminated.exitCode === 0 ? (
													<div>
														Completed{' '}
														<span>
															(in{' '}
															{new Date(
																container.state.terminated.finishedAt,
															).toLocaleString('en')}
															)
														</span>
													</div>
												) : (
													<div>
														Failed{' '}
														<span>({container.state.terminated.reason})</span>
													</div>
												)
											) : (
												'Unknown'
											)}
										</div>
									</div>
									<div className='flex gap-2'>
										<Link
											to={{
												pathname: `/pods/${namespace}/${podName}/${container.name}/logs`,
												search: searchParams.toString(),
											}}
											className='flex gap-2 items-center border border-black rounded-md px-3 py-1 hover:bg-black hover:text-white transition-colors'
										>
											<Bars4Icon className='h-5 w-5' />
											<span>Logs</span>
										</Link>
									</div>
								</div>

								{container.state.waiting && (
									<div className='my-1'>
										<div className='text-yellow-600'>
											{container.state.waiting.message}
										</div>
										{hints[container.state.waiting.reason] && (
											<div className='relative bg-green-200/50 rounded-md p-3 my-4 italic'>
												<InformationCircleIcon className='p-0.5 bg-white text-gray-800 rounded-full h-6 w-6 absolute -left-3 -top-3' />
												{hints[container.state.waiting.reason]}
											</div>
										)}
									</div>
								)}
								{container.state.terminated?.exitCode && (
									<div className='my-1'>
										<div className='text-red-600'>
											<div>
												Exit code: {container.state.terminated.exitCode}
												{container.state.terminated.signal &&
													`, signal: ${container.state.terminated.signal}`}
											</div>
											<div>{container.state.terminated.message}</div>
										</div>
										{hints[container.state.terminated.reason] && (
											<div className='relative bg-green-200/50 rounded-md p-3 my-4 italic'>
												<InformationCircleIcon className='p-0.5 bg-white text-gray-800 rounded-full h-6 w-6 absolute -left-3 -top-3' />
												{hints[container.state.terminated.reason]}
											</div>
										)}
									</div>
								)}

								<div className='flex flex-wrap gap-4 my-2'>
									<div className='flex items-center gap-1'>
										<ArrowPathIcon className='h-4 w-4' />
										<span className='font-bold' aria-label='Restarts'>
											{container.restartCount}
										</span>
									</div>
									<div className='flex items-center gap-1'>
										<CheckBadgeIcon className='h-4 w-4' />
										<span className='font-bold' aria-label='Restarts'>
											{container.ready ? 'Ready' : 'Not Ready'}
										</span>
									</div>
									<div className='flex items-center gap-1'>
										<CheckCircleIcon className='h-4 w-4' />
										<span className='font-bold' aria-label='Restarts'>
											{container.started ? 'Started' : 'Not Started'}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* <ul className='list-disc'>
				<li>Name of pod</li>
				<li>Status</li>
				<li>Restarts</li>
				<li>Age</li>
				<li>Tags</li>
				<li>list of ports</li>
				<li>button for logs</li>
				<li>button for shell</li>
			</ul> */}

			{/* <div className='grid grid-cols-2'>
				<div>Name of pod</div>
				<div>{data.name}</div>
			</div> */}

			{/* {data && (
				<div className='rounded p-4 border shadow overflow-hidden'>
					<pre>{JSON.stringify(data, undefined, 2)}</pre>
				</div>
			)} */}
		</Wrapper>
	);
};

const hints: Record<string, string> = {
	CrashLoopBackOff:
		'The container keeps crashing. Check the logs for more information. Your container is probably misconfigured.',
	ErrImagePull:
		'The container image could not be pulled. Check that the image exists and that you have access to it. (If you are using a private registry, check that you have configured your credentials correctly.)',
	ImagePullBackOff:
		'The container image could not be pulled. Check that the image exists and that you have access to it. (If you are using a private registry, check that you have configured your credentials correctly.)',
	InvalidImageName:
		'The container image name is invalid. Check that the image name is correct.',
	RunContainerError:
		'The container could not be started. Check the logs for more information.',
	Error:
		'The container could not be started. Check the logs for more information.',
};
