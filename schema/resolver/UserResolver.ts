import { extendType, nullable, objectType, stringArg } from 'nexus';
import { User } from 'nexus-prisma';

import prisma from 'lib/prisma';
import { ResultType } from './ResultResolver';

export const user = objectType({
	name: User.$name,
	definition(t) {
		t.field(User.id);
		t.field(User.name);
		t.field(User.email);
		t.field(User.image);
	},
});

export const queries = extendType({
	type: 'Query',
	definition(t) {
		t.nullable.field('me', {
			type: 'User',
			//@ts-ignore
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
				await prisma.user.update({
					where: { id: user!.id },
					data: {
						name,
						image,
					},
				});
				return ResultType.SUCCESS;
			},
		});
	},
});
