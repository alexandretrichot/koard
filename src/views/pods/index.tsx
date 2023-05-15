import { Wrapper } from '../../modules/common/components/ui/Wrapper';
import { PodsTable } from '../../modules/pods/components/PodsTable';

export const PodsView = () => {
	return (
		<Wrapper>
			<h1 className='font-bold text-2xl md:text-3xl mb-4'>Pods</h1>
			<PodsTable />
		</Wrapper>
	);
};
