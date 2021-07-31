import { schema } from 'schema';
import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import { MicroRequest } from 'apollo-server-micro/dist/types';

import { SessionUser } from 'types/next-auth';

export interface Context {
	user?: SessionUser;
}

const server = new ApolloServer({
	schema,
	context: async ({ req }: { req: MicroRequest }): Promise<Context> => {
		const session = await getSession({ req });
		return {
			user: session?.user,
		};
	},
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default server.createHandler({ path: '/api/graphql' });
