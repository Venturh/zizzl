import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

export const user = objectType({
	name: User.$name,
	definition(t) {
		t.field(User.id);
		t.field(User.name);
		t.field(User.email);
		t.field(User.image);
	},
});
