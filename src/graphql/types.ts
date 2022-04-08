import { arg, core, enumType } from 'nexus';
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

export const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);
export const jsonScalar = new GraphQLScalarType({
	...JSONObjectResolver,
	name: 'Json',
});

export const dateTimeArg = (opts: core.NexusArgConfig<'DateTime'>) =>
	arg({ ...opts, type: 'DateTime' });

export * from './modules/results';
export * from './modules/users';
export * from './modules/posts';
