import { GetServerSideProps } from 'next';
import LandingLayout from 'components/layouts/LandingLayout';
import { preloadQuery } from 'lib/apollo';
import { MeDocument } from 'types/graphql';

const Landing = () => {
	const title = 'Landing Page';
	const description = 'Welcome.';
	return (
		<LandingLayout title={title} description={description}>
			Welcome
		</LandingLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) =>
	preloadQuery(ctx, { query: MeDocument });
export default Landing;
