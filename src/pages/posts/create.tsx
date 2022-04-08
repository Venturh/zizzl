import { z } from 'zod';
import { useRouter } from 'next/router';

import AppLayout from 'components/layouts/AppLayout';
import Form from 'components/ui/Form';
import Input from 'components/ui/Input';

import { useFormValidation } from 'hooks/useForm';
import { useCreatePostMutation } from 'types/graphql';

export const postInputSchema = z.object({
	id: z.string().uuid().optional(),
	title: z.string().min(1).max(32),
	text: z.string().min(1),
});

export default function CreatePost() {
	const form = useFormValidation({ schema: postInputSchema });
	const { push } = useRouter();

	const [createPost] = useCreatePostMutation({ onCompleted: () => push('/posts') });

	return (
		<AppLayout title="Create Post">
			<div className="divide-y-2 divide-accent-primary ">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-3xl tracking-tight font-extrabold text-primary sm:text-4xl">
							Create Post
						</h2>
						<p className="text-xl text-secondary">All Posts</p>
					</div>
				</div>
				<div className="mt-6 pt-6">
					<Form
						name="createPost"
						title="Create Post"
						submitButtonText="Create"
						form={form}
						onSubmit={({ title, text }) => createPost({ variables: { title, text } })}
					>
						<div className="space-y-4">
							<Input label="Title" {...form.register('title')} />
							<Input label="Text" {...form.register('text')} />
						</div>
					</Form>
				</div>
			</div>
		</AppLayout>
	);
}
