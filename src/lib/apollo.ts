import { useMemo } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
	ApolloClient,
	ApolloError,
	defaultDataIdFromObject,
	from,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	QueryOptions,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

interface ClientOptions {
	headers?: Record<string, string>;
	initialState?: Record<string, any>;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export type AppInitialState = null | NormalizedCacheObject;

export function createApolloClient({ initialState, headers }: ClientOptions) {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_HOST,
		credentials: 'same-origin',
		headers,
	});

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors)
			graphQLErrors.map(({ message, locations, path }) => {
				console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
			});
		if (networkError) console.log(`[Network error]: ${networkError}`);
	});

	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		credentials: 'include',
		link: from([httpLink]),
		cache: new InMemoryCache({
			dataIdFromObject: (object) => {
				if (object.id) {
					// eslint-disable-next-line no-underscore-dangle
					return `${object.__typename}-${object.id}`;
				}
				if (object.cursor) {
					// Cursor edge instead, fixes invalid duplicate
					// eslint-disable-next-line no-underscore-dangle
					return `${object.__typename}-${object.cursor}`;
				}
				// Use a fallback to default handling if neither id nor cursor
				return defaultDataIdFromObject(object);
			},
			typePolicies: {
				Query: {
					fields: {
						dcaOrders: {
							// Don't cache separate results based on
							// any of this field's arguments.
							keyArgs: false,
							// Concatenate the incoming list items with
							// the existing list items.
							merge(existing = [], incoming) {
								return [...existing, ...incoming];
							},
						},
						orderlist: {
							keyArgs: false,
							merge(existing, incoming) {
								return incoming;
								if (!incoming) return existing;
								if (!existing) return incoming;
								if (!existing.nodes) return incoming;

								const { nodes, ...rest } = incoming;
								let result = rest;
								result.nodes = [...existing.nodes, ...nodes];
								return result;
							},
						},
					},
				},
			},
		}),
	});
}

export function initializeApollo({ initialState, headers }: ClientOptions) {
	const _apolloClient = apolloClient ?? createApolloClient({ headers });
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
	const client = useMemo(() => initializeApollo({ initialState }), [initialState]);

	return client;
}

export async function preloadQuery(
	context: GetServerSidePropsContext,
	queryOption: QueryOptions,
	props?: any,
): Promise<GetServerSidePropsResult<{}>> {
	try {
		const client = initializeApollo({
			headers: context.req.headers as Record<string, string>,
		});
		await client.query(queryOption);
		const initialClientState = client.cache.extract();
		return {
			props: {
				initialClientState,
				uaString: context.req.headers['user-agent'],
				...props,
			},
		};
	} catch (e) {
		if (e instanceof ApolloError) {
			const notFoundError = e.graphQLErrors.find((error: Error) => {
				return (error as any)?.extensions.code === 404;
			});

			if (notFoundError) {
				return {
					notFound: true,
				};
			}
		}
		return { props: {} };
	}
}
