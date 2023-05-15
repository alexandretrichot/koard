import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorRenderer } from './modules/common/components/ui/ErrorRenderer';

import { Toaster } from 'react-hot-toast';
import { HomeView } from './views';
import { MainLayout } from './modules/common/components/layout/MainLayout';
import { PodsView } from './views/pods';
import { PodDetailsView } from './views/pods/details';
import { LogsView } from './views/pods/logs';

const router = createBrowserRouter([
	{
		path: import.meta.env.BASE_URL,
		errorElement: <ErrorRenderer />,
		element: (
			<MainLayout>
				<Outlet />
				<Toaster />
			</MainLayout>
		),
		children: [
			{
				path: '/',
				element: <HomeView />,
				errorElement: <ErrorRenderer />,
			},
			{
				path: '/pods',
				element: <PodsView />,
				errorElement: <ErrorRenderer />,
			},
			{
				path: '/pods/:namespace/:podName',
				element: <PodDetailsView />,
				errorElement: <ErrorRenderer />,
			},
			{
				path: '/pods/:namespace/:podName/:containerName/logs',
				element: <LogsView />,
				errorElement: <ErrorRenderer />,
			},
		],
	},
]);

export const App: React.FC = () => {
	return <RouterProvider router={router} />;
};
