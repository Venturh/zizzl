import { extendType, nullable, stringArg } from 'nexus';
import db from 'lib/prisma';

import { ResultType } from '../results';

export const postQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('posts', {
			type: 'Post',
			resolve: async (_, __, { userId }) => {
				return await db.post.findMany();
			},
		});
		t.nullable.field('post', {
			type: 'Post',
			args: {
				id: stringArg(),
			},
			resolve: async (_, { id }, { userId }) => {
				return await db.post.findUnique({ where: { id } });
			},
		});
	},
});

export const postMutations = extendType({
	type: 'Mutation',
	definition: (t) => {
		t.field('createPost', {
			type: 'Result',
			args: {
				title: stringArg(),
				text: stringArg(),
			},
			resolve: async (_root, { title, text }, {}) => {
				await db.post.create({
					data: { title, text },
				});
				return ResultType.SUCCESS;
			},
		});
		t.field('updatePost', {
			type: 'Result',
			args: {
				id: stringArg(),
				title: nullable(stringArg()),
				text: nullable(stringArg()),
			},
			resolve: async (_root, { id, title, text }, {}) => {
				await db.post.update({
					where: { id },
					data: {
						title,
						text,
					},
				});
				return ResultType.SUCCESS;
			},
		});
		t.field('deletePost', {
			type: 'Result',
			args: {
				id: stringArg(),
			},
			resolve: async (_root, { id }, {}) => {
				await db.post.delete({
					where: { id },
				});
				return ResultType.SUCCESS;
			},
		});
	},
});
