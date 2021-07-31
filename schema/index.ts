import { makeSchema } from 'nexus';
import path from 'path';
import * as types from './resolver';

export const schema = makeSchema({
	types,
	shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
	plugins: [],
	outputs: {
		schema: path.join(process.cwd(), 'generated/schema.gql'),
		typegen: path.join(process.cwd(), 'generated/nexus.ts'),
	},
	contextType: {
		module: path.join(process.cwd(), 'pages/api/graphql.ts'),
		export: 'Context',
	},
});
