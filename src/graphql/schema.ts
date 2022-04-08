import { makeSchema, fieldAuthorizePlugin } from 'nexus';
import path from 'path';
import * as types from './types';

const schema = makeSchema({
	types,
	shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
	plugins: [fieldAuthorizePlugin()],
	outputs: {
		schema: path.join(process.cwd(), 'src/types/schema.gql'),
		typegen: path.join(process.cwd(), 'src/types/nexus.ts'),
	},
	contextType: {
		module: path.join(process.cwd(), 'src/pages/api/graphql.ts'),
		export: 'Context',
	},
});

export default schema;
