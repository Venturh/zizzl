import { objectType } from 'nexus';
import { Post } from 'nexus-prisma';

export const post = objectType({
	name: Post.$name,
	definition(t) {
		t.field(Post.id);
		t.field(Post.title);
		t.field(Post.text);
		t.field(Post.createdAt);
		t.field(Post.updatedAt);
	},
});
