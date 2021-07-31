import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import { MicroRequest } from 'apollo-server-micro/dist/types';

import prisma from 'lib/prisma';
import { SessionUser } from 'types/next-auth';

export interface Context {
	prisma: PrismaClient;
	user?: SessionUser;
}

const context = async ({ req }: { req: MicroRequest }): Promise<Context> => {
	const session = await getSession({ req });
	return {
		prisma,
		user: session?.user,
	};
};

export default context;
