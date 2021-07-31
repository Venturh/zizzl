import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession, getCsrfToken } from 'next-auth/client';

export async function unauthenticatedRoute(
	ctx: GetServerSidePropsContext,
	redirect: string = '/app',
) {
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
