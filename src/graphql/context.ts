import { NextApiRequest } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { SessionUser } from 'types/next-auth';

export interface Context {
	user?: SessionUser;
	userId?: string;
	session?: Session;
}

export default async function getContext({ req }: { req: NextApiRequest }): Promise<Context> {
	const session = await getSession({ req });

	return {
		user: session?.user,
		userId: session?.user?.id,
		session,
	};
}
