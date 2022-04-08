import { extendType, nullable, stringArg } from 'nexus';

import db from 'lib/prisma';
import { ResultType } from '../results';

export const userQueries = extendType({
	type: 'Query',
	definition(t) {
		t.nullable.field('me', {
			type: 'User',
			resolve(_, __, { user }) {
				return user;
			},
		});
	},
});

export const userMutations = extendType({
	type: 'Mutation',
	definition: (t) => {
		t.field('editUser', {
			type: 'Result',
			args: {
				name: nullable(stringArg()),
				image: nullable(stringArg()),
			},
			resolve: async (_root, { name, image }, { user }) => {
				await db.user.update({
					where: { id: user!.id },
					data: {
						name: name ?? undefined,
						image: image ?? undefined,
					},
				});
				return ResultType.SUCCESS;
			},
		});
	},
});
