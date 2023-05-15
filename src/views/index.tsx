import { Wrapper } from '../modules/common/components/ui/Wrapper';
import { PodsTable } from '../modules/pods/components/PodsTable';

export const HomeView = () => {
	return (
		<Wrapper>
			<h1 className='font-bold text-2xl md:text-3xl mb-8'>
				Overview
				{/* {ns && (
            <>
              {' '}
              of <i>{ns}</i>
            </>
          )} */}
			</h1>
			<section>
				<h2 className='font-bold text-xl md:text-2xl mb-4'>Pods</h2>
				<PodsTable />
			</section>
			{/* <section className='mt-4'>
          <h2 className='font-bold text-xl md:text-2xl mb-4'>Services</h2>
          <ServicesTable />
        </section> */}
		</Wrapper>
	);
};
