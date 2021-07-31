import { useMemo } from 'react';
import { GetServerSidePropsResult } from 'next';
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	QueryOptions,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export type AppInitialState = null | NormalizedCacheObject;

export function createApolloClient() {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_HOST,
	});

	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		credentials: 'include',
		link: httpLink,
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState: AppInitialState) {
	const _apolloClient = apolloClient ?? createApolloClient();
	// If your page has Next.js data fetching methods that use Apollo Client,
	// the initial state gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Restore the cache using the data passed from
		// getStaticProps/getServerSideProps combined with the existing cached data
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function useApollo(initialState?: Record<string, any>) {
	const client = useMemo(
		() => initializeApollo({ initialState }),
		[initialState],
	);

	return client;
}

export async function preloadQuery(
	queryOption: QueryOptions,
): Promise<GetServerSidePropsResult<{}>> {
	const client = initializeApollo({});
	await client.query(queryOption);
	const initialClientState = client.cache.extract();
	return {
		props: {
			initialClientState,
		},
	};
}
