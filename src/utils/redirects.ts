import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession, getCsrfToken } from 'next-auth/react';
import { QueryOptions } from '@apollo/client';
import { preloadQuery } from 'lib/apollo';

export async function unauthenticatedRoute(ctx: GetServerSidePropsContext, redirect: string = '/') {
	const session = await getSession(ctx);
	const csrfToken = await getCsrfToken(ctx);

	if (session) {
		return {
			redirect: {
				destination: redirect,
				permanent: false,
			},
		};
	}

	return {
		props: { session, csrfToken },
	};
}

export async function authenticatedRoute(
	ctx: GetServerSidePropsContext,
	redirect = '/',
): Promise<GetServerSidePropsResult<{}>> {
	const session = await getSession(ctx);

	if (!session) {
		return {
			redirect: {
				destination: redirect,
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}

export async function preloadAuthenticatedRoute(
	ctx: GetServerSidePropsContext,
	queryOption: QueryOptions,
	props?: any,
): Promise<GetServerSidePropsResult<{}>> {
	const session = await getSession(ctx);

	if (!session) {
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false,
			},
		};
	}

	return preloadQuery(ctx, queryOption, props);
}
