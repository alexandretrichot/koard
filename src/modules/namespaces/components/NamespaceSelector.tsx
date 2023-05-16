import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import React, { Fragment } from 'react';
import { useCurrentNamespace } from '../hooks/useCurrentNamespace';
import { useGetNamespacesList } from '../hooks/useGetNamespacesList';

export type NamespaceSelectorProps = {};

export const NamespaceSelector: React.FC<NamespaceSelectorProps> = ({}) => {
	const [selected, setSelected] = useCurrentNamespace();

	const getNamespacesListQuery = useGetNamespacesList();

	const options = getNamespacesListQuery.data?.items.map(i => i.name) ?? [];

	return (
		<Listbox value={selected} onChange={setSelected}>
			<div className='relative mt-1'>
				<Listbox.Button className='relative w-full cursor-default rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
					<span className='block truncate'>{selected ?? 'All namespaces'}</span>
					<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
						<ChevronUpDownIcon
							className='h-5 w-5 text-gray-400'
							aria-hidden='true'
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Listbox.Options className='absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30'>
						<Listbox.Option
							className={({ active }) =>
								`relative cursor-default select-none py-2 pl-10 pr-4 ${
									active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
								}`
							}
							value={undefined}
						>
							{({ selected }) => (
								<>
									<span
										className={`block truncate text-black/80 ${
											selected ? 'font-medium' : 'font-normal'
										}`}
									>
										All namespaces
									</span>
									{selected ? (
										<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
											<CheckIcon className='h-5 w-5' aria-hidden='true' />
										</span>
									) : null}
								</>
							)}
						</Listbox.Option>
						<div className='border-b border-b-slate-300' />
						{options.map(ns => (
							<Listbox.Option
								key={ns}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
									}`
								}
								value={ns}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected ? 'font-medium' : 'font-normal'
											}`}
										>
											{ns}
										</span>
										{selected ? (
											<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
												<CheckIcon className='h-5 w-5' aria-hidden='true' />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};
