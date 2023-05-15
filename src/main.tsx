import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DrawerContextProvider } from './modules/common/contexts/DrawerContext';
import { App } from './App';

import './index.css';

const main = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<DrawerContextProvider>
					<App />
				</DrawerContextProvider>
			</QueryClientProvider>
		</React.StrictMode>,
	);
};

main().catch(console.error);
