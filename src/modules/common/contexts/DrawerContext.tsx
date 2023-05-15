import React, { useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const DrawerContext = React.createContext<[boolean, () => void]>([
	false,
	() => {},
]);

export type DrawerContextProviderProps = {
	children?: React.ReactNode;
};

export const DrawerContextProvider: React.FC<DrawerContextProviderProps> = ({
	children,
}) => {
	const [isDrawerOpen, setIsDrawerOpen] = useLocalStorage('koard-drawer', true);

	return (
		<DrawerContext.Provider
			value={[isDrawerOpen, () => setIsDrawerOpen(!isDrawerOpen)]}
		>
			{children}
		</DrawerContext.Provider>
	);
};

export const useDrawerContext = () => useContext(DrawerContext);
