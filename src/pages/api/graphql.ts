import { NextApiHandler } from 'next';
import { IncomingHttpHeaders } from 'http';
import {
	getGraphQLParameters,
	processRequest,
	renderGraphiQL,
	shouldRenderGraphiQL,
	sendResult,
} from 'graphql-helix';

import schema from 'graphql/schema';
import getContext, { Context } from 'graphql/context';
export type { Context } from 'graphql/context';

interface GraphQLRequest {
	body?: any;
	headers: IncomingHttpHeaders;
	method: string;
	query: any;
}

export default (async (req, res) => {
	const request: GraphQLRequest = {
		body: req.body,
		headers: req.headers,
		method: req.method,
		query: req.query,
	};

	if (shouldRenderGraphiQL(request)) {
		res.send(renderGraphiQL({ endpoint: '/api/graphql' }));
	} else {
		const { operationName, query, variables } = getGraphQLParameters(request);

		const result = await processRequest<Context>({
			operationName,
			query,
			variables,
			request,
			schema,
			contextFactory: () => getContext({ req }),
		});

		sendResult(result, res);
	}
}) as NextApiHandler;
