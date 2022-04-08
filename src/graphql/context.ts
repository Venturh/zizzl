import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { SessionUser } from 'types/next-auth';
import { NextApiRequest } from 'next';

export interface Context {
	user?: SessionUser;
	userId?: string;
	session?: Session;
}

const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
	const session = await getSession({ req });
	return {
		user: session?.user,
		userId: session?.user?.id,
		session,
	};
};

export default context;
