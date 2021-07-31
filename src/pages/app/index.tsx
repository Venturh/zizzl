import { GetServerSideProps } from 'next';
import { AppLayout } from 'components/layouts/AppLayout';
import { MeDocument, useMeQuery } from 'types/graphql';
import { preloadAuthenticatedRoute } from 'utils/redirects';

function App() {
	const { data } = useMeQuery();

	return (
		<AppLayout>
			<span>Welcome {data?.me?.name}</span>
		</AppLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return preloadAuthenticatedRoute(ctx, { query: MeDocument });
};

export default App;
