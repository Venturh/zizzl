import { GetServerSideProps } from 'next';
import LandingLayout from 'components/layouts/LandingLayout';

const Landing = () => {
	const title = 'Landing Page';
	const description = 'Welcome.';
	return (
		<LandingLayout title={title} description={description}>
			Welcome
		</LandingLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return { props: {} };
};

export default Landing;
